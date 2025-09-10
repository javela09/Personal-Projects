// Tiempos
const timerTrabajo = 50 * 60;
const timerDescanso = 10 * 60;

// Textos
const textTrabajo = "Fase de Trabajo";
const textDescanso = "Fase de Descanso";

// Inicio
let timerActual = timerTrabajo;
let faseTrabajoActiva = true;
let timerInterval = null;

// DOM
const timer = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const switchBtn = document.getElementById("switchBtn");

const textContador = document.getElementById("fase");
const contenedor = document.getElementById("contenedor");

// Audio
const musica = new Audio("audio/backMusic.mp3");
musica.loop = true;
musica.volume = 0.1;

const alarma = new Audio("audio/cambioFase.mp3");
alarma.loop = false;
alarma.volume = 1;

// Tiempo a Minutos y Segundos
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

// Tiempo Actual
function updateTimer() {
    timer.textContent = formatTime(timerActual);
}
updateTimer();

// iniciar temporizador
function startTimer() {
    if(timerInterval) return;

    timerInterval = setInterval(() => {
        timerActual--;
        updateTimer();

        if(timerActual <= 0) {
            cambiarFase();
            alarma.play();
        }
    }, 1000);

    musica.play()
}

// Cambiar fase
function cambiarFase() {
    clearInterval(timerInterval);
    timerInterval = null;

    faseTrabajoActiva = !faseTrabajoActiva;
    timerActual = faseTrabajoActiva ? timerTrabajo : timerDescanso;
    textContador.textContent = faseTrabajoActiva ? textTrabajo : textDescanso;

    contenedor.className = faseTrabajoActiva ? "trabajo" : "descanso";

    alarma.play();

    updateTimer();
    startTimer();
}

// Eventos de Botones
startBtn.addEventListener("click", startTimer);
switchBtn.addEventListener("click", cambiarFase);