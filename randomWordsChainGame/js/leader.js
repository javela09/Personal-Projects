//----------------------------------------//
//              VARIABLES                 //
//----------------------------------------//

const gridSize = 25;
const container = document.querySelector(".mobileContainer");

// Colores por equipo
const TEAM_COLORS = {
  blue: "blue",
  red: "red",
  yellow: "gold",
  black: "black"
};

//----------------------------------------//
//              FUNCIONES                 //
//----------------------------------------//

function generateAssignments() {
  const startingTeam = Math.random() < 0.5 ? "blue" : "red";
  const otherTeam = startingTeam === "blue" ? "red" : "blue";

  const assignments = [
    ...Array(9).fill(startingTeam),
    ...Array(8).fill(otherTeam),
    ...Array(7).fill("yellow"),
    "black"
  ];

  for (let i = assignments.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [assignments[i], assignments[j]] = [assignments[j], assignments[i]];
  }

  return { assignments, startingTeam };
}

function renderLeaderBoard() {
  const { assignments, startingTeam } = generateAssignments();
  container.innerHTML = "";

  assignments.forEach(color => {
    const cell = document.createElement("div");
    cell.style.backgroundColor = TEAM_COLORS[color];
    container.appendChild(cell);
  });

  container.style.borderColor = TEAM_COLORS[startingTeam];
}

function setupReset() {
  const resetBtn = document.getElementById("reset");
  resetBtn.addEventListener("click", renderLeaderBoard);
}

//----------------------------------------//
//              INICIO                    //
//----------------------------------------//

document.addEventListener("DOMContentLoaded", () => {
  renderLeaderBoard();
  setupReset();
});
