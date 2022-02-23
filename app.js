const express = require('express')
const path = require('path')
const app = express()

const Contacts = [
    {
        id: 1, name: 'Pavel', value: '+7-963-444-44-47', marked: false
    }
]

app.use(express.static(path.resolve(__dirname, 'client')))

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
})

app.listen(3000, () => console.log('server started on port 3000...'))