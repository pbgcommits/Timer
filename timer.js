let timerInterval;
let started = false;
let beginTime;
let timerLength;
let finishTime;
let secondsPassed = 0;

// None of this is working :D :D :D
// const keepAlive = () => setInterval(chrome.runtime.getPlatformInfo, 20e3);
// // chrome.runtime.onStartup.addListener(createTimerInterval);
// chrome.runtime.onStartup.addListener(keepAlive);
// keepAlive();
// // createTimerInterval();

function initTimer() {
    // Default timer is 30 minutes
    const defaultTime = getDefaultTime();
    if (!localStorage.getItem("hours")) localStorage.setItem("hours", defaultTime["hours"]);
    if (!localStorage.getItem("minutes")) localStorage.setItem("minutes", defaultTime["minutes"]);
    if (!localStorage.getItem("seconds")) localStorage.setItem("seconds", defaultTime["seconds"]);
    displayRemainingTime();
    document.getElementById("timerToggle").addEventListener("click", function() {
        if (started) {
            pauseTimer();
        }
        else {
            startTimer();
        }
        started = !started;
    })
    document.getElementById("timerReset").addEventListener("click", resetTimer);
}

function startTimer() {
    document.getElementById("timerToggle").innerText = "Pause timer";
    const seconds = document.getElementById("seconds").value * 1;
    const minutes = document.getElementById("minutes").value * 1;
    const hours = document.getElementById("hours").value * 1;
    // document.getElementById("timeRemaining").innerText = formatTime(hours, minutes, seconds);
    timerLength = (hours * 3600 + minutes * 60 + seconds) * 1000;
    beginTime = new Date();
    finishTime = new Date(beginTime.getTime() + timerLength);
    document.getElementById("timeStarted").innerText = beginTime.toLocaleTimeString();
    document.getElementById("finishTime").innerText = finishTime.toLocaleTimeString();
    document.getElementById("timeStarted").style = "";
    document.getElementById("finishTime").style = "";
    // timerInterval = createTimerInterval();
    createTimerInterval();
    // chrome.action.onClicked.addListener(async () => {createTimerInterval()});
}

function createTimerInterval() {
    console.log("creating timer");
    timerInterval = setInterval(function() {
        // chrome.runtime.getPlatformInfo;
        secondsPassed++;
        // Account for inaccuracy in timer interval
        timerLength -= 1000 + (Date.now()-beginTime.getTime()) - 1000 * secondsPassed;
        const hours = Math.floor(timerLength / 3600000);
        // The +1 and -1 make it show x minutes, 0 seconds instead of x-1 minutes, 60 seconds
        const seconds = Math.round(((timerLength / 1000)+1) % 60)-1;
        // "(seconds ? 0 : 1)" makes it show x minutes, 0 seconds instead of x-1 minutes, 0 seconds
        const minutes = Math.floor(((timerLength / 60000)) % 60) + (seconds ? 0 : 1);
        localStorage.setItem("seconds", seconds);
        localStorage.setItem("minutes", minutes);
        localStorage.setItem("hours", hours);
        // document.getElementById("timeRemaining").innerText = formatTime(hours, minutes, seconds);
        document.getElementById("hours").value = hours;
        document.getElementById("minutes").value = minutes;
        document.getElementById("seconds").value = seconds;
        if (hours >= 1) {
            chrome.action.setBadgeText({ text: hours + 'h' + minutes });
        }
        else if (minutes >= 10) {
            chrome.action.setBadgeText({ text: minutes + 'm' });
        }
        else {
            chrome.action.setBadgeText({ text: minutes + ":" + seconds.toString().padStart(2, "0") });
        }
        if (timerLength < 0) {
            resetTimer();
        }
    }, 1000)
}

function pauseTimer() {
    document.getElementById("timerToggle").innerText = "Start timer";
    clearInterval(timerInterval);
    secondsPassed = 0;
    // document.getElementById("timeStarted").innerText = "";
    // document.getElementById("finishTime").innerText = "";
    document.getElementById("timeStarted").style = "text-decoration: line-through";
    document.getElementById("finishTime").style = "text-decoration: line-through";
}

function resetTimer() {
    clearInterval(timerInterval);
    secondsPassed = 0;
    // document.getElementById("timeRemaining").innerText = formatTime(0, 0, 0);
    chrome.action.setBadgeText({});
    window.alert("Timer done!");
    const defaultTime = getDefaultTime();
    localStorage.setItem("hours", defaultTime["hours"]);
    localStorage.setItem("minutes", defaultTime["minutes"]);
    localStorage.setItem("seconds", defaultTime["seconds"]);
    started = false;
    document.getElementById("timerToggle").innerText = "Start timer";
    displayRemainingTime();
}

// aaaaa
function formatTime(hours, minutes, seconds) {
    return hours.toString() + "h, " + minutes.toString() + "m, " + seconds.toString() + "s";
}

function getDefaultTime() {
    return { "hours": 0, "minutes": 0, "seconds": 30 };
}

function displayRemainingTime() {
    document.getElementById("hours").value = localStorage.getItem("hours");
    document.getElementById("minutes").value = localStorage.getItem("minutes");
    document.getElementById("seconds").value = localStorage.getItem("seconds");
}

addEventListener("DOMContentLoaded", initTimer);
// chrome.action.setBadgeBackgroundColor({ color: 'green' });
// TODO might delete this :)
// chrome.action.setBadgeText({});