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


// Function to make an element draggable
const makeDraggable = (elementId) => {
    const element = document.getElementById(elementId);

    let offsetX = 0; 
    let offsetY = 0;
    let isDragging = false;

    // Mouse down event: Start dragging
    element.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - element.getBoundingClientRect().left;
        offsetY = e.clientY - element.getBoundingClientRect().top;
        element.style.cursor = 'grabbing'; // Change cursor
    });

    // Mouse move event: Update position
    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            element.style.left = `${e.clientX - offsetX}px`;
            element.style.top = `${e.clientY - offsetY}px`;
        }
    });

    // Mouse up event: Stop dragging
    document.addEventListener('mouseup', () => {
        isDragging = false;
        element.style.cursor = 'grab'; // Reset cursor
    });
};

// Makes containers draggable
makeDraggable('app-container');
makeDraggable('task-container');
makeDraggable('spotify-container')


//spotify api
const clientId = '5b1cc677bbe24fd9b0135d64ca4048c8';
const redirectUri = 'http://127.0.0.1:5500/src/index.html';
const scopes = 'user-read-playback-state user-modify-playback-state';

let accessToken = 'BQD5b8R2DZRPq1ft09IssfldSpE3JlDN1YL8JJ1lxOU0EZ1VS3owIHX8AbDM-U86koDz-9CDEdXjkdQ1TTDIxAf4RF8AGwCBoJMASQArEgwu4nqNWquqyRSYqgdbZ7m0w4h6K8q7GYp5vA0So_6M2lHepTzoqLdkGIUjrY5eLu3SjBqabe7e882DTBdj0Vkm1Hn3NUbSo9zlkYPuwvIX_LQSfqYsG9sEK9mZQxov';
let deviceId = '';
let currentTrackUri = '';

// Spotify Login
document.getElementById('login-button').addEventListener('click', () => {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scopes}`;
    window.location.href = authUrl;
});

// Extract Token
window.onload = async () => {
    const hash = window.location.hash;
    if (hash) {
        accessToken = new URLSearchParams(hash.substring(1)).get('access_token');
        document.getElementById('login-button').style.display = 'none';
        document.getElementById('search-container').style.display = 'block';

        const devicesResponse = await fetch('https://api.spotify.com/v1/me/player/devices', {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        const devicesData = await devicesResponse.json();
        if (devicesData.devices.length > 0) {
            deviceId = devicesData.devices[0].id;
        }
    }
};

// Search for Tracks
document.getElementById('search-button').addEventListener('click', async () => {
    const query = document.getElementById('search-input').value;
    const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track`, {
        headers: { Authorization: `Bearer ${accessToken}` }
    });
    const data = await response.json();
    const resultsList = document.getElementById('results-list');
    resultsList.innerHTML = '';
    data.tracks.items.forEach(track => {
        const listItem = document.createElement('li');
        listItem.textContent = `${track.name} by ${track.artists.map(artist => artist.name).join(', ')}`;
        listItem.addEventListener('click', () => playTrack(track.uri, track.name));
        resultsList.appendChild(listItem);
    });
});

// Play Track
const playTrack = async (uri, name) => {
    currentTrackUri = uri;
    document.getElementById('current-track').textContent = `Playing: ${name}`;
    document.getElementById('player-container').style.display = 'block';
    await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${accessToken}` },
        body: JSON.stringify({ uris: [uri] })
    });
};

// Player Controls
document.getElementById('play-button').addEventListener('click', async () => {
    await fetch('https://api.spotify.com/v1/me/player/play', {
        method: 'PUT',
        headers: { Authorization: `Bearer ${accessToken}` }
    });
});

document.getElementById('pause-button').addEventListener('click', async () => {
    await fetch('https://api.spotify.com/v1/me/player/pause', {
        method: 'PUT',
        headers: { Authorization: `Bearer ${accessToken}` }
    });
});

document.getElementById('next-button').addEventListener('click', async () => {
    await fetch('https://api.spotify.com/v1/me/player/next', {
        method: 'POST',
        headers: { Authorization: `Bearer ${accessToken}` }
    });
});

document.getElementById('previous-button').addEventListener('click', async () => {
    await fetch('https://api.spotify.com/v1/me/player/previous', {
        method: 'POST',
        headers: { Authorization: `Bearer ${accessToken}` }
    });
});

// Volume Control
document.getElementById('volume-slider').addEventListener('input', async (event) => {
    const volumePercent = event.target.value;
    await fetch(`https://api.spotify.com/v1/me/player/volume?volume_percent=${volumePercent}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${accessToken}` }
    });
});
