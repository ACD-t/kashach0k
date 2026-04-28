const units = [
  {
    id: "doshik",
    name: "Дошики",
    price: 60,
    icon: "./images/doshik.png",
    fallback: "🍜",
  },
  {
    id: "zucchini",
    name: "Кабачки",
    price: 80,
    icon: "./images/zucchini.png",
    fallback: "🥒",
  },
  {
    id: "coffee",
    name: "Кофе",
    price: 230,
    icon: "./images/coffee.png",
    fallback: "☕",
  },
  {
    id: "banana",
    name: "Бананчики",
    price: 20,
    icon: "./images/banana.png",
    fallback: "🍌",
  },
  {
    id: "mandarin",
    name: "Мандарин",
    price: 20,
    icon: "./images/mandarin.png",
    fallback: "🍊",
  },
];

const amountInput = document.querySelector("#amount");
const amountField = document.querySelector(".amount-field");
const converterForm = document.querySelector("#converterForm");
const unitsRow = document.querySelector("#unitsRow");
const resultCard = document.querySelector("#resultCard");
const burger = document.querySelector(".burger");
const mobileMenu = document.querySelector("#mobileMenu");

function renderUnits() {
  unitsRow.innerHTML = units
    .map(
      (unit, index) => `
      <label class="unit-option">
        <input type="radio" name="unit" value="${unit.id}" ${index === 0 ? "checked" : ""} />
        <span class="unit-button">
          <img src="${unit.icon}" alt="" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" />
          <span class="unit-emoji" style="display:none;">${unit.fallback}</span>
          <span>${unit.name}</span>
        </span>
      </label>
    `
    )
    .join("");
}

function formatNumber(value) {
  return new Intl.NumberFormat("ru-RU").format(value);
}

function parseAmount(value) {
  return Number(value.replace(/\s/g, "").replace(",", ".").replace(/[^0-9.]/g, ""));
}

function updateAmountView() {
  const rawNumber = amountInput.value.replace(/\D/g, "");

  amountInput.value = rawNumber ? formatNumber(Number(rawNumber)) : "";

  amountInput.style.width = rawNumber
    ? `${amountInput.value.length + 0.3}ch`
    : "1ch";

  amountField.classList.toggle("has-value", Boolean(rawNumber));
}

function getSelectedUnit() {
  const checkedUnit = document.querySelector('input[name="unit"]:checked');
  return units.find((unit) => unit.id === checkedUnit.value);
}

function showEmptyResult(message = "Результат появится тут") {
  resultCard.innerHTML = `<p class="result-placeholder">${message}</p>`;
}

function convertAmount() {
  const amount = parseAmount(amountInput.value);
  const unit = getSelectedUnit();

  if (!amount || amount <= 0) {
    showEmptyResult("Введите сумму, и результат появится тут");
    return;
  }

  const result = Math.round(amount / unit.price);

  resultCard.innerHTML = `
    <p class="result-value">
      <span>${formatNumber(result)}</span>
      <img class="result-icon" src="${unit.icon}" alt="${unit.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='inline-block';" />
      <span class="result-emoji" style="display:none;">${unit.fallback}</span>
    </p>
    <p class="result-text">Когда сумма становится наглядной, решить «тратить или отложить» чуть проще</p>
  `;
}

renderUnits();
updateAmountView();

amountInput.addEventListener("input", updateAmountView);

converterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  convertAmount();
});

unitsRow.addEventListener("change", () => {
  if (parseAmount(amountInput.value) > 0) {
    convertAmount();
  }
});

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
