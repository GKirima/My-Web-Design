document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("submit-btn").addEventListener("click", async function () {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      alert("Please fill in all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (typeof grecaptcha === "undefined" || !grecaptcha.enterprise) {
      alert("reCAPTCHA is not loaded. Please refresh the page and try again.");
      return;
    }

    grecaptcha.enterprise.ready(function () {
      grecaptcha.enterprise.execute("6LfRkXgrAAAAAIt-AFeQd0HeoDnG9VsxSkvp123Z", { action: "contact" }).then(async function (recaptchaToken) {
        if (!recaptchaToken) {
          alert("reCAPTCHA verification failed. Please reload the page and try again.");
          return;
        }

        const payload = { name, email, message, recaptchaToken };
        console.log("📦 Final payload:", { name, email, message, recaptchaToken });


        try {
          const response = await fetch("https://0kazt94ly1.execute-api.us-west-2.amazonaws.com/production", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, message, recaptchaToken })
          });

          const result = await response.json();
          if (response.ok) {
            alert("Message sent successfully!");
            document.getElementById("contact-form").reset();
          } else {
            alert(result.error || "Something went wrong. Please try again.");
          }
        } catch (error) {
          console.error(error);
          alert("Network error. Please check your connection and try again.");
        }
      });
    });
  });
});