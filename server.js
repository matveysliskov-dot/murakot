const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');
const path = require('path');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// --- ПОДКЛЮЧАЕМ БАЗУ ДАННЫХ ---
const db = new Database(path.join(__dirname, 'votes.db'));

// СОЗДАЁМ ТАБЛИЦУ (если её нет)
db.exec(`
    CREATE TABLE IF NOT EXISTS votes (
        team_id TEXT PRIMARY KEY,
        count INTEGER DEFAULT 0
    )
`);

// ДОБАВЛЯЕМ КОМАНДЫ (если их нет)
const teams = ['spartak', 'cska', 'zenit', 'dinamo', 'rostov', 'loko', 'krylya', 'krasnodar'];
const insertStmt = db.prepare('INSERT OR IGNORE INTO votes (team_id, count) VALUES (?, 0)');
teams.forEach(team => insertStmt.run(team));

// --- ЭНДПОИНТЫ ---

// 1. ПОЛУЧИТЬ ВСЕ ГОЛОСА
app.get('/api/votes', (req, res) => {
    const rows = db.prepare('SELECT team_id, count FROM votes').all();
    const votes = {};
    rows.forEach(row => {
        votes[row.team_id] = row.count;
    });
    res.json(votes);
});

// 2. ПРОГОЛОСОВАТЬ
app.post('/api/vote', (req, res) => {
    const { teamId } = req.body;
    if (!teamId) {
        return res.status(400).json({ error: 'Не указана команда' });
    }
    
    const stmt = db.prepare('UPDATE votes SET count = count + 1 WHERE team_id = ?');
    const result = stmt.run(teamId);
    
    if (result.changes === 0) {
        return res.status(400).json({ error: 'Команда не найдена' });
    }
    
    res.json({ success: true, message: `Голос за ${teamId} принят!` });
});

// 3. ТЕСТОВЫЙ ЭНДПОИНТ
app.get('/api/test', (req, res) => {
    res.json({ message: 'Бэкэнд на Node.js работает!' });
});

// --- ЗАПУСК ---
app.listen(port, () => {
    console.log(`🚀 Бэкэнд запущен на http://localhost:${port}`);
});
