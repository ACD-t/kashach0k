const predictionCards = [
  "./images/prediction-1.png",
  "./images/prediction-2.png",
  "./images/prediction-3.png",
  "./images/prediction-4.png",
  "./images/prediction-5.png",
  "./images/prediction-6.png",
  "./images/prediction-7.png",
  "./images/prediction-8.png",
];

const burger = document.querySelector(".burger");
const mobileMenu = document.querySelector("#mobileMenu");
const predictionsCard = document.querySelector(".predictions-card");
const placeholderCarousel = document.querySelector("#placeholderCarousel");
const predictionResult = document.querySelector("#predictionResult");
const predictionButton = document.querySelector("#predictionButton");

let lastCardIndex = -1;
let isAnimating = false;

function getRandomCardIndex() {
  if (predictionCards.length === 1) return 0;

  let nextIndex = Math.floor(Math.random() * predictionCards.length);

  while (nextIndex === lastCardIndex) {
    nextIndex = Math.floor(Math.random() * predictionCards.length);
  }

  lastCardIndex = nextIndex;
  return nextIndex;
}

function showRandomPrediction() {
  if (isAnimating) return;

  isAnimating = true;
  predictionButton.disabled = true;
  predictionButton.textContent = predictionsCard.classList.contains("has-result")
    ? "Перемешиваем..."
    : "Открываем...";

  predictionsCard.classList.remove("has-result");
  predictionResult.setAttribute("aria-hidden", "true");
  placeholderCarousel.setAttribute("aria-hidden", "false");
  placeholderCarousel.classList.add("is-spinning");

  window.setTimeout(() => {
    const randomIndex = getRandomCardIndex();
    predictionResult.src = predictionCards[randomIndex];
    predictionResult.alt = `Карточка предсказания ${randomIndex + 1}`;

    placeholderCarousel.classList.remove("is-spinning");
    predictionsCard.classList.add("has-result");
    predictionResult.setAttribute("aria-hidden", "false");
    placeholderCarousel.setAttribute("aria-hidden", "true");

    predictionButton.textContent = "Получить ещё";
    predictionButton.disabled = false;
    isAnimating = false;
  }, 850);
}

predictionButton.addEventListener("click", showRandomPrediction);

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
