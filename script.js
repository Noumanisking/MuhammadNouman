// Particles.js Configuration
document.addEventListener("DOMContentLoaded", () => {
  // Initialize particles.js
  window.particlesJS("particles-js", {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: ["#0fe0ff", "#ff00ff", "#00ff9d"],
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#000000",
        },
        polygon: {
          nb_sides: 5,
        },
      },
      opacity: {
        value: 0.5,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.1,
          sync: false,
        },
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: true,
          speed: 2,
          size_min: 0.1,
          sync: false,
        },
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#0fe0ff",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "grab",
        },
        onclick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 1,
          },
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 3,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
        push: {
          particles_nb: 4,
        },
        remove: {
          particles_nb: 2,
        },
      },
    },
    retina_detect: true,
  })

  // Navbar scroll effect
  const navbar = document.querySelector(".navbar")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })

  // Mobile menu toggle
  const menuToggle = document.querySelector(".menu-toggle")
  const navLinks = document.querySelector(".nav-links")

  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active")
    navLinks.classList.toggle("active")
  })

  // Close mobile menu when clicking on a link
  const navLink = document.querySelectorAll(".nav-link")
  navLink.forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active")
      navLinks.classList.remove("active")
    })
  })

  // Animate skill progress bars when in viewport
  const progressBars = document.querySelectorAll(".progress-bar")

  function animateProgressBars() {
    progressBars.forEach((bar) => {
      const position = bar.getBoundingClientRect().top
      const screenPosition = window.innerHeight / 1.3

      if (position < screenPosition) {
        const width = bar.getAttribute("data-width")
        bar.style.width = width
      }
    })
  }

  window.addEventListener("scroll", animateProgressBars)
  animateProgressBars() // Initial check

  // Reviews slider
  const reviewSlides = document.querySelectorAll(".review-slide")
  const prevBtn = document.querySelector(".review-nav.prev")
  const nextBtn = document.querySelector(".review-nav.next")
  let currentSlide = 0
  let slideInterval

  // Initialize the slider
  function initSlider() {
    if (reviewSlides.length > 0) {
      reviewSlides[0].classList.add("active")
      if (reviewSlides.length > 1) {
        reviewSlides[1].classList.add("next")
      }
      if (reviewSlides.length > 2) {
        reviewSlides[reviewSlides.length - 1].classList.add("prev")
      }

      startSlideInterval()
    }
  }

  function startSlideInterval() {
    slideInterval = setInterval(() => {
      nextSlide()
    }, 5000)
  }

  function resetSlideInterval() {
    clearInterval(slideInterval)
    startSlideInterval()
  }

  function updateSlides() {
    reviewSlides.forEach((slide, index) => {
      slide.classList.remove("active", "prev", "next")

      if (index === currentSlide) {
        slide.classList.add("active")
      } else if (index === getNextSlideIndex()) {
        slide.classList.add("next")
      } else if (index === getPrevSlideIndex()) {
        slide.classList.add("prev")
      }
    })
  }

  function getNextSlideIndex() {
    return (currentSlide + 1) % reviewSlides.length
  }

  function getPrevSlideIndex() {
    return (currentSlide - 1 + reviewSlides.length) % reviewSlides.length
  }

  function nextSlide() {
    currentSlide = getNextSlideIndex()
    updateSlides()
  }

  function prevSlide() {
    currentSlide = getPrevSlideIndex()
    updateSlides()
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => {
      prevSlide()
      resetSlideInterval()
    })

    nextBtn.addEventListener("click", () => {
      nextSlide()
      resetSlideInterval()
    })
  }

  initSlider()

  // Portfolio filter
  const filterBtns = document.querySelectorAll(".filter-btn")
  const portfolioItems = document.querySelectorAll(".portfolio-item")

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      filterBtns.forEach((filterBtn) => {
        filterBtn.classList.remove("active")
      })

      // Add active class to clicked button
      btn.classList.add("active")

      const filterValue = btn.getAttribute("data-filter")

      portfolioItems.forEach((item) => {
        if (filterValue === "all" || item.getAttribute("data-category") === filterValue) {
          item.style.display = "block"
          setTimeout(() => {
            item.style.opacity = "1"
            item.style.transform = "scale(1)"
          }, 100)
        } else {
          item.style.opacity = "0"
          item.style.transform = "scale(0.8)"
          setTimeout(() => {
            item.style.display = "none"
          }, 300)
        }
      })
    })
  })

  // Contact form submission
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const message = document.getElementById("message").value

      // Here you would typically send the data to a server
      // For this example, we'll just log it and show a success message
      console.log("Form submitted:", { name, email, message })

      // Create a mailto link to send the message via email
      const mailtoLink = `mailto:noumanisking87@gmail.com?subject=Portfolio Contact from ${name}&body=${message}%0A%0AFrom: ${name}%0AEmail: ${email}`
      window.location.href = mailtoLink

      // Reset the form
      contactForm.reset()

      // Show success message
      alert("Thank you for your message! I will get back to you soon.")
    })
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        })
      }
    })
  })

  // Animate elements when they come into view
  const animateElements = document.querySelectorAll(".skill-box, .portfolio-item, .contact-item")

  function checkElementsInView() {
    animateElements.forEach((element) => {
      const position = element.getBoundingClientRect().top
      const screenPosition = window.innerHeight / 1.2

      if (position < screenPosition) {
        element.classList.add("fade-in")
      }
    })
  }

  window.addEventListener("scroll", checkElementsInView)
  checkElementsInView() // Initial check
})
