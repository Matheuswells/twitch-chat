"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tmi_js_1 = __importDefault(require("tmi.js"));
// Set up your Twitch client options
const client = new tmi_js_1.default.Client({
    options: { debug: true },
    connection: {
        reconnect: true,
        secure: true
    },
    identity: {
        // Use your Twitch account credentials or bot account credentials
        username: 'grizzyrp',
        password: 'oauth:73vin5w2bjyjyl0n848tsz3ijn7dzf' // Generate from https://twitchapps.com/tmi/
    },
    channels: ['lordwtap'] // List of channels you want to connect to
});
// Connect to Twitch chat
client.connect().catch(console.error);
// Event listener for when a message is sent in the chat
client.on('message', (channel, userstate, message, self) => {
    if (self)
        return; // Ignore messages from the bot itself
    const badges = userstate['badges'];
    // Check if the message is from the user 'grizzyrp'
    console.log(`[${userstate['display-name']}] ${message}`);
    console.log('aa', badges);
});
