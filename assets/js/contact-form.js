document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  form.addEventListener("submit", async function (e) {
    e.preventDefault();
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
    // reCAPTCHA v3: fetch token and submit form
    if (typeof grecaptcha === "undefined") {
      alert("reCAPTCHA is not loaded. Please refresh the page and try again.");
      return;
    }
    grecaptcha.ready(function () {
      grecaptcha.execute("6LcQR3crAAAAAJCf6JyOTxdlzI5SBzIc2N-pCgrv", { action: "contact" }).then(async function (recaptchaToken) {
        try {
          const response = await fetch("https://0kazt94ly1.execute-api.us-west-2.amazonaws.com/MySESLambda", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, message, recaptchaToken })
          });
          const result = await response.json();
          if (response.ok) {
            alert("Message sent successfully!");
            form.reset();
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