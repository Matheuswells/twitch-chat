import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import tmi from 'tmi.js';
import 'dotenv/config'
import { subscribe } from 'diagnostics_channel';
require('dotenv').config()

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const username: string = process.env.TWITCH_USER as string
const token: string  = process.env.TWITCH_TOKEN as string

app.use(express.static('public'));

const twitchClient = new tmi.Client({
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
    if (self || ignoredBots.includes(userstate['display-name'] as string)) return;


    // console.log(userstate)

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