const bells = new Audio('../audio/bell.wav');
const startBtn = document.querySelector('.btn-start');
const stopBtn = document.querySelector('.btn-stop');
const resetBtn = document.querySelector('.btn-reset');
const session = document.querySelector('.minutes');

let myInterval = null;
let state = true;
let totalSeconds = 0;

const appTimer = () => {
    if (state) {
        state = false;
        const sessionAmount = Number.parseInt(session.textContent);
        if (totalSeconds === 0) {
            totalSeconds = sessionAmount * 60;
        }

        const updateSeconds = () => {
            const minuteDiv = document.querySelector('.minutes');
            const secondDiv = document.querySelector('.seconds');

            if (totalSeconds > 0) {
                totalSeconds--;

                let minutesLeft = Math.floor(totalSeconds / 60);
                let secondsLeft = totalSeconds % 60;

                secondDiv.textContent = secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft;
                minuteDiv.textContent = `${minutesLeft}`;
            }

            if (totalSeconds === 0) {
                bells.play();
                clearInterval(myInterval);
                myInterval = null;
                state = true;
            }
        };

        myInterval = setInterval(updateSeconds, 1000);
    } else {
        alert('Timer is already running');
    }
};

const stopTimer = () => {
    if (myInterval) {
        clearInterval(myInterval);
        myInterval = null;
    }
    state = true;
};

const resetTimer = () => {
    clearInterval(myInterval);
    myInterval = null;
    state = true;
    totalSeconds = 0;
    const minuteDiv = document.querySelector('.minutes');
    const secondDiv = document.querySelector('.seconds');
    minuteDiv.textContent = '25';
    secondDiv.textContent = '00';
};

startBtn.addEventListener('click', appTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);


const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

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


