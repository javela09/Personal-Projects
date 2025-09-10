//----------------------------------------//
//              VARIABLES                 //
//----------------------------------------//

const gridSize = 25;
const teams = ["noTeam", "blueTeam", "redTeam", "neutralTeam"];
let currentLang = "es";

//----------------------------------------//
//              FUNCIONES                 //
//----------------------------------------//

function createCards() {
    const btn = document.createElement("button");
    btn.className = "cardBtn noTeam";
    btn.type = "button";

    btn.innerHTML = `
        <div class="card">
            <div class="cardHeader">
                <span>231 GAMES</span>
                <img src="img/coin.png" alt="Coin icon" class="team">
            </div>
            <div class="randomWord">
                <span class="word">Random Word</span>
            </div>
        </div>
    `;

    btn.addEventListener("click", () => changeTeam(btn));

    return btn;
}

function renderGrid(words = []) {
    const container = document.querySelector(".container");
    container.innerHTML = "";

    for (let i = 0; i < gridSize; i++) {
        const card = createCards();
        const w = words[i] ?? `Word ${i+1}`;

        card.querySelector(".word").textContent = w;
        container.appendChild(card);
    }
}

async function loadWordList() {
    const file = currentLang === "es" ? "data/wordList_es.txt" : "data/wordList_en.txt"
    const res = await fetch(file);
    const text = await res.text();
    const words = parseWords(text);
    return words;
}

function sample25(words) {
    const arr = [...words];

    for (let i = arr.length -1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr.slice(0, 25);
}

async function initBoard() {
    try {
        const words = await loadWordList();
        const sample = sample25(words);
        renderGrid(sample);
    }
    catch (e) {
        console.error("Error cargando palabras:", e);
        renderGrid();
    }
}

function parseWords(text) {
    return text
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .map(word => word.toUpperCase())
    .filter((word, index, arr) => arr.indexOf(word) === index);
}

function setupReset() {
    const resetBtn = document.getElementById("reset");
    resetBtn.addEventListener("click", () => {
        initBoard();
    })
}

function changeTeam(btn) {
    const currentIndex = teams.findIndex(team => btn.classList.contains(team));
    const nextIndex = (currentIndex + 1) % teams.length;
    teams.forEach(team => btn.classList.remove(team));
    btn.classList.add(teams[nextIndex]);
}

function setupLang() {
    const langBtn = document.getElementById("lang");
    langBtn.addEventListener("click", () => {
        currentLang = currentLang === "es" ? "en" : "es";
        initBoard();
    })
}

document.addEventListener("DOMContentLoaded", () => {
    initBoard();
    setupReset();
    setupLang();
})