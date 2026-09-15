/* ==========================================
   POKER LAB
   EQUITY ENGINE
   ========================================== */


/* ==========================================
   НАСТРОЙКИ
   ========================================== */

const EQUITY_CONFIG = {

    preflopSimulations: 10000,

    flopSimulations: 15000

};


/* ==========================================
   КЛЮЧ КАРТЫ
   ========================================== */

function equityCardKey(card) {

    return `${card.rank}_${card.suit}`;

}


/* ==========================================
   УДАЛИТЬ ИЗВЕСТНЫЕ КАРТЫ
   ========================================== */

function removeEquityKnownCards(
    deck,
    knownCards
) {

    const known =
        new Set(
            knownCards.map(
                equityCardKey
            )
        );


    return deck.filter(
        card =>
            !known.has(
                equityCardKey(card)
            )
    );

}


/* ==========================================
   ПЕРЕМЕШИВАНИЕ
   ========================================== */

function equityShuffle(deck) {

    const result = [...deck];


    for (
        let i = result.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() * (i + 1)
            );


        [
            result[i],
            result[j]
        ] = [
            result[j],
            result[i]
        ];

    }


    return result;

}


/* ==========================================
   СРАВНЕНИЕ
   ========================================== */

function equityCompare(
    heroCards,
    villainCards
) {

    const hero =
        evaluateHand(heroCards);


    const villain =
        evaluateHand(villainCards);


    return compareEvaluations(
        hero,
        villain
    );

}


/* ==========================================
   EQUITY
   ========================================== */

function equityPercent(
    wins,
    ties,
    total
) {

    if (!total) {
        return 0;
    }


    return (
        (
            wins +
            ties / 2
        ) / total
    ) * 100;

}


/* ==========================================
   PREFLOP
   ========================================== */

function calculatePreflopEquity(
    heroCards,
    simulations =
        EQUITY_CONFIG.preflopSimulations
) {

    const knownCards = [
        ...heroCards
    ];


    const baseDeck =
        removeEquityKnownCards(
            createDeck(),
            knownCards
        );


    let wins = 0;

    let ties = 0;

    let losses = 0;


    for (
        let i = 0;
        i < simulations;
        i++
    ) {

        const deck =
            equityShuffle(
                baseDeck
            );


        const villainCards = [
            deck[0],
            deck[1]
        ];


        const communityCards = [
            deck[2],
            deck[3],
            deck[4],
            deck[5],
            deck[6]
        ];


        const result =
            equityCompare(

                [
                    ...heroCards,
                    ...communityCards
                ],

                [
                    ...villainCards,
                    ...communityCards
                ]

            );


        if (result > 0) {

            wins++;

        } else if (result === 0) {

            ties++;

        } else {

            losses++;

        }

    }


    return {

        equity:
            equityPercent(
                wins,
                ties,
                simulations
            ),

        wins,

        ties,

        losses,

        simulations

    };

}


/* ==========================================
   FLOP
   MONTE CARLO
   ========================================== */

function calculateFlopEquity(
    heroCards,
    communityCards,
    simulations =
        EQUITY_CONFIG.flopSimulations
) {

    const knownCards = [

        ...heroCards,

        ...communityCards

    ];


    const baseDeck =
        removeEquityKnownCards(
            createDeck(),
            knownCards
        );


    let wins = 0;

    let ties = 0;

    let losses = 0;


    for (
        let i = 0;
        i < simulations;
        i++
    ) {

        const deck =
            equityShuffle(
                baseDeck
            );


        /*
           Две карты соперника
        */

        const villainCards = [

            deck[0],

            deck[1]

        ];


        /*
           Turn + River
        */

        const finalCommunity = [

            ...communityCards,

            deck[2],

            deck[3]

        ];


        const result =
            equityCompare(

                [
                    ...heroCards,
                    ...finalCommunity
                ],

                [
                    ...villainCards,
                    ...finalCommunity
                ]

            );


        if (result > 0) {

            wins++;

        } else if (result === 0) {

            ties++;

        } else {

            losses++;

        }

    }


    return {

        equity:
            equityPercent(
                wins,
                ties,
                simulations
            ),

        wins,

        ties,

        losses,

        simulations

    };

}


/* ==========================================
   TURN
   ТОЧНЫЙ РАСЧЁТ
   ========================================== */

function calculateTurnEquity(
    heroCards,
    communityCards
) {

    const knownCards = [

        ...heroCards,

        ...communityCards

    ];


    const deck =
        removeEquityKnownCards(
            createDeck(),
            knownCards
        );


    let wins = 0;

    let ties = 0;

    let losses = 0;


    for (
        let riverIndex = 0;
        riverIndex < deck.length;
        riverIndex++
    ) {

        const river =
            deck[riverIndex];


        const finalCommunity = [

            ...communityCards,

            river

        ];


        const remainingDeck =
            deck.filter(
                (_, index) =>
                    index !== riverIndex
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

                const villainCards = [

                    remainingDeck[i],

                    remainingDeck[j]

                ];


                const result =
                    equityCompare(

                        [
                            ...heroCards,
                            ...finalCommunity
                        ],

                        [
                            ...villainCards,
                            ...finalCommunity
                        ]

                    );


                if (result > 0) {

                    wins++;

                } else if (result === 0) {

                    ties++;

                } else {

                    losses++;

                }

            }

        }

    }


    const simulations =
        wins +
        ties +
        losses;


    return {

        equity:
            equityPercent(
                wins,
                ties,
                simulations
            ),

        wins,

        ties,

        losses,

        simulations

    };

}


/* ==========================================
   RIVER
   ТОЧНЫЙ РАСЧЁТ
   ========================================== */

function calculateRiverEquity(
    heroCards,
    communityCards
) {

    const knownCards = [

        ...heroCards,

        ...communityCards

    ];


    const deck =
        removeEquityKnownCards(
            createDeck(),
            knownCards
        );


    let wins = 0;

    let ties = 0;

    let losses = 0;


    for (
        let i = 0;
        i < deck.length;
        i++
    ) {

        for (
            let j = i + 1;
            j < deck.length;
            j++
        ) {

            const villainCards = [

                deck[i],

                deck[j]

            ];


            const result =
                equityCompare(

                    [
                        ...heroCards,
                        ...communityCards
                    ],

                    [
                        ...villainCards,
                        ...communityCards
                    ]

                );


            if (result > 0) {

                wins++;

            } else if (result === 0) {

                ties++;

            } else {

                losses++;

            }

        }

    }


    const simulations =
        wins +
        ties +
        losses;


    return {

        equity:
            equityPercent(
                wins,
                ties,
                simulations
            ),

        wins,

        ties,

        losses,

        simulations

    };

}


/* ==========================================
   УНИВЕРСАЛЬНАЯ ФУНКЦИЯ
   ========================================== */

function calculateEquityForStreet(
    heroCards,
    communityCards
) {

    const cardsOnBoard =
        communityCards
            ? communityCards.length
            : 0;


    if (cardsOnBoard === 0) {

        return calculatePreflopEquity(
            heroCards
        );

    }


    if (cardsOnBoard === 3) {

        return calculateFlopEquity(
            heroCards,
            communityCards
        );

    }


    if (cardsOnBoard === 4) {

        return calculateTurnEquity(
            heroCards,
            communityCards
        );

    }


    if (cardsOnBoard === 5) {

        return calculateRiverEquity(
            heroCards,
            communityCards
        );

    }


    return {

        equity: 0,

        wins: 0,

        ties: 0,

        losses: 0,

        simulations: 0

    };

}


/* ==========================================
   ФОРМАТ
   ========================================== */

function formatEquity(value) {

    if (
        typeof value !== "number" ||
        !Number.isFinite(value)
    ) {

        return "0.0%";

    }


    return `${value.toFixed(1)}%`;

}