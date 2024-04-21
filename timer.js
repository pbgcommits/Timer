let timerInterval;
let started = false;
let beginTime;
let timerLength;
let finishTime;
let secondsPassed = 0;

function initTimer() {
    document.getElementById("timerToggle").addEventListener("click", function() {
        if (started) {
            stopTimer();
            document.getElementById("timerToggle").innerText = "Start timer";
        }
        else {
            beginTime = new Date();
            seconds = document.getElementById("seconds").value * 1;
            minutes = document.getElementById("minutes").value * 1;
            hours = document.getElementById("hours").value * 1;
            document.getElementById("timeRemaining").innerText = formatTime(hours, minutes, seconds);
            timerLength = (hours * 3600 + minutes * 60 + seconds) * 1000;
            finishTime = new Date(beginTime.getTime() + timerLength);
            document.getElementById("timeStarted").innerText = beginTime.toLocaleTimeString();
            document.getElementById("finishTime").innerText = finishTime.toLocaleTimeString();
            document.getElementById("timerToggle").innerText = "Stop timer";
            startTimer();
        }
        started = !started;
    })
}

function startTimer() {
    timerInterval = setInterval(function() {
        // Account for inaccuracy in timer interval
        secondsPassed++;
        timerLength -= 1000 + (Date.now()-beginTime.getTime()) - 1000 * secondsPassed;
        hours = Math.floor(timerLength / 3600000);
        minutes = Math.floor((timerLength / 60000) % 60);
        seconds = Math.round((timerLength / 1000) % 60);
        document.getElementById("timeRemaining").innerText = formatTime(hours, minutes, seconds);
    }, 1000)
}

function stopTimer() {
    clearInterval(timerInterval);
}

function formatTime(hours, minutes, seconds) {
    return hours.toString() + "h, " + minutes.toString() + "m, " + seconds.toString() + "s";
}

addEventListener("DOMContentLoaded", initTimer);

