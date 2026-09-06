const startButton =
    document.getElementById(
        "startButton"
    );


const messages =
    document.getElementById(
        "messages"
    );


/* =====================
   ПРИНЯТЬ СИГНАЛ
===================== */

startButton.addEventListener(

    "click",

    function() {

        messages.scrollIntoView({

            behavior:
                "smooth"

        });

    }

);


/* =====================
   КАРТОЧКИ
===================== */

const cards =
    document.querySelectorAll(
        ".message-card"
    );


const modal =
    document.getElementById(
        "modal"
    );


const decodedMessage =
    document.getElementById(
        "decodedMessage"
    );


const closeButton =
    document.getElementById(
        "closeButton"
    );


cards.forEach(

    function(card) {

        card.addEventListener(

            "click",

            function() {

                decodedMessage.textContent =
                    card.dataset.message;


                modal.classList.add(
                    "active"
                );


                document.body.style.overflow =
                    "hidden";

            }

        );

    }

);


/* =====================
   ЗАКРЫТЬ
===================== */

closeButton.addEventListener(

    "click",

    function() {

        modal.classList.remove(
            "active"
        );


        document.body.style.overflow =
            "auto";

    }

);


/* Клик вне окна */

modal.addEventListener(

    "click",

    function(event) {

        if (
            event.target === modal
        ) {

            modal.classList.remove(
                "active"
            );


            document.body.style.overflow =
                "auto";

        }

    }

);
