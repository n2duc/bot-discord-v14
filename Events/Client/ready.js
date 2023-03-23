const { Client } = require('discord.js')
const mongoose = require('mongoose')
require("dotenv").config();

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        await mongoose.connect(process.env.MONGO_URI, {
            keepAlive: true,
        });
        if (mongoose.connect) {
            console.log('MongoDB is now connected!');
        }
        console.log(`${client.user.username} is now online!`)
    },
};