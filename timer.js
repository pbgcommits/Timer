let timerInterval;
let started = false;
let beginTime;
let timerLength;
let finishTime;

function initTimer() {
    // const startTime = new Date();
    // console.log(startTime);
    // console.log(startTime.getTime());
    // let finishTimeOffset = 3600000;
    // const finishTime = new Date(startTime.getTime() + finishTimeOffset);
    
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
            console.log(hours + "h" + minutes + "m" + seconds + "s");
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
        console.log(new Date().toLocaleTimeString());
    }, 1000)
}

function stopTimer() {
    clearInterval(timerInterval);
}

addEventListener("DOMContentLoaded", initTimer);

