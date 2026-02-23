function loadStore(){
  const container = document.getElementById('storeItems');
  const items = JSON.parse(localStorage.getItem('items') || '[]');
  const dropDate = new Date(localStorage.getItem('dropDate') || new Date());
  const now = new Date();
  
  if(now < dropDate){
    container.innerHTML = "Store will open on drop date!";
    return;
  }
  
  if(items.length===0){ container.innerHTML="No items yet!"; return; }

  container.innerHTML='';
  items.forEach(item=>{
    if(!item.show) return;
    const div=document.createElement('div');
    div.style.margin='10px';
    div.innerHTML=`
      <img src="${item.image}" width="150"><br>
      <b>${item.name}</b><br>
      ${item.description}<br>
      Price: ${item.price} USD<br>
      <button onclick="addToCart('${item.name}',${item.price})">Add to Cart</button>
    `;
    container.appendChild(div);
  });
}

// Simple Cart alert
function addToCart(name, price){
  alert(`${name} added to cart for $${price}`);
}

loadStore();
