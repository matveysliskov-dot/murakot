document.addEventListener(
    "DOMContentLoaded",
    function () {


        const doors = document.querySelectorAll(
            ".door-card"
        );


        const result = document.getElementById(
            "result"
        );


        const nextButton = document.getElementById(
            "nextButton"
        );


        let opened = false;


        doors.forEach(
            function (doorCard) {


                const handle = doorCard.querySelector(
                    ".handle"
                );


                handle.addEventListener(
                    "click",
                    function (event) {


                        event.stopPropagation();


                        // Если дверь уже была открыта

                        if (opened) {

                            return;

                        }


                        opened = true;


                        // Открываем выбранную дверь

                        doorCard.classList.add(
                            "open"
                        );


                        // Затемняем остальные двери

                        doors.forEach(
                            function (otherDoor) {


                                if (
                                    otherDoor !== doorCard
                                ) {

                                    otherDoor.classList.add(
                                        "disabled"
                                    );

                                }

                            }
                        );


                        // Берём картинку выбранной двери

                        const sourceImage =
                            doorCard.querySelector(
                                ".surprise img"
                            );


                        // Ждём начала открытия двери

                        setTimeout(
                            function () {


                                showFullscreenSurprise(
                                    sourceImage
                                );


                            },
                            450
                        );


                    }
                );


            }
        );



        function showFullscreenSurprise(
            sourceImage
        ) {


            // Получаем положение картинки
            // внутри двери

            const rect =
                sourceImage.getBoundingClientRect();


            // Создаём новый контейнер
            // прямо внутри BODY

            const fullscreen =
                document.createElement(
                    "div"
                );


            fullscreen.className =
                "fullscreen-surprise";


            // Ставим его точно на место двери

            fullscreen.style.left =
                rect.left + "px";


            fullscreen.style.top =
                rect.top + "px";


            fullscreen.style.width =
                rect.width + "px";


            fullscreen.style.height =
                rect.height + "px";


            // Создаём копию картинки

            const image =
                document.createElement(
                    "img"
                );


            image.src =
                sourceImage.src;


            image.alt =
                sourceImage.alt;


            fullscreen.appendChild(
                image
            );


            document.body.appendChild(
                fullscreen
            );


            // Небольшая задержка,
            // чтобы браузер увидел
            // начальную позицию

            requestAnimationFrame(
                function () {


                    requestAnimationFrame(
                        function () {


                            // Картинка летит
                            // на весь экран

                            fullscreen.style.transition =

                                "left 0.65s cubic-bezier(0.16, 1, 0.3, 1), " +

                                "top 0.65s cubic-bezier(0.16, 1, 0.3, 1), " +

                                "width 0.65s cubic-bezier(0.16, 1, 0.3, 1), " +

                                "height 0.65s cubic-bezier(0.16, 1, 0.3, 1)";


                            fullscreen.style.left =
                                "0px";


                            fullscreen.style.top =
                                "0px";


                            fullscreen.style.width =
                                "100vw";


                            fullscreen.style.height =
                                "100vh";


                            // Добавляем небольшой
                            // эффект "бум"

                            fullscreen.classList.add(
                                "animate"
                            );


                        }
                    );


                }
            );


            // После анимации
            // показываем текст

            setTimeout(
                function () {


                    result.classList.add(
                        "visible"
                    );


                    nextButton.classList.add(
                        "visible"
                    );


                },
                1100
            );


        }


    }
);
