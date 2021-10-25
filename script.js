let progressCircle = document.querySelector(".progress");
const topBtns = document.querySelectorAll('.top')
let timeMin = document.querySelector('.time-minutes')
let timeSec = document.querySelector('.time-seconds')
const startPause = document.querySelector('.start-pause')


let timeMinSave = 25
let timeSecSave = "00"

//Work Timer Countdown
function timer(){
    if(timeSec.innerText != 0){
        if (timeSec.innerText > 10) {
            timeSec.innerText--;
        } else {
            timeSec.innerText = `0${(timeSec.innerText - 1)}`
        }
    } else if(timeMin.innerText != 0 && timeSec.innerText == 0){
        if (timeMin.innerText > 10) {
            timeMin.innerText--;
            timeSec.innerText = 59;
        } else {
            timeMin.innerText = `0${(timeMin.innerText - 1)}`
            timeSec.innerText = 59;
        }
    }
    else {
        startPause.innerHTML = "<h3>restart</h3>"
    }
}

// progress circle
let radius = progressCircle.r.baseVal.value;
//circumference of a circle = 2πr;
let circumference = radius * 2 * Math.PI;
progressCircle.style.strokeDasharray = circumference;

let percents
function setProgress(percents) {
    percents = ((parseInt(timeMin.innerText) * 60) + parseInt(timeSec.innerText)) / (parseInt(timeMinSave) * 60 / 100)
    progressCircle.style.strokeDashoffset =  (percents / 100) * circumference;
}

// start, pause and restart
let runCircle
let runTime
startPause.addEventListener('click', (e) => {
    const cliced = e.target.closest('.start-pause')
    if (cliced.innerText === "START") {
        cliced.innerHTML = "<h3>Pause</h3>"
        runTime = setInterval(timer, 1000)
        runCircle = setInterval(setProgress, 1000)
    } else if (cliced.innerText === "PAUSE") {
        cliced.innerHTML = "<h3>start</h3>"
        clearInterval(runTime)
        clearInterval(runCircle)
    } else {
        cliced.innerHTML = "<h3>start</h3>"
        timeMin.innerText = timeMinSave
        timeSec.innerText = timeSecSave
        clearInterval(runTime)
        clearInterval(runCircle)
    }
})

// header clearSwitch
function clearSwitch() {
    timeSecSave = "00"
    timeSec.innerText = "00"
    clearInterval(runTime)
    clearInterval(runCircle)
    setProgress(0)
    startPause.innerHTML = "<h3>start</h3>"
}
// header Switch Btn
topBtns.forEach((topBtn) => {
    topBtn.addEventListener('click', (e) => {
        topBtns.forEach((btn) => {
            const cliced = e.target.closest('.top')
            if(!cliced.classList.contains('active')) {
                if (cliced.innerText === "pomodoro") {
                    timeMinSave = 25
                    timeMin.innerText = 25
                    clearSwitch()
                } else if (cliced.innerText === "short break") {
                    timeMinSave = 5
                    timeMin.innerText = 5
                    clearSwitch()
                } else if (cliced.innerText === "long break") {
                    timeMinSave = 15
                    timeMin.innerText = 15
                    clearSwitch()
                }
            }
            btn.classList.remove('active')
            cliced.classList.add('active')
            })
        }) 
    })


