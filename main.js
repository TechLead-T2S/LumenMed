// Loading Screen Animation Logic
document.addEventListener('DOMContentLoaded', function() {
  const loadingScreen = document.getElementById('loading-screen');
  const mainContent = document.getElementById('main-content');
  
  // Ensure main content is hidden initially
  mainContent.style.display = 'block';
  
  // Show loading screen for 4 seconds then fade out
  setTimeout(function() {
    loadingScreen.classList.add('fade-out');
    
    // Remove loading screen from DOM after fade out
    setTimeout(function() {
      loadingScreen.style.display = 'none';
      
      // Add smooth scroll behavior after loading
      document.documentElement.style.scrollBehavior = 'smooth';
      
      // Initialize services animations after loading
      initializeServicesAnimations();
      
      // Initialize button animations
      initializeButtonAnimations();
      
      // Initialize About Us animations
      initializeAboutUsAnimations();
      
      // Initialize testimonials carousel
      initTestimonialsCarousel();
      
      // Initialize testimonials observer
      initTestimonialsObserver();
      
      // Initialize AI keyboard controls
      initAIKeyboardControls();
    }, 1000); // Wait for fade out animation to complete
  }, 3500); // Show loading for 3.5 seconds
});

// Services Animation Logic
function initializeServicesAnimations() {
  const servicesContainer = document.querySelector('.services-container');
  const serviceTiles = document.querySelectorAll('.service-tile');
  
  // Create intersection observer for services section
  const servicesObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animate services container
        entry.target.classList.add('animate-in');
        
        // Animate service tiles with stagger
        serviceTiles.forEach((tile, index) => {
          setTimeout(() => {
            tile.classList.add('animate-tile');
          }, index * 150); // 150ms stagger between tiles
        });
        
        // Stop observing once animation is triggered
        servicesObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2, // Trigger when 20% of the section is visible
    rootMargin: '-50px 0px -50px 0px' // Add some margin for better timing
  });
  
  // Start observing the services container
  if (servicesContainer) {
    servicesObserver.observe(servicesContainer);
  }
  
  // Add enhanced hover effects for tiles
  serviceTiles.forEach(tile => {
    tile.addEventListener('mouseenter', function() {
      // Add subtle pulse effect to other tiles
      serviceTiles.forEach(otherTile => {
        if (otherTile !== tile) {
          otherTile.style.transform = 'scale(0.98)';
          otherTile.style.opacity = '0.8';
        }
      });
    });
    
    tile.addEventListener('mouseleave', function() {
      // Reset other tiles
      serviceTiles.forEach(otherTile => {
        otherTile.style.transform = '';
        otherTile.style.opacity = '';
      });
    });
  });
}

// Button Animation Enhancements
function initializeButtonAnimations() {
  const appointmentBtn = document.getElementById('schedule-appointment-btn');
  const portalBtn = document.getElementById('patient-portal-btn');
  
  // Enhanced click effects for appointment button
  if (appointmentBtn) {
    appointmentBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Create ripple effect
      createRippleEffect(this, e);
      
      // Add success animation
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = '';
        // Show confirmation popup before redirecting
        const userConfirmed = confirm('You are now rerouting to external page which handles patient scheduling. Please return back if you do not wish to proceed.');
        if (userConfirmed) {
          // Open external booking page in new tab
          // Replace 'https://your-booking-site.com' with your actual booking system URL
          window.open('https://your-booking-site.com', '_blank');
        }
      }, 150);
    });
    
    // Magnetic hover effect
    appointmentBtn.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05)`;
    });
    
    appointmentBtn.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  }
  
  // Enhanced click effects for portal button
  if (portalBtn) {
    portalBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Create ripple effect
      createRippleEffect(this, e);
      
      // Add portal opening animation
      this.style.transform = 'scale(0.95) rotateY(10deg)';
      setTimeout(() => {
        this.style.transform = '';
        // Simulate portal opening or redirect
        console.log('Opening Patient Portal...');
      }, 150);
    });
    
    // Portal-specific magnetic effect
    portalBtn.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      this.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) scale(1.05) rotateZ(${x * 0.02}deg)`;
    });
    
    portalBtn.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  }
}

// Ripple effect function
function createRippleEffect(button, e) {
  const ripple = document.createElement('span');
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = e.clientX - rect.left - size / 2;
  const y = e.clientY - rect.top - size / 2;
  
  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';
  ripple.style.position = 'absolute';
  ripple.style.background = 'rgba(255, 255, 255, 0.5)';
  ripple.style.borderRadius = '50%';
  ripple.style.transform = 'scale(0)';
  ripple.style.animation = 'ripple 0.6s linear';
  ripple.style.pointerEvents = 'none';
  
  button.appendChild(ripple);
  
  setTimeout(() => {
    ripple.remove();
  }, 600);
}

// About Us Animation Logic
function initializeAboutUsAnimations() {
  const aboutUsContainer = document.querySelector('.aboutus-container');
  
  if (!aboutUsContainer) return;
  
  // Create intersection observer for About Us section
  const aboutUsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Start the main animation
        entry.target.classList.add('animate-aboutus');
        
        // Add individual letter hover effects after main animation
        setTimeout(() => {
          const letters = entry.target.querySelectorAll('.letter');
          letters.forEach((letter, index) => {
            letter.addEventListener('mouseenter', function() {
              this.style.animation = 'letterHover 0.6s ease-in-out';
            });
            
            letter.addEventListener('animationend', function() {
              if (this.style.animation.includes('letterHover')) {
                this.style.animation = '';
              }
            });
          });
        }, 2500); // After main letter animation completes
        
        // Stop observing once animation is triggered
        aboutUsObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.3, // Trigger when 30% of the section is visible
    rootMargin: '-50px 0px -100px 0px' // Add margin for better timing
  });
  
  // Start observing the About Us container
  aboutUsObserver.observe(aboutUsContainer);
  
  // Enhanced interaction effects
  const aboutUsImage = aboutUsContainer.querySelector('.aboutus-image');
  const aboutUsAward = aboutUsContainer.querySelector('.aboutus-award');
  const letters = aboutUsContainer.querySelectorAll('.letter');
  
  // Image magnetic effect
  if (aboutUsImage) {
    aboutUsImage.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      
      this.style.transform = `scale(1.05) translate(${x * 10}px, ${y * 10}px) rotate(${x * 3}deg)`;
    });
    
    aboutUsImage.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1) translate(0, 0) rotate(0deg)';
    });
  }
  
  // Award image parallax effect
  if (aboutUsAward) {
    aboutUsAward.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      
      this.style.transform = `scale(1.05) translate(${x * 15}px, ${y * 10}px) rotate(${-x * 2}deg)`;
    });
    
    aboutUsAward.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1) translate(0, 0) rotate(0deg)';
    });
  }
  
  // Staggered letter glow effect on container hover
  aboutUsContainer.addEventListener('mouseenter', function() {
    letters.forEach((letter, index) => {
      setTimeout(() => {
        letter.style.textShadow = '0 0 15px #f0d674, 0 2px 8px rgba(0,77,64,0.18)';
        letter.style.color = '#fff';
      }, index * 50);
    });
  });
  
  aboutUsContainer.addEventListener('mouseleave', function() {
    letters.forEach((letter) => {
      letter.style.textShadow = '0 2px 8px rgba(0,77,64,0.18)';
      letter.style.color = '#f0d674';
    });
  });
}

// Placeholder for future JS functionality. Currently, all graphics and layout are handled by HTML/CSS.

      document.getElementById('terms-link').onclick = function(e) {
        e.preventDefault();
        document.getElementById('terms-modal').style.display = 'block';
      };
      document.getElementById('close-terms').onclick = function() {
        document.getElementById('terms-modal').style.display = 'none';
      };
      window.onclick = function(event) {
        var modal = document.getElementById('terms-modal');
        if (event.target === modal) {
          modal.style.display = 'none';
        }
      };
      document.getElementById('privacy-link').onclick = function(e) {
        e.preventDefault();
        document.getElementById('privacy-modal').style.display = 'flex';
      };
      document.getElementById('close-privacy').onclick = function() {
        document.getElementById('privacy-modal').style.display = 'none';
      };
      window.onclick = function(event) {
        var modal = document.getElementById('privacy-modal');
        if (event.target === modal) {
          modal.style.display = 'none';
        }
      };
      // HIPAA Notice Modal
      document.getElementById('hipaa-link').onclick = function(e) {
        e.preventDefault();
        document.getElementById('hipaa-modal').style.display = 'block';
      };
      document.getElementById('close-hipaa').onclick = function() {
        document.getElementById('hipaa-modal').style.display = 'none';
      };
      window.onclick = function(event) {
        var modal = document.getElementById('hipaa-modal');
        if (event.target === modal) {
          modal.style.display = 'none';
        }
      };
      // Enhanced Mobile-Friendly Hamburger Menu
      var hamburgerMenu = document.getElementById('hamburger-menu');
      var dropdown = document.getElementById('hamburger-dropdown');
      var isMenuOpen = false;

      // Click handler for hamburger menu with modern animations
      hamburgerMenu.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        isMenuOpen = !isMenuOpen;
        
        // Toggle active class for hamburger animation
        hamburgerMenu.classList.toggle('active', isMenuOpen);
        
        if (isMenuOpen) {
          // Show dropdown with animation
          dropdown.style.display = 'block';
          setTimeout(() => {
            dropdown.classList.add('show');
          }, 10); // Small delay for display to take effect
        } else {
          // Hide dropdown with animation
          dropdown.classList.remove('show');
          setTimeout(() => {
            dropdown.style.display = 'none';
          }, 400); // Wait for animation to complete
        }
      };

      // Mobile-specific: Enhanced behavior with animations
      function updateMenuBehavior() {
        var isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
          // Remove hover events for mobile
          hamburgerMenu.onmouseenter = null;
          hamburgerMenu.onmouseleave = null;
          dropdown.onmouseleave = null;
        } else {
          // Enhanced desktop hover behavior with animations
          hamburgerMenu.onmouseenter = function() {
            if (!isMenuOpen) {
              dropdown.style.display = 'block';
              setTimeout(() => {
                dropdown.classList.add('show');
              }, 10);
            }
          };
          
          hamburgerMenu.onmouseleave = function() {
            if (!isMenuOpen) {
              setTimeout(function() {
                if (!dropdown.matches(':hover')) {
                  dropdown.classList.remove('show');
                  setTimeout(() => {
                    dropdown.style.display = 'none';
                  }, 400);
                }
              }, 150);
            }
          };
          
          dropdown.onmouseleave = function() {
            if (!isMenuOpen) {
              dropdown.classList.remove('show');
              setTimeout(() => {
                dropdown.style.display = 'none';
              }, 400);
            }
          };
        }
      }

      // Initialize and update on resize with animations
      updateMenuBehavior();
      window.addEventListener('resize', function() {
        updateMenuBehavior();
        if (window.innerWidth > 768) {
          isMenuOpen = false;
          dropdown.classList.remove('show');
          setTimeout(() => {
            dropdown.style.display = 'none';
          }, 400);
          hamburgerMenu.classList.remove('active');
        }
      });

      // Close menu when clicking outside with animations
      window.onclick = function(event) {
        if (event.target !== dropdown && event.target !== hamburgerMenu && !hamburgerMenu.contains(event.target)) {
          isMenuOpen = false;
          dropdown.classList.remove('show');
          hamburgerMenu.classList.remove('active');
          setTimeout(() => {
            dropdown.style.display = 'none';
          }, 400);
        }
      };

      // Enhanced menu link handlers with animations
      function createMenuLinkHandler(targetSelector, offset = -50) {
        return function(e) {
          e.preventDefault();
          e.stopPropagation();
          
          // Close menu with animation
          isMenuOpen = false;
          dropdown.classList.remove('show');
          hamburgerMenu.classList.remove('active');
          setTimeout(() => {
            dropdown.style.display = 'none';
          }, 400);
          
          // Smooth scroll to target
          var target = document.querySelector(targetSelector);
          if (target) {
            var targetPosition = target.getBoundingClientRect().top + window.pageYOffset + offset;
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        };
      }

      document.getElementById('aboutus-link').onclick = createMenuLinkHandler('.aboutus-tile-modern');
      document.getElementById('services-link').onclick = createMenuLinkHandler('#our-services-btn-top', -30);
      document.addEventListener('DOMContentLoaded', function() {
        var searchBtn = document.querySelector('.search-btn');
        var searchInput = document.querySelector('.search-input');
        if (searchBtn && searchInput) {
          searchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            var query = searchInput.value.trim();
            if (query) {
              window.open('https://www.google.com/search?q=' + encodeURIComponent(query), '_blank');
            }
          });
          searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
              searchBtn.click();
            }
          });
        }
      });
      document.addEventListener('DOMContentLoaded', function() {
        var englishBtn = document.getElementById('toggle-english');
        var spanishBtn = document.getElementById('toggle-spanish');
        var aboutUsPara = document.querySelector('.aboutus-content-modern p');
        var originalAboutUs = aboutUsPara ? aboutUsPara.textContent : '';
        var translations = {
          'en': {
            'AboutUsPara': originalAboutUs
          },
          'es': {
            'AboutUsPara': 'El Dr. Uday es un médico galardonado y licenciado, conocido por su enfoque compasivo y personalizado en la atención médica. Con más de 20 años de experiencia, se dedica al bienestar del paciente y garantiza que cada individuo reciba apoyo médico experto y atento. Reconocido como uno de los médicos excepcionales de Georgia, el Dr. Uday ha servido a comunidades de todo el estado con distinción.'
          }
        };
        function setLanguage(lang) {
          // About Us paragraph translation
          if (aboutUsPara) {
            aboutUsPara.textContent = translations[lang]['AboutUsPara'];
          }
          
          // Translate all text content
          Object.keys(window.translations[lang]).forEach(function(key) {
            var elements = document.querySelectorAll('*');
            elements.forEach(function(el) {
              // Handle text content
              if (el.childNodes.length === 1 && el.childNodes[0].nodeType === 3) {
                var text = el.textContent.trim();
                if (text === key || 
                    (window.translations['es'][key] && text === window.translations['es'][key]) || 
                    (window.translations['en'][key] && text === window.translations['en'][key])) {
                  el.textContent = window.translations[lang][key];
                }
              }
              
              // Handle placeholder text
              if (el.placeholder && (el.placeholder === key || 
                  (window.translations['es'][key] && el.placeholder === window.translations['es'][key]) || 
                  (window.translations['en'][key] && el.placeholder === window.translations['en'][key]))) {
                el.placeholder = window.translations[lang][key];
              }
              
              // Handle button text specifically
              if (el.tagName === 'BUTTON' || el.classList.contains('cta')) {
                var text = el.textContent.trim();
                if (text === key || 
                    (window.translations['es'][key] && text === window.translations['es'][key]) || 
                    (window.translations['en'][key] && text === window.translations['en'][key])) {
                  el.textContent = window.translations[lang][key];
                }
              }
              
              // Handle span text (for cloud quotes)
              if (el.tagName === 'SPAN') {
                var text = el.textContent.trim();
                if (text === key || 
                    (window.translations['es'][key] && text === window.translations['es'][key]) || 
                    (window.translations['en'][key] && text === window.translations['en'][key])) {
                  el.textContent = window.translations[lang][key];
                }
              }
              
              // Handle h2, h3, p tags
              if (el.tagName === 'H2' || el.tagName === 'H3' || el.tagName === 'P') {
                var text = el.textContent.trim();
                if (text === key || 
                    (window.translations['es'][key] && text === window.translations['es'][key]) || 
                    (window.translations['en'][key] && text === window.translations['en'][key])) {
                  el.textContent = window.translations[lang][key];
                }
              }
              
              // Handle links
              if (el.tagName === 'A') {
                var text = el.textContent.trim();
                if (text === key || 
                    (window.translations['es'][key] && text === window.translations['es'][key]) || 
                    (window.translations['en'][key] && text === window.translations['en'][key])) {
                  el.textContent = window.translations[lang][key];
                }
              }
            });
          });
          
          // Update button text for toggle
          englishBtn.textContent = window.translations[lang]['English'] || 'English';
          spanishBtn.textContent = window.translations[lang]['Spanish'] || 'Spanish';
        }
        // Store translations globally for other elements
        window.translations = {
          'en': {
            'Weight Loss Management': 'Weight Loss Management',
            'Personalized plans and support to help you achieve and maintain a healthy weight.': 'Personalized plans and support to help you achieve and maintain a healthy weight.',
            'Chronic Disease Management': 'Chronic Disease Management',
            'Comprehensive care for chronic conditions to improve your quality of life.': 'Comprehensive care for chronic conditions to improve your quality of life.',
            'Mental Health': 'Mental Health',
            'Compassionate support and resources for your mental well-being.': 'Compassionate support and resources for your mental well-being.',
            'Preventative Health Care': 'Preventative Health Care',
            'Proactive screenings and guidance to keep you healthy and prevent illness.': 'Proactive screenings and guidance to keep you healthy and prevent illness.',
            'Telehealth Appointments': 'Telehealth Appointments',
            'Convenient virtual consultations from the comfort of your home.': 'Convenient virtual consultations from the comfort of your home.',
            'About Us': 'About Us',
            'Schedule Your Appointment': 'Schedule Your Appointment',
            'Search': 'Search',
            'Our Services': 'Our Services',
            'Contact Us': 'Contact Us',
            'Hours and Timing': 'Hours and Timing',
            'Patient Portal': 'Patient Portal',
            'Terms and Conditions': 'Terms and Conditions',
            'Privacy Policy': 'Privacy Policy',
            'HIPAA Notice': 'HIPAA Notice',
            'English': 'English',
            'Spanish': 'Spanish',
            'Enriching your Health & Wellness': 'Enriching your Health & Wellness',
            'Non Rushed Appointments': 'Non Rushed Appointments',
            'Same Day Urgent Appointments': 'Same Day Urgent Appointments',
            'Late and Some Weekend Appointments': 'Late and Some Weekend Appointments',
            'New Patient': 'New Patient',
            'Existing Patient': 'Existing Patient',
            'Dr. Uday K Tata, MD': 'Dr. Uday K Tata, MD',
            'Internal Medicine': 'Internal Medicine',
            'Board-certified': 'Board-certified',
            'Hours and Timings: 08:30 AM - 04:30 PM': 'Hours and Timings: 08:30 AM - 04:30 PM',
            '2138 Scenic Hwy N Suite A': '2138 Scenic Hwy N Suite A',
            'Snellville, GA 30078': 'Snellville, GA 30078',
            '© 2025 LumenMed LLC. All rights reserved.': '© 2025 LumenMed LLC. All rights reserved.',
            'Website Design by: Texas To Success Inc, All Rights Reserved': 'Website Design by: Texas To Success Inc, All Rights Reserved'
          },
          'es': {
            'Weight Loss Management': 'Gestión de Pérdida de Peso',
            'Personalized plans and support to help you achieve and maintain a healthy weight.': 'Planes personalizados y apoyo para ayudarte a lograr y mantener un peso saludable.',
            'Chronic Disease Management': 'Gestión de Enfermedades Crónicas',
            'Comprehensive care for chronic conditions to improve your quality of life.': 'Atención integral para enfermedades crónicas para mejorar tu calidad de vida.',
            'Mental Health': 'Salud Mental',
            'Compassionate support and resources for your mental well-being.': 'Apoyo compasivo y recursos para tu bienestar mental.',
            'Preventative Health Care': 'Atención Preventiva de la Salud',
            'Proactive screenings and guidance to keep you healthy and prevent illness.': 'Exámenes proactivos y orientación para mantenerte saludable y prevenir enfermedades.',
            'Telehealth Appointments': 'Citas de Telesalud',
            'Convenient virtual consultations from the comfort of your home.': 'Consultas virtuales convenientes desde la comodidad de tu hogar.',
            'About Us': 'Sobre Nosotros',
            'Schedule Your Appointment': 'Programa tu Cita',
            'Search': 'Buscar',
            'Our Services': 'Nuestros Servicios',
            'Contact Us': 'Contáctanos',
            'Hours and Timing': 'Horario y Tiempo',
            'Patient Portal': 'Portal del Paciente',
            'Terms and Conditions': 'Términos y Condiciones',
            'Privacy Policy': 'Política de Privacidad',
            'HIPAA Notice': 'Aviso HIPAA',
            'English': 'Inglés',
            'Spanish': 'Español',
            'Enriching your Health & Wellness': 'Enriqueciendo tu Salud y Bienestar',
            'Non Rushed Appointments': 'Citas Sin Prisa',
            'Same Day Urgent Appointments': 'Citas Urgentes el Mismo Día',
            'Late and Some Weekend Appointments': 'Citas Tardías y Algunos Fines de Semana',
            'New Patient': 'Paciente Nuevo',
            'Existing Patient': 'Paciente Existente',
            'Dr. Uday K Tata, MD': 'Dr. Uday K Tata, MD',
            'Internal Medicine': 'Medicina Interna',
            'Board-certified': 'Certificado por la Junta',
            'Hours and Timings: 08:30 AM - 04:30 PM': 'Horarios: 08:30 AM - 04:30 PM',
            '2138 Scenic Hwy N Suite A': '2138 Scenic Hwy N Suite A',
            'Snellville, GA 30078': 'Snellville, GA 30078',
            '© 2025 LumenMed LLC. All rights reserved.': '© 2025 LumenMed LLC. Todos los derechos reservados.',
            'Website Design by: Texas To Success Inc, All Rights Reserved': 'Diseño Web por: Texas To Success Inc, Todos los Derechos Reservados'
          }
        };
        englishBtn.addEventListener('click', function() {
          setLanguage('en');
          englishBtn.className = 'toggle-btn-active';
          englishBtn.style.background = '#fff';
          englishBtn.style.color = '#7c3aed';
          spanishBtn.className = 'toggle-btn-inactive';
          spanishBtn.style.background = 'transparent';
          spanishBtn.style.color = '#fff';
        });
        spanishBtn.addEventListener('click', function() {
          setLanguage('es');
          spanishBtn.className = 'toggle-btn-active';
          spanishBtn.style.background = '#fff';
          spanishBtn.style.color = '#7c3aed';
          englishBtn.className = 'toggle-btn-inactive';
          englishBtn.style.background = 'transparent';
          englishBtn.style.color = '#fff';
        });

        // Handle Schedule Your Appointment disclaimer
        document.getElementById('schedule-appointment-btn').addEventListener('click', function(e) {
          e.preventDefault();
          
          const confirmed = confirm('You are now rerouting to external page which handles patient scheduling. Please return back if you do not wish to proceed.');
          
          if (confirmed) {
            window.open('https://patientkiosk.omnimd.com/#/check-in/U2FsdGVkX1%2BmmqUcoBrMUK6jEqUWOdnipb3OgUfl%2FYE%3D', '_blank');
          }
        });

        // Handle Patient Portal disclaimer
        document.getElementById('patient-portal-btn').addEventListener('click', function(e) {
          e.preventDefault();
          
          const confirmed = confirm('You are now rerouting to patient portal. Please return back if you do not wish to proceed.');
          
          if (confirmed) {
            window.open('https://patientkiosk.omnimd.com/#/check-in/U2FsdGVkX1%2BmmqUcoBrMUK6jEqUWOdnipb3OgUfl%2FYE%3D', '_blank');
          }
        });

        // Handle hamburger Patient Portal link - same functionality as main button
        document.getElementById('hamburger-portal-link').addEventListener('click', function(e) {
          e.preventDefault();
          
          // Close the hamburger dropdown
          document.getElementById('hamburger-dropdown').style.display = 'none';
          
          const confirmed = confirm('You are now rerouting to patient portal. Please return back if you do not wish to proceed.');
          
          if (confirmed) {
            window.open('https://patientkiosk.omnimd.com/#/check-in/U2FsdGVkX1%2BmmqUcoBrMUK6jEqUWOdnipb3OgUfl%2FYE%3D', '_blank');
          }
        });

        // Handle hamburger Hours and Timing link - close menu and scroll to hours
        document.getElementById('hamburger-hours-link').addEventListener('click', function(e) {
          // Close the hamburger dropdown
          document.getElementById('hamburger-dropdown').style.display = 'none';
          
          // Let the default anchor behavior handle the scrolling to #hours
        });

        // Handle hamburger Contact Us link - close menu, scroll to QR code and highlight it
        document.getElementById('hamburger-contact-link').addEventListener('click', function(e) {
          // Close the hamburger dropdown
          document.getElementById('hamburger-dropdown').style.display = 'none';
          
          // Scroll to QR code and highlight it
          setTimeout(function() {
            const qrContainer = document.getElementById('contact-qr');
            const qrImg = qrContainer.querySelector('img');
            
            // Add highlight effect
            qrImg.style.boxShadow = '0 0 20px 5px #2e6edb, 0 0 30px 10px rgba(46, 110, 219, 0.3)';
            qrImg.style.transform = 'scale(1.1)';
            qrImg.style.transition = 'all 0.3s ease';
            
            // Remove highlight after 3 seconds
            setTimeout(function() {
              qrImg.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
              qrImg.style.transform = 'scale(1)';
            }, 3000);
          }, 300);
        });
      });

// AI Testimonials Hub - Robotic Interface
function initTestimonialsCarousel() {
  const showBtn = document.getElementById('show-testimonials');
  const summaryBtn = document.getElementById('ai-summary');
  const testimonialsGrid = document.getElementById('testimonials-grid');
  const summaryPanel = document.getElementById('ai-summary-panel');
  const expandButtons = document.querySelectorAll('.expand-btn');
  
  if (!showBtn || !summaryBtn || !testimonialsGrid || !summaryPanel) return;
  
  // AI Voice Synthesis for robotic feel
  function speakAI(text) {
    if ('speechSynthesis' in window) {
      // Wait for voices to load
      if (speechSynthesis.getVoices().length === 0) {
        speechSynthesis.addEventListener('voiceschanged', () => speakAI(text), { once: true });
        return;
      }
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 0.8;
      
      // Find female US English voice
      const voices = speechSynthesis.getVoices();
      const femaleVoice = voices.find(voice => 
        (voice.name.toLowerCase().includes('female') ||
         voice.name.toLowerCase().includes('samantha') ||
         voice.name.toLowerCase().includes('susan') ||
         voice.name.toLowerCase().includes('karen') ||
         voice.name.toLowerCase().includes('moira') ||
         voice.name.toLowerCase().includes('alex') ||
         voice.name.toLowerCase().includes('allison') ||
         voice.name.toLowerCase().includes('ava') ||
         voice.name.toLowerCase().includes('serena') ||
         voice.name.toLowerCase().includes('zira')) &&
        voice.lang.startsWith('en')
      );
      
      if (femaleVoice) {
        utterance.voice = femaleVoice;
      } else {
        // Fallback: try to find any English female voice
        const englishVoices = voices.filter(voice => voice.lang.startsWith('en'));
        utterance.voice = englishVoices[Math.floor(englishVoices.length / 2)] || voices[0];
      }
      
      speechSynthesis.speak(utterance);
    }
  }
  
  // Show testimonials with AI animation
  showBtn.addEventListener('click', function() {
    const isActive = testimonialsGrid.classList.contains('active');
    
    if (!isActive) {
      // Activate grid with AI effect
      testimonialsGrid.classList.add('active');
      showBtn.innerHTML = '<span class="btn-icon">🔍</span><span class="btn-text">Hide Reviews</span><div class="btn-glow"></div>';
      
      // Add scanning effect
      setTimeout(() => {
        animateTestimonialCards();
      }, 500);
      
      // AI voice feedback
      speakAI('Patient reviews analyzed successfully');
      
      // Close summary panel if open
      summaryPanel.classList.remove('active');
      summaryBtn.innerHTML = '<span class="btn-icon">📊</span><span class="btn-text">AI Summary</span><div class="btn-glow"></div>';
      
    } else {
      // Deactivate grid
      testimonialsGrid.classList.remove('active');
      showBtn.innerHTML = '<span class="btn-icon">🤖</span><span class="btn-text">Analyze Reviews</span><div class="btn-glow"></div>';
      
      // Close all expanded cards
      document.querySelectorAll('.testimonial-mini-card.expanded').forEach(card => {
        card.classList.remove('expanded');
        card.querySelector('.full-testimonial').classList.remove('active');
        card.querySelector('.expand-btn').classList.remove('active');
        card.querySelector('.expand-btn').textContent = '+';
      });
    }
  });
  
  // Show AI summary
  summaryBtn.addEventListener('click', function() {
    const isActive = summaryPanel.classList.contains('active');
    
    if (!isActive) {
      // Activate summary with AI effect
      summaryPanel.classList.add('active');
      summaryBtn.innerHTML = '<span class="btn-icon">🧠</span><span class="btn-text">Hide Summary</span><div class="btn-glow"></div>';
      
      // AI voice feedback
      speakAI('AI analysis complete. All patients rate LumenMed five stars.');
      
      // Close testimonials grid if open
      testimonialsGrid.classList.remove('active');
      showBtn.innerHTML = '<span class="btn-icon">🤖</span><span class="btn-text">Analyze Reviews</span><div class="btn-glow"></div>';
      
    } else {
      // Deactivate summary
      summaryPanel.classList.remove('active');
      summaryBtn.innerHTML = '<span class="btn-icon">📊</span><span class="btn-text">AI Summary</span><div class="btn-glow"></div>';
    }
  });
  
  // Handle individual card expansion
  expandButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.stopPropagation();
      
      const card = this.closest('.testimonial-mini-card');
      const fullTestimonial = card.querySelector('.full-testimonial');
      const isExpanded = card.classList.contains('expanded');
      
      if (!isExpanded) {
        // Expand card with AI effect
        card.classList.add('expanded');
        fullTestimonial.classList.add('active');
        this.classList.add('active');
        this.textContent = '−';
        
        // Add robotic expansion sound effect
        playAISound();
        
        // Close other expanded cards
        expandButtons.forEach(otherBtn => {
          const otherCard = otherBtn.closest('.testimonial-mini-card');
          if (otherCard !== card && otherCard.classList.contains('expanded')) {
            otherCard.classList.remove('expanded');
            otherCard.querySelector('.full-testimonial').classList.remove('active');
            otherBtn.classList.remove('active');
            otherBtn.textContent = '+';
          }
        });
        
      } else {
        // Collapse card
        card.classList.remove('expanded');
        fullTestimonial.classList.remove('active');
        this.classList.remove('active');
        this.textContent = '+';
      }
    });
  });
}

// Animate testimonial cards with stagger
function animateTestimonialCards() {
  const cards = document.querySelectorAll('.testimonial-mini-card');
  
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.style.transform = 'translateY(0) scale(1)';
      card.style.opacity = '1';
      
      // Add robotic scanning effect
      card.style.boxShadow = '0 0 30px rgba(0, 255, 255, 0.5)';
      setTimeout(() => {
        card.style.boxShadow = '';
      }, 300);
      
    }, index * 100);
  });
}

// Play AI sound effect
function playAISound() {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
  
  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.1);
}

// Initialize AI testimonials observer
function initTestimonialsObserver() {
  const aiHeader = document.querySelector('.ai-header');
  
  if (aiHeader) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Trigger AI header animation
          entry.target.style.animationPlayState = 'running';
          
          // Add robotic startup sound
          setTimeout(() => {
            playAISound();
          }, 500);
        }
      });
    }, { threshold: 0.3 });
    
    observer.observe(aiHeader);
  }
}

// Add keyboard controls for AI interface
function initAIKeyboardControls() {
  document.addEventListener('keydown', function(e) {
    // Press 'A' for Analyze Reviews
    if (e.key === 'a' || e.key === 'A') {
      const showBtn = document.getElementById('show-testimonials');
      if (showBtn) showBtn.click();
    }
    
    // Press 'S' for AI Summary
    if (e.key === 's' || e.key === 'S') {
      const summaryBtn = document.getElementById('ai-summary');
      if (summaryBtn) summaryBtn.click();
    }
    
    // Press 'Escape' to close all panels
    if (e.key === 'Escape') {
      const testimonialsGrid = document.getElementById('testimonials-grid');
      const summaryPanel = document.getElementById('ai-summary-panel');
      
      if (testimonialsGrid && testimonialsGrid.classList.contains('active')) {
        document.getElementById('show-testimonials').click();
      }
      
      if (summaryPanel && summaryPanel.classList.contains('active')) {
        document.getElementById('ai-summary').click();
      }
    }
  });
}

// Modern Slideshow Functionality
function initializeSlideshow() {
  const slides = document.querySelectorAll('.slide');
  const indicators = document.querySelectorAll('.indicator');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const slideTrack = document.querySelector('.slide-track');
  
  let currentSlide = 0;
  let slideInterval;
  
  function updateSlideshow() {
    // Remove active class from all slides and indicators
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Add active class to current slide and indicator
    if (slides[currentSlide]) {
      slides[currentSlide].classList.add('active');
    }
    if (indicators[currentSlide]) {
      indicators[currentSlide].classList.add('active');
    }
    
    // Move the slide track
    if (slideTrack) {
      slideTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
  }
  
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlideshow();
  }
  
  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlideshow();
  }
  
  function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateSlideshow();
  }
  
  function startAutoPlay() {
    slideInterval = setInterval(nextSlide, 5000); // Auto advance every 5 seconds
  }
  
  function stopAutoPlay() {
    if (slideInterval) {
      clearInterval(slideInterval);
    }
  }
  
  // Event listeners
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      stopAutoPlay();
      nextSlide();
      startAutoPlay();
    });
  }
  
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      stopAutoPlay();
      prevSlide();
      startAutoPlay();
    });
  }
  
  // Indicator event listeners
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      stopAutoPlay();
      goToSlide(index);
      startAutoPlay();
    });
  });
  
  // Pause auto-play on hover
  const slideshowContainer = document.querySelector('.slideshow-container');
  if (slideshowContainer) {
    slideshowContainer.addEventListener('mouseenter', stopAutoPlay);
    slideshowContainer.addEventListener('mouseleave', startAutoPlay);
  }
  
  // Initialize slideshow
  updateSlideshow();
  startAutoPlay();
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      stopAutoPlay();
      prevSlide();
      startAutoPlay();
    } else if (e.key === 'ArrowRight') {
      stopAutoPlay();
      nextSlide();
      startAutoPlay();
    }
  });
}

// Initialize slideshow when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Add slideshow initialization to existing DOMContentLoaded
  setTimeout(() => {
    initializeSlideshow();
  }, 4000); // Initialize after loading screen
});