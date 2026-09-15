// ==========================================
// POKER HAND EVALUATOR
// ==========================================
//
// Ранги комбинаций:
// 10 - Роял-флеш
// 9  - Стрит-флеш
// 8  - Каре
// 7  - Фулл-хаус
// 6  - Флеш
// 5  - Стрит
// 4  - Тройка
// 3  - Две пары
// 2  - Пара
// 1  - Старшая карта
//
// Оценщик умеет:
// - находить лучшую комбинацию из 5 карт;
// - работать с 5, 6 и 7 картами;
// - учитывать кикеры;
// - сравнивать две руки;
// - находить стрит-флеш и роял-флеш.
// ==========================================


// Названия комбинаций
const HAND_NAMES = {
    10: "Роял-флеш",
    9: "Стрит-флеш",
    8: "Каре",
    7: "Фулл-хаус",
    6: "Флеш",
    5: "Стрит",
    4: "Тройка",
    3: "Две пары",
    2: "Пара",
    1: "Старшая карта"
};


// ==========================================
// СОЗДАНИЕ ВСЕХ КОМБИНАЦИЙ ПО 5 КАРТ
// ==========================================

function getFiveCardCombinations(cards) {

    const combinations = [];

    for (let a = 0; a < cards.length - 4; a++) {

        for (let b = a + 1; b < cards.length - 3; b++) {

            for (let c = b + 1; c < cards.length - 2; c++) {

                for (let d = c + 1; d < cards.length - 1; d++) {

                    for (let e = d + 1; e < cards.length; e++) {

                        combinations.push([
                            cards[a],
                            cards[b],
                            cards[c],
                            cards[d],
                            cards[e]
                        ]);

                    }
                }
            }
        }
    }

    return combinations;
}


// ==========================================
// ПОИСК СТРИТА
// ==========================================

function getStraightHighCard(values) {

    // Убираем дубликаты
    const uniqueValues = [...new Set(values)];

    // Туз может быть единицей:
    // A-2-3-4-5
    if (uniqueValues.includes(14)) {
        uniqueValues.push(1);
    }

    uniqueValues.sort((a, b) => b - a);

    let count = 1;

    for (let i = 0; i < uniqueValues.length - 1; i++) {

        if (uniqueValues[i] - uniqueValues[i + 1] === 1) {

            count++;

            if (count === 5) {
                return uniqueValues[i - 3];
            }

        } else {

            count = 1;
        }
    }

    return null;
}


// ==========================================
// ОЦЕНКА РОВНО 5 КАРТ
// ==========================================

function evaluateFiveCards(cards) {

    // Сортируем карты от старшей к младшей
    const sortedCards = [...cards].sort(
        (a, b) => b.value - a.value
    );

    const values = sortedCards.map(card => card.value);


    // --------------------------------------
    // ГРУППИРУЕМ КАРТЫ ПО ЗНАЧЕНИЮ
    // --------------------------------------

    const counts = {};

    for (const value of values) {

        counts[value] = (counts[value] || 0) + 1;
    }


    // Список групп:
    // например:
    // [{ value: 14, count: 2 }, ...]
    const groups = Object.keys(counts)
        .map(Number)
        .map(value => ({
            value: value,
            count: counts[value]
        }))
        .sort((a, b) => {

            // Сначала количество карт
            if (b.count !== a.count) {
                return b.count - a.count;
            }

            // Затем значение карты
            return b.value - a.value;
        });


    // --------------------------------------
    // ПРОВЕРЯЕМ ФЛЕШ
    // --------------------------------------

    const suits = {};

    for (const card of cards) {

        suits[card.suit] = (suits[card.suit] || 0) + 1;
    }

    const flush = Object.keys(suits).find(
        suit => suits[suit] === 5
    );


    // --------------------------------------
    // ПРОВЕРЯЕМ СТРИЕТ
    // --------------------------------------

    const straightHigh = getStraightHighCard(values);


    // --------------------------------------
    // РОЯЛ-ФЛЕШ
    // --------------------------------------

    if (flush && straightHigh === 14) {

        return {
            rank: 10,
            name: HAND_NAMES[10],
            score: [10, 14],
            cards: sortedCards
        };
    }


    // --------------------------------------
    // СТРИЕТ-ФЛЕШ
    // --------------------------------------

    if (flush && straightHigh !== null) {

        return {
            rank: 9,
            name: HAND_NAMES[9],
            score: [9, straightHigh],
            cards: sortedCards
        };
    }


    // --------------------------------------
    // КАРЕ
    // --------------------------------------

    const four = groups.find(
        group => group.count === 4
    );

    if (four) {

        const kicker = groups
            .filter(group => group.count !== 4)
            .sort((a, b) => b.value - a.value)[0];

        return {
            rank: 8,
            name: HAND_NAMES[8],
            score: [
                8,
                four.value,
                kicker.value
            ],
            cards: sortedCards
        };
    }


    // --------------------------------------
    // ФУЛЛ-ХАУС
    // --------------------------------------

    const three = groups.find(
        group => group.count === 3
    );

    const pair = groups.find(
        group => group.count === 2
    );

    if (three && pair) {

        return {
            rank: 7,
            name: HAND_NAMES[7],
            score: [
                7,
                three.value,
                pair.value
            ],
            cards: sortedCards
        };
    }


    // --------------------------------------
    // ФЛЕШ
    // --------------------------------------

    if (flush) {

        const flushValues = sortedCards
            .map(card => card.value);

        return {
            rank: 6,
            name: HAND_NAMES[6],
            score: [
                6,
                ...flushValues
            ],
            cards: sortedCards
        };
    }


    // --------------------------------------
    // СТРИЕТ
    // --------------------------------------

    if (straightHigh !== null) {

        return {
            rank: 5,
            name: HAND_NAMES[5],
            score: [
                5,
                straightHigh
            ],
            cards: sortedCards
        };
    }


    // --------------------------------------
    // ТРОЙКА
    // --------------------------------------

    if (three) {

        const kickers = groups
            .filter(group => group.count !== 3)
            .sort((a, b) => b.value - a.value)
            .map(group => group.value);

        return {
            rank: 4,
            name: HAND_NAMES[4],
            score: [
                4,
                three.value,
                ...kickers
            ],
            cards: sortedCards
        };
    }


    // --------------------------------------
    // ДВЕ ПАРЫ
    // --------------------------------------

    const pairs = groups
        .filter(group => group.count === 2)
        .sort((a, b) => b.value - a.value);

    if (pairs.length >= 2) {

        const highPair = pairs[0].value;
        const lowPair = pairs[1].value;

        const kicker = groups
            .filter(group =>
                group.value !== highPair &&
                group.value !== lowPair
            )
            .sort((a, b) => b.value - a.value)[0];

        return {
            rank: 3,
            name: HAND_NAMES[3],
            score: [
                3,
                highPair,
                lowPair,
                kicker.value
            ],
            cards: sortedCards
        };
    }


    // --------------------------------------
    // ОДНА ПАРА
    // --------------------------------------

    if (pairs.length === 1) {

        const pairValue = pairs[0].value;

        const kickers = groups
            .filter(group => group.value !== pairValue)
            .sort((a, b) => b.value - a.value)
            .map(group => group.value);

        return {
            rank: 2,
            name: HAND_NAMES[2],
            score: [
                2,
                pairValue,
                ...kickers
            ],
            cards: sortedCards
        };
    }


    // --------------------------------------
    // СТАРШАЯ КАРТА
    // --------------------------------------

    return {
        rank: 1,
        name: HAND_NAMES[1],
        score: [
            1,
            ...values
        ],
        cards: sortedCards
    };
}


// ==========================================
// СРАВНЕНИЕ ДВУХ ОЦЕНОК
// ==========================================

function compareEvaluations(handA, handB) {

    // Сначала сравниваем категорию
    if (handA.rank > handB.rank) {
        return 1;
    }

    if (handA.rank < handB.rank) {
        return -1;
    }


    // Если категория одинаковая,
    // сравниваем значения внутри неё

    const length = Math.max(
        handA.score.length,
        handB.score.length
    );

    for (let i = 0; i < length; i++) {

        const a = handA.score[i] || 0;
        const b = handB.score[i] || 0;

        if (a > b) {
            return 1;
        }

        if (a < b) {
            return -1;
        }
    }

    // Полностью одинаковые руки
    return 0;
}


// ==========================================
// ГЛАВНАЯ ФУНКЦИЯ ОЦЕНКИ
// ==========================================
//
// Получает от 5 до 7 карт.
// Перебирает все варианты по 5 карт
// и выбирает лучший.
// ==========================================

function evaluateHand(cards) {

    if (!cards || cards.length < 5) {

        return {
            rank: 0,
            name: "Недостаточно карт",
            score: [],
            cards: []
        };
    }


    // Если карт больше 7 — используем только первые 7
    const availableCards = cards.slice(0, 7);

    const combinations =
        getFiveCardCombinations(availableCards);


    let bestHand = null;


    for (const combination of combinations) {

        const currentHand =
            evaluateFiveCards(combination);


        if (
            bestHand === null ||
            compareEvaluations(currentHand, bestHand) > 0
        ) {

            bestHand = currentHand;
        }
    }


    return bestHand;
}


// ==========================================
// СРАВНЕНИЕ ДВУХ ПОКЕРНЫХ РУК
// ==========================================
//
// heroCards      — 2 карты игрока
// villainCards   — 2 карты соперника
// communityCards — общие карты
//
// Возвращает:
// HERO WINS
// VILLAIN WINS
// TIE
// ==========================================

function compareHands(
    heroCards,
    villainCards,
    communityCards
) {

    const heroAllCards = [
        ...heroCards,
        ...communityCards
    ];

    const villainAllCards = [
        ...villainCards,
        ...communityCards
    ];


    const heroHand =
        evaluateHand(heroAllCards);

    const villainHand =
        evaluateHand(villainAllCards);


    const comparison =
        compareEvaluations(heroHand, villainHand);


    let result;


    if (comparison > 0) {

        result = "HERO WINS";

    } else if (comparison < 0) {

        result = "VILLAIN WINS";

    } else {

        result = "TIE";
    }


    return {
        result: result,

        hero: heroHand,

        villain: villainHand
    };
}