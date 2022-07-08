const darkenNav = document.querySelector("#darken-nav");
const menu = document.querySelector("#mobNav");
const toggle = document.getElementById('toggle-btn')

toggle.addEventListener("click", () => {
  menu.style.setProperty("width", "13rem");
  darkenNav.style.setProperty("display", "block");
});
darkenNav.addEventListener("click", () => {
  menu.style.setProperty("width", "0");
  darkenNav.style.setProperty("display", "none");
});
