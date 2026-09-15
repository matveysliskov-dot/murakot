/* ==========================================
   POKER LAB
   EQUITY CALCULATOR
   ========================================== */


/* ==========================================
   НАСТРОЙКИ
   ========================================== */

const CALCULATOR_CONFIG = {

    preflopSimulations: 30000

};



/* ==========================================
   РАНГИ
   ========================================== */

const CALC_RANKS = [

    { name: "A", value: 14 },
    { name: "K", value: 13 },
    { name: "Q", value: 12 },
    { name: "J", value: 11 },
    { name: "10", value: 10 },
    { name: "9", value: 9 },
    { name: "8", value: 8 },
    { name: "7", value: 7 },
    { name: "6", value: 6 },
    { name: "5", value: 5 },
    { name: "4", value: 4 },
    { name: "3", value: 3 },
    { name: "2", value: 2 }

];



/* ==========================================
   МАСТИ
   ========================================== */

const CALC_SUITS = [

    {
        name: "spades",
        symbol: "♠",
        color: "black"
    },

    {
        name: "hearts",
        symbol: "♥",
        color: "red"
    },

    {
        name: "diamonds",
        symbol: "♦",
        color: "red"
    },

    {
        name: "clubs",
        symbol: "♣",
        color: "black"
    }

];



/* ==========================================
   СОСТОЯНИЕ
   ========================================== */

let heroCards = [];

let boardCards = [];

let selectedRange = new Set();



/* ==========================================
   DOM
   ========================================== */

const heroSelection =
    document.getElementById("heroSelection");

const boardSelection =
    document.getElementById("boardSelection");

const heroPicker =
    document.getElementById("heroPicker");

const boardPicker =
    document.getElementById("boardPicker");

const rangeGrid =
    document.getElementById("rangeGrid");

const calculateButton =
    document.getElementById("calculateButton");

const equityResult =
    document.getElementById("equityResult");

const winResult =
    document.getElementById("winResult");

const tieResult =
    document.getElementById("tieResult");

const lossResult =
    document.getElementById("lossResult");

const equityBar =
    document.getElementById("equityBar");

const resultMeta =
    document.getElementById("resultMeta");

const equityResultSection =
    document.getElementById(
        "equityResultSection"
    );



/* ==========================================
   СОЗДАНИЕ КАРТЫ
   ========================================== */

function makeCard(rank, suit) {

    return {

        rank: rank.name,

        value: rank.value,

        suit: suit.name,

        symbol: suit.symbol,

        color: suit.color

    };

}



/* ==========================================
   ID КАРТЫ
   ========================================== */

function cardKey(card) {

    return `${card.rank}_${card.suit}`;

}



/* ==========================================
   СОЗДАНИЕ ВЫБОРА КАРТ
   ========================================== */

function buildCardPicker(
    container,
    type
) {

    container.innerHTML = "";


    CALC_RANKS.forEach(rank => {

        CALC_SUITS.forEach(suit => {

            const card =
                makeCard(
                    rank,
                    suit
                );


            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "pick-card";


            if (
                card.color === "red"
            ) {

                button.classList.add(
                    "red"
                );

            }


            button.textContent =
                `${card.rank}${card.symbol}`;


            button.dataset.card =
                cardKey(card);


            button.addEventListener(
                "click",
                () =>
                    selectCard(
                        card,
                        type
                    )
            );


            container.appendChild(
                button
            );

        });

    });

}



/* ==========================================
   ВЫБОР КАРТЫ
   ========================================== */

function selectCard(
    card,
    type
) {

    const target =
        type === "hero"
            ? heroCards
            : boardCards;


    const max =
        type === "hero"
            ? 2
            : 5;


    if (
        target.length >= max
    ) {

        return;

    }


    const usedCards = [

        ...heroCards,

        ...boardCards

    ];


    const alreadyUsed =
        usedCards.some(
            existing =>
                cardKey(existing) ===
                cardKey(card)
        );


    if (
        alreadyUsed
    ) {

        return;

    }


    target.push(card);


    renderSelections();

    updatePickerState();

}



/* ==========================================
   УДАЛЕНИЕ КАРТЫ
   ========================================== */

function removeSelectedCard(
    type,
    index
) {

    if (
        type === "hero"
    ) {

        heroCards.splice(
            index,
            1
        );

    } else {

        boardCards.splice(
            index,
            1
        );

    }


    renderSelections();

    updatePickerState();

}



/* ==========================================
   ОТОБРАЖЕНИЕ ВЫБРАННЫХ КАРТ
   ========================================== */

function renderSelections() {

    renderSelection(
        heroSelection,
        heroCards,
        "hero"
    );


    renderSelection(
        boardSelection,
        boardCards,
        "board"
    );

}



function renderSelection(
    container,
    cards,
    type
) {

    container.innerHTML = "";


    const max =
        type === "hero"
            ? 2
            : 5;


    cards.forEach(
        (card, index) => {

            const element =
                document.createElement(
                    "button"
                );


            element.className =
                "selector-card";


            if (
                card.color === "red"
            ) {

                element.classList.add(
                    "red"
                );

            }


            element.innerHTML = `

                <span class="small">
                    ${card.rank}${card.symbol}
                </span>

                <span class="big">
                    ${card.symbol}
                </span>

                <span class="small bottom">
                    ${card.rank}${card.symbol}
                </span>

            `;


            element.title =
                "Нажмите, чтобы убрать карту";


            element.addEventListener(
                "click",
                () =>
                    removeSelectedCard(
                        type,
                        index
                    )
            );


            container.appendChild(
                element
            );

        }
    );


    for (
        let i = cards.length;
        i < max;
        i++
    ) {

        const slot =
            document.createElement(
                "div"
            );


        slot.className =
            "empty-slot";


        slot.textContent =
            "+";


        container.appendChild(
            slot
        );

    }

}



/* ==========================================
   СОСТОЯНИЕ КОЛОДЫ
   ========================================== */

function updatePickerState() {

    const used =
        new Set(

            [
                ...heroCards,
                ...boardCards
            ]

            .map(cardKey)

        );


    document
        .querySelectorAll(
            ".pick-card"
        )
        .forEach(button => {

            const key =
                button.dataset.card;


            const blocked =
                used.has(key);


            button.classList.toggle(
                "blocked",
                blocked
            );


            button.disabled =
                blocked;

        });

}



/* ==========================================
   RANGE
   ========================================== */

function rangeCellKey(
    row,
    col
) {

    return `${row}_${col}`;

}



/* ==========================================
   ОБОЗНАЧЕНИЕ РУКИ
   ========================================== */

function rangeNotation(
    row,
    col
) {

    const rank1 =
        CALC_RANKS[row].name;

    const rank2 =
        CALC_RANKS[col].name;


    /* Пара */

    if (
        row === col
    ) {

        return `${rank1}${rank2}`;

    }


    /* Одномастная */

    if (
        row < col
    ) {

        return `${rank1}${rank2}s`;

    }


    /* Разномастная */

    return `${rank2}${rank1}o`;

}



/* ==========================================
   СОЗДАНИЕ RANGE MATRIX
   ========================================== */

function buildRangeGrid() {

    rangeGrid.innerHTML = "";


    for (
        let row = 0;
        row < 13;
        row++
    ) {

        for (
            let col = 0;
            col < 13;
            col++
        ) {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "range-cell";


            button.textContent =
                rangeNotation(
                    row,
                    col
                );


            button.dataset.range =
                rangeCellKey(
                    row,
                    col
                );


            button.addEventListener(
                "click",
                () =>
                    toggleRange(
                        row,
                        col
                    )
            );


            rangeGrid.appendChild(
                button
            );

        }

    }

}



/* ==========================================
   ВКЛЮЧЕНИЕ / ВЫКЛЮЧЕНИЕ RANGE
   ========================================== */

function toggleRange(
    row,
    col
) {

    const key =
        rangeCellKey(
            row,
            col
        );


    if (
        selectedRange.has(key)
    ) {

        selectedRange.delete(
            key
        );

    } else {

        selectedRange.add(
            key
        );

    }


    updateRangeGrid();

}



/* ==========================================
   ОБНОВЛЕНИЕ RANGE
   ========================================== */

function updateRangeGrid() {

    document
        .querySelectorAll(
            ".range-cell"
        )
        .forEach(button => {

            button.classList.toggle(
                "selected",
                selectedRange.has(
                    button.dataset.range
                )
            );

        });

}



/* ==========================================
   ПРЕСЕТЫ
   ========================================== */

function selectPreset(
    preset
) {

    selectedRange.clear();


    /* ==============================
       ЛЮБЫЕ РУКИ
       ============================== */

    if (
        preset === "all"
    ) {

        for (
            let row = 0;
            row < 13;
            row++
        ) {

            for (
                let col = 0;
                col < 13;
                col++
            ) {

                selectedRange.add(
                    rangeCellKey(
                        row,
                        col
                    )
                );

            }

        }

    }



    /* ==============================
       ПАРЫ
       ============================== */

    if (
        preset === "pairs"
    ) {

        for (
            let row = 0;
            row < 13;
            row++
        ) {

            selectedRange.add(
                rangeCellKey(
                    row,
                    row
                )
            );

        }

    }



    /* ==============================
       ПРЕМИУМ
       ============================== */

    if (
        preset === "premium"
    ) {

        const premium = [

            "AA",
            "KK",
            "QQ",
            "JJ",

            "AKs",
            "AQs",

            "AKo"

        ];


        for (
            let row = 0;
            row < 13;
            row++
        ) {

            for (
                let col = 0;
                col < 13;
                col++
            ) {

                const notation =
                    rangeNotation(
                        row,
                        col
                    );


                if (
                    premium.includes(
                        notation
                    )
                ) {

                    selectedRange.add(
                        rangeCellKey(
                            row,
                            col
                        )
                    );

                }

            }

        }

    }



    /* ==============================
       ТОП 10%
       ============================== */

    if (
        preset === "top10"
    ) {

        const top10 = [

            "AA",
            "KK",
            "QQ",
            "JJ",
            "TT",
            "99",
            "88",

            "AKs",
            "AQs",
            "AJs",
            "ATs",

            "KQs",
            "KJs",

            "QJs",

            "AKo",
            "AQo"

        ];


        for (
            let row = 0;
            row < 13;
            row++
        ) {

            for (
                let col = 0;
                col < 13;
                col++
            ) {

                const notation =
                    rangeNotation(
                        row,
                        col
                    );


                if (
                    top10.includes(
                        notation
                    )
                ) {

                    selectedRange.add(
                        rangeCellKey(
                            row,
                            col
                        )
                    );

                }

            }

        }

    }



    /* ==============================
       ОЧИСТИТЬ
       ============================== */

    if (
        preset === "clear"
    ) {

        selectedRange.clear();

    }


    updateRangeGrid();

}



/* ==========================================
   ПОЛУЧЕНИЕ КОНКРЕТНЫХ КОМБИНАЦИЙ
   ========================================== */

function getSelectedRangeCombos() {

    const knownCards =
        new Set(

            [
                ...heroCards,
                ...boardCards
            ]

            .map(cardKey)

        );


    const combinations = [];


    selectedRange.forEach(
        key => {

            const parts =
                key.split("_");


            const row =
                Number(parts[0]);


            const col =
                Number(parts[1]);


            const rank1 =
                CALC_RANKS[row];


            const rank2 =
                CALC_RANKS[col];



            /* ==========================
               ПАРА
               ========================== */

            if (
                row === col
            ) {

                for (
                    let i = 0;
                    i < 4;
                    i++
                ) {

                    for (
                        let j = i + 1;
                        j < 4;
                        j++
                    ) {

                        const combo = [

                            makeCard(
                                rank1,
                                CALC_SUITS[i]
                            ),

                            makeCard(
                                rank2,
                                CALC_SUITS[j]
                            )

                        ];


                        if (
                            combo.every(
                                card =>
                                    !knownCards.has(
                                        cardKey(card)
                                    )
                            )
                        ) {

                            combinations.push(
                                combo
                            );

                        }

                    }

                }


                return;

            }



            /* ==========================
               ОДНОМАСТНЫЕ
               ========================== */

            if (
                row < col
            ) {

                for (
                    let suit = 0;
                    suit < 4;
                    suit++
                ) {

                    const combo = [

                        makeCard(
                            rank1,
                            CALC_SUITS[suit]
                        ),

                        makeCard(
                            rank2,
                            CALC_SUITS[suit]
                        )

                    ];


                    if (
                        combo.every(
                            card =>
                                !knownCards.has(
                                    cardKey(card)
                                )
                        )
                    ) {

                        combinations.push(
                            combo
                        );

                    }

                }


                return;

            }



            /* ==========================
               РАЗНОМАСТНЫЕ
               ========================== */

            for (
                let suit1 = 0;
                suit1 < 4;
                suit1++
            ) {

                for (
                    let suit2 = 0;
                    suit2 < 4;
                    suit2++
                ) {

                    if (
                        suit1 === suit2
                    ) {

                        continue;

                    }


                    const combo = [

                        makeCard(
                            rank2,
                            CALC_SUITS[suit1]
                        ),

                        makeCard(
                            rank1,
                            CALC_SUITS[suit2]
                        )

                    ];


                    if (
                        combo.every(
                            card =>
                                !knownCards.has(
                                    cardKey(card)
                                )
                        )
                    ) {

                        combinations.push(
                            combo
                        );

                    }

                }

            }

        }
    );


    return combinations;

}



/* ==========================================
   ДОСТУПНАЯ КОЛОДА
   ========================================== */

function getAvailableDeck() {

    const known =
        new Set(

            [
                ...heroCards,
                ...boardCards
            ]

            .map(cardKey)

        );


    return createDeck().filter(
        card =>
            !known.has(
                cardKey(card)
            )
    );

}



/* ==========================================
   СРАВНЕНИЕ
   ========================================== */

function compareSituation(
    villainCards,
    board
) {

    const heroEvaluation =
        evaluateHand([

            ...heroCards,

            ...board

        ]);


    const villainEvaluation =
        evaluateHand([

            ...villainCards,

            ...board

        ]);


    return compareEvaluations(
        heroEvaluation,
        villainEvaluation
    );

}



/* ==========================================
   ТОЧНЫЙ POSTFLOP
   ========================================== */

function calculateExactPostflop(
    villainCombos
) {

    const deck =
        getAvailableDeck();


    let wins = 0;

    let ties = 0;

    let losses = 0;


    const missingCards =
        5 - boardCards.length;



    /* ==============================
       RIVER
       ============================== */

    if (
        missingCards === 0
    ) {

        for (
            const villain of villainCombos
        ) {

            const result =
                compareSituation(
                    villain,
                    boardCards
                );


            if (
                result > 0
            ) {

                wins++;

            }

            else if (
                result === 0
            ) {

                ties++;

            }

            else {

                losses++;

            }

        }


        return {

            wins,
            ties,
            losses,

            total:
                wins +
                ties +
                losses

        };

    }



    /* ==============================
       TURN
       ============================== */

    if (
        missingCards === 1
    ) {

        for (
            const villain of villainCombos
        ) {

            const villainSet =
                new Set(
                    villain.map(
                        cardKey
                    )
                );


            for (
                const river of deck
            ) {

                if (
                    villainSet.has(
                        cardKey(river)
                    )
                ) {

                    continue;

                }


                const finalBoard = [

                    ...boardCards,

                    river

                ];


                const result =
                    compareSituation(
                        villain,
                        finalBoard
                    );


                if (
                    result > 0
                ) {

                    wins++;

                }

                else if (
                    result === 0
                ) {

                    ties++;

                }

                else {

                    losses++;

                }

            }

        }


        return {

            wins,
            ties,
            losses,

            total:
                wins +
                ties +
                losses

        };

    }



    /* ==============================
       FLOP
       ============================== */

    if (
        missingCards === 2
    ) {

        for (
            const villain of villainCombos
        ) {

            const villainSet =
                new Set(
                    villain.map(
                        cardKey
                    )
                );


            const remainingDeck =
                deck.filter(
                    card =>
                        !villainSet.has(
                            cardKey(card)
                        )
                );


            for (
                let i = 0;
                i < remainingDeck.length;
                i++
            ) {

                for (
                    let j = i + 1;
                j < remainingDeck.length;
                j++
                ) {

                    const finalBoard = [

                        ...boardCards,

                        remainingDeck[i],

                        remainingDeck[j]

                    ];


                    const result =
                        compareSituation(
                            villain,
                            finalBoard
                        );


                    if (
                        result > 0
                    ) {

                        wins++;

                    }

                    else if (
                        result === 0
                    ) {

                        ties++;

                    }

                    else {

                        losses++;

                    }

                }

            }

        }


        return {

            wins,
            ties,
            losses,

            total:
                wins +
                ties +
                losses

        };

    }


    return {

        wins: 0,

        ties: 0,

        losses: 0,

        total: 0

    };

}



/* ==========================================
   PREFLOP
   ========================================== */

function calculatePreflop(
    villainCombos,
    simulations
) {

    const available =
        getAvailableDeck();


    let wins = 0;

    let ties = 0;

    let losses = 0;


    for (
        let simulation = 0;
        simulation < simulations;
        simulation++
    ) {

        const villain =
            villainCombos[
                Math.floor(
                    Math.random() *
                    villainCombos.length
                )
            ];


        const villainSet =
            new Set(
                villain.map(
                    cardKey
                )
            );


        const deck =
            available.filter(
                card =>
                    !villainSet.has(
                        cardKey(card)
                    )
            );


        /* Перемешивание */

        for (
            let i = 0;
            i < 5;
            i++
        ) {

            const randomIndex =
                i +
                Math.floor(
                    Math.random() *
                    (deck.length - i)
                );


            [
                deck[i],
                deck[randomIndex]
            ] = [

                deck[randomIndex],
                deck[i]

            ];

        }


        const board =
            deck.slice(
                0,
                5
            );


        const result =
            compareSituation(
                villain,
                board
            );


        if (
            result > 0
        ) {

            wins++;

        }

        else if (
            result === 0
        ) {

            ties++;

        }

        else {

            losses++;

        }

    }


    return {

        wins,

        ties,

        losses,

        total:
            simulations

    };

}



/* ==========================================
   ПРОЦЕНТЫ
   ========================================== */

function calculatePercentages(
    stats
) {

    if (
        !stats.total
    ) {

        return {

            equity: 0,

            win: 0,

            tie: 0,

            loss: 0

        };

    }


    const equity =

        (
            stats.wins +
            stats.ties / 2
        )

        /

        stats.total

        *

        100;


    return {

        equity,

        win:
            stats.wins /
            stats.total *
            100,

        tie:
            stats.ties /
            stats.total *
            100,

        loss:
            stats.losses /
            stats.total *
            100

    };

}



/* ==========================================
   ПОКАЗ ОШИБКИ
   ========================================== */

function showError(
    message
) {

    equityResult.textContent =
        "—";


    winResult.textContent =
        "—";


    tieResult.textContent =
        "—";


    lossResult.textContent =
        "—";


    equityBar.style.width =
        "0%";


    resultMeta.textContent =
        message;

}



/* ==========================================
   ОСНОВНОЙ РАСЧЁТ
   ========================================== */

async function calculateEquity() {

    /* Проверяем руку */

    if (
        heroCards.length !== 2
    ) {

        showError(
            "Сначала выбери две карты своей руки."
        );

        scrollToResult();

        return;

    }


    /* Проверяем диапазон */

    if (
        selectedRange.size === 0
    ) {

        showError(
            "Выбери хотя бы одну комбинацию диапазона соперника."
        );

        scrollToResult();

        return;

    }


    calculateButton.disabled =
        true;


    calculateButton.textContent =
        "СЧИТАЕМ...";


    equityResult.textContent =
        "…";


    winResult.textContent =
        "…";


    tieResult.textContent =
        "…";


    lossResult.textContent =
        "…";


    equityBar.style.width =
        "0%";


    await new Promise(
        resolve =>
            setTimeout(
                resolve,
                30
            )
    );


    try {

        const villainCombos =
            getSelectedRangeCombos();


        if (
            villainCombos.length === 0
        ) {

            throw new Error(
                "В выбранном диапазоне нет доступных комбинаций."
            );

        }


        let stats;


        /* ==============================
           PREFLOP
           ============================== */

        if (
            boardCards.length < 3
        ) {

            stats =
                calculatePreflop(
                    villainCombos,

                    CALCULATOR_CONFIG
                        .preflopSimulations
                );

        }


        /* ==============================
           POSTFLOP
           ============================== */

        else {

            stats =
                calculateExactPostflop(
                    villainCombos
                );

        }


        const result =
            calculatePercentages(
                stats
            );


        /* Equity */

        equityResult.textContent =
            `${result.equity.toFixed(1)}%`;


        /* Победа */

        winResult.textContent =
            `${result.win.toFixed(1)}%`;


        /* Ничья */

        tieResult.textContent =
            `${result.tie.toFixed(1)}%`;


        /* Поражение */

        lossResult.textContent =
            `${result.loss.toFixed(1)}%`;


        /* Полоса */

        equityBar.style.width =
            `${Math.max(
                0,
                Math.min(
                    100,
                    result.equity
                )
            )}%`;


        /* Улица */

        let street;


        if (
            boardCards.length === 0
        ) {

            street =
                "ПРЕФЛОП";

        }

        else if (
            boardCards.length === 3
        ) {

            street =
                "ФЛОП";

        }

        else if (
            boardCards.length === 4
        ) {

            street =
                "ТЁРН";

        }

        else {

            street =
                "РИВЕР";

        }


        resultMeta.textContent =

            `${street} • ` +

            `${villainCombos.length} доступных комбинаций • ` +

            `${stats.total.toLocaleString(
                "ru-RU"
            )} сравнений`;


    }

    catch (
        error
    ) {

        showError(
            error.message
        );

    }


    calculateButton.disabled =
        false;


    calculateButton.textContent =
        "ПОСЧИТАТЬ ВЕРОЯТНОСТЬ";


    /*
       После расчёта автоматически
       спускаемся к результату.
    */

    scrollToResult();

}



/* ==========================================
   ПЛАВНАЯ ПРОКРУТКА
   ========================================== */

function scrollToResult() {

    setTimeout(
        () => {

            equityResultSection.scrollIntoView({

                behavior: "smooth",

                block: "center"

            });

        },

        100

    );

}



/* ==========================================
   КНОПКИ RANGE
   ========================================== */

document
    .querySelectorAll(
        ".range-presets button"
    )
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    selectPreset(
                        button.dataset.preset
                    );

                }
            );

        }
    );



/* ==========================================
   КНОПКА РАСЧЁТА
   ========================================== */

calculateButton.addEventListener(
    "click",
    calculateEquity
);



/* ==========================================
   ЗАПУСК
   ========================================== */

buildCardPicker(
    heroPicker,
    "hero"
);


buildCardPicker(
    boardPicker,
    "board"
);


buildRangeGrid();


renderSelections();


selectPreset(
    "all"
);


updatePickerState();