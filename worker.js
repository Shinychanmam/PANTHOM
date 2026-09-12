export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: corsHeaders()
      });
    }

    if (url.pathname === "/api/contact" && request.method === "POST") {
      try {
        const data = await request.json();

        const name = String(data.name || "").trim();
        const email = String(data.email || "").trim();
        const subject = String(data.subject || "").trim();
        const message = String(data.message || "").trim();

        if (!name || !email || !subject || !message) {
          return json({ error: "All fields are required." }, 400);
        }

        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${env.RESEND_API_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            from: "PANTHOM <contact@panthom.online>",
            to: ["YOUR_OUTLOOK_EMAIL"],
            reply_to: email,
            subject: `[PANTHOM Contact] ${subject}`,
            html: `
              <h2>New PANTHOM Contact Message</h2>
              <p><strong>Name:</strong> ${escapeHtml(name)}</p>
              <p><strong>Email:</strong> ${escapeHtml(email)}</p>
              <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
              <hr>
              <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
            `
          })
        });

        if (!response.ok) {
          const error = await response.text();
          console.error(error);
          return json({ error: "Failed to send message." }, 500);
        }

        return json({ success: true });
      } catch (error) {
        console.error(error);
        return json({ error: "Invalid request." }, 400);
      }
    }

    return env.ASSETS.fetch(request);
  }
};

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders()
    }
  });
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}