function getCursorPosition(canvas, event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  console.log(`x: ${x}, y: ${y}`);
  createBox(x, y, canvas);
}

function createBox(x, y, canvas) {
  removePrev();
  const box = document.createElement('div');
  box.setAttribute('id', 'selection');
  box.classList.add('box');
  box.style.transform = `translate(${x - 45}px, ${y - 45}px)`;
  canvas.appendChild(box);
}

function removePrev() {
  const prev = document.querySelector('#selection');
  if (prev !== null) {
    prev.remove();
  }
}


const canvas = document.querySelector('.image');
canvas.addEventListener('mousedown', (e) => {
  getCursorPosition(canvas, e)
});