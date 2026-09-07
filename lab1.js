// ============================================
// АЛГОРИТМ КРИТИЧЕСКОГО ПУТИ
// Генерация и сравнение разных порядков матрицы
// ============================================

// Эта функция запускается при нажатии кнопки
function startProgram() {

```
// Получаем значения из полей ввода
let M = Number(document.getElementById("m").value);
let N = Number(document.getElementById("n").value);

let t1 = Number(document.getElementById("t1").value);
let t2 = Number(document.getElementById("t2").value);


// Проверяем правильность введённых данных
if (M <= 0 || N <= 0) {
    alert("M и N должны быть больше нуля!");
    return;
}


if (t1 > t2) {
    alert("t1 не может быть больше t2!");
    return;
}


// ============================================
// 1. СОЗДАЁМ ОДНУ СЛУЧАЙНУЮ МАТРИЦУ
// ============================================

let originalMatrix = createRandomMatrix(M, N, t1, t2);


// ============================================
// 2. СОЗДАЁМ КОПИИ ЭТОЙ ЖЕ МАТРИЦЫ
// ============================================

// Превращаем матрицу в один массив чисел
let numbers = originalMatrix.flat();


// Создаём копию случайного порядка
let randomNumbers = [...numbers];


// Сортировка по возрастанию
let ascendingNumbers = [...numbers].sort(function(a, b) {
    return a - b;
});


// Сортировка по убыванию
let descendingNumbers = [...numbers].sort(function(a, b) {
    return b - a;
});


// ============================================
// 3. ПРЕВРАЩАЕМ МАССИВЫ ОБРАТНО В МАТРИЦЫ
// ============================================

let randomMatrix = arrayToMatrix(randomNumbers, M, N);

let ascendingMatrix = arrayToMatrix(ascendingNumbers, M, N);

let descendingMatrix = arrayToMatrix(descendingNumbers, M, N);


// ============================================
// 4. ВЫВОДИМ МАТРИЦЫ НА ЭКРАН
// ============================================

showMatrix(
    randomMatrix,
    "Случайная матрица",
    "original"
);


showMatrix(
    ascendingMatrix,
    "Матрица по возрастанию",
    "ascending"
);


showMatrix(
    descendingMatrix,
    "Матрица по убыванию",
    "descending"
);


// ============================================
// 5. ЗАПУСКАЕМ АЛГОРИТМ
// ============================================

// Измеряем время работы для случайной матрицы
let resultRandom = measureAlgorithm(randomMatrix);


// Измеряем время работы для возрастающей матрицы
let resultAscending = measureAlgorithm(ascendingMatrix);


// Измеряем время работы для убывающей матрицы
let resultDescending = measureAlgorithm(descendingMatrix);


// ============================================
// 6. ВЫВОДИМ РЕЗУЛЬТАТЫ
// ============================================

showResults(
    resultRandom,
    resultAscending,
    resultDescending
);
```

}

// ============================================
// ФУНКЦИЯ СОЗДАНИЯ СЛУЧАЙНОЙ МАТРИЦЫ
// ============================================

function createRandomMatrix(M, N, min, max) {

```
let matrix = [];


// Проходим по строкам
for (let i = 0; i < M; i++) {

    let row = [];


    // Проходим по столбцам
    for (let j = 0; j < N; j++) {

        // Генерируем случайное число от min до max
        let randomNumber =
            Math.floor(Math.random() * (max - min + 1))
            + min;


        // Добавляем число в строку
        row.push(randomNumber);
    }


    // Добавляем строку в матрицу
    matrix.push(row);
}


return matrix;
```

}

// ============================================
// ПРЕОБРАЗОВАНИЕ МАССИВА В МАТРИЦУ
// ============================================

function arrayToMatrix(array, M, N) {

```
let matrix = [];

let index = 0;


// Создаём M строк
for (let i = 0; i < M; i++) {

    let row = [];


    // В каждой строке N чисел
    for (let j = 0; j < N; j++) {

        // Берём число из массива
        row.push(array[index]);

        index++;
    }


    // Добавляем строку в матрицу
    matrix.push(row);
}


return matrix;
```

}

// ============================================
// ВЫВОД МАТРИЦЫ НА СТРАНИЦУ
// ============================================

function showMatrix(matrix, title, elementId) {

```
let html = "<h2>" + title + "</h2>";

html += "<table>";


// Проходим по всем строкам матрицы
for (let i = 0; i < matrix.length; i++) {

    html += "<tr>";


    // Проходим по всем числам строки
    for (let j = 0; j < matrix[i].length; j++) {

        html += "<td>";

        html += matrix[i][j];

        html += "</td>";
    }


    html += "</tr>";
}


html += "</table>";


// Вставляем таблицу в HTML
document.getElementById(elementId).innerHTML = html;
```

}

// ============================================
// ОСНОВНОЙ АЛГОРИТМ
// ============================================
//
// Упрощённый вариант вычисления критического пути.
//
// Для каждой ячейки определяем максимальное время,
// за которое можно попасть в эту ячейку.
//
// Можно двигаться:
// 1. Слева направо
// 2. Сверху вниз
//
// В правой нижней ячейке будет находиться
// длина критического пути.
// ============================================

function criticalPath(matrix) {

```
let M = matrix.length;

let N = matrix[0].length;


// Создаём матрицу для хранения максимального времени
let dp = [];


// Заполняем матрицу нулями
for (let i = 0; i < M; i++) {

    dp[i] = [];

    for (let j = 0; j < N; j++) {

        dp[i][j] = 0;
    }
}


// ============================================
// ПРОХОД ПО МАТРИЦЕ
// ============================================

for (let i = 0; i < M; i++) {

    for (let j = 0; j < N; j++) {


        // Если это первая ячейка
        if (i === 0 && j === 0) {

            dp[i][j] = matrix[i][j];

            continue;
        }


        // Максимальное значение сверху
        let fromTop = 0;


        if (i > 0) {
            fromTop = dp[i - 1][j];
        }


        // Максимальное значение слева
        let fromLeft = 0;


        if (j > 0) {
            fromLeft = dp[i][j - 1];
        }


        // Берём большее значение
        let maxPrevious = Math.max(
            fromTop,
            fromLeft
        );


        // Добавляем значение текущей ячейки
        dp[i][j] =
            maxPrevious + matrix[i][j];
    }
}


// Возвращаем:
// 1. Длину критического пути
// 2. Матрицу рассчитанных значений

return {

    length: dp[M - 1][N - 1],

    dp: dp
};
```

}

// ============================================
// ИЗМЕРЕНИЕ ВРЕМЕНИ РАБОТЫ АЛГОРИТМА
// ============================================

function measureAlgorithm(matrix) {

```
// Запоминаем время начала
let startTime = performance.now();


// Запускаем алгоритм
let result = criticalPath(matrix);


// Запоминаем время окончания
let endTime = performance.now();


// Вычисляем время выполнения
let executionTime =
    endTime - startTime;


return {

    // Длина критического пути
    length: result.length,

    // Время выполнения алгоритма
    time: executionTime
};
```

}

// ============================================
// ВЫВОД РЕЗУЛЬТАТОВ
// ============================================

function showResults(
random,
ascending,
descending
) {

```
let html = "<h2>Результаты сравнения</h2>";


html += "<table>";


// Заголовок таблицы
html += `
    <tr>
        <th>Вариант матрицы</th>
        <th>Длина критического пути</th>
        <th>Время выполнения (мс)</th>
    </tr>
`;


// Случайная матрица
html += `
    <tr>
        <td>Случайный порядок</td>
        <td>${random.length}</td>
        <td>${random.time.toFixed(6)}</td>
    </tr>
`;


// Возрастающая матрица
html += `
    <tr>
        <td>По возрастанию</td>
        <td>${ascending.length}</td>
        <td>${ascending.time.toFixed(6)}</td>
    </tr>
`;


// Убывающая матрица
html += `
    <tr>
        <td>По убыванию</td>
        <td>${descending.length}</td>
        <td>${descending.time.toFixed(6)}</td>
    </tr>
`;


html += "</table>";


// Определяем лучший вариант

let best = "Случайный порядок";

let minTime = random.time;


if (ascending.time < minTime) {

    minTime = ascending.time;

    best = "Матрица по возрастанию";
}


if (descending.time < minTime) {

    minTime = descending.time;

    best = "Матрица по убыванию";
}


// Выводим лучший результат
html += `
    <h3>
        Самое быстрое выполнение:
        ${best}
    </h3>
`;


document.getElementById("results").innerHTML = html;
```

}
