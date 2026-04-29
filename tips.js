const burger = document.querySelector(".burger");
const mobileMenu = document.querySelector("#mobileMenu");

burger.addEventListener("click", () => {
  const isOpen = burger.classList.toggle("is-open");
  mobileMenu.classList.toggle("is-open", isOpen);
  burger.setAttribute("aria-expanded", String(isOpen));
  mobileMenu.setAttribute("aria-hidden", String(!isOpen));
});

mobileMenu.addEventListener("click", (event) => {
  if (event.target.tagName === "A") {
    burger.classList.remove("is-open");
    mobileMenu.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
    mobileMenu.setAttribute("aria-hidden", "true");
  }
});
