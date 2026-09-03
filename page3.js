const envelope = document.getElementById("envelope");

const envelopeWrapper =
    document.getElementById(
        "envelopeWrapper"
    );

const nextButton =
    document.getElementById(
        "nextButton"
    );


let isOpened = false;


/* =========================
   ОТКРЫТИЕ КОНВЕРТА
========================= */

function openEnvelope() {

    if (isOpened) {
        return;
    }


    isOpened = true;


    /* Открываем */

    envelope.classList.add(
        "open"
    );


    /* Убираем подсказку */

    const clickText =
        document.querySelector(
            ".click-text"
        );


    if (clickText) {

        clickText.style.opacity = "0";

        clickText.style.transition =
            "opacity 0.3s ease";

    }


    /* Показываем кнопку */

    setTimeout(() => {

        nextButton.classList.add(
            "show"
        );

    }, 800);

}


/* =========================
   КЛИК
========================= */

envelope.addEventListener(
    "click",
    openEnvelope
);


/* =========================
   ENTER / ПРОБЕЛ
========================= */

envelope.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Enter" ||
            event.key === " "
        ) {

            event.preventDefault();

            openEnvelope();

        }

    }
);
