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
});