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
                    statusText.style.background = "#f0fdf4";
                    statusText.style.color = "#166534";
                    statusText.style.border = "1px solid #bbf7d0";
                    statusText.innerText = "✓ Message sent successfully! We will be in touch shortly.";
                    contactForm.reset();
                } else {
                    throw new Error(data.error || "Internal mapping failure.");
                }
            })
            .catch((error) => {
                console.error('Transmission failure:', error);
                statusText.style.display = "block";
                statusText.style.background = "#fef2f2";
                statusText.style.color = "#991b1b";
                statusText.style.border = "1px solid #fca5a5";
                statusText.innerText = "✕ Error transmitting message. Please try again or text us directly.";
            })
            .finally(() => {
                submitBtn.innerText = "Send Message";
                submitBtn.disabled = false;
            });
        });
    }

    // ==========================================
    // 2. MOBILE HAMBURGER MENU INTERACTIVE INTERFACE
    // ==========================================
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        // Toggle mobile menu visibility when hamburger button is clicked
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Auto-close dropdown container when an internal menu node link is chosen
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    // ==========================================
    // 3. INTERACTIVE ACCORDIONS ENGINE (FAQs & CASE STUDIES)
    // ==========================================
    // Handle FAQ Toggle Clicks
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const item = this.parentElement;
            item.classList.toggle('active');
        });
    });

    // Handle Case Study Toggle Clicks
    const caseQuestions = document.querySelectorAll('.case-study-question');
    caseQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const item = this.parentElement;
            item.classList.toggle('active');
        });
    });
}
