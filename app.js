const express = require('express')
const path = require('path')
const {v4} = require('uuid')
const app = express()

let CONTACTS = [
    {
        id: v4(),
        name: 'Pavel',
        value: '+7-963-444-44-47',
        marked: false
    }
]

app.use(express.json())

app.use(express.static(path.resolve(__dirname, 'client')))

app.get('/api/contacts/', (req, res) => {
    res.status(200).json(CONTACTS)
})

app.post('/api/contacts/', (req, res) => {
    const contact = {...req.body, id: v4(), marked: false}
    CONTACTS.push(contact)
    res.status(201).json(contact)
})

app.delete('/api/contacts/:id', (req, res) => {
    CONTACTS = CONTACTS.filter(c => c.id !== req.params.id)
    res.status(200).json({message: 'Контакт удален'})
})

app.put('/api/contacts/:id', (req, res) => {
    const idx = CONTACTS.findIndex(c => c.id === req.params.id)
    CONTACTS[idx] = req.body
    res.json(CONTACTS[idx])
})

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
})

app.listen(3000, () => console.log('server started on port 3000...'))