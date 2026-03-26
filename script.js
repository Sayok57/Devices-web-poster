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
    let scaleBtn = document.querySelector('.scale-btn');
    scaleBtn.style.position = "absolute";
    scaleBtn.style.cursor = 'grab';
    let fpsUi = document.querySelector('#fpsUi');
    let isDraggable = false
    scaleBtn.addEventListener('pointerdown', (e) => {
        isDraggable = true;
    })
    window.addEventListener('pointerup', (e) => {
        isDraggable = false;
    })
    window.addEventListener('pointermove', (e) => {
        if (isDraggable) {
            let position = e.pageX - scaleBtn.parentElement.getBoundingClientRect().left
            let minX = 0;
            let maxX = scaleBtn.parentElement.getBoundingClientRect().width - scaleBtn.offsetWidth;
            console.log(minX)
            console.log(maxX)
            let capped = Math.max(minX, Math.min(position, maxX))
            scaleBtn.style.left = `${capped}px`
            let maxFPS = 360
            let minFPS = 30
            let fps = Math.round(Math.max(minFPS, Math.min(capped, maxFPS)))
            fpsUi.textContent = `${fps} fps`;
        }
    })
    //========PLAY Window======================
    function random(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    let playWindow = document.querySelector('#play-window');
    let gameName = document.querySelector('#game-name');
    let playBtn = document.querySelector('#playBtn');
    let playName = document.querySelector('#playName');
    let isPlayed = false;
    const gameNames = ["Fortnite", "CS2", "Valorant", "Dota", "Minecraft", "Roblox"];
    playBtn.addEventListener('click', () => {
        isPlayed = !isPlayed
        if (isPlayed) {
            playName.style.opacity = 0;
            let currGame = random(0, gameNames.length);
            gameName.textContent = gameNames[currGame];
            playWindow.style.backgroundSize = "200%, 200%";
            playWindow.style.backgroundPosition = "center";
            playWindow.style.backgroundImage = `url(assets/images/${gameNames[currGame]}.gif)`;
        }
        else {
            playName.style.opacity = 1;
            gameName.textContent = "None";
            playWindow.style.backgroundImage = '';
        }
    })
    //============================================

    //=======FILTERS SECTION======================
    let selectBtn = document.querySelector('.select-btn');
    let filtersName = document.querySelector('#filters-nameId');
    let btn2000 = document.querySelector('#Btn2000');
    let btn2016 = document.querySelector('#Btn2016');
    let btn2026 = document.querySelector('#Btn2026');
    let psBtn = document.querySelector('#psBtn');
    let mouseBtn = document.querySelector('#mouseBtn');
    let keyboardBtn = document.querySelector('#keyboardBtn');
    let productImage = document.querySelector('.item-box');
    let desc = document.querySelector('#desc');
    const summaries = [
        "Sony PlayStation 2 — это не просто игровая приставка, а настоящий культурный феномен, ставший самым продаваемым игровым устройством в истории (более 155 млн единиц). Её «секретное оружие» скрывалось в аппаратной начинке: инженеры Sony добавили в консоль специальный чип IOP, который позволял ей работать как полноценный Linux-сервер. Именно благодаря этой архитектуре спецслужбы США в 2002 году закупили партию PS2, собрав из них суперкомпьютер для военных расчетов, так как производительность такого кластера оказалась дешевле и доступнее официальных серверных решений того времени."
        , "К моменту выхода PS4 в 2013 году Sony сделала ставку не на экзотическую архитектуру, а на максимальное сближение с PC, что кардинально упростило жизнь разработчикам. Интересно, что именно эта консоль стала «спасательным кругом» для японского гиганта: после финансовых проблем в начале 2010-х инженеры решили отказаться от сложного чипа Emotion Engine и перешли на стандартное x86-ядро AMD. Это решение не только спасло подразделение PlayStation от закрытия, но и подарило миру такие хиты, как God of War и The Last of Us Part II, установив стандарт для нового поколения гибридных архитектур."
        , "PlayStation 5 — это не просто консоль нового поколения, а инженерная попытка убить время загрузки раз и навсегда. Её главная инновация скрывается не в графическом процессоре, а в кастомном SSD-накопителе, который выдает скорость чтения данных до 5,5 ГБ/с в сжатом виде. Чтобы достичь таких показателей, инженеры Sony установили специальные контроллеры с 12 каналами параллельного доступа, что в 100 раз быстрее, чем у PS4. Интересный факт: из-за невероятно высокой частоты работы накопителя разработчикам пришлось предусмотреть уникальную систему охлаждения для SSD, распределив её по всей материнской плате, а сама консоль получила футуристический дизайн с «воротником», который, по задумке дизайнеров, не только улучшает циркуляцию воздуха, но и визуально символизирует парящий в воздухе высокоскоростной поток данных, мгновенно загружающий игровые миры без экранов загрузки."
        , "Мыши Genius образца 2000 года — это символ эпохи становления массового домашнего интернета. В то время как все гнались за оптическими сенсорами, одной из самых популярных моделей бренда стала «NetScroll» с механикой шарика. Главный инженерный парадокс заключался в том, что эти мыши были настолько живучими, что пользователи часто снимали с них тяжелый металлический шарик для стирки или даже использовали его в качестве импровизированного подшипника в быту. Именно Genius в России и СНГ долгое время оставался синонимом слова «мышь», потому что комплектные манипуляторы шли в каждом третьем собранном системном блоке того времени."
        , "В начале 2000-х Logitech совершила революцию, выпустив легендарную MX500 и её проводные аналоги, задавшие форму эргономики на десятилетия вперед. Интересный факт: именно инженеры Logitech первыми решили проблему «акселерации» мыши, из-за которой курсор дергался при резких движениях. Они установили в свои игровые мыши цифровые контроллеры с частотой опроса 125 Гц, тогда как стандартные мыши работали на 40–60 Гц. Это дало киберспортсменам того времени настолько мощное преимущество, что на турнирах по Quake III Arena и CS 1.6 мыши Logitech фактически стали негласным стандартом, меняя подход к «железу» так же сильно, как видеокарты."
        , "Эта мышь представляет собой вершину инженерного минимализма, где каждый грамм подчинен победе. Веся всего около 60 грамм, Superlight 2 является результатом многолетних исследований профессиональных игроков, которые доказали: снижение веса снижает усталость кисти и повышает точность микро-коррекций. Инженерам Logitech пришлось разработать уникальный композитный материал для корпуса, чтобы при такой облегченной конструкции сохранить жесткость, достаточную для того, чтобы мышь не треснула при мощном клике или случайном падении со стола во время напряженного матча."
        , "Если говорить о старой клавиатуре, то королем здесь является IBM Model M, которую до сих пор называют «танком» среди периферии. Эти клавиатуры, выпущенные еще в 1985 году, настолько пережили свое время, что до сих пор имеют фанатское сообщество. Интересный факт: они весили более 2 кг, имели металлическую подложку внутри и были рассчитаны на ударопрочность в 50 миллионов нажатий на клавишу. Многие экземпляры, произведенные 30 лет назад, до сих пор работают на заводах и в офисах, пережив десятки компьютеров, к которым они подключались, — это редкий пример технологии, ставшей «вечной»."
        , "Razer совершила переворот в индустрии, когда поняла, что игрокам важна не просто скорость нажатия, но и тактильная отдача, которую не могли дать мембранные офисные клавиатуры. В начале 2010-х компания представила собственную разработку — механические переключатели Razer Green, созданные в сотрудничестве с китайским гигантом Omron. Особенность этих свичей заключалась в повышенной точке срабатывания и характерном громком «клике», который инженеры специально усилили, чтобы игрок мог слышать каждое нажатие даже сквозь громкий звук взрывов в игре, создав тем самым культовый «громкий» звук, который стал визитной карточкой киберспортивных арен начала 2010-х."
        , "Немецкая компания Cherry является законодателем моды в мире механических клавиатур, а её переключатели MX стали стандартом индустрии. Самый интересный факт связан с легендарными свичами Cherry MX Blue: их конструкция включает в себя две отдельные части контакта и специальную «юбку», которая создает двойной щелчок. Изначально это разрабатывалось для обеспечения высокой точности при печати (тактильный отклик до фактического срабатывания), но позже выяснилось, что этот же механизм идеально подходит для ритмичных игр и стратегий, где важно чувствовать грань нажатия. Cherry настолько уверена в качестве своей продукции, что ресурс каждого свича заявлен в 100 миллионов нажатий — этого хватило бы на 10 лет непрерывной игры по 10 часов в день."
    ]
    const items = [
        { name: "Playstation 2", type: "ps", year: 2000, image: "ps2000.png", summary: summaries[0] },
        { name: "Playstation 4", type: "ps", year: 2016, image: "ps2016.png", summary: summaries[1] },
        { name: "Playstation 5", type: "ps", year: 2026, image: "ps2026.png", summary: summaries[2] },
        { name: "Genius (2000)", type: "mouse", year: 2000, image: "mouse2000.png", summary: summaries[3] },
        { name: "Logitech (2016)", type: "mouse", year: 2016, image: "mouse2016.png", summary: summaries[4] },
        { name: "Logitech (2026)", type: "mouse", year: 2026, image: "mouse2026.png", summary: summaries[5] },
        { name: "Keyboard (2000)", type: "keyboard", year: 2000, image: "keyboard2000.png", summary: summaries[6] },
        { name: "Razer (2016)", type: "keyboard", year: 2016, image: "keyboard2016.png", summary: summaries[7] },
        { name: "Cherry (2026)", type: "keyboard", year: 2026, image: "keyboard2026.png", summary: summaries[8] },
    ];

    let selectedType = null;
    let selectedYear = null;

    function updateActiveButtons() {
        [btn2000, btn2016, btn2026, psBtn, mouseBtn, keyboardBtn].forEach(btn => {
            if (btn) btn.classList.remove('active');
        });

        if (selectedYear === 2000 && btn2000) btn2000.classList.add('active');
        if (selectedYear === 2016 && btn2016) btn2016.classList.add('active');
        if (selectedYear === 2026 && btn2026) btn2026.classList.add('active');

        if (selectedType === "ps" && psBtn) psBtn.classList.add('active');
        if (selectedType === "mouse" && mouseBtn) mouseBtn.classList.add('active');
        if (selectedType === "keyboard" && keyboardBtn) keyboardBtn.classList.add('active');
    }

    function displayProduct(item) {
        if (productImage) {
            productImage.style.backgroundImage = `url('assets/images/${item.image}')`;
            productImage.style.backgroundPosition = "center";
            productImage.style.backgroundRepeat = "no-repeat";
        }
    }

    function applyFilter() {
        let filtered = items.filter(item => {
            let typeMatch = !selectedType || item.type === selectedType;
            let yearMatch = !selectedYear || item.year === selectedYear;
            return typeMatch && yearMatch;
        });

        if (filtered.length > 0) {
            const product = filtered[0];

            if (filtersName) {
                filtersName.textContent = product.name;
                desc.textContent = product.summary;
            }

            displayProduct(product);
        } else {
            if (filtersName) {
                filtersName.textContent = "Товар не найден";
            }

            if (productImage) {
                productImage.style.backgroundImage = `url('assets/images/not-found.png')`;
            }
        }
    }

    if (btn2000) {
        btn2000.addEventListener('click', () => {
            selectedYear = 2000;
            updateActiveButtons();
        });
    }

    if (btn2016) {
        btn2016.addEventListener('click', () => {
            selectedYear = 2016;
            updateActiveButtons();
        });
    }

    if (btn2026) {
        btn2026.addEventListener('click', () => {
            selectedYear = 2026;
            updateActiveButtons();
        });
    }

    if (psBtn) {
        psBtn.addEventListener('click', () => {
            selectedType = "ps";
            updateActiveButtons();
        });
    }

    if (mouseBtn) {
        mouseBtn.addEventListener('click', () => {
            selectedType = "mouse";
            updateActiveButtons();
        });
    }

    if (keyboardBtn) {
        keyboardBtn.addEventListener('click', () => {
            selectedType = "keyboard";
            updateActiveButtons();
        });
    }

    if (selectBtn) {
        selectBtn.addEventListener('click', applyFilter);
    }

    function setInitialImage() {
        const ps2 = items.find(item => item.name === "Playstation 2");
        if (ps2 && productImage) {
            productImage.style.backgroundImage = `url('assets/images/${ps2.image}')`;
            productImage.style.backgroundPosition = "center";
            productImage.style.backgroundRepeat = "no-repeat";
        }
        if (filtersName) {
            filtersName.textContent = "Playstation 2";
        }
    }

    setInitialImage();

    //=======CROSSHAIR SECTION======================
    let addLengthBtn = document.querySelector('#addLength');
    let subLengthBtn = document.querySelector('#subLength');
    let resetLengthBtn = document.querySelector('#resetLength');
    let addGapBtn = document.querySelector('#addGap');
    let subGapBtn = document.querySelector('#subGap');
    let resetGapBtn = document.querySelector('#resetGap');
    let white = document.querySelector('#color1');
    let red = document.querySelector('#color2');
    let green = document.querySelector('#color3');
    let blue = document.querySelector('#color4');
    let crossCol = document.querySelectorAll('.crosshair-line-col');
    let crossRow = document.querySelectorAll('.crosshair-line-row');
    let crossGapCol = document.querySelector('.crosshair-col');
    let crossGapRow = document.querySelector('.crosshair-row');
    let lengthCoeff = 10;
    let gapCoeff = 10;
    let gapRow = 10;
    let gapCol = 40;
    let initialLength = 100;
    function changeCorsshairLength(item, item2, coeff, switchCase) {
        if (switchCase == 0) {
            initialLength += coeff;
        }
        else if (switchCase == 1) {
            initialLength -= coeff;
        }
        else if (switchCase == 2) {
            initialLength = 100;
        }
        item.forEach(el => el.style.height = initialLength + "px");
        item2.forEach(el => el.style.width = initialLength + "px");
    }
    addLengthBtn.addEventListener('click', () => {
        changeCorsshairLength(crossCol, crossRow, lengthCoeff, 0);
    })
    subLengthBtn.addEventListener('click', () => {
        changeCorsshairLength(crossCol, crossRow, lengthCoeff, 1);
    })
    resetLengthBtn.addEventListener('click', () => {
        changeCorsshairLength(crossCol, crossRow, lengthCoeff, 2);
    })
    function changeCrosshairGap(item, item2, coeff, switchCase) {
        if (switchCase == 0) {
            gapCol += coeff
            gapRow += coeff
        }
        else if (switchCase == 1) {
            if (gapCol - coeff >= 0) {
                gapCol -= coeff
            }
            if (gapRow - coeff >= 0) {
                gapRow -= coeff
            }
        }
        else if (switchCase == 2) {
            gapRow = 10;
            gapCol = 40;
        }
        item.style.gap = gapRow + "px";
        item2.style.gap = gapCol + "px";
    }
    addGapBtn.addEventListener('click', () => {
        changeCrosshairGap(crossGapRow, crossGapCol, gapCoeff, 0);
    })
    subGapBtn.addEventListener('click', () => {
        changeCrosshairGap(crossGapRow, crossGapCol, gapCoeff, 1);
    })
    resetGapBtn.addEventListener('click', () => {
        changeCrosshairGap(crossGapRow, crossGapCol, gapCoeff, 2);
    })
    function changeCrosshairColor(cross, color) {
        cross.forEach(el => el.classList.remove("white", "red", "green", "blue"));
        cross.forEach(el => el.classList.add(color));
    }
    white.addEventListener('click', () => {
        changeCrosshairColor(crossCol, "white");
        changeCrosshairColor(crossRow, "white");
    })
    red.addEventListener('click', () => {
        changeCrosshairColor(crossCol, "red");
        changeCrosshairColor(crossRow, "red");
    })
    green.addEventListener('click', () => {
        changeCrosshairColor(crossCol, "green");
        changeCrosshairColor(crossRow, "green");
    })
    blue.addEventListener('click', () => {
        changeCrosshairColor(crossCol, "blue");
        changeCrosshairColor(crossRow, "blue");
    })
    //===============DEIVICES=============================
    let adviseContent = document.querySelector('#advises')
    let deviceName = document.querySelector('.device-name');
    let leftSwitchBtn = document.querySelector('#left-switch');
    let rightSwitchBtn = document.querySelector('#right-switch');
    let rightActive = false;
    let leftActive = false;
    const devices = ["МЫШЬ", "КЛАВИАТУРА", "НАУШНИКИ", "ГЕЙМПАД", "МИКРОФОН", "VR ШЛЕМ"];
    const advises = [
        "Выбирайте мышь с сенсором Pixart, лёгким весом до 70 г и беспроводной связью. Обратите внимание на форму: симметрия или эргономика под хват. Для шутеров важны оптические свичи и низкая задержка."
        , "Для киберспорта выбирайте 60% или TKL с механическими свичами (Red или Speed). Беспроводные модели дают свободу, а оптические переключатели обеспечивают мгновенное срабатывание. Обратите внимание на PBT-кейкапы."
        , "Лучший выбор — открытая акустика для шутеров и закрытая для погружения. Обратите внимание на вес, оголовье с подушкой и съёмный микрофон. Беспроводные модели с 2.4 ГГц обеспечивают минимальную задержку."
        , "Выбирайте геймпад с Hall-эффектом на триггерах и стиках — они не будут дрейфовать. Важна поддержка вибрации, программируемые кнопки и совместимость с ПК. Беспроводные модели удобнее, но требуют зарядки."
        , "Для стримов и общения выбирайте конденсаторный микрофон с кардиоидной диаграммой. Важны функция pop-фильтра, регулировка громкости и мониторинг в реальном времени. USB-подключение проще, XLR — профессиональнее."
        , "VR-шлем должен иметь высокое разрешение (не менее 4K), частоту обновления от 90 Гц и удобную систему крепления. Важны отслеживание без базовых станций (inside-out) и совместимость с экосистемой игр."
    ]
    let currentMode = 0;
    function setMode(rightActive, leftActive) {
        if (currentMode < devices.length-1 && rightActive==true) {
            currentMode++;
        }
        else if(currentMode > devices.length && rightActive==true){
            currentMode = 0;
        }
        else if(currentMode > 0 && leftActive==true){
            currentMode--;
        }
        else if(currentMode < 0 && leftActive == true){
            currentMode = 0;
        }
        deviceName.innerHTML = `${devices[currentMode]} <div class="stars-row">
                            <img src="assets/images/star.svg">
                            <img src="assets/images/star.svg">
                            <img src="assets/images/star.svg">
                            <img src="assets/images/star.svg">
                            <img src="assets/images/star.svg">
                        </div>`;
        adviseContent.textContent = advises[currentMode];
    }
    leftSwitchBtn.addEventListener('click', ()=>{
        rightActive = false;
        leftActive = true;
        setMode(rightActive, leftActive);
    })
    rightSwitchBtn.addEventListener('click', ()=>{
        rightActive = true;
        leftActive = false;
        setMode(rightActive, leftActive);
    })
});