function timer() {
    const startTime = new Date();
    console.log(startTime);
    console.log(startTime.getTime());
    document.getElementById("timeStarted").innerText = startTime.toLocaleTimeString();
    let finishTimeOffset = 3600000;
    const finishTime = new Date(startTime.getTime() + finishTimeOffset);
    document.getElementById("finishTime").innerText = finishTime.toLocaleTimeString();
}

addEventListener("DOMContentLoaded", timer);
