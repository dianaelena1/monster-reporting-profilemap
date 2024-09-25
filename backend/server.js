const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const cors = require('cors');
const WebSocket = require('ws');

const app = express();
const wss = new WebSocket.Server({ port: 8081 });

app.use(cors());
app.use(bodyParser.json());

wss.on('connection', (ws) => {
    console.log('Client connected');

    // test
    ws.send(
        JSON.stringify({
            task: 'New deployment',
            time: 'Just Now',
            class: 'bg-info',
            icon: 'bi bi-bell',
        })
    );

    ws.on('message', (message) => {
        console.log('Received:', message);
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

console.log('WebSocket server is running on ws://localhost:8081');

app.get('/proxy', (req, res) => {
    const targetUrl = req.query.url;
    request(targetUrl).pipe(res);
});

app.listen(3000, () => {
    console.log('Proxy server is running on port 3000');
});
