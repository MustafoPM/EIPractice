// Данные для уровней
const levels = {
    1: [["Head", "Голова"], ["Bread", "Хлеб"], ["Bullet", "Пуля"], ["Read", "Читать"], ["Rat", "Крыса"]],
    2: [["Sun", "Солнце"], ["Moon", "Луна"], ["Star", "Звезда"], ["Cloud", "Облако"], ["Rain", "Дождь"]],
    3: [["Apple", "Яблоко"], ["Banana", "Банан"], ["Orange", "Апельсин"], ["Grape", "Виноград"], ["Peach", "Персик"]],
};

// Переменные для хранения выбранных слов
let selectedLeft = null;
let selectedRight = null;

// Функция для загрузки слов
function loadWords(level) {
    const gameBoard = document.getElementById("game-board");
    gameBoard.innerHTML = ""; // Очищаем контейнер

    // Создаём контейнеры для колонок
    const leftColumn = document.createElement("div");
    const rightColumn = document.createElement("div");

    leftColumn.classList.add("column");
    rightColumn.classList.add("column");

    let words = levels[level];

    // Перемешиваем правую колонку, чтобы не было сразу правильных пар
    let rightWords = words.map(pair => pair[1]).sort(() => Math.random() - 0.5);

    words.forEach((pair, index) => {
        const btnLeft = document.createElement("button");
        btnLeft.classList.add("word", "left");
        btnLeft.textContent = pair[0];

        const btnRight = document.createElement("button");
        btnRight.classList.add("word", "right");
        btnRight.textContent = rightWords[index];

        // Обработчики событий для выбора слов
        btnLeft.addEventListener("click", () => selectWord(btnLeft, pair[0], pair[1], "left"));
        btnRight.addEventListener("click", () => selectWord(btnRight, rightWords[index], pair[0], "right"));

        leftColumn.appendChild(btnLeft);
        rightColumn.appendChild(btnRight);
    });

    gameBoard.appendChild(leftColumn);
    gameBoard.appendChild(rightColumn);
}

// Функция для выбора слова
function selectWord(button, word, correctTranslation, side) {
    if (button.classList.contains("selected")) {
        button.classList.remove("selected");
        button.style.backgroundColor = "";
        if (side === "left") selectedLeft = null;
        else selectedRight = null;
        return;
    }

    if (side === "left") {
        if (selectedLeft) {
            selectedLeft.classList.remove("selected");
            selectedLeft.style.backgroundColor = "";
        }
        selectedLeft = button;
    } else {
        if (selectedRight) {
            selectedRight.classList.remove("selected");
            selectedRight.style.backgroundColor = "";
        }
        selectedRight = button;
    }

    button.classList.add("selected");
    button.style.backgroundColor = "#add8e6"; // Светло-голубой

    if (selectedLeft && selectedRight) {
        checkMatch(selectedLeft, selectedRight);
    }
}

// Функция для проверки совпадения
function checkMatch(leftButton, rightButton) {
    const leftWord = leftButton.textContent;
    const rightWord = rightButton.textContent;

    const isCorrect = levels[1].some(pair => pair[0] === leftWord && pair[1] === rightWord);

    if (isCorrect) {
        leftButton.style.backgroundColor = "#32CD32"; // Зеленый
        rightButton.style.backgroundColor = "#32CD32";
        leftButton.disabled = true;
        rightButton.disabled = true;
        selectedLeft = null;
        selectedRight = null;
    } else {
        setTimeout(() => {
            leftButton.classList.remove("selected");
            rightButton.classList.remove("selected");
            leftButton.style.backgroundColor = "";
            rightButton.style.backgroundColor = "";
            selectedLeft = null;
            selectedRight = null;
        }, 1000);
    }
}

// Инициализация
loadWords(1);

//ччч

//
// Функция для проверки правильного ответа
function checkAnswer() {
    if (selectedLeft && selectedRight) {
        checkMatch(selectedLeft, selectedRight);
    } else {
        alert("Выберите оба слова для проверки ответа.");
    }
}

// Функция для показа подсказки
function showHint() {
    if (selectedLeft) {
        // Если выбрано слово из левой колонки, находим его правильный перевод
        const leftWord = selectedLeft.textContent;
        const correctPair = levels[1].find(pair => pair[0] === leftWord);
        if (correctPair) {
            const correctTranslation = correctPair[1];
            // Находим кнопку с правильным переводом в правой колонке
            const rightButtons = document.querySelectorAll(".right");
            rightButtons.forEach(btn => {
                if (btn.textContent === correctTranslation) {
                    btn.style.backgroundColor = "#FFD700"; // Золотой цвет для подсказки
                }
            });
        }
    } else if (selectedRight) {
        // Если выбрано слово из правой колонки, находим его правильный перевод
        const rightWord = selectedRight.textContent;
        const correctPair = levels[1].find(pair => pair[1] === rightWord);
        if (correctPair) {
            const correctTranslation = correctPair[0];
            // Находим кнопку с правильным переводом в левой колонке
            const leftButtons = document.querySelectorAll(".left");
            leftButtons.forEach(btn => {
                if (btn.textContent === correctTranslation) {
                    btn.style.backgroundColor = "#FFD700"; // Золотой цвет для подсказки
                }
            });
        }
    } else {
        alert("Выберите слово, для которого нужна подсказка.");
    }
}

// Добавляем обработчики событий для кнопок
document.getElementById("mainBtn1").addEventListener("click", checkAnswer);
document.getElementById("mainBtn2").addEventListener("click", showHint);



// Вешаем обработчик на кнопку "ответ"
document.getElementById('mainBtn1').addEventListener('click', showAllAnswers);