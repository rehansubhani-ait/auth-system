const express = require('express');
const app = express()
const port = 3000
const cors = require('cors')
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/auth-system')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB', err))

// middleware
app.use(express.json())
app.use(cors())

// Schema for user

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }

})

// Collection
// model is behaving like a collectioin database

const User = mongoose.model('user', userSchema)

// let users = []


app.get('/details', (req, res) => {
    res.send('Hello World!')
})

app.post('/signup', async (req, res) => {
    const { fullName, email, password } = req.body
    const isUser = await User.findOne({ email })
    if (isUser) {
        res.status(400).json({
            message: "User already exists user can login",
        })
    } else {
        const newUser = new User({
            fullName,
            email,
            password
        })
        await newUser.save()
        res.status(201).json({
            message: "User created successfully",
            users: newUser


        })
    }

})
app.post('/login', (req, res) => {
    const { email, password } = req.body
    let isUserExist = users.find((user) => user.email === email && user.password === password)
    if (isUserExist) {
        res.status(200).json({
            message: "Login successful",
            users: users
        })
    } else {
        res.status(404).json({
            message: "Invalid email or password",
            users: users
        })
    }
    console.log(users);

})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})