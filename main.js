// Placeholder for future JS functionality. Currently, all graphics and layout are handled by HTML/CSS.
// Modal open/close logic
      document.addEventListener('DOMContentLoaded', function() {
        var modal = document.getElementById('appointment-modal');
        var openBtn = document.getElementById('open-modal');
        var closeBtn = document.getElementById('close-modal');
        openBtn.onclick = function(e) {
          e.preventDefault();
          modal.style.display = 'block';
        };
        closeBtn.onclick = function() {
          modal.style.display = 'none';
        };
        window.onclick = function(event) {
          if (event.target == modal) {
            modal.style.display = 'none';
          }
        };
      });
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
      var hamburgerMenu = document.getElementById('hamburger-menu');
      var dropdown = document.getElementById('hamburger-dropdown');

      hamburgerMenu.onclick = function() {
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
      };
      hamburgerMenu.onmouseenter = function() {
        dropdown.style.display = 'block';
      };
      hamburgerMenu.onmouseleave = function() {
        setTimeout(function() {
          if (!dropdown.matches(':hover')) {
            dropdown.style.display = 'none';
          }
        }, 150);
      };
      dropdown.onmouseleave = function() {
        dropdown.style.display = 'none';
      };
      window.onclick = function(event) {
        if (event.target !== dropdown && event.target !== hamburgerMenu && !hamburgerMenu.contains(event.target)) {
          dropdown.style.display = 'none';
        }
      };
      document.getElementById('aboutus-link').onclick = function(e) {
        e.preventDefault();
        var aboutTile = document.querySelector('.aboutus-tile-modern');
        if (aboutTile) {
          aboutTile.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        document.getElementById('hamburger-dropdown').style.display = 'none';
      };
      document.getElementById('services-link').onclick = function(e) {
        e.preventDefault();
        var servicesTile = document.getElementById('our-services-btn-top');
        if (servicesTile) {
          servicesTile.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        document.getElementById('hamburger-dropdown').style.display = 'none';
      };
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
          Object.keys(window.translations[lang]).forEach(function(key) {
            var elements = document.querySelectorAll('*');
            elements.forEach(function(el) {
              if (el.childNodes.length === 1 && el.childNodes[0].nodeType === 3 && (el.textContent.trim() === key || el.textContent.trim() === window.translations['es'][key] || el.textContent.trim() === window.translations['en'][key])) {
                el.textContent = window.translations[lang][key];
              }
              if (el.placeholder === key || el.placeholder === window.translations['es'][key] || el.placeholder === window.translations['en'][key]) {
                el.placeholder = window.translations[lang][key];
              }
            });
          });
          // Update button text
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
            'English': 'English',
            'Spanish': 'Spanish'
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
            'Schedule Your Appointment': 'Programa tu cita',
            'Search': 'Buscar',
            'Our Services': 'Nuestros Servicios',
            'Contact Us': 'Contáctanos',
            'Hours and Timing': 'Horario y Tiempo',
            'Patient Portal': 'Portal del Paciente',
            'Terms and Conditions': 'Términos y Condiciones',
            'Privacy Policy': 'Política de Privacidad',
            'English': 'Inglés',
            'Spanish': 'Español'
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
            window.open('https://saas.agastha.com/AGPortal/servlet/AGSchedulerServlet?_qryStr=6stnpsvv8pU]u8=U8kP6z87mv8%3Ep8]nsp[us78=g[6sur]tiZ5=HEDG[]rrnOir8=[yoU8kS]ny8tn=i8o', '_blank');
          }
        });

        // Handle Patient Portal disclaimer
        document.getElementById('patient-portal-btn').addEventListener('click', function(e) {
          e.preventDefault();
          
          const confirmed = confirm('You are now rerouting to patient portal. Please return back if you do not wish to proceed.');
          
          if (confirmed) {
            window.open('https://saas.agastha.com/onlineHP/jsp/portal.jsp?MTQ1Mg==', '_blank');
          }
        });

        // Handle hamburger Patient Portal link - same functionality as main button
        document.getElementById('hamburger-portal-link').addEventListener('click', function(e) {
          e.preventDefault();
          
          // Close the hamburger dropdown
          document.getElementById('hamburger-dropdown').style.display = 'none';
          
          const confirmed = confirm('You are now rerouting to patient portal. Please return back if you do not wish to proceed.');
          
          if (confirmed) {
            window.open('https://saas.agastha.com/onlineHP/jsp/portal.jsp?MTQ1Mg==', '_blank');
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