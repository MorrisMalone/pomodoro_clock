

let sessionLength = 10;
let breakLength = 5;

let sessionRemaining = 10;
let breakRemaining = 5;
let timer = null;
let timerStarted = false;
let timerPaused = false;

// Set the buttons

let buttonStart = document.querySelector('#buttonStart');
let buttonPause = document.querySelector('#buttonPause');
let buttonStop = document.querySelector('#buttonPause');
let buttonReload = document.querySelector('#buttonReload');

let buttonSessionPlus = document.getElementById('sessionPlus');
let buttonSessionMinus = document.getElementById('sessionMinus');
let buttonBreakPlus = document.getElementById('breakPlus');
let buttonBreakMinus = document.getElementById('breakMinus');

let sessionDisplay = document.getElementById('session');
let breakDisplay = document.getElementById('break');
let timeDisplay = document.getElementById("time");


// Actions of buttons plus and minus

buttonSessionPlus.onclick = () => {
    sessionLength++;
    sessionDisplay.innerHTML = sessionLength;
    if (!timerStarted && !timerPaused) {
        timeDisplay.innerHTML = printTime(sessionLength);
    }
};

buttonSessionMinus.onclick = () => {
    sessionLength--;
    sessionDisplay.innerHTML = sessionLength;
    if (!timerStarted && !timerPaused) {
        timeDisplay.innerHTML = printTime(sessionLength);
    }
};

buttonBreakPlus.onclick = () => {
    breakLength++;
    breakDisplay.innerHTML = breakLength;
};

buttonBreakMinus.onclick = () => {
    breakLength--;
    breakDisplay.innerHTML = breakLength;
};

// start the timer

buttonStart.addEventListener('click', function() {
    if (!timerStarted) {
        timer = setInterval(pomodoro, 1000);
        timerStarted = true;
        timerPaused = false;
    }
});

// pause the timer

buttonPause.addEventListener('click', function() {
    if (!timerPaused) {
        clearInterval(timer);
        timerStarted = false;
        timerPaused = true;
    }
});

// stop the timer and restore it to current user session/break choices

buttonStop.addEventListener('click', function() {
    clearInterval(timer);
    timerStarted = false;
});

// reload to default website choice

buttonReload.addEventListener('click', function() {
    clearInterval(timer);
    timerStarted = false;
});


// pomodoro function to print the remaining time of session and break

let breakActive = false;

function pomodoro() {

    if (sessionRemaining > 0 && !breakActive) {

        sessionRemaining--;
        timeDisplay.innerHTML = printTime(sessionRemaining);

    } else if (session) {

        sessionRemaining = sessionLength;
        breakRemaining = breakLength;

        timeDisplay.innerHTML = printTime(sessionRemaining);

    } else {

        timeDisplay.innerHTML = printTime(breakRemaining);
        breakRemaining--;

    }
}

// order time in writing

function printTime(time) {

    let hours = Math.floor( time / 3600);
    let minutes = Math.floor(( time % 3600) / 60);
    let seconds = time % 60;

    if (hours > 0) {

        return padding(hours) + ':' + padding(minutes) + ':' + padding(seconds);

    } else {

        return padding(minutes) + ':' + padding(seconds);

    }
}

// pad the time to display it properly

function padding(number) {

    if (number < 10) {

        return '0' + number.toString();

    } else return number;

}