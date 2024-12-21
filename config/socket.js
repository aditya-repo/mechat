const Message = require("../models/message");

const setupSocket = (io) => {

    // Socket communication
    io.on('connection', (socket) => {
        console.log("new user connected", socket.id);

        socket.on('fetchHistory', async ({ sender, receipent }) => {
            try {
                const history = await Message.find({ $or: [{ sender }, { receipent }] }).sort({ timestamp: 1 })
                socket.emit('loadMessages', message)
            } catch (error) {

            }
        })

        socket.on('sendMessage', (messageData) => {
            console.log(messageData);
            
                // Save the new message to the database
                // const newMessage = new Message(messageData);
                // await newMessage.save(); // Wait for the message to be saved
                
                // Emit the message to all connected clients
                io.emit('receiveMessage', messageData);
        })

        socket.on('disconnect', () => console.log("User disconnected"))
    })

}
module.exports = setupSocket