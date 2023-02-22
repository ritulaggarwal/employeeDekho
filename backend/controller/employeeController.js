import asyncHandler from 'express-async-handler'
import pool from '../config/db.js'

const getEmployees = asyncHandler((req, res) => {
    pool.query("SELECT * FROM EMPLOYEES", (err, data) => {
        if (err) {
            console.log(`Error occured while fetching employees: ${err}`)
            return
        }
        console.log(data)
        res.send(data)
    })
})

const getEmployeeWithId = asyncHandler((req, res) => {
    const { id } = req.params
    const getEmployeeWithIdQuery = "SELECT * FROM EMPLOYEES WHERE empId=?"
    pool.query(getEmployeeWithIdQuery, id, (err, data) => {
        if (err) {
            console.log(`Error occured while fetching employee with id ${id}: ${err}`)
            return
        }
        console.log(data)
        res.send(data)
    })
})

const createEmployee = asyncHandler((req, res) => {
    const { empId, name, age, salary, department, manager, position, email } = req.body
    const createEmployeeQuery =
        "INSERT INTO EMPLOYEES (empId,name,age,salary,department,manager,position,email) VALUES (?,?,?,?,?,?,?,?)"
    pool.query(createEmployeeQuery, [empId, name, age, salary, department, manager, position, email], (err, data) => {
        if (err) {
            console.log(`Error occured while adding employee with id ${empId} : ${err}`)
            return
        }
        console.log(`Employee added in the database with id: ${empId}`)
        res.status(201).send()
    })
})

const updateEmployee = asyncHandler((req, res) => {
    const { id } = req.params
    const { name, age, salary, department, manager, position, email } = req.body
    const updateEmployeeQuery =
        "UPDATE EMPLOYEES SET name=?, age=?, salary=?, department=?, manager=?, position=?, email=? WHERE empId=?"
    pool.query(updateEmployeeQuery, [name, age, salary, department, manager, position, email, id], (err, data) => {
        if (err) {
            console.log(`Error occured while updating employee with id ${id} : ${err}`)
            return
        }
        console.log(`Employee updated in the database with id: ${id}`)
        res.status(200).send()
    })
})

const deleteEmployee = asyncHandler((req, res) => {
    const { id } = req.params
    const deleteEmployeeQuery =
        "DELETE FROM EMPLOYEES WHERE empId=?"
    pool.query(deleteEmployeeQuery, id, (err, data) => {
        if (err) {
            console.log(`Error occured while deleting employee with id ${id} : ${err}`)
            return
        }
        console.log(`Employee deleted from the database with id: ${id}`)
        res.status(202).send()
    })
})

export { getEmployees, getEmployeeWithId, createEmployee, updateEmployee, deleteEmployee } 