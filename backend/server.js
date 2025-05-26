const express = require('express');
const cors = require('cors');
const path = require('path');
const horoscopes = require('./data/horoscopes');
const compatData = require('./data/compat');

const app = express();
const PORT = 3002;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// API Endpoints
app.get('/api/horoscope/:sign', (req, res) => {
    const sign = req.params.sign;
    res.json({ 
        sign, 
        horoscope: horoscopes[sign] || 'Гороскоп не найден' 
    });
});

app.get('/api/compatibility/:sign', (req, res) => {
    const sign = req.params.sign;
    res.json({
        sign,
        compatibleWith: compatData[sign] || ['Информация обновляется']
    });
});

// Новые маршруты для страниц
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.get('/eastern-horoscope', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/eastern-horoscope.html'));
});

app.get('/stones', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/stones.html'));
});

app.get('/totem-animal', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/totem-animal.html'));
});

// Все остальные запросы отправляем на главную страницу
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});