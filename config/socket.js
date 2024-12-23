const Message = require("../models/message");

const setupSocket = (io) => {

    // Socket communication
    io.on('connection', (socket) => {
        console.log("new user connected", socket.id);

        socket.on('fetchHistory', async ({ chatroomid }) => {
            try {
                const history = await Message.findById(chatroomid)
                console.log(chatroomid);
                
                socket.emit('loadMessages', history)
            } catch (error) {

            }
        })

        socket.on('sendMessage', async (messageData) => {
            const {sender, receipent, message, chatroomid} = messageData

            const payload = {sender, receipent, message}

            const response = await Message.findByIdAndUpdate(chatroomid, {$push: {chatroom: payload}}, 
                {new: true, upsert: true}
            )
            
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