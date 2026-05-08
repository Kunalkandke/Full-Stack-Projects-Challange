// Save / Unsave recipe
const saveBtn = document.getElementById('saveBtn');
let saved = false;
saveBtn.addEventListener('click', () => {
  saved = !saved;
  saveBtn.innerHTML = saved ? '&#9829;' : '&#9825;';
  saveBtn.classList.toggle('saved', saved);
  saveBtn.style.transform = 'scale(1.3)';
  setTimeout(() => (saveBtn.style.transform = ''), 200);
});

// Ingredient checkboxes
document.querySelectorAll('.ingredients-list li').forEach(li => {
  li.addEventListener('click', () => {
    li.classList.toggle('checked');
    const box = li.querySelector('.check-box');
    const isChecked = li.classList.contains('checked');
    box.innerHTML = isChecked ? '&#9745;' : '&#9744;';
    box.classList.toggle('checked-icon', isChecked);
  });
});

// Servings counter
let servings = 2;
const srvCount = document.getElementById('srvCount');
const servingsInfo = document.getElementById('servings');

document.getElementById('increaseBtn').addEventListener('click', () => {
  servings = Math.min(servings + 1, 20);
  srvCount.textContent = servings;
  servingsInfo.textContent = servings;
  updateCalories();
});

document.getElementById('decreaseBtn').addEventListener('click', () => {
  servings = Math.max(servings - 1, 1);
  srvCount.textContent = servings;
  servingsInfo.textContent = servings;
  updateCalories();
});

function updateCalories() {
  const baseCalories = 160; // per serving
  document.getElementById('calories').textContent = baseCalories * servings;
}

// Cook button
const cookBtn = document.getElementById('cookBtn');
let cooking = false;
let timer = null;

cookBtn.addEventListener('click', () => {
  if (cooking) {
    clearInterval(timer);
    cooking = false;
    cookBtn.textContent = 'Start Cooking 🍳';
    cookBtn.classList.remove('cooking');
    return;
  }

  cooking = true;
  cookBtn.classList.add('cooking');
  let seconds = 0;

  timer = setInterval(() => {
    seconds++;
    const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    cookBtn.textContent = `Cooking... ${mins}:${secs} ⏱`;
  }, 1000);
});
