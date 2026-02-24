// ================================
// LOAD ITEMS
// ================================
function loadItems() {
  const list = document.getElementById("itemsList");
  if (!list) return;

  const items = JSON.parse(localStorage.getItem("items")) || [];
  list.innerHTML = "";

  if (items.length === 0) {
    list.innerHTML = "<p>No items added yet.</p>";
    return;
  }

  items.forEach((item, index) => {
    const div = document.createElement("div");
    div.style.marginBottom = "10px";

    div.innerHTML = `
      <strong>${item.name}</strong>
      <br>
      <small>${item.description}</small>
      <br>
      <span>$${item.price.toFixed(2)}</span>
      <br>
      <button onclick="toggleItem(${index})">
        ${item.show ? "ON" : "OFF"}
      </button>
      <button onclick="deleteItem(${index})">✕</button>
    `;

    list.appendChild(div);
  });
}

// ================================
// ADD ITEM
// ================================
function addItem() {
  const name = document.getElementById("name").value.trim();
  const description = document.getElementById("description").value.trim();
  const priceValue = document.getElementById("price").value;
  const image = document.getElementById("image").value.trim();

  const price = parseFloat(priceValue);

  if (!name || !description || isNaN(price) || price <= 0 || !image) {
    alert("Please fill all fields correctly.");
    return;
  }

  const items = JSON.parse(localStorage.getItem("items")) || [];

  items.push({
    name,
    description,
    price,
    image,
    show: true
  });

  localStorage.setItem("items", JSON.stringify(items));

  // Clear inputs
  document.getElementById("name").value = "";
  document.getElementById("description").value = "";
  document.getElementById("price").value = "";
  document.getElementById("image").value = "";

  loadItems();
}

// ================================
// TOGGLE VISIBILITY
// ================================
function toggleItem(index) {
  const items = JSON.parse(localStorage.getItem("items")) || [];
  if (!items[index]) return;

  items[index].show = !items[index].show;
  localStorage.setItem("items", JSON.stringify(items));
  loadItems();
}

// ================================
// DELETE ITEM
// ================================
function deleteItem(index) {
  const items = JSON.parse(localStorage.getItem("items")) || [];
  if (!items[index]) return;

  const confirmDelete = confirm("Remove this item permanently?");
  if (!confirmDelete) return;

  items.splice(index, 1);
  localStorage.setItem("items", JSON.stringify(items));
  loadItems();
}

// ================================
// SET DROP DATE
// ================================
function setDropDate() {
  const date = prompt("Enter Drop Date (YYYY-MM-DDTHH:MM:SS)");

  if (!date) return;

  const parsed = Date.parse(date);
  if (isNaN(parsed)) {
    alert("Invalid date format.");
    return;
  }

  localStorage.setItem("dropDate", date);
  alert("Drop date updated successfully!");
}

// ================================
// INIT
// ================================
document.addEventListener("DOMContentLoaded", loadItems);
