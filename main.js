// Fireflies animation
function createFireflies(count=20){
  for(let i=0;i<count;i++){
    const f=document.createElement('div');
    f.className='firefly';
    f.style.top=Math.random()*window.innerHeight+'px';
    f.style.left=Math.random()*window.innerWidth+'px';
    document.body.appendChild(f);
  }
}
createFireflies();

// Countdown timer
function getDropDate(){
  let dropDate = localStorage.getItem('dropDate');
  if(!dropDate) dropDate = new Date().toISOString();
  return new Date(dropDate);
}

function startCountdown(dropDate){
  const timerEl = document.getElementById('countdown');
  function update(){
    const now = new Date();
    const diff = dropDate - now;
    if(diff<=0){timerEl.innerText="Drop is LIVE!";}
    else{
      const h=Math.floor(diff/1000/60/60);
      const m=Math.floor((diff/1000/60)%60);
      const s=Math.floor((diff/1000)%60);
      timerEl.innerText=`${h}h ${m}m ${s}s`;
      setTimeout(update,1000);
    }
  }
  update();
}
startCountdown(getDropDate());

// Admin bubble
const ADMIN_PASSWORD = "Admin123"; // change this
document.getElementById('adminBubble').onclick=()=>{
  const password=prompt("Enter Admin Password");
  if(password===ADMIN_PASSWORD) window.location.href='admin.html';
  else alert("Wrong password");
};
