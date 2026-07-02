window.onload = function() {
    const contactForm = document.getElementById('pari-contact-form');
    const statusText = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');

    // 🔗 PASTE YOUR COPIED GOOGLE APPS SCRIPT WEB APP URL HERE
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz21bmNTopHzzpfRgjsS1VfGExmLFDKijI_jVoahCWYWmf_6XwxkqT-1ESquXr5iXU0/exec";

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // HALT PAGE REFRESHES
            
            submitBtn.innerText = "Sending...";
            submitBtn.disabled = true;

            // Map frontend form properties smoothly
            const formData = {
                user_name: contactForm.elements['user_name'].value,
                user_email: contactForm.elements['user_email'].value,
                user_phone: contactForm.elements['user_phone'].value,
                partnership_type: contactForm.elements['partnership_type'].value,
                message: contactForm.elements['message'].value
            };

            // Using text/plain content layout purposefully forces standard browsers to bypass 
            // complex pre-flight checks, routing straight into Google servers without error loops.
            fetch(GOOGLE_SCRIPT_URL, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "text/plain;charset=utf-8"
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === "success") {
                    statusText.style.display = "block";
                    statusText.style.color = "#4CAF50"; // Healthy Green
                    statusText.innerText = "✓ Message sent successfully! We will be in touch shortly.";
                    contactForm.reset();
                } else {
                    throw new Error(data.error || "Internal data mapping failure.");
                }
            })
            .catch((error) => {
                console.error('Transmission processing failure:', error);
                statusText.style.display = "block";
                statusText.style.color = "#f44336"; // System Alert Red
                statusText.innerText = "✕ Error transmitting message. Please try again or text us directly.";
            })
            .finally(() => {
                submitBtn.innerText = "Send Message";
                submitBtn.disabled = false;
            });
        });
    }
}
