// Animate number counters
function animateCounter(el, target) {
  const duration = 1500;
  const start = performance.now();
  const isDecimal = target < 100;

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);

    if (target >= 1000) {
      el.textContent = current.toLocaleString();
    } else {
      el.textContent = current;
    }

    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target >= 1000 ? target.toLocaleString() : target;
  }

  requestAnimationFrame(update);
}

// Animate progress bars
function animateProgressBars() {
  document.querySelectorAll('.progress-bar').forEach(bar => {
    const width = bar.dataset.width;
    setTimeout(() => {
      bar.style.width = width + '%';
    }, 200);
  });
}

// Intersection Observer to trigger animations when visible
const cards = document.querySelectorAll('.card');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const valueEl = entry.target.querySelector('.stat-value');
      const target = parseInt(valueEl.dataset.target);
      animateCounter(valueEl, target);
      const bar = entry.target.querySelector('.progress-bar');
      setTimeout(() => {
        bar.style.width = bar.dataset.width + '%';
      }, 200);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

cards.forEach(card => observer.observe(card));

// Card click — highlight effect
cards.forEach(card => {
  card.addEventListener('click', () => {
    const color = card.dataset.color;
    card.style.borderColor = color;
    card.style.boxShadow = `0 16px 40px ${color}33`;
    setTimeout(() => {
      card.style.borderColor = '';
      card.style.boxShadow = '';
    }, 1000);
  });
});
