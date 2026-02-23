// ================================
// CURRENCY CONFIG
// ================================
const currencyRates = {
  USD: { symbol: "$", rate: 1 },
  INR: { symbol: "₹", rate: 83 },
  EUR: { symbol: "€", rate: 0.92 },
  GBP: { symbol: "£", rate: 0.79 },
  JPY: { symbol: "¥", rate: 150 },
  DNR: { symbol: "D", rate: 0.31 }
};

let currentCurrency = localStorage.getItem("currency") || "USD";

// ================================
// LOAD STORE
// ================================
function loadStore() {
  const container = document.getElementById("storeItems");
  const items = JSON.parse(localStorage.getItem("items") || "[]");

  const dropDateRaw = localStorage.getItem("dropDate");
  const dropDate = dropDateRaw ? new Date(dropDateRaw) : new Date();
  const now = new Date();

  if (now < dropDate) {
    container.innerHTML = `<h2 style="text-align:center;">🌑 Store opens soon</h2>`;
    return;
  }

  container.innerHTML = "";

  items.forEach(item => {
    if (!item.show) return;

    const converted = convertPrice(item.price);

    const card = document.createElement("div");
    card.className = "store-item";
    card.innerHTML = `
      <img src="${item.image}">
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <div class="price">
        ${converted.symbol}${converted.value}
      </div>
      <button onclick="addToCart('${item.name}', ${converted.value})">
        Add to Cart
      </button>
    `;

    container.appendChild(card);
  });
}

// ================================
// PRICE CONVERSION
// ================================
function convertPrice(usdPrice) {
  const currency = currencyRates[currentCurrency];
  return {
    symbol: currency.symbol,
    value: (usdPrice * currency.rate).toFixed(2)
  };
}

// ================================
// CART (PLACEHOLDER)
// ================================
function addToCart(name, price) {
  alert(`${name} added for ${price} ${currentCurrency}`);
}

// ================================
// CURRENCY SWITCH HANDLER
// ================================
document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("currencySelect");

  if (select) {
    select.value = currentCurrency;

    select.addEventListener("change", () => {
      currentCurrency = select.value;
      localStorage.setItem("currency", currentCurrency);
      loadStore();
    });
  }

  loadStore();
});
