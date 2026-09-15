/* ==========================================
   POKER LAB
   HAND GENERATOR
   ========================================== */


/* ==========================================
   СОЗДАНИЕ НОВОЙ РАЗДАЧИ
   ========================================== */

function generateHand() {

    let deck = createDeck();

    shuffleDeck(deck);


    /*
       Первые две карты — игроку
    */

    const heroCards = [
        drawCard(deck),
        drawCard(deck)
    ];


    /*
       Следующие две — сопернику
    */

    const opponentCards = [
        drawCard(deck),
        drawCard(deck)
    ];


    /*
       Следующие три — FLOP
    */

    const flop = [
        drawCard(deck),
        drawCard(deck),
        drawCard(deck)
    ];


    /*
       Остаток колоды хранится отдельно.

       Из неё потом берутся:
       TURN
       RIVER
    */

    return {

        deck,

        heroCards,

        opponentCards,

        communityCards: flop,

        currentStreet: "flop",

        decision: null,

        finished: false

    };

}


/* ==========================================
   ОТКРЫТЬ TURN
   ========================================== */

function dealTurn(hand) {

    if (!hand || hand.finished) {
        return null;
    }


    if (
        hand.communityCards.length !== 3
    ) {
        return null;
    }


    const turn =
        drawCard(hand.deck);


    hand.communityCards.push(turn);

    hand.currentStreet = "turn";


    return turn;

}


/* ==========================================
   ОТКРЫТЬ RIVER
   ========================================== */

function dealRiver(hand) {

    if (!hand || hand.finished) {
        return null;
    }


    if (
        hand.communityCards.length !== 4
    ) {
        return null;
    }


    const river =
        drawCard(hand.deck);


    hand.communityCards.push(river);

    hand.currentStreet = "river";


    return river;

}


/* ==========================================
   ЗАКОНЧИТЬ РАЗДАЧУ
   ========================================== */

function finishHand(hand) {

    if (!hand) {
        return;
    }

    hand.finished = true;

    hand.currentStreet = "finished";

}


/* ==========================================
   ПОЛУЧИТЬ ВСЕ КАРТЫ HERO
   ========================================== */

function getHeroFullHand(hand) {

    return [
        ...hand.heroCards,
        ...hand.communityCards
    ];

}


/* ==========================================
   ПОЛУЧИТЬ ВСЕ КАРТЫ OPPONENT
   ========================================== */

function getOpponentFullHand(hand) {

    return [
        ...hand.opponentCards,
        ...hand.communityCards
    ];

}


/* ==========================================
   НОВАЯ РАЗДАЧА
   ========================================== */

function resetHand() {

    return generateHand();

}