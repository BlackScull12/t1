function loadItems(){
  const list = document.getElementById('itemsList');
  const items = JSON.parse(localStorage.getItem('items') || '[]');
  list.innerHTML='';
  items.forEach((item,i)=>{
    const div=document.createElement('div');
    div.innerHTML=`${item.name} 
      <button onclick="toggle(${i})">${item.show?'ON':'OFF'}</button>
      <button onclick="del(${i})">X</button>`;
    list.appendChild(div);
  });
}

function addItem(){
  const name=document.getElementById('name').value;
  const description=document.getElementById('description').value;
  const price=parseFloat(document.getElementById('price').value);
  const image=document.getElementById('image').value;
  if(!name||!description||!price||!image){alert("Fill all fields"); return;}
  
  const items=JSON.parse(localStorage.getItem('items')||'[]');
  items.push({name, description, price, image, show:true});
  localStorage.setItem('items', JSON.stringify(items));
  loadItems();
}

function toggle(index){
  const items = JSON.parse(localStorage.getItem('items')||'[]');
  items[index].show = !items[index].show;
  localStorage.setItem('items', JSON.stringify(items));
  loadItems();
}

function del(index){
  const items = JSON.parse(localStorage.getItem('items')||'[]');
  items.splice(index,1);
  localStorage.setItem('items', JSON.stringify(items));
  loadItems();
}

function setDropDate(){
  const date = prompt("Enter Drop Date (YYYY-MM-DDTHH:MM:SS)");
  if(date) localStorage.setItem('dropDate', date);
  alert("Drop date updated!");
}

loadItems();
