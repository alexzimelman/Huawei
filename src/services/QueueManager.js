const Queue = require('./Queue')

class QueueManager {
    constructor() {
        this.queues = {}
    }

    createQueue(qName){
        this.queues[qName] = new Queue(qName)
    }

    handleNewTask(qName, task){
        if(!this.queues[qName]){
            this.createQueue(qName)
        }
        this.queues[qName].pushTask(task)
        this.showQueuesStats()
    }

    showQueuesStats(){
        console.clear()
        let str = ''
        for(let queue in this.queues){
            str += this.queues[queue].logStats()
        }
        console.log(str)
    }
}
module.exports = new QueueManager();