require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());

// 设置模板引擎
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 创建连接池   此处为示例，使用时将连接池中的信息替换为自己的数据库信息
const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'test_user',
  password: 'root',
  database: 'myapp',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 测试数据库连接
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ 成功连接到 MySQL 数据库');
    connection.release();
  } catch (err) {
    console.error('❌ 数据库连接失败:', err.message);
  }
}

testConnection();

// 根路径处理
app.get('/api/test', async (req, res) => {
    try {
        // 执行 SQL 查询，获取最新的数据
        // 假设表中有一个 'id' 字段作为主键并且是递增的
        const results = await pool.query('SELECT unit, name, value FROM apitest ORDER BY id DESC LIMIT 1');
        if (results.length > 0) {
            res.json(results[0]); // 返回最新的数据
        } else {
            res.json(null); // 如果没有数据，返回 null
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: '数据库错误' });
    }
});

app.get('/api/wendu', async (req, res) => {
    try {
        // 执行 SQL 查询，获取最新的数据
        // 假设表中有一个 'id' 字段作为主键并且是递增的
        const results = await pool.query('SELECT unit, name, value FROM wendu ORDER BY id DESC LIMIT 1');
        if (results.length > 0) {
            res.json(results[0]); // 返回最新的数据
        } else {
            res.json(null); // 如果没有数据，返回 null
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: '数据库错误' });
    }
});

app.get('/api/shidu', async (req, res) => {
    try {
        // 执行 SQL 查询，获取最新的数据
        // 假设表中有一个 'id' 字段作为主键并且是递增的
        const results = await pool.query('SELECT unit, name, value FROM shidu ORDER BY id DESC LIMIT 1');
        if (results.length > 0) {
            res.json(results[0]); // 返回最新的数据
        } else {
            res.json(null); // 如果没有数据，返回 null
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: '数据库错误' });
    }
});

app.get('/api/daqiyali', async (req, res) => {
    try {
        // 执行 SQL 查询，获取最新的数据
        // 假设表中有一个 'id' 字段作为主键并且是递增的
        const results = await pool.query('SELECT unit, name, value FROM daqiyali ORDER BY id DESC LIMIT 1');
        if (results.length > 0) {
            res.json(results[0]); // 返回最新的数据
        } else {
            res.json(null); // 如果没有数据，返回 null
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: '数据库错误' });
    }
});

app.get('/api/hongwai', async (req, res) => {
    try {
        // 执行 SQL 查询，获取最新的数据
        // 假设表中有一个 'id' 字段作为主键并且是递增的
        const results = await pool.query('SELECT unit, name, value FROM hongwai ORDER BY id DESC LIMIT 1');
        if (results.length > 0) {
            res.json(results[0]); // 返回最新的数据
        } else {
            res.json(null); // 如果没有数据，返回 null
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: '数据库错误' });
    }
});

app.get('/api/hongwai2', async (req, res) => {
    try {
        // 执行 SQL 查询，获取最新的数据
        // 假设表中有一个 'id' 字段作为主键并且是递增的
        const results = await pool.query('SELECT unit, name, value FROM hongwai2 ORDER BY id DESC LIMIT 1');
        if (results.length > 0) {
            res.json(results[0]); // 返回最新的数据
        } else {
            res.json(null); // 如果没有数据，返回 null
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: '数据库错误' });
    }
});
// 启动服务器
const PORT = process.env.API_PORT || 3001;
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
});