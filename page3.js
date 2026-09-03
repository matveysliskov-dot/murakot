const envelope =
    document.getElementById("envelope");

const openButton =
    document.getElementById("openButton");

const nextButton =
    document.getElementById("nextButton");


function openEnvelope() {

    envelope.classList.add("open");

    openButton.classList.add("hidden");


    setTimeout(() => {

        nextButton.classList.add("visible");

    }, 1000);

}


openButton.addEventListener(
    "click",
    openEnvelope
);


envelope.addEventListener(
    "click",
    openEnvelope
);const doorCards =
    document.querySelectorAll(".door-card");

const result =
    document.getElementById("result");

const nextButton =
    document.getElementById("nextButton");


let opened = false;


/* =====================================
   КЛИК ПО ДВЕРИ ИЛИ РУЧКЕ
===================================== */

doorCards.forEach(function (card) {

    const handle =
        card.querySelector(".handle");


    card.addEventListener(
        "click",
        function () {

            openDoor(card);

        }
    );


    if (handle) {

        handle.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                openDoor(card);

            }
        );

    }

});


/* =====================================
   ОТКРЫТИЕ
===================================== */

function openDoor(selectedDoor) {

    /* Нельзя открыть вторую дверь */

    if (opened) {
        return;
    }


    opened = true;


    /* Открываем выбранную дверь */

    selectedDoor.classList.add("open");


    /* Остальные затемняем */

    doorCards.forEach(function (door) {

        if (door !== selectedDoor) {

            door.classList.add("disabled");

        }

    });


    /*
       Через секунду после открытия
       картинка резко вылетает
    */

    setTimeout(function () {

        selectedDoor.classList.add("boom");


        /* ВСПЫШКА */

        const flash =
            document.createElement("div");

        flash.classList.add("flash");

        document.body.appendChild(flash);


        /* ТРЯСКА */

        document.body.classList.add(
            "screen-shake"
        );


        /*
           Через полсекунды
           убираем тряску
        */

        setTimeout(function () {

            document.body.classList.remove(
                "screen-shake"
            );

        }, 500);


        /*
           Удаляем вспышку
        */

        setTimeout(function () {

            flash.remove();

        }, 600);


    }, 850);


    /*
       Текст появляется позже
    */

    setTimeout(function () {

        if (result) {

            result.classList.add(
                "visible"
            );

        }

    }, 1800);


    /*
       Кнопка появляется последней
    */

    setTimeout(function () {

        if (nextButton) {

            nextButton.classList.add(
                "visible"
            );

        }

    }, 2500);

}const envelope =
    document.getElementById("envelope");

const nextButton =
    document.getElementById("nextButton");


envelope.addEventListener(
    "click",
    function () {

        if (
            envelope.classList.contains(
                "open"
            )
        ) {

            return;

        }


        envelope.classList.add(
            "open"
        );


        setTimeout(
            function () {

                nextButton.classList.add(
                    "visible"
                );

            },

            1800
        );

    }
);
