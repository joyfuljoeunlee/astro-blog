type Theme = "light" | "dark";

const currentTheme: Theme = (() => {
  const theme = localStorage.getItem("theme");
  return theme === "light" || theme === "dark" ? theme : "light";
})();

const getCurrentPreferTheme = (): Theme => {
  if (currentTheme) {
    return currentTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

let currentPreferTheme = getCurrentPreferTheme();

const addThemeClass = () => {
  document.documentElement.className =
    currentPreferTheme === "light" ? "" : "dark";
};

const storeTheme = () => {
  localStorage.setItem("theme", currentPreferTheme);
};

window.onload = () => {
  const clickThemeBtn = () => {
    document.getElementById("theme-btn")?.addEventListener("click", () => {
      currentPreferTheme = currentPreferTheme === "light" ? "dark" : "light";
      addThemeClass();
      storeTheme();
    });
  };

  clickThemeBtn();
};

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", ({ matches: isDark }) => {
    currentPreferTheme = isDark ? "dark" : "light";
    storeTheme();
  });
