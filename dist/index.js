"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const tmi_js_1 = __importDefault(require("tmi.js"));
require("dotenv/config");
require('dotenv').config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
const username = process.env.TWITCH_USER;
const token = process.env.TWITCH_TOKEN;
app.use(express_1.default.static('public'));
const twitchClient = new tmi_js_1.default.Client({
    options: { debug: true },
    connection: {
        reconnect: true,
        secure: true,
    },
    identity: {
        username: username,
        password: token,
    },
    channels: ['gaules'],
});
twitchClient.connect().catch(console.error);
const ignoredBots = ['StreamElements', 'Streamlabs', 'Nightbot'];
twitchClient.on('message', (channel, userstate, message, self) => {
    if (self || ignoredBots.includes(userstate['display-name']))
        return;
    const chatMessage = {
        username: userstate['display-name'] || 'Anonymous',
        color: userstate['color'],
        subscriber: userstate['subscriber'],
        message,
    };
    io.emit('chat message', chatMessage);
});
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
