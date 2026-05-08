const cartBtn = document.getElementById('cartBtn');
const cartBtnText = document.getElementById('cartBtnText');
const wishlistBtn = document.getElementById('wishlistBtn');
const colorDots = document.querySelectorAll('.color-dot');

let cartCount = 0;
let wishlisted = false;

// Add to cart
cartBtn.addEventListener('click', () => {
  cartCount++;
  cartBtnText.textContent = `Added! (${cartCount})`;
  cartBtn.classList.add('added');
  setTimeout(() => {
    cartBtnText.textContent = 'Add to Cart';
    cartBtn.classList.remove('added');
  }, 1800);
});

// Wishlist toggle
wishlistBtn.addEventListener('click', () => {
  wishlisted = !wishlisted;
  wishlistBtn.innerHTML = wishlisted ? '&#9829;' : '&#9825;';
  wishlistBtn.classList.toggle('active', wishlisted);
  wishlistBtn.style.transform = 'scale(1.3)';
  setTimeout(() => (wishlistBtn.style.transform = ''), 200);
});

// Color picker
colorDots.forEach(dot => {
  dot.addEventListener('click', () => {
    colorDots.forEach(d => d.classList.remove('active'));
    dot.classList.add('active');

    // Update badge color based on selection
    const badge = document.getElementById('badge');
    const colorMap = { Black: 'NEW', Gold: 'HOT', Silver: 'SALE' };
    badge.textContent = colorMap[dot.dataset.color] || 'NEW';
  });
});

// Star rating interaction
const stars = document.querySelectorAll('.star');
stars.forEach((star, i) => {
  star.style.cursor = 'pointer';
  star.addEventListener('click', () => {
    stars.forEach((s, j) => {
      s.classList.toggle('filled', j <= i);
    });
  });
  star.addEventListener('mouseover', () => {
    stars.forEach((s, j) => {
      s.style.color = j <= i ? '#f59e0b' : '#d1d5db';
    });
  });
  star.addEventListener('mouseout', () => {
    stars.forEach(s => (s.style.color = ''));
  });
});
