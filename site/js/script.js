// Get the directory where THIS script is located
const scriptDir = new URL('.', import.meta.url).pathname;

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  const htmlElement = document.documentElement;

  // This builds the path relative to script.js
  // Example: if script is at /js/script.js, this looks for /js/../assets/icons/
  const ICON_PATHS = {
    dark: new URL('../assets/icons/darkMode.svg', import.meta.url).href,
    light: new URL('../assets/icons/lightMode.svg', import.meta.url).href
  };

  const savedTheme = localStorage.getItem("theme") || "dark";
  setTheme(savedTheme);

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

  function setTheme(theme, save = true) {
    htmlElement.setAttribute("data-bs-theme", theme);
    if (save) {
      localStorage.setItem("theme", theme);
    }
    
    // Use the dynamically generated absolute URL
    themeIcon.src = ICON_PATHS[theme];
  }

  // Pan and Zoom logic for modal
  const panzoomContainer = document.getElementById('panzoom-container');
  const panzoomImage = document.getElementById('panzoom-image');
  const zoomInBtn = document.getElementById('zoomInBtn');
  const zoomOutBtn = document.getElementById('zoomOutBtn');
  const resetZoomBtn = document.getElementById('resetZoomBtn');
  
  if (panzoomImage && panzoomContainer) {
    let scale = 1;
    let isDragging = false;
    let startX, startY;
    let translateX = 0, translateY = 0;

    function updateTransform(smooth = true) {
      if (smooth) {
        panzoomImage.style.transition = 'transform 0.1s ease-out';
      } else {
        panzoomImage.style.transition = 'none';
      }
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
      if (e.deltaY < 0) {
        scale = Math.min(scale + 0.2, 5);
      } else {
        scale = Math.max(scale - 0.2, 0.5);
      }
      updateTransform(true);
    }, { passive: false });

    // Reset zoom when modal is closed
    const posterModal = document.getElementById('posterModal');
    if (posterModal) {
      posterModal.addEventListener('hidden.bs.modal', () => {
        scale = 1;
        translateX = 0;
        translateY = 0;
        updateTransform(false);
      });
    }
  }
});