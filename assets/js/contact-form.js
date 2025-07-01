document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ DOM fully loaded and script is running");

    const form = document.getElementById("contact-form");

    if (!form) {
      console.error("❌ Contact form not found!");
      return;
    }
    console.log("✅ Contact form found");

    // Add submit button click listener for debugging
    const submitBtn = document.querySelector('#contact-form button[type="submit"]');
    if (submitBtn) {
      submitBtn.addEventListener('click', () => {
        console.log('🔘 Submit button clicked');
      });
    } else {
      console.warn('⚠️ Submit button not found');
    }

    // Form submit handler
    form.addEventListener("submit", async function (e) {
        e.preventDefault();
        console.log("📨 Form submitted");

        const name = document.getElementById("name")?.value;
        const email = document.getElementById("email")?.value;
        const message = document.getElementById("message")?.value;

        const payload = { 
            name: name, 
            email: email,  // fixed typo from 'emai' to 'email'
            message: message,
        };
        console.log("📦 Collected values:", payload);

        try {
          const response = await fetch(
            'https://0kazt94ly1.execute-api.us-west-2.amazonaws.com/production/MySESLambda', 
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload)
            }
          );

          if (response.ok) {
            console.log('✅ Email sent successfully!');
            alert('✅ Message sent successfully! We will get back to you soon.');
            form.reset(); // Clear the form after successful submission
          } else {
            const result = await response.json();
            console.error("⚠️ Error response:", result);
            alert('⚠️ Error sending message: ' + result.error);
          }
        } catch (err) {
          console.error("❌ Fetch failed:", err);
          alert("❌ Request failed: " + err.message);
        }
    });
});
