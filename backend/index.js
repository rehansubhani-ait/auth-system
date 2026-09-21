const express = require('express');
const app = express()
const port = 3000
const cors = require('cors')

// middleware
app.use(express.json())
app.use(cors())

let users = []


app.get('/details', (req, res) => {
    res.send('Hello World!')
})

app.post('/signup', (req, res) => {
    const { fullName, email, password } = req.body
    let isUserExist = users.find((user) => user.email === email)
    if (isUserExist) {
        res.status(400).json({
            message: "User already exists user can login",
            users: users
        })
    } else {
        users.push({ fullName, email, password })
        res.status(201).json({
            message: "User created successfully",
            users: users
        })
    }
    console.log(users);
    
})

app.post('/login', (req, res) => {
    const { email, password, rememberMe } = req.body
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