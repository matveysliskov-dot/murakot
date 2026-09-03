document.addEventListener("DOMContentLoaded", function () {

    const envelope = document.getElementById("envelope");
    const nextButton = document.getElementById("nextButton");

    if (!envelope || !nextButton) {
        console.log("Не найден конверт или кнопка");
        return;
    }

    let opened = false;

    envelope.addEventListener("click", function () {

        if (opened) return;

        opened = true;

        // Открываем конверт
        envelope.classList.add("open");

        // Через небольшую паузу показываем кнопку
        setTimeout(function () {

            nextButton.classList.add("visible");

        }, 1000);

    });

});
