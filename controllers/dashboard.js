const User = require("../models/user")

const dashboard = async (req, res) => {
    return res.json({
        userarray: [
            {
                "_id": "6766a2cd89b77dfd2f3b1f33",
                "username": "aditya",
                "name": "Kaushal",
                "email": "adityaraj6220@gmail.com",
                "chatid": "6766a2cd89b77d14673b1f33"
            },
            {
                "_id": "1234b2cd89b77dfd2f3b1f34",
                "username": "johnny",
                "name": "John Doe",
                "email": "john.doe@example.com",
                "chatid": "1234b2cd89b77d14673b1f34"
            },
            {
                "_id": "2345c3cd89b77dfd2f3b1f35",
                "username": "alice",
                "name": "Alice Johnson",
                "email": "alice.johnson@example.com",
                "chatid": "2345c3cd89b77d14673b1f35"
            },
            {
                "_id": "3456d4cd89b77dfd2f3b1f36",
                "username": "bob",
                "name": "Bob Smith",
                "email": "bob.smith@example.com",
                "chatid": "3456d4cd89b77d14673b1f36"
            },
            {
                "_id": "4567e5cd89b77dfd2f3b1f37",
                "username": "charlie",
                "name": "Charlie Brown",
                "email": "charlie.brown@example.com",
                "chatid": "4567e5cd89b77d14673b1f37"
            },
            {
                "_id": "5678f6cd89b77dfd2f3b1f38",
                "username": "david",
                "name": "David Lee",
                "email": "david.lee@example.com",
                "chatid": "5678f6cd89b77d14673b1f38"
            },
            {
                "_id": "6789g7cd89b77dfd2f3b1f39",
                "username": "ellen",
                "name": "Ellen White",
                "email": "ellen.white@example.com",
                "chatid": "6789g7cd89b77d14673b1f39"
            },
            {
                "_id": "7890h8cd89b77dfd2f3b1f40",
                "username": "frank",
                "name": "Frank Harris",
                "email": "frank.harris@example.com",
                "chatid": "7890h8cd89b77d14673b1f40"
            },
            {
                "_id": "8901i9cd89b77dfd2f3b1f41",
                "username": "george",
                "name": "George Davis",
                "email": "george.davis@example.com",
                "chatid": "8901i9cd89b77d14673b1f41"
            },
            {
                "_id": "9012j0cd89b77dfd2f3b1f42",
                "username": "hannah",
                "name": "Hannah Miller",
                "email": "hannah.miller@example.com",
                "chatid": "9012j0cd89b77d14673b1f42"
            }
        ]
    })
}

const searchedUser = async (req, res) => {
    return res.json({
        userarray: [
            {
                "chatrooms": {},
                "_id": "6766a2cd89b77dfd2f3b1f33",
                "username": "aditya",
                "name": "Kaushal",
                "email": "adityaraj6220@gmail.com"
            }
        ]
    })
}

const test = async (req, res) => {
    const response = await User.findOne({ email: "adityaraj6220@gmail.com" }).select('name email username chatrooms')
    res.json({ response })
}

module.exports = { dashboard, test, searchedUser }