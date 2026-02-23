// store.js
// Front-end only store logic using localStorage

function loadStore() {
  const container = document.getElementById("storeItems");

  // Get stored data
  const items = JSON.parse(localStorage.getItem("items") || "[]");
  const dropDateRaw = localStorage.getItem("dropDate");
  const dropDate = dropDateRaw ? new Date(dropDateRaw) : new Date();
  const now = new Date();

  // Store closed before drop
  if (now < dropDate) {
    container.innerHTML = `
      <h2 style="text-align:center; width:100%;">
        🌑 Store will open on drop date
      </h2>
    `;
    return;
  }

  // No items added yet
  if (items.length === 0) {
    container.innerHTML = `
      <h2 style="text-align:center; width:100%;">
        No items available
      </h2>
    `;
    return;
  }

  // Clear container
  container.innerHTML = "";

  // Render items in grid
  items.forEach((item) => {
    if (!item.show) return;

    const card = document.createElement("div");
    card.className = "store-item";

    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <div class="price">$${item.price}</div>
      <button onclick="addToCart('${item.name}', ${item.price})">
        Add to Cart
      </button>
    `;

    container.appendChild(card);
  });
}

// Simple cart placeholder
function addToCart(name, price) {
  alert(`${name} added to cart for $${price}`);
}

// Load store on page open
loadStore();
