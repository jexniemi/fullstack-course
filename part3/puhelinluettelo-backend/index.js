const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json());

let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },
    {
        name: "Martti Tienari",
        number: "040-123456",
        id: 2
    },
    {
        name: "Arto Järvinen",
        number: "040-123456",
        id: 3
    }
]

app.get('/info', (req, res) => {
    const howMany = persons.length
    res.send(`<p>Puhelinluettelossa on ${howMany} henkilön tiedot</p><p>${new Date()}</p>`)
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== person)

    response.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    if (body.name === undefined || body.number === undefined) {
        return res.status(400).json({error: "content missing"})
    }

    if (persons.filter(person => person.name === body.name).length > 0) {
        return res.status(400).json({error: "person already on the list"})
    }

    const person = {
        name : body.name,
        number: body.number,
        id: Math.floor((Math.random() * 99999999) + 1)
    }

    persons = persons.concat(person)

    res.json(person)
})


const PORT = 3002
app.listen(PORT, () => {
    console.log(`Server runnin on port ${PORT}`)
})