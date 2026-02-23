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
let cart = JSON.parse(localStorage.getItem("cart") || "[]");

// ================================
// STORE LOAD
// ================================
function loadStore() {
  const container = document.getElementById("storeItems");
  const items = JSON.parse(localStorage.getItem("items") || "[]");

  const dropDateRaw = localStorage.getItem("dropDate");
  const dropDate = dropDateRaw ? new Date(dropDateRaw) : new Date();
  const now = new Date();

  if (now < dropDate) {
    container.innerHTML = "<h2 style='text-align:center;'>🌑 Store opens soon</h2>";
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
      <div class="price">${converted.symbol}${converted.value}</div>
      <button onclick="addToCart('${item.name}', ${item.price})">
        Add to Cart
      </button>
    `;

    container.appendChild(card);
  });
}

// ================================
// PRICE CONVERSION
// ================================
function convertPrice(usd) {
  const c = currencyRates[currentCurrency];
  return {
    symbol: c.symbol,
    value: (usd * c.rate).toFixed(2)
  };
}

// ================================
// CART LOGIC
// ================================
function addToCart(name, usdPrice) {
  const item = cart.find(i => i.name === name);
  if (item) {
    item.qty++;
  } else {
    cart.push({ name, usdPrice, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  openCart();
  renderCart();
}

function renderCart() {
  const container = document.getElementById("cartItems");
  const totalBox = document.getElementById("cartTotal");

  container.innerHTML = "";
  let totalUSD = 0;

  cart.forEach(item => {
    totalUSD += item.usdPrice * item.qty;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <span>${item.name} × ${item.qty}</span>
      <span>${convertPrice(item.usdPrice * item.qty).symbol}
            ${convertPrice(item.usdPrice * item.qty).value}</span>
    `;
    container.appendChild(div);
  });

  const totalConverted = convertPrice(totalUSD);
  totalBox.innerText = `Total: ${totalConverted.symbol}${totalConverted.value}`;
}

// ================================
// CART UI
// ================================
function openCart() {
  document.getElementById("miniCart").classList.add("active");
  document.getElementById("cartOverlay").classList.add("active");
}

function closeCart() {
  document.getElementById("miniCart").classList.remove("active");
  document.getElementById("cartOverlay").classList.remove("active");
}

document.getElementById("cartOverlay").onclick = closeCart;

// ================================
// CHECKOUT NAVIGATION
// ================================
function goToCheckout() {
  window.location.href = "checkout.html";
}

// ================================
// INIT
// ================================
document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("currencySelect");
  if (select) {
    select.value = currentCurrency;
    select.onchange = () => {
      currentCurrency = select.value;
      localStorage.setItem("currency", currentCurrency);
      loadStore();
      renderCart();
    };
  }

  loadStore();
  renderCart();
});
