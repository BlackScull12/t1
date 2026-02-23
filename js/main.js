// main.js

// ------------------------
// 1. Fireflies Animation
// ------------------------
function createFireflies(count = 50) {
  const body = document.body;
  const width = window.innerWidth;
  const height = window.innerHeight;

  for (let i = 0; i < count; i++) {
    const f = document.createElement('div');
    f.className = 'firefly';

    // Random initial position
    f.style.top = Math.random() * height + 'px';
    f.style.left = Math.random() * width + 'px';

    // Random size and speed
    const size = 2 + Math.random() * 3; // 2px to 5px
    f.style.width = size + 'px';
    f.style.height = size + 'px';

    const speed = 3 + Math.random() * 5; // 3s to 8s
    f.style.animationDuration = `${speed}s`;

    body.appendChild(f);

    // Animate movement
    animateFirefly(f, width, height, speed);
  }
}

function animateFirefly(firefly, width, height, speed) {
  let x = parseFloat(firefly.style.left);
  let y = parseFloat(firefly.style.top);

  function move() {
    x += (Math.random() - 0.5) * 20; // move -10 to +10
    y += (Math.random() - 0.5) * 20;

    // Keep inside window
    x = Math.max(0, Math.min(width, x));
    y = Math.max(0, Math.min(height, y));

    firefly.style.transform = `translate(${x}px, ${y}px)`;

    requestAnimationFrame(move);
  }

  move();
}

// Initialize fireflies
createFireflies(50);

// ------------------------
// 2. Countdown Timer
// ------------------------
function getDropDate() {
  let dropDate = localStorage.getItem('dropDate');
  if (!dropDate) {
    // Default drop date if not set
    dropDate = new Date();
    localStorage.setItem('dropDate', dropDate.toISOString());
  }
  return new Date(dropDate);
}

function startCountdown(dropDate) {
  const timerEl = document.getElementById('countdown');

  function update() {
    const now = new Date();
    const diff = dropDate - now;

    if (diff <= 0) {
      timerEl.innerText = "Drop is LIVE!";
    } else {
      const h = Math.floor(diff / 1000 / 60 / 60);
      const m = Math.floor((diff / 1000 / 60) % 60);
      const s = Math.floor((diff / 1000) % 60);
      timerEl.innerText = `${h}h ${m}m ${s}s`;
      setTimeout(update, 1000);
    }
  }

  update();
}

startCountdown(getDropDate());

// ------------------------
// 3. Admin Bubble
// ------------------------
const ADMIN_PASSWORD = "Admin123"; // change this as needed
const adminBubble = document.getElementById('adminBubble');

adminBubble.addEventListener('click', () => {
  const password = prompt("Enter Admin Password");
  if (password === ADMIN_PASSWORD) {
    window.location.href = 'admin.html';
  } else {
    alert("Wrong password!");
  }
});
