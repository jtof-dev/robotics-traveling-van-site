document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  const htmlElement = document.documentElement;

  const savedTheme = localStorage.getItem("theme") || "dark";
  setTheme(savedTheme);

  toggleBtn.addEventListener("click", () => {
    if (themeIcon.classList.contains("spinning")) return; // Prevent multiple clicks

    themeIcon.classList.add("spinning");

    const currentTheme = htmlElement.getAttribute("data-bs-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";

    setTimeout(() => {
      setTheme(newTheme, false);
    }, 250); // Half of the 0.5s animation

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

    if (theme === "dark") {
      themeIcon.src = "../assets/icons/darkMode.svg";
    } else {
      themeIcon.src = "../assets/icons/lightMode.svg";
    }
  }
});
