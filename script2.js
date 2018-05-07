

let sessionLength = 1500;    // in case user starts straight with first load of page
let breakLength = 300;

let sessionInitialTime = null;  // to trigger the change of color as the timer goes down
let breakInitialTime = null;

let sessionRemaining = null;
let breakRemaining = null;

let timer = null;

let timerFirstStart = false;  // allow to change the next session length without affecting the current session
let timer_is_on = false;
let timerPaused = false;

// Set the buttons

let buttonStart = document.querySelector('#buttonStart');
let buttonPause = document.querySelector('#buttonPause');
let buttonStop = document.querySelector('#buttonStop');
let buttonReload = document.querySelector('#buttonReload');

let buttonSessionPlus = document.getElementById('sessionPlus');
let buttonSessionMinus = document.getElementById('sessionMinus');
let buttonBreakPlus = document.getElementById('breakPlus');
let buttonBreakMinus = document.getElementById('breakMinus');

let sessionDisplay = document.getElementById('session');
let breakDisplay = document.getElementById('break');
let timeDisplay = document.getElementById("time");
let currentState = document.getElementById("state");


// Actions of buttons plus and minus

buttonSessionPlus.onclick = () => {
    sessionLength = sessionLength + 60;
    sessionDisplay.innerHTML = sessionLength/60;
    if (!timer_is_on && !timerPaused) {
        timeDisplay.innerHTML = printTime(sessionLength);
    }
};

buttonSessionMinus.onclick = () => {
    if (sessionLength >= 120) {
        sessionLength = sessionLength - 60;
    };
    sessionDisplay.innerHTML = sessionLength/60;
    if (!timer_is_on && !timerPaused) {
        timeDisplay.innerHTML = printTime(sessionLength);
    }
};

buttonBreakPlus.onclick = () => {
    breakLength = breakLength + 60;
    breakDisplay.innerHTML = breakLength/60;
};

buttonBreakMinus.onclick = () => {
    if (breakLength >= 120) {
        breakLength = breakLength - 60;
    };
    breakDisplay.innerHTML = breakLength/60;
};


// start the timer

buttonStart.addEventListener('click', function() {

    if (!timer_is_on) {

        // make sure to not start from beginning again
        if (!timerFirstStart) {
            sessionRemaining = sessionLength;
            sessionInitialTime = sessionLength;
            timerFirstStart = true;
        }

        timer = setInterval(pomodoro, 1000);
        timer_is_on = true;
        timerPaused = false;
    }
});

// pause the timer

buttonPause.addEventListener('click', function() {
    if (!timerPaused) {
        clearInterval(timer);
        timer_is_on = false;
        timerPaused = true;
    }
});

// stop the timer and restore it to current user session/break choices

buttonStop.addEventListener('click', function() {

    clearInterval(timer);

    timerFirstStart = false;
    timer_is_on = false;
    timerPaused = false;
    breakActive = false;

    timeDisplay.style.color = 'black';
    timeDisplay.innerHTML = printTime(sessionLength);

});

// reload to default website choice

buttonReload.addEventListener('click', function() {

    clearInterval(timer);

    timerFirstStart = false;
    timer_is_on = false;
    timerPaused = false;
    breakActive = false;

    sessionLength = 1500;
    breakLength = 300;
    timeDisplay.innerHTML = printTime(sessionLength);
    timeDisplay.style.color = 'black';
    sessionDisplay.innerHTML = sessionLength/60;
    breakDisplay.innerHTML = breakLength/60;

});


// pomodoro function to print the remaining time of session and break

let breakActive = false;

function pomodoro() {

    if (sessionRemaining > 0 && !breakActive) {

        sessionRemaining--;
        if (sessionRemaining <= sessionInitialTime/10) {
            timeDisplay.style.color = 'rgb(100, 6, 6)';
        } else if (sessionRemaining <= sessionInitialTime/5) {
            timeDisplay.style.color = 'grgb(197, 178, 7)';
        };
        timeDisplay.innerHTML = printTime(sessionRemaining);
        currentState.innerHTML = 'Session';

        breakRemaining = breakLength;
        breakInitialTime = breakLength;

    } else if (breakRemaining < 0) {

        sessionRemaining = sessionLength;
        sessionInitialTime = sessionLength;
        timeDisplay.style.color = 'color: rgb(29, 29, 29)';

        timeDisplay.innerHTML = printTime(sessionRemaining);
        currentState.innerHTML = 'Session';

    } else {


        if (!breakActive) {
            breakRemaining = breakLength;
            breakInitialTime = breakLength;
            timeDisplay.style.color = 'color: rgb(29, 29, 29)';
        };
        breakActive = true;
        
        currentState.innerHTML = 'Break';
        timeDisplay.innerHTML = printTime(breakRemaining);

        breakRemaining--;

        if (breakRemaining < breakInitialTime/10) {
            timeDisplay.style.color = 'rgb(100, 6, 6)';
        } else if (breakRemaining < breakInitialTime/5) {
            timeDisplay.style.color = 'rgb(197, 178, 7)';
        };

        if (breakRemaining < 0) {
            breakActive = false;
        };
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