const Message = require("../models/message");
const User = require("../models/user")
const mongoose = require('mongoose')
const dashboard = async (req, res) => {
    try {
        const { userid } = req.body;

        // Fetch the user by their ID
        const response = await User.findById(userid);

        if (!response) {
            return res.status(404).json({ message: 'User not found' });
        }

        console.log(response);
        

        // Get chatroom keys and ensure they're valid ObjectIds
        const chatroomKeys = Array.from(response.chatrooms.keys())

        console.log(chatroomKeys);
        

        if (chatroomKeys.length === 0) {
            return res.status(200).json({ userarray: [] });
        }

        // Fetch users whose IDs match the chatroom keys
        const alldata = await User.find({ _id: { $in: chatroomKeys } })
            .select(`name email username chatrooms.${userid}`);

        // Return the fetched data
        return res.json({
            userarray: alldata,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred' });
    }
};


const searchedUser = async (req, res) => {
    const {email} = req.params
    console.log(email);
    const response = await User.find({email: { $regex: email, $options: 'i' }})
    if (!response) {
        return res.json({message: "no user found"})
    }
    return res.json({
        userarray: response
    })
}

const test = async (req, res) => {
    const response = await User.findOne({ email: "adityaraj6220@gmail.com" }).select('name email username chatrooms')
    res.json({ response })
}

// const testNewUserAdd = async(req, res)=> {
//     const response = new User([
//         {
//           "_id": "6766a2cd89b77dfd2f3b1f33",
//           "username": "aditya",
//           "name": "Aditya Raj",
//           "email": "adityaraj6220@gmail.com",
//           "chatid": "6766a2cd89b77d14673b1f33"
//         },
//         {
//           "_id": "1234b2cd89b77dfd2f3b1f34",
//           "username": "johnny",
//           "name": "John Doe",
//           "email": "john@mail.com",
//         },
//         {
//           "_id": "2345c3cd89b77dfd2f3b1f35",
//           "username": "alice",
//           "name": "Alice Johnson",
//           "email": "alice.@mail.com",
//         },
//       ])

//       user
// }

const pairUser = async (req, res) => {
    const { senderid, receipentid } = req.body
    let payload = { sender: senderid, receipent: receipentid, message: "Starting chat..." }

    console.log(payload);
    

    // return res.json({messgae: "hello"})
    const message = new Message({ chatroom: payload })
    const response = await message.save()

    try {
        await Promise.all([
            User.findByIdAndUpdate(senderid, {
                $set: { [`chatrooms.${receipentid}`]: response._id }
            }, { new: true }),
            User.findByIdAndUpdate(receipentid, {
                $set: { [`chatrooms.${senderid}`]: response._id }
            }, { new: true }),
        ])

        return res.json({message: 'paired successfully'})

    } catch (error) {
        console.log(error)
        return res.json({ message: 'pairing failed' })
    }
}

module.exports = { dashboard, test, searchedUser, pairUser }