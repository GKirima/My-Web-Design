document.getElementById('contact-form').addEventListener('submit', async function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  console.log("🔎 Collected values:", { name, email, message });

  if (!name || !email || !message) {
    alert("Please fill all the fields.");
    return;
  }

  const payload = { name, email, message };

  try {
    const response = await fetch('https://0kazt94ly1.execute-api.us-west-2.amazonaws.com/production/MySESLambda', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      alert('✅ Message sent successfully!');
    } else {
      const result = await response.json();
      alert('⚠️ Error sending message: ' + result.error);
    }
  } catch (err) {
    alert('❌ Request failed: ' + err.message);
  }
});
