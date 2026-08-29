const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = 5000;

// РАЗРЕШАЕМ ЗАПРОСЫ С САЙТА
app.use(cors());
app.use(express.json());

// --- ПОДКЛЮЧАЕМ БАЗУ ДАННЫХ ---
const db = new sqlite3.Database('votes.db');

// СОЗДАЁМ ТАБЛИЦУ (если её нет)
db.run(`
    CREATE TABLE IF NOT EXISTS votes (
        team_id TEXT PRIMARY KEY,
        count INTEGER DEFAULT 0
    )
`);

// ДОБАВЛЯЕМ КОМАНДЫ (если их нет)
const teams = ['spartak', 'cska', 'zenit', 'dinamo', 'rostov', 'loko', 'krylya', 'krasnodar'];
teams.forEach(team => {
    db.run('INSERT OR IGNORE INTO votes (team_id, count) VALUES (?, 0)', [team]);
});

// --- ЭНДПОИНТЫ ---

// 1. ПОЛУЧИТЬ ВСЕ ГОЛОСА
app.get('/api/votes', (req, res) => {
    db.all('SELECT team_id, count FROM votes', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        const votes = {};
        rows.forEach(row => {
            votes[row.team_id] = row.count;
        });
        res.json(votes);
    });
});

// 2. ПРОГОЛОСОВАТЬ
app.post('/api/vote', (req, res) => {
    const { teamId } = req.body;
    if (!teamId) {
        res.status(400).json({ error: 'Не указана команда' });
        return;
    }
    db.run('UPDATE votes SET count = count + 1 WHERE team_id = ?', [teamId], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ success: true, message: `Голос за ${teamId} принят!` });
    });
});

// 3. ТЕСТОВЫЙ ЭНДПОИНТ
app.get('/api/test', (req, res) => {
    res.json({ message: 'Бэкэнд на Node.js работает!' });
});

// --- ЗАПУСК ---
app.listen(port, () => {
    console.log(`🚀 Бэкэнд запущен на http://localhost:${port}`);
});