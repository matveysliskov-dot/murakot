function startProgram() {

```
// Получаем значения из HTML

let M = Number(document.getElementById("m").value);

let N = Number(document.getElementById("n").value);

let t1 = Number(document.getElementById("t1").value);

let t2 = Number(document.getElementById("t2").value);


// Проверяем данные

if (M <= 0 || N <= 0) {

    alert("M и N должны быть больше 0");

    return;

}


if (t1 > t2) {

    alert("t1 должно быть меньше t2");

    return;

}


// Создаём массив случайных заданий

let tasks = [];


for (let i = 0; i < M; i++) {

    let randomNumber =

        Math.floor(
            Math.random() * (t2 - t1 + 1)
        )

        + t1;


    tasks.push(randomNumber);

}


// Создаём три варианта

let randomTasks = [...tasks];

let ascendingTasks = [...tasks].sort(
    (a, b) => a - b
);

let descendingTasks = [...tasks].sort(
    (a, b) => b - a
);


// Запускаем алгоритм

let randomResult =
    criticalPath(randomTasks, N);

let ascendingResult =
    criticalPath(ascendingTasks, N);

let descendingResult =
    criticalPath(descendingTasks, N);


// Выводим результат

let html = "";


html += "<h2>Сгенерированные задания</h2>";

html += "<p>" + tasks.join(", ") + "</p>";


html += "<h2>Случайный порядок</h2>";

html += "<p>" +
    randomTasks.join(", ") +
    "</p>";

html += showProcessors(
    randomResult.processors
);

html +=
    "<b>Максимальная нагрузка: " +
    randomResult.maxLoad +
    "</b>";


html += "<h2>По возрастанию</h2>";

html += "<p>" +
    ascendingTasks.join(", ") +
    "</p>";

html += showProcessors(
    ascendingResult.processors
);

html +=
    "<b>Максимальная нагрузка: " +
    ascendingResult.maxLoad +
    "</b>";


html += "<h2>По убыванию</h2>";

html += "<p>" +
    descendingTasks.join(", ") +
    "</p>";

html += showProcessors(
    descendingResult.processors
);

html +=
    "<b>Максимальная нагрузка: " +
    descendingResult.maxLoad +
    "</b>";


// Таблица сравнения

html += "<h2>Сравнение</h2>";


html += "<table>";


html +=

    "<tr>" +

    "<th>Вариант</th>" +

    "<th>Максимальная нагрузка</th>" +

    "</tr>";


html +=

    "<tr>" +

    "<td>Случайный порядок</td>" +

    "<td>" +
    randomResult.maxLoad +
    "</td>" +

    "</tr>";


html +=

    "<tr>" +

    "<td>Возрастание</td>" +

    "<td>" +
    ascendingResult.maxLoad +
    "</td>" +

    "</tr>";


html +=

    "<tr>" +

    "<td>Убывание</td>" +

    "<td>" +
    descendingResult.maxLoad +
    "</td>" +

    "</tr>";


html += "</table>";


// Показываем результат

document.getElementById("result").innerHTML = html;
```

}

// Алгоритм критического пути

function criticalPath(tasks, N) {

```
// Создаём массив нагрузок процессоров

let processors = [];


for (let i = 0; i < N; i++) {

    processors.push({

        tasks: [],

        load: 0

    });

}



// Распределяем задания

for (let i = 0; i < tasks.length; i++) {


    // Считаем, что первый процессор минимальный

    let minIndex = 0;



    // Ищем процессор
    // с минимальной нагрузкой

    for (let j = 1; j < N; j++) {

        if (
            processors[j].load
            <
            processors[minIndex].load
        ) {

            minIndex = j;

        }

    }



    // Добавляем задание
    // на наименее загруженный процессор

    processors[minIndex].tasks.push(
        tasks[i]
    );


    // Увеличиваем нагрузку

    processors[minIndex].load +=
        tasks[i];

}



// Находим максимальную нагрузку

let maxLoad = 0;


for (let i = 0; i < N; i++) {

    if (
        processors[i].load
        >
        maxLoad
    ) {

        maxLoad =
            processors[i].load;

    }

}



// Возвращаем результат

return {

    processors: processors,

    maxLoad: maxLoad

};
```

}

// Вывод процессоров

function showProcessors(processors) {

```
let html = "";


for (
    let i = 0;
    i < processors.length;
    i++
) {


    html +=

        "<p>" +

        "Процессор " +
        (i + 1) +

        ": [" +

        processors[i].tasks.join(", ") +

        "] — нагрузка: " +

        processors[i].load +

        "</p>";

}


return html;
```

}
