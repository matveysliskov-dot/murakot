const doorCards =
    document.querySelectorAll(".door-card");

const result =
    document.getElementById("result");

const nextButton =
    document.getElementById("nextButton");

let opened = false;


/* ОТКРЫТИЕ ДВЕРИ */

doorCards.forEach(function (card) {

    const handle =
        card.querySelector(".handle");


    handle.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

            openDoor(card);

        }
    );


    card.addEventListener(
        "click",
        function () {

            openDoor(card);

        }
    );

});


function openDoor(selectedDoor) {

    if (opened) {

        return;

    }


    opened = true;


    /* ОТКРЫВАЕМ ДВЕРЬ */

    selectedDoor.classList.add("open");


    /* ОСТАЛЬНЫЕ ДВЕРИ ТЕМНЕЮТ */

    doorCards.forEach(function (door) {

        if (door !== selectedDoor) {

            door.classList.add("disabled");

        }

    });


    /*
       ПОСЛЕ ОТКРЫТИЯ —
       КАРТИНКА РЕЗКО ВЫЛЕТАЕТ
    */

    setTimeout(function () {

        selectedDoor.classList.add("boom");

        document.body.classList.add("screen-shake");

    }, 850);


    /*
       УБИРАЕМ ТРЯСКУ
    */

    setTimeout(function () {

        document.body.classList.remove(
            "screen-shake"
        );

    }, 1450);


    /*
       ПОЯВЛЯЕТСЯ ТЕКСТ
    */

    setTimeout(function () {

        result.classList.add("visible");

    }, 1900);


    /*
       ПОЯВЛЯЕТСЯ КНОПКА
    */

    setTimeout(function () {

        nextButton.classList.add("visible");

    }, 2600);

}
