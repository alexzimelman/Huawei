const EXCHANGE_NAME = 'requests'

class Queue {
    constructor(name) {
        this.numOfJobs = 0
        this.name = name
        this.rabbitMQ = global.channel
        this.rabbitMQ.assertQueue(name)
        this.rabbitMQ.bindQueue(name, EXCHANGE_NAME, name);
        this.consume()
    }

    pushTask(task){
        this.rabbitMQ.publish(EXCHANGE_NAME, this.name, Buffer.from(JSON.stringify(task)))
        this.numOfJobs++
        return this.numOfJobs
    }

    consume(){
        this.rabbitMQ.consume(this.name, (msg) => {
            this.numOfJobs--
        }, {noAck: true})
    }

    logStats(){
        return `Queue ${this.name} - num of jobs: ${this.numOfJobs}\n`
    }

}
module.exports = Queue;