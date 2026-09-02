const envelope =
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
