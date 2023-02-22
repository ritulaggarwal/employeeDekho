const express = require('express')
const employees = require('./data/employees')

const app = express()

app.get('/', (req, res) => {
    res.send('API is running...')
})

app.get('/api/employees', (req, res) => {
    res.json(employees)
})

app.get('/api/employees/:id', (req, res) => {
    const employee = employees.find((employee) => employee.empId === req.params.id)
    res.send(employee)
})

app.listen(5000, console.log('Server running on 5000!'))