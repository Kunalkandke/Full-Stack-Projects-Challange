const followBtn = document.getElementById('followBtn');
const msgBtn = document.getElementById('msgBtn');
const statusDot = document.getElementById('statusDot');
const postsEl = document.getElementById('posts');
const followersEl = document.getElementById('followers');

let isFollowing = false;
let followers = 4200;

// Follow / Unfollow toggle
followBtn.addEventListener('click', () => {
  isFollowing = !isFollowing;
  if (isFollowing) {
    followers++;
    followBtn.textContent = 'Following';
    followBtn.classList.add('following');
  } else {
    followers--;
    followBtn.textContent = 'Follow';
    followBtn.classList.remove('following');
  }
  followersEl.textContent = formatCount(followers);
});

// Message button ripple effect
msgBtn.addEventListener('click', () => {
  msgBtn.textContent = 'Sent!';
  msgBtn.style.background = '#dcfce7';
  msgBtn.style.color = '#16a34a';
  setTimeout(() => {
    msgBtn.textContent = 'Message';
    msgBtn.style.background = '';
    msgBtn.style.color = '';
  }, 1500);
});

// Cycle status on avatar click
const statuses = ['online', 'away', 'offline'];
let statusIndex = 0;
const statusColors = { online: '#22c55e', away: '#f59e0b', offline: '#9ca3af' };

document.getElementById('avatar').addEventListener('click', () => {
  statusIndex = (statusIndex + 1) % statuses.length;
  const s = statuses[statusIndex];
  statusDot.className = 'status-dot';
  if (s !== 'online') statusDot.classList.add(s);
});

// Animate stat counters on load
function animateCount(el, target, suffix = '') {
  let current = 0;
  const step = Math.ceil(target / 60);
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = formatCount(current) + suffix;
    if (current >= target) clearInterval(timer);
  }, 20);
}

function formatCount(n) {
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
  return n.toString();
}

window.addEventListener('load', () => {
  animateCount(postsEl, 128);
  animateCount(followersEl, 4200);
  animateCount(document.getElementById('following'), 312);
});
