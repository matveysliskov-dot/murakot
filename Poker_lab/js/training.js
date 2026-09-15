/* ==========================================
   POKER LAB
   TRAINING ENGINE
   ========================================== */


/* ==========================================
   ФАКТЫ
   ========================================== */

const pokerFacts = [

    "В стандартной колоде 52 карты.",

    "В Texas Hold'em каждый игрок получает 2 закрытые карты.",

    "Flop состоит из трёх общих карт.",

    "Turn — четвёртая общая карта.",

    "River — пятая и последняя общая карта.",

    "В покере комбинация состоит из лучших пяти карт.",

    "Кикер может решить исход раздачи.",

    "Фулл-хаус сильнее флеша.",

    "Каре сильнее фулл-хауса.",

    "Стрит-флеш сильнее каре.",

    "Туз может участвовать в стрите A-2-3-4-5.",

    "Equity показывает долю банка, которую рука ожидаемо выигрывает против диапазона соперника."

];


let currentFact = 0;


/* ==========================================
   ПОКАЗ ФАКТА
   ========================================== */

function showRandomFact() {

    const factElement =
        document.getElementById("fact");


    if (!factElement) {
        return;
    }


    const randomIndex =
        Math.floor(
            Math.random() *
            pokerFacts.length
        );


    factElement.style.opacity = "0";


    setTimeout(() => {

        factElement.textContent =
            pokerFacts[randomIndex];


        factElement.style.opacity = "1";

    }, 250);

}


/* ==========================================
   СОСТОЯНИЕ
   ========================================== */

let currentHand = null;

let handNumber = 1;


/* ==========================================
   DOM
   ========================================== */

const heroCardsElement =
    document.getElementById(
        "heroCards"
    );


const opponentCardsElement =
    document.getElementById(
        "opponentCards"
    );


const communityCardsElement =
    document.getElementById(
        "communityCards"
    );


const combinationElement =
    document.getElementById(
        "combination"
    );


const equityElement =
    document.getElementById(
        "equity"
    );


const nextButton =
    document.getElementById(
        "nextButton"
    );


const foldButton =
    document.getElementById(
        "foldButton"
    );


const callButton =
    document.getElementById(
        "callButton"
    );


const raiseButton =
    document.getElementById(
        "raiseButton"
    );


const handNumberElement =
    document.getElementById(
        "handNumber"
    );


const streetElement =
    document.getElementById(
        "street"
    );


/* ==========================================
   СОЗДАТЬ ЭЛЕМЕНТ РЕЗУЛЬТАТА
   ========================================== */

function getResultElement() {

    let element =
        document.getElementById(
            "handResult"
        );


    if (!element) {

        element =
            document.createElement(
                "div"
            );

        element.id =
            "handResult";


        const trainingPage =
            document.querySelector(
                ".training-page"
            );


        if (trainingPage) {

            trainingPage.appendChild(
                element
            );

        }

    }


    return element;

}


/* ==========================================
   СОЗДАТЬ КАРТУ
   ========================================== */

/*
   Возвращаем старый дизайн карт.

   Не selector-card из калькулятора.

   Используем обычную .card,
   .card-corner,
   .card-big-suit и т.д.
*/

function createCardElement(card) {

    const element =
        document.createElement(
            "div"
        );


    element.className =
        `card ${card.color}`;


    /* ======================================
       ВЕРХНИЙ УГОЛ
       ====================================== */

    const topCorner =
        document.createElement(
            "div"
        );


    topCorner.className =
        "card-corner top";


    const topRank =
        document.createElement(
            "span"
        );


    topRank.className =
        "card-rank";


    topRank.textContent =
        card.rank;


    const topSuit =
        document.createElement(
            "span"
        );


    topSuit.className =
        "card-small-suit";


    topSuit.textContent =
        card.symbol;


    topCorner.appendChild(
        topRank
    );


    topCorner.appendChild(
        topSuit
    );


    /* ======================================
       БОЛЬШАЯ МАСТЬ
       ====================================== */

    const bigSuit =
        document.createElement(
            "div"
        );


    bigSuit.className =
        "card-big-suit";


    bigSuit.textContent =
        card.symbol;


    /* ======================================
       НИЖНИЙ УГОЛ
       ====================================== */

    const bottomCorner =
        document.createElement(
            "div"
        );


    bottomCorner.className =
        "card-corner bottom";


    const bottomRank =
        document.createElement(
            "span"
        );


    bottomRank.className =
        "card-rank";


    bottomRank.textContent =
        card.rank;


    const bottomSuit =
        document.createElement(
            "span"
        );


    bottomSuit.className =
        "card-small-suit";


    bottomSuit.textContent =
        card.symbol;


    bottomCorner.appendChild(
        bottomRank
    );


    bottomCorner.appendChild(
        bottomSuit
    );


    /* ======================================
       СОБИРАЕМ КАРТУ
       ====================================== */

    element.appendChild(
        topCorner
    );


    element.appendChild(
        bigSuit
    );


    element.appendChild(
        bottomCorner
    );


    return element;

}


/* ==========================================
   СОЗДАТЬ РУБАШКУ
   ========================================== */

function createCardBack() {

    const card =
        document.createElement(
            "div"
        );


    card.className =
        "card card-back";


    const inner =
        document.createElement(
            "div"
        );


    inner.className =
        "card-back-inner";


    const symbol =
        document.createElement(
            "div"
        );


    symbol.className =
        "card-back-symbol";


    symbol.textContent =
        "♠";


    inner.appendChild(
        symbol
    );


    card.appendChild(
        inner
    );


    return card;

}


/* ==========================================
   ОТОБРАЗИТЬ КАРТЫ
   ========================================== */

function renderCards(
    container,
    cards,
    hidden = false
) {

    if (!container) {
        return;
    }


    container.innerHTML = "";


    cards.forEach(card => {

        if (hidden) {

            container.appendChild(
                createCardBack()
            );

        } else {

            container.appendChild(
                createCardElement(card)
            );

        }

    });

}


/* ==========================================
   ОТОБРАЗИТЬ ВСЮ РАЗДАЧУ
   ========================================== */

function renderHand() {

    if (!currentHand) {
        return;
    }


    renderCards(

        heroCardsElement,

        currentHand.heroCards

    );


    renderCards(

        opponentCardsElement,

        currentHand.opponentCards,

        !currentHand.finished

    );


    renderCards(

        communityCardsElement,

        currentHand.communityCards

    );


    updateCombination();

}


/* ==========================================
   ОБНОВИТЬ КОМБИНАЦИЮ
   ========================================== */

function updateCombination() {

    if (!currentHand) {
        return;
    }


    if (
        currentHand.communityCards.length < 3
    ) {

        if (combinationElement) {

            combinationElement.textContent =
                "Ожидание FLOP";

        }

        return;

    }


    const result =
        evaluateHand(
            getHeroFullHand(
                currentHand
            )
        );


    if (combinationElement) {

        combinationElement.textContent =
            result.name;

    }

}


/* ==========================================
   ОБНОВИТЬ EQUITY
   ========================================== */

function updateEquity() {

    if (!currentHand) {
        return;
    }


    if (!equityElement) {
        return;
    }


    equityElement.textContent =
        "CALCULATING...";


    setTimeout(() => {

        const result =
            calculateEquityForStreet(

                currentHand.heroCards,

                currentHand.communityCards

            );


        equityElement.textContent =
            formatEquity(
                result.equity
            );


        currentHand.equity =
            result;

    }, 30);

}


/* ==========================================
   ОБНОВИТЬ ВЕРХНЮЮ ПАНЕЛЬ
   ========================================== */

function updateTopPanel() {

    if (handNumberElement) {

        handNumberElement.textContent =
            `HAND #${String(handNumber).padStart(4, "0")}`;

    }


    if (streetElement) {

        let streetName =
            "FLOP";


        if (
            currentHand.currentStreet ===
            "turn"
        ) {

            streetName =
                "TURN";

        }


        if (
            currentHand.currentStreet ===
            "river"
        ) {

            streetName =
                "RIVER";

        }


        if (
            currentHand.currentStreet ===
            "finished"
        ) {

            streetName =
                "FINISHED";

        }


        streetElement.textContent =
            streetName;

    }

}


/* ==========================================
   НОВАЯ РАЗДАЧА
   ========================================== */

function startHand() {

    currentHand =
        generateHand();


    handNumber++;


    const resultElement =
        getResultElement();


    if (resultElement) {

        resultElement.textContent =
            "";

        resultElement.style.display =
            "none";

    }


    clearDecision();


    renderHand();

    updateTopPanel();

    updateEquity();


    if (nextButton) {

        nextButton.textContent =
            "ОТКРЫТЬ TURN";

    }

}


/* ==========================================
   ВЫБОР ДЕЙСТВИЯ
   ========================================== */

function chooseAction(action) {

    if (
        !currentHand ||
        currentHand.finished
    ) {

        return;

    }


    currentHand.decision =
        action;


    clearDecision();


    let button = null;


    if (action === "fold") {

        button =
            foldButton;

    }


    if (action === "call") {

        button =
            callButton;

    }


    if (action === "raise") {

        button =
            raiseButton;

    }


    if (button) {

        button.classList.add(
            "selected"
        );

    }

}


/* ==========================================
   СБРОС ДЕЙСТВИЯ
   ========================================== */

function clearDecision() {

    [
        foldButton,
        callButton,
        raiseButton
    ].forEach(button => {

        if (button) {

            button.classList.remove(
                "selected"
            );

        }

    });

}


/* ==========================================
   СЛЕДУЮЩАЯ УЛИЦА
   ========================================== */

function nextStreet() {

    if (!currentHand) {
        return;
    }


    /* FLOP → TURN */

    if (
        currentHand.currentStreet ===
        "flop"
    ) {

        dealTurn(
            currentHand
        );


        renderHand();

        updateTopPanel();

        updateEquity();


        nextButton.textContent =
            "ОТКРЫТЬ RIVER";


        return;

    }


    /* TURN → RIVER */

    if (
        currentHand.currentStreet ===
        "turn"
    ) {

        dealRiver(
            currentHand
        );


        renderHand();

        updateTopPanel();

        updateEquity();


        nextButton.textContent =
            "ПОКАЗАТЬ РЕЗУЛЬТАТ";


        return;

    }


    /* RIVER → РЕЗУЛЬТАТ */

    if (
        currentHand.currentStreet ===
        "river"
    ) {

        finishHand(
            currentHand
        );


        renderHand();

        updateTopPanel();

        showFinalResult();


        nextButton.textContent =
            "НОВАЯ РАЗДАЧА";


        return;

    }


    /* НОВАЯ РАЗДАЧА */

    if (
        currentHand.currentStreet ===
        "finished"
    ) {

        startHand();

    }

}


/* ==========================================
   ФИНАЛЬНЫЙ РЕЗУЛЬТАТ
   ========================================== */

function showFinalResult() {

    if (!currentHand) {
        return;
    }


    const heroResult =
        evaluateHand(
            getHeroFullHand(
                currentHand
            )
        );


    const opponentResult =
        evaluateHand(
            getOpponentFullHand(
                currentHand
            )
        );


    const comparison =
        compareEvaluations(
            heroResult,
            opponentResult
        );


    let resultText =
        "";


    if (comparison > 0) {

        resultText =
            `ПОБЕДА — ${heroResult.name} сильнее ${opponentResult.name}`;

    } else if (comparison < 0) {

        resultText =
            `ПОРАЖЕНИЕ — ${opponentResult.name} сильнее ${heroResult.name}`;

    } else {

        resultText =
            `НИЧЬЯ — ${heroResult.name}`;

    }


    const resultElement =
        getResultElement();


    if (resultElement) {

        resultElement.textContent =
            resultText;


        resultElement.style.display =
            "block";

    }


    renderCards(

        opponentCardsElement,

        currentHand.opponentCards,

        false

    );

}


/* ==========================================
   КНОПКИ
   ========================================== */

if (foldButton) {

    foldButton.addEventListener(
        "click",
        () => chooseAction("fold")
    );

}


if (callButton) {

    callButton.addEventListener(
        "click",
        () => chooseAction("call")
    );

}


if (raiseButton) {

    raiseButton.addEventListener(
        "click",
        () => chooseAction("raise")
    );

}


if (nextButton) {

    nextButton.addEventListener(
        "click",
        nextStreet
    );

}


/* ==========================================
   ФАКТЫ
   ========================================== */

if (
    document.getElementById("fact")
) {

    showRandomFact();


    setInterval(
        showRandomFact,
        7000
    );

}


/* ==========================================
   ЗАПУСК
   ========================================== */

if (
    document.getElementById("heroCards")
) {

    /*
       Первая раздача = HAND #0001
    */

    handNumber = 0;

    startHand();

}