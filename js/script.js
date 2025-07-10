
document.addEventListener('DOMContentLoaded', function() {
  
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
            
         
            const bars = document.querySelectorAll('.bar');
            bars[0].classList.toggle('bar1');
            bars[1].classList.toggle('bar2');
            bars[2].classList.toggle('bar3');
        });
    }
    
  
    const navItems = document.querySelectorAll('.nav-links li a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenu.classList.remove('active');
                
                const bars = document.querySelectorAll('.bar');
                bars[0].classList.remove('bar1');
                bars[1].classList.remove('bar2');
                bars[2].classList.remove('bar3');
            }
        });
    });
    

    const header = document.getElementById('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });
    

    const sections = document.querySelectorAll('section');
    const navLinkItems = document.querySelectorAll('.nav-links li a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinkItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    

    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
       
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
  
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
           
            let valid = true;
            const name = document.querySelector('input[name="name"]');
            const email = document.querySelector('input[name="email"]');
            const message = document.querySelector('textarea[name="message"]');
            
            if (!name.value.trim()) {
                valid = false;
                showError(name, 'Name is required');
            } else {
                removeError(name);
            }
            
            if (!email.value.trim()) {
                valid = false;
                showError(email, 'Email is required');
            } else if (!isValidEmail(email.value)) {
                valid = false;
                showError(email, 'Please enter a valid email');
            } else {
                removeError(email);
            }
            
            if (!message.value.trim()) {
                valid = false;
                showError(message, 'Message is required');
            } else {
                removeError(message);
            }
            
            if (valid) {
              
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
                
             
                setTimeout(() => {
                    // Show success message
                    const formContainer = contactForm.parentElement;
                    formContainer.innerHTML = `
                        <div class="success-message">
                            <i class="fas fa-check-circle"></i>
                            <h3>Thank You!</h3>
                            <p>Your message has been sent successfully. We'll get back to you soon!</p>
                        </div>
                    `;
                }, 2000);
            }
        });
    }
    
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const subscribeBtn = newsletterForm.querySelector('button');
            
            if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
                emailInput.classList.add('error');
                return;
            }
            
            emailInput.classList.remove('error');
            
      
            const originalText = subscribeBtn.textContent;
            subscribeBtn.disabled = true;
            subscribeBtn.textContent = 'Subscribing...';
            
   
            setTimeout(() => {
                newsletterForm.innerHTML = `
                    <div class="success-message">
                        <p>Thank you for subscribing to our newsletter!</p>
                    </div>
                `;
            }, 1500);
        });
    }
    

    function animateCounter() {
        const counters = document.querySelectorAll('.stat-item h3');
        const speed = 200;
        
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText.replace('+', '');
            const increment = Math.trunc(target / speed);
            
            if (count < target) {
                counter.innerText = count + increment + (counter.innerText.includes('+') ? '+' : '');
                setTimeout(animateCounter, 1);
            } else {
                counter.innerText = target + (counter.innerText.includes('+') ? '+' : '');
            }
        });
    }
    
 
    const statsSection = document.querySelector('.stats-container');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                const statItems = document.querySelectorAll('.stat-item h3');
                statItems.forEach(item => {
                    const value = item.innerText;
                    item.setAttribute('data-target', value.replace('+', ''));
                    item.innerText = '0' + (value.includes('+') ? '+' : '');
                });
                animateCounter();
            }
        });
        
        observer.observe(statsSection);
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    

    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerText = message;
        
        if (!formGroup.querySelector('.error-message')) {
            input.classList.add('error');
            formGroup.appendChild(errorDiv);
        }
    }
    
    function removeError(input) {
        const formGroup = input.parentElement;
        const errorDiv = formGroup.querySelector('.error-message');
        
        if (errorDiv) {
            input.classList.remove('error');
            formGroup.removeChild(errorDiv);
        }
    }
    
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
   
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
 
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
       
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Chatbot Functionality
    const chatBotButton = document.getElementById('chatBotButton');
    const chatBotInterface = document.getElementById('chatBotInterface');
    const closeChat = document.getElementById('closeChat');
    const chatInput = document.getElementById('chatInput');
    const sendMessage = document.getElementById('sendMessage');
    const chatMessages = document.getElementById('chatMessages');
    
    // Predefined bot responses
    const botResponses = {
        'hello': 'Hello! How can I help you today?',
        'hi': 'Hi there! How can I assist you?',
        'help': 'I can help you learn about our services, schedule a demo, or connect you with our team. What would you like to know?',
        'services': 'We offer IT Consulting, Software Development, Cloud Services, and Cybersecurity solutions. Which one would you like to know more about?',
        'contact': 'You can reach our team at info@techcorpsolutions.com or call us at +1 (555) 123-4567.',
        'pricing': 'Our pricing varies based on your specific needs. Would you like to schedule a consultation to discuss a custom solution?',
        'default': "I'm not sure I understand. Could you try rephrasing or ask about our services, pricing, or contact information?"
    };
    
    // Service specific responses
    const serviceResponses = {
        'consulting': 'Our IT Consulting services help align technology with your business goals. Our experts analyze your current infrastructure and provide strategic recommendations.',
        'software': 'Our Software Development team creates custom solutions tailored to your business needs, from web applications to enterprise software.',
        'cloud': 'Our Cloud Services help you migrate to the cloud securely, optimize your infrastructure, and reduce costs while improving scalability.',
        'security': 'Our Cybersecurity solutions protect your business from threats with comprehensive risk assessment, implementation of security protocols, and ongoing monitoring.'
    };
    
    if (chatBotButton && chatBotInterface) {
        // Toggle chat interface
        chatBotButton.addEventListener('click', function() {
            chatBotInterface.classList.toggle('active');
        });
        
        // Close chat interface
        closeChat.addEventListener('click', function() {
            chatBotInterface.classList.remove('active');
        });
        
        // Send message function
        function sendChatMessage() {
            const message = chatInput.value.trim();
            
            if (message !== '') {
                // Add user message to chat
                addMessage('user', message);
                
                // Clear input
                chatInput.value = '';
                
                // Bot response (with delay to simulate thinking)
                setTimeout(() => {
                    const response = getBotResponse(message);
                    addMessage('bot', response);
                }, 600);
            }
        }
        
        // Send message on button click
        sendMessage.addEventListener('click', sendChatMessage);
        
        // Send message on Enter key
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendChatMessage();
            }
        });
        
        // Get bot response based on user input
        function getBotResponse(message) {
            const lowerMessage = message.toLowerCase();
            
            // Check for greetings
            if (lowerMessage.includes('hello') || lowerMessage.includes('hi ') || lowerMessage === 'hi') {
                return botResponses.hello;
            }
            
            // Check for help request
            if (lowerMessage.includes('help') || lowerMessage.includes('assist')) {
                return botResponses.help;
            }
            
            // Check for services inquiry
            if (lowerMessage.includes('services') || lowerMessage.includes('offer') || lowerMessage.includes('provide')) {
                return botResponses.services;
            }
            
            // Check for specific service inquiries
            if (lowerMessage.includes('consult')) {
                return serviceResponses.consulting;
            }
            
            if (lowerMessage.includes('software') || lowerMessage.includes('development') || lowerMessage.includes('app')) {
                return serviceResponses.software;
            }
            
            if (lowerMessage.includes('cloud')) {
                return serviceResponses.cloud;
            }
            
            if (lowerMessage.includes('security') || lowerMessage.includes('cyber')) {
                return serviceResponses.security;
            }
            
            // Check for contact inquiry
            if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('phone') || lowerMessage.includes('call')) {
                return botResponses.contact;
            }
            
            // Check for pricing inquiry
            if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('pricing')) {
                return botResponses.pricing;
            }
            
            // Default response
            return botResponses.default;
        }
        
        // Add message to chat
        function addMessage(type, text) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message');
            messageDiv.classList.add(type === 'user' ? 'user-message' : 'bot-message');
            
            if (type === 'bot') {
                const iconDiv = document.createElement('div');
                iconDiv.className = 'bot-icon';
                const icon = document.createElement('i');
                icon.className = 'fas fa-robot';
                iconDiv.appendChild(icon);
                messageDiv.appendChild(iconDiv);
            }
            
            const contentDiv = document.createElement('div');
            contentDiv.classList.add('message-content');
            
            const paragraph = document.createElement('p');
            paragraph.textContent = text;
            
            contentDiv.appendChild(paragraph);
            messageDiv.appendChild(contentDiv);
            chatMessages.appendChild(messageDiv);
            
            // Scroll to bottom
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }
}); 