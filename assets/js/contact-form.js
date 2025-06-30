document.addEventListener("DOMContentLoaded", function () {
  console.log("✅ DOM fully loaded and script is running");

  const form = document.getElementById("contact-form");
  if (!form) {
    console.error("❌ Contact form not found");
    return;
  }

  console.log("✅ Contact form found");

  form.addEventListener("click", function () {
    console.log("🖱️ Some element inside the form was clicked");
  });

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    console.log("📨 Form submitted");

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    console.log("🔎 Collected values:", { name, email, message });

    const payload = { name, email, message };

    try {
      const response = await fetch('https://0kazt94ly1.execute-api.us-west-2.amazonaws.com/production/MySESLambda', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (response.ok) {
        alert('✅ Message sent successfully!');
      } else {
        alert('⚠️ Error sending message: ' + result.error);
      }
    } catch (err) {
      alert('❌ Request failed: ' + err.message);
    }
  });
});
