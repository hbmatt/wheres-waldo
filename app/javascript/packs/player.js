const Player = (() => {
  const start = Date.now();

  function addPlayer(end) {
    const time = end - start;
    const name = prompt("Enter your name","Anonymous");

    if (name === null) {
      return;
    }

    fetch("players/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, time }),
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch(() => console.error("Error."));
  }

  function displayTop() {
    fetch("players/index", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch(() => console.error("Error."));
  }

  function createOverlay() {
    const background = document.createElement("div");
    background.classList.add("overlay");
    const scores = document.createElement("div");
    scores.classList.add("scores");
    background.appendChild(scores);
    document.appendChild(background);
  }

  function convertMS(milliseconds) {
    let seconds = Math.floor(milliseconds / 1000);
    let minute = Math.floor(seconds / 60);
    seconds = seconds % 60;
    minute = minute % 60;
    return `${minute}m, ${seconds}s`;
  }

  return { addPlayer };
})();

export { Player };


// res.forEach((player) => {
//   const p = document.createElement("p");
//   const name = document.createElement("strong");
//   name.textContent = player.name;
//   p.appendChild(name);
//   const time = document.createTextNode(convertMS(player.time));
//   p.appendChild(time);

//   document.querySelector(".scores").appendChild(p);
// });