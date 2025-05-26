// Получаем элементы DOM
const zodiacButtons = document.querySelectorAll('.zodiac-button');
const contentTitle = document.querySelector('.content-block .content-title');
const contentText = document.querySelector('.content-block .content-text');
const compatibilityText = document.querySelector('.compatibility-text');

// Базовый URL API
const API_BASE_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:3002/api'
    : '/api'; // Для продакшена, когда фронт и бэк на одном домене

// Функция для получения гороскопа
async function getHoroscope(sign) {
    try {
        const response = await fetch(`${API_BASE_URL}/horoscope/${sign}`);
        if (!response.ok) throw new Error('Ошибка сервера');
        return await response.json();
    } catch (error) {
        console.error('Ошибка при получении гороскопа:', error);
        return {
            sign,
            horoscope: 'Не удалось загрузить гороскоп. Попробуйте позже.'
        };
    }
}

// Функция для получения совместимости
async function getCompatibility(sign) {
    try {
        const response = await fetch(`${API_BASE_URL}/compatibility/${sign}`);
        if (!response.ok) throw new Error('Ошибка сервера');
        return await response.json();
    } catch (error) {
        console.error('Ошибка при получении совместимости:', error);
        return {
            sign,
            compatibleWith: ['Информация временно недоступна']
        };
    }
}

// Обработка кликов на знаках зодиака
zodiacButtons.forEach(button => {
    button.addEventListener('click', async function () {
        const sign = this.getAttribute('data-sign');

        // Показываем загрузку
        contentTitle.textContent = `Загружаем гороскоп для ${sign}...`;
        contentText.textContent = 'Пожалуйста, подождите...';

        // Получаем данные
        const data = await getHoroscope(sign);

        // Обновляем UI
        contentTitle.textContent = `Гороскоп для ${data.sign}`;
        contentText.textContent = data.horoscope;

        // Сбрасываем текст совместимости
        compatibilityText.textContent = 'Нажмите для анализа совместимости';
    });
});

// Обработка клика на тексте совместимости
compatibilityText.addEventListener('click', async function () {
    const horoscopeTitle = contentTitle.textContent;

    if (horoscopeTitle === 'Ваш гороскоп' || horoscopeTitle.includes('Загружаем')) {
        alert('Сначала выберите знак зодиака на круге');
        return;
    }

    const sign = horoscopeTitle.replace('Гороскоп для ', '');

    // Показываем загрузку
    compatibilityText.textContent = 'Анализируем совместимость...';

    // Получаем данные
    const data = await getCompatibility(sign);

    // Обновляем UI
    compatibilityText.textContent =
        `Лучшая совместимость у ${sign} с: ${data.compatibleWith.join(', ')}`;
});

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Можно добавить начальную загрузку данных, если нужно
    console.log('Сайт готов к работе!');
});

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Можно добавить начальную загрузку данных, если нужно
    console.log('Сайт готов к работе!');
    
    // Добавляем обработчики для навигации (если нужны дополнительные действия)
    initializeNavigation();
});

// Функция для инициализации навигации
function initializeNavigation() {
    // Добавляем эффекты hover для пунктов меню
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
}