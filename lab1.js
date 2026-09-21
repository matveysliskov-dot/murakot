function startProgram() {

    // Получаем значения из HTML
    const M = Number(document.getElementById("m").value);
    const N = Number(document.getElementById("n").value);
    const t1 = Number(document.getElementById("t1").value);
    const t2 = Number(document.getElementById("t2").value);

    // Проверка
    if (M <= 0 || N <= 0) {
        alert("M и N должны быть больше 0");
        return;
    }

    if (t1 > t2) {
        alert("t1 должно быть меньше или равно t2");
        return;
    }

    // Создаём массив случайных заданий
    const tasks = [];

    for (let i = 0; i < M; i++) {
        const randomNumber =
            Math.floor(Math.random() * (t2 - t1 + 1)) + t1;

        tasks.push(randomNumber);
    }

    // Создаём варианты из одних и тех же чисел
    const ascending = [...tasks].sort(function (a, b) {
        return a - b;
    });

    const descending = [...tasks].sort(function (a, b) {
        return b - a;
    });

    // Запускаем алгоритм
    const randomResult = criticalPath(tasks, N);
    const ascendingResult = criticalPath(ascending, N);
    const descendingResult = criticalPath(descending, N);

    // Получаем место для вывода
    const result = document.getElementById("result");

    // Выводим результаты
    result.innerHTML =
        "<h2>Сгенерированные задания</h2>" +
        "<p>" + tasks.join(", ") + "</p>" +

        "<hr>" +

        createResult(
            "Случайный порядок",
            tasks,
            randomResult
        ) +

        "<hr>" +

        createResult(
            "По возрастанию",
            ascending,
            ascendingResult
        ) +

        "<hr>" +

        createResult(
            "По убыванию",
            descending,
            descendingResult
        );
}


// ========================================
// АЛГОРИТМ РАСПРЕДЕЛЕНИЯ ЗАДАНИЙ
// ========================================

function criticalPath(tasks, N) {

    // Создаём N процессоров
    const processors = [];

    for (let i = 0; i < N; i++) {

        processors.push({
            tasks: [],
            load: 0
        });

    }


    // Берём задания по очереди
    for (let i = 0; i < tasks.length; i++) {

        // Сначала считаем первый процессор
        // наименее загруженным
        let minIndex = 0;


        // Ищем процессор с минимальной нагрузкой
        for (let j = 1; j < N; j++) {

            if (
                processors[j].load <
                processors[minIndex].load
            ) {

                minIndex = j;

            }

        }


        // Добавляем задание выбранному процессору
        processors[minIndex].tasks.push(tasks[i]);

        // Увеличиваем нагрузку
        processors[minIndex].load += tasks[i];

    }


    // Ищем максимальную нагрузку
    let maxLoad = 0;

    for (let i = 0; i < N; i++) {

        if (processors[i].load > maxLoad) {
            maxLoad = processors[i].load;
        }

    }


    // Возвращаем результат
    return {
        processors: processors,
        maxLoad: maxLoad
    };

}


// ========================================
// СОЗДАНИЕ БЛОКА РЕЗУЛЬТАТА
// ========================================

function createResult(title, tasks, result) {

    let html = "";

    html += "<h2>" + title + "</h2>";

    html += "<p><b>Задания:</b><br>";
    html += tasks.join(", ");
    html += "</p>";


    // Выводим каждый процессор
    for (let i = 0; i < result.processors.length; i++) {

        const processor = result.processors[i];

        html += "<p>";

        html +=
            "<b>Процессор " + (i + 1) + ":</b> ";

        html +=
            "[" + processor.tasks.join(", ") + "]";

        html +=
            " — нагрузка: " + processor.load;

        html += "</p>";

    }


    html +=
        "<p><b>Максимальная нагрузка: " +
        result.maxLoad +
        "</b></p>";


    return html;
}