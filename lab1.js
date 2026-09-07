/* ========================================= */
/* ЛАБОРАТОРНАЯ РАБОТА */
/* Алгоритм критического пути (CPM) */
/* ========================================= */

/* ========================================= */
/* После загрузки страницы ищем кнопку */
/* и назначаем ей действие */
/* ========================================= */

document
.getElementById("startButton")
.addEventListener("click", startProgram);

/* ========================================= */
/* ГЛАВНАЯ ФУНКЦИЯ */
/* ========================================= */

function startProgram() {

```
/* Получаем M */

let M = Number(
    document.getElementById("m").value
);


/* Получаем N */

let N = Number(
    document.getElementById("n").value
);


/* Получаем минимальное время */

let t1 = Number(
    document.getElementById("t1").value
);


/* Получаем максимальное время */

let t2 = Number(
    document.getElementById("t2").value
);



/* ========================================= */
/* ПРОВЕРКА ВВОДА */
/* ========================================= */


if (M <= 0) {

    alert(
        "Количество заданий M должно быть больше 0"
    );

    return;

}


if (N <= 0) {

    alert(
        "Количество процессоров N должно быть больше 0"
    );

    return;

}


if (t1 > t2) {

    alert(
        "t1 не может быть больше t2"
    );

    return;

}



/* ========================================= */
/* СОЗДАЁМ ОДИН СЛУЧАЙНЫЙ НАБОР ЗАДАНИЙ */
/* ========================================= */


let originalTasks =
    generateTasks(M, t1, t2);



/* ========================================= */
/* ВЫВОДИМ ИСХОДНЫЕ ЗАДАНИЯ */
/* ========================================= */


document
    .getElementById("originalTasks")
    .innerHTML =

    "<div class='tasks'>" +

    originalTasks.join(", ") +

    "</div>";



/* ========================================= */
/* СОЗДАЁМ ТРИ ВАРИАНТА */
/* ========================================= */


/* 1. Случайный порядок */

let randomTasks =
    [...originalTasks];



/* 2. Порядок по возрастанию */

let ascendingTasks =
    [...originalTasks];

ascendingTasks.sort(
    function(a, b) {

        return a - b;

    }
);



/* 3. Порядок по убыванию */

let descendingTasks =
    [...originalTasks];

descendingTasks.sort(
    function(a, b) {

        return b - a;

    }
);



/* ========================================= */
/* ЗАПУСКАЕМ АЛГОРИТМ CPM */
/* ========================================= */


let randomResult =
    runAlgorithm(
        randomTasks,
        N
    );


let ascendingResult =
    runAlgorithm(
        ascendingTasks,
        N
    );


let descendingResult =
    runAlgorithm(
        descendingTasks,
        N
    );



/* ========================================= */
/* ВЫВОДИМ ВСЕ РЕЗУЛЬТАТЫ */
/* ========================================= */


showResults(

    randomResult,

    ascendingResult,

    descendingResult

);
```

}

/* ========================================= */
/* ГЕНЕРАЦИЯ СЛУЧАЙНЫХ ЗАДАНИЙ */
/* ========================================= */

function generateTasks(
M,
t1,
t2
) {

```
/* Создаём пустой массив */

let tasks = [];



/* Создаём M случайных заданий */

for (
    let i = 0;

    i < M;

    i++
) {


    /* Генерируем случайное число */

    let taskTime =

        Math.floor(

            Math.random()
            *
            (t2 - t1 + 1)

        )

        +

        t1;



    /* Добавляем задание в массив */

    tasks.push(
        taskTime
    );


}



/* Возвращаем массив заданий */

return tasks;
```

}

/* ========================================= */
/* АЛГОРИТМ КРИТИЧЕСКОГО ПУТИ */
/* ========================================= */

/*
Логика алгоритма:

```
1. Есть N процессоров.

2. У каждого процессора есть нагрузка.

3. Сначала нагрузка всех процессоров = 0.

4. Берём очередное задание.

5. Ищем процессор
   с минимальной нагрузкой.

6. Назначаем задание
   на этот процессор.

7. Повторяем,
   пока не закончатся задания.
```

*/

function criticalPathAlgorithm(
tasks,
N
) {

```
/* ========================================= */
/* СОЗДАЁМ МАССИВ ПРОЦЕССОРОВ */
/* ========================================= */


let processors = [];


/* Создаём N процессоров */

for (
    let i = 0;

    i < N;

    i++
) {


    processors.push({

        /* Номер процессора */

        number: i + 1,


        /* Текущая нагрузка */

        load: 0,


        /* Задания процессора */

        tasks: []

    });

}




/* ========================================= */
/* РАСПРЕДЕЛЯЕМ ЗАДАНИЯ */
/* ========================================= */


for (
    let i = 0;

    i < tasks.length;

    i++
) {


    /* Берём очередное задание */

    let currentTask =
        tasks[i];



    /* ===================================== */
    /* ИЩЕМ НАИМЕНЕЕ ЗАГРУЖЕННЫЙ ПРОЦЕССОР */
    /* ===================================== */


    let minProcessor =
        processors[0];



    /* Проверяем все процессоры */

    for (
        let j = 1;

        j < processors.length;

        j++
    ) {


        /* Если нашли процессор */
        /* с меньшей нагрузкой */


        if (

            processors[j].load
            <
            minProcessor.load

        ) {


            minProcessor =
                processors[j];

        }


    }



    /* ===================================== */
    /* НАЗНАЧАЕМ ЗАДАНИЕ */
    /* ===================================== */


    /* Добавляем задание */

    minProcessor.tasks.push(
        currentTask
    );


    /* Увеличиваем нагрузку */

    minProcessor.load +=
        currentTask;


}




/* ========================================= */
/* НАХОДИМ МАКСИМАЛЬНУЮ НАГРУЗКУ */
/* ========================================= */


let maxLoad = 0;



for (
    let i = 0;

    i < processors.length;

    i++
) {


    if (

        processors[i].load
        >
        maxLoad

    ) {


        maxLoad =
            processors[i].load;

    }


}



/* ========================================= */
/* ВОЗВРАЩАЕМ РЕЗУЛЬТАТ */
/* ========================================= */


return {


    /* Распределение заданий */

    processors:
        processors,


    /* Максимальная нагрузка */

    maxLoad:
        maxLoad


};
```

}

/* ========================================= */
/* ИЗМЕРЕНИЕ ВРЕМЕНИ РАБОТЫ */
/* ========================================= */

function runAlgorithm(
tasks,
N
) {

```
/* Засекаем начало */

let startTime =
    performance.now();



/* Запускаем алгоритм */

let result =
    criticalPathAlgorithm(
        tasks,
        N
    );



/* Засекаем конец */

let endTime =
    performance.now();



/* Вычисляем время */

let executionTime =

    endTime
    -
    startTime;



/* Добавляем время */

result.time =
    executionTime;



return result;
```

}

/* ========================================= */
/* ВЫВОД РЕЗУЛЬТАТОВ */
/* ========================================= */

function showResults(

```
randomResult,

ascendingResult,

descendingResult
```

) {

```
let html = "";



/* ========================================= */
/* СЛУЧАЙНЫЙ ПОРЯДОК */
/* ========================================= */


html +=

    createResultBlock(

        "Случайный порядок",

        randomResult

    );



/* ========================================= */
/* ВОЗРАСТАНИЕ */
/* ========================================= */


html +=

    createResultBlock(

        "Порядок по возрастанию",

        ascendingResult

    );



/* ========================================= */
/* УБЫВАНИЕ */
/* ========================================= */


html +=

    createResultBlock(

        "Порядок по убыванию",

        descendingResult

    );



/* ========================================= */
/* ОПРЕДЕЛЯЕМ ЛУЧШИЙ РЕЗУЛЬТАТ */
/* ========================================= */


let bestName =
    "Случайный порядок";


let bestResult =
    randomResult.maxLoad;



/* Проверяем возрастание */


if (

    ascendingResult.maxLoad
    <
    bestResult

) {


    bestResult =
        ascendingResult.maxLoad;


    bestName =
        "Порядок по возрастанию";


}



/* Проверяем убывание */


if (

    descendingResult.maxLoad
    <
    bestResult

) {


    bestResult =
        descendingResult.maxLoad;


    bestName =
        "Порядок по убыванию";


}



/* ========================================= */
/* ВЫВОДИМ ОБЩУЮ ТАБЛИЦУ */
/* ========================================= */


html +=

    "<h2>Общее сравнение</h2>";


html +=

    "<table>";


html +=

    "<tr>" +

    "<th>Порядок заданий</th>" +

    "<th>Максимальная нагрузка</th>" +

    "<th>Время работы (мс)</th>" +

    "</tr>";



/* Случайный */


html +=

    "<tr>" +

    "<td>Случайный</td>" +

    "<td>" +

    randomResult.maxLoad +

    "</td>" +

    "<td>" +

    randomResult.time.toFixed(6) +

    "</td>" +

    "</tr>";



/* Возрастание */


html +=

    "<tr>" +

    "<td>По возрастанию</td>" +

    "<td>" +

    ascendingResult.maxLoad +

    "</td>" +

    "<td>" +

    ascendingResult.time.toFixed(6) +

    "</td>" +

    "</tr>";



/* Убывание */


html +=

    "<tr>" +

    "<td>По убыванию</td>" +

    "<td>" +

    descendingResult.maxLoad +

    "</td>" +

    "<td>" +

    descendingResult.time.toFixed(6) +

    "</td>" +

    "</tr>";



html +=

    "</table>";



/* Лучший вариант */


html +=

    "<h2>" +

    "Лучший результат: " +

    bestName +

    "</h2>";



html +=

    "<p>" +

    "Минимальная максимальная нагрузка: " +

    bestResult +

    "</p>";



/* Выводим всё на страницу */


document
    .getElementById("results")
    .innerHTML = html;
```

}

/* ========================================= */
/* СОЗДАНИЕ БЛОКА ОДНОГО РЕЗУЛЬТАТА */
/* ========================================= */

function createResultBlock(
title,
result
) {

```
let html =

    "<div class='result-block'>";


/* Название */


html +=

    "<h3>" +

    title +

    "</h3>";



/* Выводим процессоры */


for (

    let i = 0;

    i < result.processors.length;

    i++

) {


    let processor =
        result.processors[i];



    html +=

        "<div class='processor'>";



    html +=

        "<b>Процессор " +

        processor.number +

        "</b>";



    html +=

        ": задания [" +

        processor.tasks.join(", ") +

        "]";



    html +=

        ", нагрузка = " +

        processor.load;



    html +=

        "</div>";


}



/* Максимальная нагрузка */


html +=

    "<p>" +

    "<b>Максимальная нагрузка: " +

    result.maxLoad +

    "</b>" +

    "</p>";



html +=

    "<p>" +

    "Время выполнения: " +

    result.time.toFixed(6) +

    " мс" +

    "</p>";



html +=

    "</div>";



return html;
```

}
