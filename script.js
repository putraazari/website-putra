/* ============================================
   PUTRA AZARI - Interactive JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    
    // ===== 1. Particles.js Background =====
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: '#00d4ff' },
                shape: { type: 'circle' },
                opacity: { value: 0.3, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1 } },
                size: { value: 3, random: true, anim: { enable: true, speed: 2, size_min: 0.5 } },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#7c3aed',
                    opacity: 0.15,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1.5,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'grab' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true
                },
                modes: {
                    grab: { distance: 140, line_linked: { opacity: 0.3 } },
                    push: { particles_nb: 4 }
                }
            },
            retina_detect: true
        });
    }

    // ===== 2. Typewriter Effect =====
    const typewriterEl = document.getElementById('typewriter');
    if (typewriterEl) {
        const words = [
            'GSM & Telekomunikasi',
            'Cloud VPS Infrastructure',
            'Tracking & IoT Systems',
            'Signaling SS7 Protocol',
            'Horizontal Geography',
            'Fisika Kuantum'
        ];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        function typeEffect() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typewriterEl.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                typewriterEl.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500;
            }

            setTimeout(typeEffect, typeSpeed);
        }

        typeEffect();
    }

    // ===== 3. Navbar Scroll Effect =====
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;

        // Active nav link
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        sections.forEach((section, index) => {
            const top = section.offsetTop - 150;
            const bottom = top + section.offsetHeight;
            
            if (currentScroll >= top && currentScroll < bottom) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLinks[index + 1]) {
                    navLinks[index + 1].classList.add('active');
                }
            }
        });
    });

    // ===== 4. Mobile Navigation Toggle =====
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = navToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });

        // Close menu on link click
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.className = 'fas fa-bars';
            });
        });
    }

    // ===== 5. Counter Animation =====
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target'));
        let current = 0;
        const increment = Math.ceil(target / 60);
        const duration = 2000;
        const stepTime = duration / 60;

        function update() {
            current += increment;
            if (current >= target) {
                el.textContent = target + (target === 100 ? '%' : '');
                return;
            }
            el.textContent = current;
            setTimeout(update, stepTime);
        }
        update();
    }

    // Intersection Observer for counters
    const observerOptions = { threshold: 0.5 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                animateCounter(target);
                observer.unobserve(target);
            }
        });
    }, observerOptions);

    statNumbers.forEach(el => observer.observe(el));

    // ===== 6. Scroll Reveal Animation =====
    const revealElements = document.querySelectorAll('.card, .layer-card, .quantum-card');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(el);
    });

    // ===== 7. Quantum Probability Calculator =====
    const alphaSlider = document.getElementById('alpha');
    const betaSlider = document.getElementById('beta');
    const alphaVal = document.getElementById('alphaVal');
    const betaVal = document.getElementById('betaVal');
    const prob0Bar = document.getElementById('prob0Bar');
    const prob1Bar = document.getElementById('prob1Bar');
    const probText = document.getElementById('probText');

    function updateQuantumCalc() {
        // Convert to normalized probabilities
        const alpha = parseFloat(alphaSlider.value) / 100;
        const beta = parseFloat(betaSlider.value) / 100;
        
        // Normalize: P(|0⟩) = |α|², P(|1⟩) = |β|²
        const norm = (alpha * alpha + beta * beta) || 1;
        const prob0 = ((alpha * alpha) / norm) * 100;
        const prob1 = ((beta * beta) / norm) * 100;

        // Update display values (complex amplitudes)
        alphaVal.textContent = alpha.toFixed(2);
        betaVal.textContent = beta.toFixed(2);

        // Update probability bars
        prob0Bar.style.width = Math.max(prob0, 5) + '%';
        prob0Bar.textContent = `|0⟩: ${prob0.toFixed(1)}%`;
        
        prob1Bar.style.width = Math.max(prob1, 5) + '%';
        prob1Bar.textContent = `|1⟩: ${prob1.toFixed(1)}%`;

        // Update probability text
        probText.innerHTML = `
            P(|0⟩) = ${prob0.toFixed(2)}% &nbsp; | &nbsp; 
            P(|1⟩) = ${prob1.toFixed(2)}% &nbsp; | &nbsp;
            |α|² + |β|² = ${(prob0 + prob1).toFixed(2)}%
        `;
    }

    if (alphaSlider && betaSlider) {
        alphaSlider.addEventListener('input', () => {
            // Auto-adjust beta to keep some balance
            // betaSlider.value = 100 - alphaSlider.value;
            updateQuantumCalc();
        });
        betaSlider.addEventListener('input', updateQuantumCalc);
        updateQuantumCalc(); // Initial calculation
    }

    // ===== 8. Smooth Scroll for Anchor Links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===== 9. Progress Bar Animation on Scroll =====
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 200);
                progressObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => progressObserver.observe(bar));

    // ===== 10. Section Icon Pulse Animation =====
    const sectionIcons = document.querySelectorAll('.section-icon');
    
    const iconObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'pulseGlow 2s ease-in-out 3';
                setTimeout(() => {
                    entry.target.style.animation = '';
                }, 6000);
            }
        });
    }, { threshold: 0.5 });

    sectionIcons.forEach(icon => iconObserver.observe(icon));

    // ===== 11. Parallax Effect for Hero =====
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const hero = document.querySelector('.hero');
        if (hero) {
            const heroContent = hero.querySelector('.hero-content');
            if (heroContent && scrolled < window.innerHeight) {
                heroContent.style.transform = `translateY(${scrolled * 0.15}px)`;
                heroContent.style.opacity = 1 - (scrolled / (window.innerHeight * 0.8));
            }
        }
    });

    console.log('🚀 Putra Azari - Platform initialized successfully');
    console.log('📡 Tracking | ☁️ Cloud VPS | 📱 GSM | 🔐 SS7 | 🌍 Geography | ⚛️ Quantum');
});

