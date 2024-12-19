const startBtn = document.querySelector('.btn-start');
const stopBtn = document.querySelector('.btn-stop');
const resetBtn = document.querySelector('.btn-reset');
const sessionInput = document.getElementById('session-time');
const breakInput = document.getElementById('break-time');
const minuteDiv = document.querySelector('.minutes');
const secondDiv = document.querySelector('.seconds');
const bellSound = new Audio('../sounds/bell.wav');
const statusPopup = document.getElementById('status-popup');
const toggleSoundBtn = document.getElementById('toggle-sound');
const startSessionBtn = document.getElementById('start-session');
const startBreakBtn = document.getElementById('start-break');

let myInterval = null;
let isSession = true; // Tracks if it's a session or a break
let totalSeconds = 0;
let soundPlaying = false; // Tracks sound state (playing or paused)

// Update Timer Display
const updateTimerDisplay = () => {
    const minutesLeft = Math.floor(totalSeconds / 60);
    const secondsLeft = totalSeconds % 60;
    minuteDiv.textContent = minutesLeft < 10 ? `0${minutesLeft}` : minutesLeft;
    secondDiv.textContent = secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft;
};

// Show Pop-Up Message
const showPopupMessage = (message) => {
    statusPopup.textContent = message;
    statusPopup.style.display = 'block';
    setTimeout(() => {
        statusPopup.style.display = 'none';
    }, 3000);
};

// Start Timer Functionality
const startTimer = () => {
    if (myInterval) {
        showPopupMessage('Timer is already running!');
        return;
    }

    if (totalSeconds === 0) {
        totalSeconds = isSession
            ? Number(sessionInput.value) * 60
            : Number(breakInput.value) * 60;
    }

    myInterval = setInterval(() => {
        if (totalSeconds > 0) {
            totalSeconds--;
            updateTimerDisplay();
        } else {
            clearInterval(myInterval);
            myInterval = null;
            bellSound.loop = true; // Ensure sound loops
            bellSound.play();
            soundPlaying = true;
            toggleSoundBtn.style.display = 'block';

            if (isSession) {
                showPopupMessage('Session completed! Start your break.');
                startBreakBtn.style.display = 'inline-block';
            } else {
                showPopupMessage('Break completed! Start your next session.');
                startSessionBtn.style.display = 'inline-block';
            }

            isSession = !isSession;
        }
    }, 1000);
};

// Toggle Sound Functionality
toggleSoundBtn.addEventListener('click', () => {
    if (soundPlaying) {
        bellSound.pause();
        toggleSoundBtn.textContent = 'Resume Sound';
        soundPlaying = false;
    } else {
        bellSound.play();
        toggleSoundBtn.textContent = 'Pause Sound';
        soundPlaying = true;
    }
});

// Start Session
startSessionBtn.addEventListener('click', () => {
    totalSeconds = Number(sessionInput.value) * 60;
    startSessionBtn.style.display = 'none';
    toggleSoundBtn.style.display = 'none';
    bellSound.pause(); // Stop sound when session starts
    soundPlaying = false;
    bellSound.currentTime = 0; // Reset sound
    startTimer();
    showPopupMessage('Session started!');
});

// Start Break
startBreakBtn.addEventListener('click', () => {
    totalSeconds = Number(breakInput.value) * 60;
    startBreakBtn.style.display = 'none';
    toggleSoundBtn.style.display = 'none';
    bellSound.pause(); // Stop sound when break starts
    soundPlaying = false;
    bellSound.currentTime = 0; // Reset sound
    startTimer();
    showPopupMessage('Break started!');
});

// Stop and Reset Timers
const stopTimer = () => {
    clearInterval(myInterval);
    myInterval = null;
    bellSound.pause();
    bellSound.currentTime = 0;
    soundPlaying = false;
    toggleSoundBtn.style.display = 'none';
    showPopupMessage('Timer stopped!');
};

const resetTimer = () => {
    clearInterval(myInterval);
    myInterval = null;
    isSession = true;
    totalSeconds = Number(sessionInput.value) * 60;
    updateTimerDisplay();
    startSessionBtn.style.display = 'none';
    startBreakBtn.style.display = 'none';
    bellSound.pause();
    bellSound.currentTime = 0;
    soundPlaying = false;
    toggleSoundBtn.style.display = 'none';
    showPopupMessage('Timer reset!');
};

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);



// Task List Functionality
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const clearTasksButton = document.getElementById('clear-tasks');

taskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const taskItem = document.createElement('li');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `task-${Date.now()}`;

        const label = document.createElement('label');
        label.setAttribute('for', checkbox.id);

        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                taskItem.classList.add('completed');
            } else {
                taskItem.classList.remove('completed');
            }
        });

        const taskTextNode = document.createTextNode(taskText);

        taskItem.appendChild(checkbox);
        taskItem.appendChild(label);
        taskItem.appendChild(taskTextNode);
        taskList.appendChild(taskItem);

        taskInput.value = '';
    }
});

clearTasksButton.addEventListener('click', () => {
    taskList.innerHTML = '';
    showPopupMessage('Task list cleared!');
});
