const Player = (() => {
  const start = Date.now();

  function addPlayer(end) {
    const time = end - start;
    const name = prompt("Enter your name", "Anonymous");

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
      .then((res) => {
        let calcTime = convertMS(res.time_taken);
        alert(`You have been saved as ${name} with a time of ${calcTime}.`);
        displayTop();
      })
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
      .then((res) => {
        createOverlay();
        res.forEach((player) => createEntry(player));
      })
      .catch(() => console.error("Error."));
  }

  function createOverlay() {
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    const scores = document.createElement("div");
    scores.classList.add("scores");
    overlay.appendChild(scores);
    const title = document.createElement("h2");
    title.textContent = "Top Scores";
    scores.appendChild(title);
    const list = document.createElement("ol");
    scores.appendChild(list);

    document.body.appendChild(overlay);
    allowClose(overlay, scores);
  }

  function createEntry(player) {
    const item = document.createElement("li");
    const name = document.createElement("strong");
    name.textContent = player.name;
    let time = convertMS(player.time_taken);
    time = document.createTextNode(time);
    item.appendChild(name);
    item.appendChild(time);

    const list = document.querySelector("ol");
    list.appendChild(item);
  }

  function allowClose(overlay, scores) {
    overlay.addEventListener('click', () => {
      overlay.remove();
    })
    scores.addEventListener('click', (e) => {
      e.stopPropagation();
      return false; 
    })
  }

  function addTrophyClick() {
    const trophyBtn = document.querySelector('#trophy');
    trophyBtn.addEventListener('click', () => {
      displayTop();
    })
  }

  function convertMS(milliseconds) {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    minutes = minutes % 60;
    seconds = `${seconds}s`;
    minutes = minutes > 1 ? `${minutes}m, ` : "";
    return minutes + seconds;
  }

  return { addPlayer, addTrophyClick };
})();

export { Player };
