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

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    console.log("📨 Form submitted");

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    console.log("🔎 Collected values:", { name, email, message });
  });
});
