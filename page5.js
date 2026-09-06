const cards =
    document.querySelectorAll(
        ".wish-card"
    );


const modal =
    document.getElementById(
        "modal"
    );


const modalText =
    document.getElementById(
        "modalText"
    );


const closeModal =
    document.getElementById(
        "closeModal"
    );



cards.forEach(

    function(card) {


        card.addEventListener(

            "click",

            function() {


                const message =
                    card.dataset.message;


                modalText.textContent =
                    message;


                modal.classList.add(
                    "active"
                );


                document.body.style.overflow =
                    "hidden";


            }

        );


    }

);



closeModal.addEventListener(

    "click",

    function() {


        modal.classList.remove(
            "active"
        );


        document.body.style.overflow =
            "auto";


    }

);



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
