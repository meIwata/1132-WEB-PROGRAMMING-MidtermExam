const timeDisplay = document.getElementById('time-display');
const targetDatetimeInput = document.getElementById('target-datetime');
const startPauseBtn = document.getElementById('start-pause-btn');
const resetBtn = document.getElementById('reset-btn');

let countdownInterval = null;
let isPaused = false;
let targetTime = null;

function updateDisplay(hours, minutes, seconds) {
    timeDisplay.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function calculateRemainingTime() {
    const now = new Date();
    const diff = targetTime - now;

    if (diff <= 0) {
        clearInterval(countdownInterval);
        alert('目標日期及時間已到，計時結束');
        resetTimer();
        return;
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    updateDisplay(hours, minutes, seconds);
}

function startTimer() {
    if (!targetDatetimeInput.value) {
        alert('請設定目標日期及時間');
        return;
    }

    targetTime = new Date(targetDatetimeInput.value);

    if (targetTime <= new Date()) {
        alert('目標時間已過，請重新設定');
        return;
    }

    startPauseBtn.textContent = '暫停';
    countdownInterval = setInterval(calculateRemainingTime, 1000);
}

function pauseTimer() {
    clearInterval(countdownInterval);
    startPauseBtn.textContent = '繼續';
}

function resetTimer() {
    clearInterval(countdownInterval);
    updateDisplay(0, 0, 0);
    startPauseBtn.textContent = '開始';
    targetDatetimeInput.value = '';
    targetTime = null;
}

startPauseBtn.addEventListener('click', () => {
    if (startPauseBtn.textContent === '開始') {
        startTimer();
    } else if (startPauseBtn.textContent === '暫停') {
        pauseTimer();
    } else if (startPauseBtn.textContent === '繼續') {
        startTimer();
    }
});

resetBtn.addEventListener('click', resetTimer);