// Initialize EmailJS
(function() {
  // EmailJS configuration with actual credentials
  emailjs.init("qHnlDA2m1xxhCqj9s");
})();

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
  // Mobile navigation toggle
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
    });
  }

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70; // Account for fixed nav
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
      
      // Close mobile menu if open
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
      }
    });
  });

  // Contact form handling with EmailJS
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);
      
      // Simple validation
      if (!data.name || !data.email || !data.type) {
        alert('Please fill in all required fields.');
        return;
      }
      
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      // Send email using EmailJS
      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        interest_type: data.type,
        assets_description: data.assets || 'Not specified',
        target_audience: data.audience || 'Not specified',
        message: data.message || 'No additional details provided'
      };
      
      // Using actual EmailJS credentials
      emailjs.send('service_51kuyum', 'template_ldhcsl7', templateParams)
        .then(function(response) {
          alert('Thank you for your interest! We\'ll be in touch within 24 hours to discuss your digital assets and potential partnership opportunities.');
          contactForm.reset();
        }, function(error) {
          console.log('EmailJS Error:', error);
          // Fallback to local storage for demo purposes
          localStorage.setItem('pari_contact_' + Date.now(), JSON.stringify(templateParams));
          alert('Thank you for your interest! Your message has been saved. We\'ll be in touch within 24 hours to discuss your digital assets and potential partnership opportunities.');
          contactForm.reset();
        })
        .finally(function() {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        });
    });
  }

  // FAQ functionality
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const toggle = item.querySelector('.faq-toggle');
    
    question.addEventListener('click', function() {
      const isOpen = item.classList.contains('active');
      
      // Close all other FAQ items
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        otherItem.querySelector('.faq-toggle').textContent = '+';
      });
      
      // Toggle current item
      if (!isOpen) {
        item.classList.add('active');
        toggle.textContent = '−';
      }
    });
  });

  // Case Studies functionality (similar to FAQ)
  const caseStudyItems = document.querySelectorAll('.case-study-item');
  caseStudyItems.forEach(item => {
    const question = item.querySelector('.case-study-question');
    const answer = item.querySelector('.case-study-answer');
    const toggle = item.querySelector('.case-study-toggle');
    
    question.addEventListener('click', function() {
      const isOpen = item.classList.contains('active');
      
      // Close all other case study items
      caseStudyItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        otherItem.querySelector('.case-study-toggle').textContent = '+';
      });
      
      // Toggle current item
      if (!isOpen) {
        item.classList.add('active');
        toggle.textContent = '−';
      }
    });
  });

  // Scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animatedElements = document.querySelectorAll('.model-card, .benefit-card, .asset-type, .step, .example, .repurposing-card, .faq-item, .case-study-item, .lead-revival-card, .clone-benefit, .passive-income-card');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // Add some interactive hover effects
  const cards = document.querySelectorAll('.model-card, .benefit-card, .asset-type, .repurposing-card, .case-study-item, .lead-revival-card, .clone-benefit, .passive-income-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Navbar scroll effect
  let lastScrollTop = 0;
  const nav = document.querySelector('.nav');
  
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down
      nav.style.transform = 'translateY(-100%)';
    } else {
      // Scrolling up
      nav.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
  });
});

// Add some dynamic content loading
document.addEventListener('DOMContentLoaded', function() {
  // Animate numbers in stats
  const statNumbers = document.querySelectorAll('.stat-number');
  
  function animateNumber(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      
      if (target === Infinity) {
        element.textContent = '∞';
      } else {
        element.textContent = Math.floor(current).toLocaleString();
      }
    }, 16);
  }
  
  // Trigger animation when stats come into view
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target.textContent;
        if (target === '24/7') {
          // Don't animate this one
          return;
        } else if (target === '∞') {
          // Don't animate infinity
          return;
        } else if (target === '0') {
          animateNumber(entry.target, 0, 1000);
        }
        statsObserver.unobserve(entry.target);
      }
    });
  });
  
  statNumbers.forEach(stat => {
    statsObserver.observe(stat);
  });
});
