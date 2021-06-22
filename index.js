const express = require('express')
const bodyParser = require('body-parser');

const PORT = 8080

const api = new express()
api.use(bodyParser.json({limit: '50mb'}));
api.use(bodyParser.urlencoded({extended: false}));

api.listen(PORT);

require('./src/rabbitMQ/RabbitMQ')()
const QueueManager = require('./src/services/QueueManager')
api.get('/:userId', (req, res) => {
    let userId = req.params.userId
    QueueManager.handleNewTask(userId, {timestamp: new Date().getTime(), user: userId, userId: userId})
    return res.json("received")
});