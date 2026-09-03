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


}const doors =
    document.querySelectorAll(".door-container");


const surpriseLayer =
    document.getElementById("surpriseLayer");


const surpriseImage =
    document.getElementById("surpriseImage");


const finalText =
    document.getElementById("finalText");


const nextButton =
    document.getElementById("nextButton");


let opened = false;


/* =========================
   КЛИК ПО ДВЕРИ
========================= */

doors.forEach(
    (container) => {

        const door =
            container.querySelector(".door");


        door.addEventListener(
            "click",
            () => {

                /* Если уже открывали дверь —
                   больше ничего не происходит */

                if (opened) {

                    return;

                }


                opened = true;


                /* Открываем дверь */

                door.classList.add("open");


                /* Убираем hover */

                doors.forEach(
                    (otherContainer) => {

                        const otherDoor =
                            otherContainer.querySelector(".door");


                        if (
                            otherDoor !== door
                        ) {

                            otherDoor.style.pointerEvents =
                                "none";

                        }

                    }
                );


                /* Ждём открытие двери */

                setTimeout(
                    () => {

                        showSurprise();

                    },
                    700
                );

            }
        );

    }
);


/* =========================
   ПОКАЗАТЬ СЮРПРИЗ
========================= */

function showSurprise() {

    surpriseLayer.classList.add("show");


    /* После вылета картинки */

    setTimeout(
        () => {

            finalText.classList.add(
                "visible"
            );


            nextButton.classList.add(
                "visible"
            );

        },
        900
    );

}/* =========================================
   ПОЛУЧАЕМ ЭЛЕМЕНТЫ
========================================= */

const doors =
    document.querySelectorAll(".door-card");


const surpriseLayer =
    document.getElementById("surpriseLayer");


const flash =
    document.getElementById("flash");


const result =
    document.getElementById("result");


/* =========================================
   СОСТОЯНИЕ
========================================= */

let doorOpened = false;


/* =========================================
   КАЖДАЯ ДВЕРЬ
========================================= */

doors.forEach(function (door) {

    const handle =
        door.querySelector(".handle");


    /*
        Клик по всей двери
    */

    door.addEventListener(

        "click",

        function () {

            openDoor(door);

        }

    );


    /*
        Клик конкретно по ручке
    */

    handle.addEventListener(

        "click",

        function (event) {

            event.stopPropagation();

            openDoor(door);

        }

    );

});


/* =========================================
   ФУНКЦИЯ ОТКРЫТИЯ
========================================= */

function openDoor(selectedDoor) {


    /*
        Нельзя открыть
        несколько дверей
    */

    if (doorOpened) {

        return;

    }


    doorOpened = true;


    /*
        Открываем выбранную
        дверь
    */

    selectedDoor.classList.add("open");


    /*
        Затемняем остальные
    */

    doors.forEach(function (door) {

        if (door !== selectedDoor) {

            door.classList.add("disabled");

        }

    });


    /*
        Через 800 миллисекунд
        начинается БУМ
    */

    setTimeout(function () {


        /*
            Показываем
            картинку
        */

        surpriseLayer.classList.add("active");


        /*
            ВСПЫШКА
        */

        flash.classList.add("active");


        /*
            ТРЯСКА
        */

        document.body.classList.add("shake");


        /*
            Через 500 мс
            убираем тряску
        */

        setTimeout(function () {

            document.body.classList.remove(
                "shake"
            );

        }, 500);


        /*
            Убираем класс
            вспышки
        */

        setTimeout(function () {

            flash.classList.remove(
                "active"
            );

        }, 500);


    }, 800);


    /*
        Показываем текст
    */

    setTimeout(function () {

        result.classList.add(
            "visible"
        );

    }, 1700);

}const doorCards =
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

}
