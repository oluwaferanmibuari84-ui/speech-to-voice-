const text = document.getElementById("text");
const voiceSelect = document.getElementById("voiceSelect");
const speakBtn = document.getElementById("speakBtn");
const stopBtn = document.getElementById("stopBtn");
const pauseBtn = document.getElementById("pauseBtn");
const speed = document.getElementById("speed");
const speedValue = document.getElementById("speedValue");

speed.addEventListener("input", () => {
    speedValue.textContent = speed.value + "x";
});

let voices = [];

function loadVoices() {
    voices = speechSynthesis.getVoices();

    voiceSelect.innerHTML = "";

    voices.forEach((voice, index) => {
        const option = document.createElement("option");

        option.value = index;
        option.textContent = `${voice.name} - ${voice.lang}`;

        voiceSelect.appendChild(option);
    });
}

loadVoices();

speechSynthesis.onvoiceschanged = loadVoices;

speakBtn.addEventListener("click", () => {

    if (text.value.trim() === "") {
        alert("Please enter some text.");
        return;
    }

    speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text.value);

    speech.voice = voices[voiceSelect.value];

    speech.rate = parseFloat(speed.value);

    speechSynthesis.speak(speech);
});

pauseBtn.addEventListener("click", () => {
    if (speechSynthesis.speaking && !speechSynthesis.paused) {
        speechSynthesis.pause();
        pauseBtn.innerHTML = "▶ Play";
    } 
    else if (speechSynthesis.paused) {
        speechSynthesis.resume();
        pauseBtn.innerHTML = "⏸ Pause";
    }
});

stopBtn.addEventListener("click", () => {
    speechSynthesis.cancel();
});
