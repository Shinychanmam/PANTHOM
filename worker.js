const ALLOWED_ORIGIN = "https://panthom.online";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/contact") {
      if (request.method === "OPTIONS") {
        return new Response(null, {
          status: 204,
          headers: corsHeaders()
        });
      }

      if (request.method !== "POST") {
        return json(
          { error: "Method not allowed." },
          405
        );
      }

      return handleContact(request, env);
    }

    return env.ASSETS.fetch(request);
  }
};

async function handleContact(request, env) {
  try {
    const data = await request.json();

    const name = clean(data.name);
    const email = clean(data.email);
    const subject = clean(data.subject);
    const message = clean(data.message);
    const website = clean(data.website);

    // Honeypot spam protection
    if (website) {
      return json({ success: true });
    }

    if (!name || !email || !subject || !message) {
      return json(
        { error: "Please complete all required fields." },
        400
      );
    }

    if (name.length > 100) {
      return json({ error: "Name is too long." }, 400);
    }

    if (email.length > 200 || !isValidEmail(email)) {
      return json({ error: "Please enter a valid email address." }, 400);
    }

    if (subject.length > 200) {
      return json({ error: "Subject is too long." }, 400);
    }

    if (message.length > 10000) {
      return json({ error: "Message is too long." }, 400);
    }

    if (!env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is missing.");
      return json(
        { error: "Mail service is not configured." },
        500
      );
    }

    const emailResponse = await fetch(
      "https://api.resend.com/emails",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: "PANTHOM <contact@panthom.online>",
          to: ["kimkuris@icloud.com"],
          reply_to: email,
          subject: `[PANTHOM Contact] ${subject}`,
          html: `
            <!DOCTYPE html>
            <html>
              <body style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2>New PANTHOM Contact Message</h2>

                <p>
                  <strong>Name:</strong><br>
                  ${escapeHtml(name)}
                </p>

                <p>
                  <strong>Email:</strong><br>
                  ${escapeHtml(email)}
                </p>

                <p>
                  <strong>Subject:</strong><br>
                  ${escapeHtml(subject)}
                </p>

                <hr>

                <p>
                  <strong>Message:</strong>
                </p>

                <p>
                  ${escapeHtml(message).replace(/\n/g, "<br>")}
                </p>

                <hr>

                <p style="color:#777;font-size:12px;">
                  Sent through the PANTHOM website contact form.
                </p>
              </body>
            </html>
          `
        })
      }
    );

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();

      console.error(
        "Resend error:",
        errorText
      );

      return json(
        { error: "Unable to send the message." },
        500
      );
    }

    return json({
      success: true,
      message: "Message sent successfully."
    });

  } catch (error) {
    console.error(
      "Contact form error:",
      error
    );

    return json(
      { error: "Invalid request." },
      400
    );
  }
}

function clean(value) {
  return String(value ?? "").trim();
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };
}

function json(data, status = 200) {
  return new Response(
    JSON.stringify(data),
    {
      status,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders()
      }
    }
  );
}