const doorCards =
    document.querySelectorAll(
        ".door-card"
    );


const result =
    document.getElementById(
        "result"
    );


const nextButton =
    document.getElementById(
        "nextButton"
    );


let opened = false;


/* =====================================
   НАЖАТИЕ НА ДВЕРЬ
===================================== */

doorCards.forEach(
    function (card) {


        const handle =
            card.querySelector(
                ".handle"
            );


        /* Нажатие на ручку */

        handle.addEventListener(

            "click",

            function (event) {

                event.stopPropagation();

                openDoor(card);

            }

        );


        /* Можно нажать на саму дверь */

        card.addEventListener(

            "click",

            function () {

                openDoor(card);

            }

        );


    }
);


/* =====================================
   ОТКРЫТИЕ
===================================== */

function openDoor(selectedDoor) {


    /* Если уже открыли */

    if (opened) {

        return;

    }


    opened = true;


    /* Открываем выбранную */

    selectedDoor.classList.add(
        "open"
    );


    /* Остальные затемняем */

    doorCards.forEach(

        function (door) {


            if (
                door !== selectedDoor
            ) {

                door.classList.add(
                    "disabled"
                );

            }


        }

    );


    /* =================================
       ПОЯВЛЯЕТСЯ ТЕКСТ
    ================================= */

    setTimeout(

        function () {

            result.classList.add(
                "visible"
            );

        },

        1300

    );


    /* =================================
       ПОЯВЛЯЕТСЯ КНОПКА
    ================================= */

    setTimeout(

        function () {

            nextButton.classList.add(
                "visible"
            );

        },

        2200

    );


}
