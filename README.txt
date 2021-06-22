Main idea:
The main idea is to create a new queue for each user and manage his messages separately for more control.
I have used Express.js to set up the server for thr requests and RabbitMQ for managing the queues.

Classes:
QueueManager - handle the incoming requests and managing the queues according it
Queue - contains the queue functions

Flow:
When request is coming, the router passes it to the QueueManager.
The QueueManager is checking if user's queue exists. if so - it pushes the message into the queue. If not - it's creating a new queue for the user.
Each queue consume its own queue data and handles it.