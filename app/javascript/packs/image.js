function getCursorPosition(canvas, event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  createBox(x, y, canvas);
}

function createBox(x, y, canvas) {
  const box = document.createElement('div');
  box.classList.add('box');
  box.style.transform = `translate(${x - 50}px, ${y - 50}px)`;
  canvas.appendChild(box);
}


const canvas = document.querySelector('#main-image');
canvas.addEventListener('mousedown', (e) => {
  getCursorPosition(canvas, e)
});