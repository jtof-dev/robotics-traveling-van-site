// Get the directory where THIS script is located
const scriptDir = new URL('.', import.meta.url).pathname;

// ONE single DOMContentLoaded block for all setup logic
document.addEventListener("DOMContentLoaded", () => {
  
  /* --- 1. THEME TOGGLE LOGIC --- */
  const toggleBtn = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  const htmlElement = document.documentElement;

  const ICON_PATHS = {
    dark: new URL('../assets/icons/darkMode.svg', import.meta.url).href,
    light: new URL('../assets/icons/lightMode.svg', import.meta.url).href
  };

  const savedTheme = localStorage.getItem("theme") || "dark";
  setTheme(savedTheme);

  if (toggleBtn && themeIcon) {
    toggleBtn.addEventListener("click", () => {
      if (themeIcon.classList.contains("spinning")) return;
      themeIcon.classList.add("spinning");

      const currentTheme = htmlElement.getAttribute("data-bs-theme");
      const newTheme = currentTheme === "light" ? "dark" : "light";

      setTimeout(() => {
        setTheme(newTheme, false);
      }, 250);

      setTimeout(() => {
        themeIcon.classList.remove("spinning");
        localStorage.setItem("theme", newTheme);
      }, 500);
    });
  }

  function setTheme(theme, save = true) {
    htmlElement.setAttribute("data-bs-theme", theme);
    if (save) {
      localStorage.setItem("theme", theme);
    }
    if (themeIcon) {
      themeIcon.src = ICON_PATHS[theme];
    }
  }

  /* --- 2. VIDEO SETUP --- */
  const videoPlayer = document.getElementById('promoVideo');
  if (videoPlayer) {
    videoPlayer.volume = 0.5;
  }

  /* --- 3. DYNAMIC POSTER MODAL LOGIC --- */
  const posterModal = document.getElementById('posterModal');
  const panzoomImage = document.getElementById('panzoom-image');
  const modalTitle = document.getElementById('posterModalLabel'); // Added this!
  
  if (posterModal && panzoomImage) {
    posterModal.addEventListener('show.bs.modal', event => {
      const button = event.relatedTarget;
      const imgSrc = button.getAttribute('data-image-src');
      if (imgSrc) {
        panzoomImage.src = imgSrc;
      }
    });
  }

  /* --- 4. PAN AND ZOOM LOGIC --- */
  const panzoomContainer = document.getElementById('panzoom-container');
  const zoomInBtn = document.getElementById('zoomInBtn');
  const zoomOutBtn = document.getElementById('zoomOutBtn');
  const resetZoomBtn = document.getElementById('resetZoomBtn');
  
  if (panzoomImage && panzoomContainer) {
    let scale = 1;
    let isDragging = false;
    let startX, startY;
    let translateX = 0, translateY = 0;

    panzoomContainer.style.touchAction = 'none';

    function updateTransform(smooth = true) {
      panzoomImage.style.transition = smooth ? 'transform 0.1s ease-out' : 'none';
      panzoomImage.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    }

    zoomInBtn?.addEventListener('click', () => {
      scale = Math.min(scale + 0.5, 5);
      updateTransform(true);
    });

    zoomOutBtn?.addEventListener('click', () => {
      scale = Math.max(scale - 0.5, 0.5);
      updateTransform(true);
    });

    resetZoomBtn?.addEventListener('click', () => {
      scale = 1;
      translateX = 0;
      translateY = 0;
      updateTransform(true);
    });

    panzoomContainer.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.clientX - translateX;
      startY = e.clientY - translateY;
      panzoomContainer.style.cursor = 'grabbing';
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
      if (panzoomContainer) panzoomContainer.style.cursor = 'grab';
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      translateX = e.clientX - startX;
      translateY = e.clientY - startY;
      updateTransform(false);
    });

    panzoomContainer.addEventListener('wheel', (e) => {
      e.preventDefault();
      scale = e.deltaY < 0 ? Math.min(scale + 0.2, 5) : Math.max(scale - 0.2, 0.5);
      updateTransform(true);
    }, { passive: false });

    // Touch logic for mobile pinch/zoom
    let initialPinchDistance = null;
    let initialScale = 1;

    panzoomContainer.addEventListener('touchstart', (e) => {
      e.preventDefault(); 
      if (e.touches.length === 1) {
        isDragging = true;
        startX = e.touches[0].clientX - translateX;
        startY = e.touches[0].clientY - translateY;
      } else if (e.touches.length === 2) {
        isDragging = false;
        initialPinchDistance = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        initialScale = scale;
      }
    }, { passive: false });

    window.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1 && isDragging) {
        if (e.target === panzoomContainer || panzoomContainer.contains(e.target)) {
          e.preventDefault();
        }
        translateX = e.touches[0].clientX - startX;
        translateY = e.touches[0].clientY - startY;
        updateTransform(false);
      } else if (e.touches.length === 2 && initialPinchDistance !== null) {
        if (e.target === panzoomContainer || panzoomContainer.contains(e.target)) {
          e.preventDefault();
        }
        const currentDistance = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const distanceRatio = currentDistance / initialPinchDistance;
        scale = Math.min(Math.max(initialScale * distanceRatio, 0.5), 5);
        updateTransform(false);
      }
    }, { passive: false });

    window.addEventListener('touchend', (e) => {
      if (e.touches.length < 2) {
        initialPinchDistance = null;
      }
      if (e.touches.length === 0) {
        isDragging = false;
      } else if (e.touches.length === 1) {
        startX = e.touches[0].clientX - translateX;
        startY = e.touches[0].clientY - translateY;
        isDragging = true;
      }
    });

    // Reset zoom when modal is closed
    if (posterModal) {
      posterModal.addEventListener('hidden.bs.modal', () => {
        scale = 1;
        translateX = 0;
        translateY = 0;
        updateTransform(false);
      });
    }
  }

  /* --- 5. SCROLL TO TOP BUTTON --- */
  const scrollToTopBtn = document.createElement("button");
  scrollToTopBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-up" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/></svg>';
  scrollToTopBtn.className = "scroll-to-top-btn";
  scrollToTopBtn.setAttribute("aria-label", "Scroll to top");
  document.body.appendChild(scrollToTopBtn);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 150) {
      scrollToTopBtn.classList.add("show");
    } else {
      scrollToTopBtn.classList.remove("show");
    }
  });

  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

});