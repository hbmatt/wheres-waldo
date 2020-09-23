function getCursorPosition(canvas, event) {
  const rect = canvas.getBoundingClientRect();
  const x = Math.round(event.clientX - rect.left);
  const y = Math.round(event.clientY - rect.top);
  createBox(x, y, canvas);
  checkPosition(x, y, canvas);
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

function checkPosition(x, y, canvas) {
  fetch('characters/find', {
    method: 'POST',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ x, y })
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.length === 1) {
        createCharBox(res[0].x, res[0].y, canvas)
      }
    })
    .catch(() => console.error('Error.'))
}

function createCharBox(x, y, canvas) {
  removePrev();
  const box = document.createElement('div');
  box.classList.add('box');
  box.style.transform = `translate(${x - 45}px, ${y - 45}px)`;
  canvas.appendChild(box);
}

const canvas = document.querySelector('.image');
canvas.addEventListener('mousedown', (e) => {
  getCursorPosition(canvas, e)
});