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
flatpickr("#target-datetime", {
    enableTime: true,
    dateFormat: "Y-m-d h:i K", // 格式為 yyyy-mm-dd hh:mm AM/PM
    time_24hr: false // 使用 12 小時制
});

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
        alert('請選擇目標日期及時間');
        return;
    }

    targetTime = new Date(targetDatetimeInput.value);

    if (isPaused) {
        countdownInterval = setInterval(calculateRemainingTime, 1000);
        isPaused = false;
        startPauseBtn.textContent = '暫停';
    } else {
        countdownInterval = setInterval(calculateRemainingTime, 1000);
        startPauseBtn.textContent = '暫停';
    }
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