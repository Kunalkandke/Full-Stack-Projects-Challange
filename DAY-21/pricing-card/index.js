const billingToggle = document.getElementById('billingToggle');
const priceEls = document.querySelectorAll('.price');
const monthlyLabel = document.getElementById('monthlyLabel');
const annualLabel = document.getElementById('annualLabel');

// Billing toggle — switch between monthly and annual prices
billingToggle.addEventListener('change', () => {
  const isAnnual = billingToggle.checked;

  priceEls.forEach(el => {
    const target = parseInt(isAnnual ? el.dataset.annual : el.dataset.monthly);
    animatePrice(el, target);
  });

  monthlyLabel.style.color = isAnnual ? '#475569' : '#f1f5f9';
  annualLabel.style.color = isAnnual ? '#f1f5f9' : '#475569';
});

// Smooth number animation for price change
function animatePrice(el, target) {
  const start = parseInt(el.textContent) || 0;
  const duration = 400;
  const startTime = performance.now();

  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(start + (target - start) * eased);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  }

  requestAnimationFrame(update);
}

// Plan button interactions
document.querySelector('.starter-btn').addEventListener('click', () => {
  showToast('You selected the Free Starter plan!', '#22c55e');
});

document.querySelector('.pro-btn').addEventListener('click', () => {
  showToast('Starting your Pro trial — no credit card needed!', '#6366f1');
});

document.querySelector('.enterprise-btn').addEventListener('click', () => {
  showToast('Our sales team will reach out shortly!', '#f59e0b');
});

// Toast notification
function showToast(message, color) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%) translateY(20px);
    background: ${color};
    color: #fff;
    padding: 12px 24px;
    border-radius: 12px;
    font-size: 0.9rem;
    font-weight: 600;
    box-shadow: 0 8px 30px rgba(0,0,0,0.3);
    opacity: 0;
    transition: all 0.3s ease;
    z-index: 1000;
    white-space: nowrap;
  `;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}
