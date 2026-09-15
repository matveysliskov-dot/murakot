// ========================================
// СОЗДАНИЕ КОЛОДЫ
// ========================================

const suits = [
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


const ranks = [
    {
        name: "2",
        value: 2
    },

    {
        name: "3",
        value: 3
    },

    {
        name: "4",
        value: 4
    },

    {
        name: "5",
        value: 5
    },

    {
        name: "6",
        value: 6
    },

    {
        name: "7",
        value: 7
    },

    {
        name: "8",
        value: 8
    },

    {
        name: "9",
        value: 9
    },

    {
        name: "10",
        value: 10
    },

    {
        name: "J",
        value: 11
    },

    {
        name: "Q",
        value: 12
    },

    {
        name: "K",
        value: 13
    },

    {
        name: "A",
        value: 14
    }
];


// Создаём 52 карты

function createDeck() {

    const deck = [];

    for (const suit of suits) {

        for (const rank of ranks) {

            deck.push({

                rank: rank.name,

                value: rank.value,

                suit: suit.name,

                symbol: suit.symbol,

                color: suit.color

            });

        }

    }

    return deck;
}


// Перемешивание Фишера-Йейтса

function shuffleDeck(deck) {

    for (let i = deck.length - 1; i > 0; i--) {

        const j =
            Math.floor(Math.random() * (i + 1));

        [
            deck[i],
            deck[j]
        ] =
        [
            deck[j],
            deck[i]
        ];

    }

    return deck;
}


// Вытянуть карту

function drawCard(deck) {

    return deck.pop();

}