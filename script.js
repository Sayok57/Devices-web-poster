document.addEventListener('DOMContentLoaded', () => {

    //============KEYCUPS================
    let body = document.querySelector('body');
    let keycups = document.querySelectorAll('.keycup');
    let enter = document.querySelector('.enter-keycup');
    let flag = false;
    let display;
    keycups.forEach(el => {
        el.style.transition = "0.8s"
        el.addEventListener('mouseenter', () => {
            el.style.transform = "scale(1.1) rotate(360deg)";
        })
        el.addEventListener('mouseleave', () => {
            el.style.transform = "scale(1) rotate(0deg)"
        })
        el.addEventListener('click', () => {
            display = "none";
            flag = !flag;
            document.addEventListener('mousemove', (e) => {
                if (flag == true) {
                    let posX = e.clientX;
                    let posY = e.clientY;
                    el.style.position = "absolute";
                    el.style.left = `${posX}px`;
                    el.style.top = `${posY}px`;
                }
                else if (flag == false) {
                    el.style.position = '';
                    el.style.left = '';
                    el.style.right = '';
                    el.style.display = display;
                }
            })
            console.log(flag)
        })
    })
    enter.addEventListener('mouseenter', () => {
        enter.style.transition = "0.2s";
        enter.style.transform = "scale(1.1)";
    })
    enter.addEventListener('mouseleave', () => {
        enter.style.transition = "0.2s";
        enter.style.transform = "scale(1)";
    })
    enter.addEventListener('click', () => {
        display = "flex";
    })

    //===========GAME-WIDNOWS================

    //======CPS Window=========
    let startBtn = document.querySelector('.start-play-btn');
    let timer = document.querySelector('#timer');
    let score = document.querySelector('#score');
    let cpsContent = document.querySelector('#cps-content');
    let cpsWindow = document.querySelector('#cps-window');
    let cpsResult = document.querySelector('#cps');
    let cpsScore = 0;
    let timeValue = 3;
    let cpsInterval = null;
    let cpsFlag = false;
    function clickHandler() {
        if (cpsFlag) {
            cpsScore++;
            score.textContent = cpsScore;
        }
    }
    cpsWindow.addEventListener('click', clickHandler);
    startBtn.addEventListener('click', () => {
        cpsFlag = !cpsFlag;
        cpsContent.style.opacity = "0";
        startBtn.style.display = "none";
        let emptyDiv = document.createElement('div');
        emptyDiv.style = "width: 100%; height: 60px;"
        cpsContent.appendChild(emptyDiv);
        cpsInterval = setInterval(() => {
            timeValue--;
            timer.textContent = `${timeValue} сек`;
            if (timeValue <= 0) {
                clearInterval(cpsInterval)
                cpsInterval = null;
                cpsContent.style.opacity = "1";
                emptyDiv.remove();
                startBtn.style.display = "flex";
                cpsResult.textContent = `${(cpsScore / 3).toFixed(2)}`;
                timeValue = 3;
                timer.textContent = `${timeValue} сек`;
                cpsScore = 0;
                cpsFlag = false;
            }
        }, 1000)
    })
    //======FPS Window=============
    scaleBtn = document.querySelector('.scale-btn');
    scaleBtn.style.position = "absolute";
    scaleBtn.style.cursor = 'grab';
    let isDragging = false;
    let offsetX = 0;
    let scaler = document.querySelector('.scaler');
    let fpsUi = document.querySelector('#fpsUi');
    function setButtonPosition(x) {
        let scalerBounds = scaler.getBoundingClientRect();
        let minX = scalerBounds.left;
        let maxX = scalerBounds.right - scaleBtn.offsetWidth;
        x = Math.max(minX, Math.min(x, maxX));
        scaleBtn.style.left = `${x}px`;
        return x;
    }

    scaleBtn.addEventListener('mousedown', (e) => {
        fpsUi.style.opacity = '1';
        let scaleBtnBounds = scaleBtn.getBoundingClientRect();
        offsetX = e.clientX - scaleBtnBounds.left;
        body.style.cursor = 'grabbing';
        scaleBtn.style.cursor = 'grabbing';
        e.preventDefault();
        isDragging = true;
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        scaleBtn.style.cursor = 'grab';
        body.style.cursor = 'auto';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        let currentPos = e.clientX - offsetX;
        setButtonPosition(currentPos);
    });
    document.addEventListener('mouseleave', () => {
        if (isDragging) {
            isDragging = false;
            scaleBtn.style.cursor = 'grab';
        }
    });
    let fpsInterval = null;
    function FpsHandler() {
        if (fpsInterval) {
            clearInterval(fpsInterval);
        }
        fpsInterval = setInterval(() => {
            let currentPos = parseFloat(scaleBtn.style.left) || 0;
            let scalerBounds = scaler.getBoundingClientRect();
            let minPos = scalerBounds.left;
            let maxPos = scalerBounds.right - scaleBtn.offsetWidth;
            let percent = ((currentPos - minPos) / (maxPos - minPos)) * 100;
            let minFps = 30;
            let maxFps = 360;
            let currentFps = minFps + (percent / 100) * (maxFps - minFps);
            fpsUi.textContent = `${Math.round(currentFps)} fps`;
        }, 100); 
    }
    FpsHandler();


});