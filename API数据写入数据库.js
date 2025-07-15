require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

//风速传感器
// 创建连接池   此处为示例，使用时将连接池中的各项数据替换为自己的数据库信息
const pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'test_user',
    password: 'root',
    database: 'myapp',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    charset: 'utf8mb4'
});

// 从外部 API 获取数据并写入数据库
async function fetchAndStoreData() {
    try {
        const apiKey = '57F0C832779670ACA23148BA2FBF181B6D423AC86CD91F5C8FD4E84643B0ACF055FD8799758AE532EA5D34DCE21795ECB13CFD781BF86ADF4B0567849949F8752E125B7C941351F8134877648FCD6784B8F16BA2748E8A65F7007435FC1B9722DFD5C48975D32801D27D9033FA221F6625C98A8F7E8E2E5572E7E98AC592F2346363EE9DA43B42346283A3B830FAE1FA55A9A821456622635A07D108104737155D7AE62E49CE38D9FCEBC5E5E3BB14657120A6D8F3CBB8093C683C565D15E116FB0E45BCBE08406DFE477BB2268420B2B380FBA781B1B5B00EA8087B6AAF556B';
        //将此处的key替换为你的token
        const response = await axios.get('http://api.nlecloud.com/devices/1306939/Sensors/fengsu', {  //将此处的网址替换为你的api网址
            headers: {
                'AccessToken': `${apiKey}`
            }
        });
        const response_wendu = await axios.get('http://api.nlecloud.com/devices/1306939/Sensors/temp', {
            headers: {
                'AccessToken': `${apiKey}`
            }
        });
        const response_shidu = await axios.get('http://api.nlecloud.com/devices/1306939/Sensors/shidu', {
            headers: {
                'AccessToken': `${apiKey}`
            }
        });
        const response_daqiyali = await axios.get('http://api.nlecloud.com/devices/1306939/Sensors/daqiyali', {
            headers: {
                'AccessToken': `${apiKey}`
            }
        });
        const response_hongwai = await axios.get('http://api.nlecloud.com/devices/1306939/Sensors/hongwaiduishe1', {
            headers: {
                'AccessToken': `${apiKey}`
            }
        });
        const response_hongwai2 = await axios.get('http://api.nlecloud.com/devices/1306939/Sensors/hongwaiduishe2', {
            headers: {
                'AccessToken': `${apiKey}`
            }
        });
        const data = response.data;
        const data_wendu = response_wendu.data;
        const data_shidu = response_shidu.data;
        const data_daqiyali = response_daqiyali.data;
        const data_hongwai = response_hongwai.data;
        const data_hongwai2 = response_hongwai2.data;
        console.log('返回的数据:', data);
        console.log('返回的数据:', data_wendu);
        console.log('返回的数据:', data_shidu);
        console.log('返回的数据:', data_daqiyali);
        console.log('返回的数据:', data_hongwai);
        console.log('返回的数据:', data_hongwai2);
        console.log('数据类型:', typeof data);

        // 将数据写入数据库
        if (data.ResultObj) {
            const resultObj = data.ResultObj;
            // 将数据写入数据库
            await pool.query(
                'INSERT INTO apitest (device_id, value, unit, name) VALUES (?, ?, ?, ?)',
                [
                    resultObj.DeviceID,
                    parseFloat(resultObj.Value),
                    resultObj.Unit,
                    resultObj.Name,
                ]
            );
        } else {
            console.error('返回的数据结构不符合预期');
        }

        //温度
        if (data_wendu.ResultObj) {
            const resultObj = data_wendu.ResultObj;
            // 将数据写入数据库
            await pool.query(
                'INSERT INTO wendu (device_id, value, unit, name) VALUES (?, ?, ?, ?)',
                [
                    resultObj.DeviceID,
                    parseFloat(resultObj.Value),
                    resultObj.Unit,
                    resultObj.Name,
                ]
            );
        } else {
            console.error('返回的数据结构不符合预期');
        }

        //湿度传感器
        if (data_shidu.ResultObj) {
            const resultObj = data_shidu.ResultObj;
            // 将数据写入数据库
            await pool.query(
                'INSERT INTO shidu (device_id, value, unit, name) VALUES (?, ?, ?, ?)',
                [
                    resultObj.DeviceID,
                    parseFloat(resultObj.Value),
                    resultObj.Unit,
                    resultObj.Name,
                ]
            );
        } else {
            console.error('返回的数据结构不符合预期');
        }

        //大气压力
        if (data_daqiyali.ResultObj) {
            const resultObj = data_daqiyali.ResultObj;
            // 将数据写入数据库
            await pool.query(
                'INSERT INTO daqiyali (device_id, value, unit, name) VALUES (?, ?, ?, ?)',
                [
                    resultObj.DeviceID,
                    parseFloat(resultObj.Value),
                    resultObj.Unit,
                    resultObj.Name,
                ]
            );
        } else {
            console.error('返回的数据结构不符合预期');
        }

        //红外对射
        if (data_hongwai.ResultObj) {
            const resultObj = data_hongwai.ResultObj;
            // 将数据写入数据库
            await pool.query(
                'INSERT INTO hongwai (device_id, value, unit, name) VALUES (?, ?, ?, ?)',
                [
                    resultObj.DeviceID,
                    resultObj.Value,
                    resultObj.Unit,
                    resultObj.Name,
                ]
            );
        } else {
            console.error('返回的数据结构不符合预期');
        }

        //红外对射2
        if (data_hongwai2.ResultObj) {
            const resultObj = data_hongwai2.ResultObj;
            // 将数据写入数据库
            await pool.query(
                'INSERT INTO hongwai2 (device_id, value, unit, name) VALUES (?, ?, ?, ?)',
                [
                    resultObj.DeviceID,
                    resultObj.Value,
                    resultObj.Unit,
                    resultObj.Name,
                ]
            );
        } else {
            console.error('返回的数据结构不符合预期');
        }
        console.log('数据同步成功');
    } catch (err) {
        console.error('数据同步失败:', err);
    }
}

// 启动服务器
const PORT = process.env.API_PORT || 3002;
app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
});

// 每小时从外部 API 获取数据并更新数据库
setInterval(fetchAndStoreData, 10000);

// 立即执行一次
fetchAndStoreData();