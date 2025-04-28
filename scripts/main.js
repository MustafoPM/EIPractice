

// Функция для обновления прогресса
function updateProgress(circle, progress) {
    circle.style.background = `conic-gradient(#007bff ${progress}%, #e0e0e0 ${progress}%)`;
    circle.querySelector('.progress-text').textContent = `${progress}%`;
}

// Получаем элементы
const circle = document.querySelector('.circle-progress');
const resultItems = document.querySelectorAll('.result-item');

// Пример данных (можно заменить на реальные данные)

const results = [
    { label: 'Словарь', percent: 0 },
    { label: 'Викторина', percent: 0 },
    { label: 'Слушай и повторяй', percent: 0 },
];

// Обновляем круг и метки
results.forEach((result, index) => {
    resultItems[index].querySelector('.result-label').textContent = result.label;
    resultItems[index].querySelector('.result-percent').textContent = `${result.percent}%`;
});

// Обновляем большой круг (например, средний процент)
const averageProgress = results.reduce((sum, result) => sum + result.percent, 0) / results.length;
updateProgress(circle, averageProgress);



// регистрация авторизация

const buttonRegister = document.getElementById('buttonRegister');

buttonRegister.addEventListener('click', function() {
    window.open('./pages/register/register.html', '_blank');
})

const buttonSignIn = document.getElementById('buttonSignIn');

buttonSignIn.addEventListener('click', function() {
    window.open('./pages/register/buttonSignIn.html', '_blank');
})


// Функция для копирования текста


function copyTextToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        // Показываем уведомление
        const notification = document.getElementById('notification');
        notification.style.display = 'block';
        setTimeout(function() {
            notification.style.display = 'none';
        }, 2000); // Уведомление исчезнет через 2 секунды
    }).catch(function(error) {
        console.error('Не удалось скопировать текст: ', error);
    });
}

// Добавляем обработчик события на текст
const textElement = document.getElementById('copyText');
textElement.addEventListener('click', function() {
    const textToCopy = textElement.innerText; // Получаем текст элемента
    copyTextToClipboard(textToCopy); // Копируем текст
});

$('#btnScroll').click(function() {
    $('html, body').animate({scrollTop: $('#game').offset().top}, 800)
});