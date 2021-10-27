let progressCircle = document.querySelector(".progress");
const topBtns = document.querySelectorAll('.top')
let timeMin = document.querySelector('.time-minutes')
let timeSec = document.querySelector('.time-seconds')
const startPause = document.querySelector('.start-pause')
const overlay = document.querySelector('.overlay')
const modal = document.querySelector('.modal')

// save time
let timeSecSave = "00"
let timeMinSaveArr = [25, 05, 15]
let dataId;
function dataIdCalc() {
    topBtns.forEach((btn) => {
        if (btn.classList.contains('active')) {
            dataId = btn.getAttribute('data-id')
        }
    })
}

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
    percents = ((parseInt(timeMin.innerText) * 60) + parseInt(timeSec.innerText)) / (parseInt(timeMinSaveArr[dataId]) * 60 / 100)
    progressCircle.style.strokeDashoffset =  (percents / 100) * circumference;
}

// start, pause and restart
let runCircle
let runTime
startPause.addEventListener('click', (e) => {
    dataIdCalc()
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
        timeMin.innerText = timeMinSaveArr[dataId]
        timeSec.innerText = timeSecSave
        clearInterval(runTime)
        clearInterval(runCircle)
    }
})

// header clearSwitch
function clearSwitch() {
    timeSec.innerText = "00"
    setProgress(0)
    clearInterval(runTime)
    clearInterval(runCircle)
    startPause.innerHTML = "<h3>start</h3>"
}
// header Switch Btn
topBtns.forEach((topBtn) => {
    topBtn.addEventListener('click', (e) => {
        topBtns.forEach((btn) => {
            const cliced = e.target.closest('.top')
            if(!cliced.classList.contains('active')) {
                dataId = cliced.getAttribute('data-id')
                if (cliced.innerText === "pomodoro") {
                    timeMin.innerText = timeMinSaveArr[dataId]
                    clearSwitch()
                } else if (cliced.innerText === "short break") {
                    timeMin.innerText = timeMinSaveArr[dataId]
                    clearSwitch()
                } else if (cliced.innerText === "long break") {
                    timeMin.innerText = timeMinSaveArr[dataId]
                    clearSwitch()
                }
            }
            btn.classList.remove('active')
            cliced.classList.add('active')
            })
        }) 
    })
 //////////////////////////
///// modal settings /////
const settingsBtn = document.querySelector('.settings')
const arrows = document.querySelectorAll('.arrows svg')
const colorBtns = document.querySelectorAll('.color-btn')
const closeBtn = document.querySelector('.close-btn')
const button = document.querySelector('button')
const input1 = document.querySelector('.input1')
const input2 = document.querySelector('.input2')
const input3 = document.querySelector('.input3')
const body = document.querySelector('body')


// dataIdTopCalc
let dataIdTop;
function dataIdTopCalc() {
    topBtns.forEach((topBtn) => {
        if (topBtn.classList.contains('active')) {
            dataIdTop = topBtn.getAttribute('data-id')
        }
    })
}
// button
button.addEventListener('click', () => {
    timeMinSaveArr = [input1.value, input2.value, input3.value]
    colorBtns.forEach((colorBtn) => {
        if (colorBtn.classList.contains('active') && colorBtn.classList.contains('red')) {
            document.documentElement.style.setProperty('--red','rgb(248,112,112)')
            body.style.fontFamily = 'var(--fontFamilyKumbh)'
        } else if (colorBtn.classList.contains('active') && colorBtn.classList.contains('turquoise')) {
            document.documentElement.style.setProperty('--red','rgb(122,243,248)')
            body.style.fontFamily = 'var(--fontFamilyRoboto)'
        } else if (colorBtn.classList.contains('active') && colorBtn.classList.contains('purple')) {
            document.documentElement.style.setProperty('--red','rgb(216,129,248)')
            body.style.fontFamily = 'var(--fontFamilySpace)'
        }
    })
    clearSwitch()
    progressCircle.style.strokeDashoffset = progressCircle.style.strokeDasharray
    dataIdTopCalc()
    timeMin.innerText = timeMinSaveArr[dataIdTop]
    closeModal()
})

// open modal
settingsBtn.addEventListener('click', () => {
    modal.classList.remove('hidden')
    overlay.classList.remove('hidden')
})

// close
function closeModal() {
    modal.classList.add('hidden')
    overlay.classList.add('hidden')
}
closeBtn.addEventListener('click', closeModal)
overlay.addEventListener('click', (e) => {
    if(e.target === overlay) {
        closeModal();
    }
})
document.addEventListener('keydown', function (e) {

    if  (e.key === 'Escape' && !overlay.classList.contains('hidden')) {
        closeModal();
    }
})

// change color btn active
colorBtns.forEach((colorBtn) => {
    colorBtn.addEventListener('click', (e) => {
        colorBtns.forEach((btn) => {
            btn.classList.remove('active')
        })
        const cliced = e.target.closest('.color-btn')
        cliced.classList.add('active')
    })
})

// change time minutes
arrows.forEach((arrow) => {
    arrow.addEventListener('click', (e) => {
        const cliced = e.target.closest('.arrows-div')
        let inputValue = parseInt(cliced.previousElementSibling.value)
        if (e.target.classList.contains('arrow-up')) {
            inputValue += 1
            cliced.previousElementSibling.value = inputValue
        } else {
            inputValue -= 1
            cliced.previousElementSibling.value = inputValue
        }
    })
})