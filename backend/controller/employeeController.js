import asyncHandler from 'express-async-handler'
import { getEmployeeWithIdAccessor, createEmployeeAccessor, updateEmployeeAccessor, deleteEmployeeAccessor, getEmployeesAccessor, filterEmployeeAccessor } from '../dao/dataAccessor/employeeDB.js'

const getEmployees = asyncHandler(async (req, res) => {
    if (!req) {
        throw new Error("Request can not be empty")
    }
    try {
        const data = await getEmployeesAccessor(req)
        console.log("Data in controller")
        console.log(data)
        res.status(200).send(data)
    } catch (err) {
        throw new Error(`Error occurred while fetching Employees: ${err}`)
    }

})

const getEmployeeWithId = asyncHandler(async (req, res) => {
    if (!req.params) {
        throw new Error("Employee Id is required to fetch employee with Id.")
    }
    try {
        const data = await getEmployeeWithIdAccessor(req)
        res.send(data)
    } catch (err) {
        throw new Error(`Error occurred while fetching Employee: ${err}`)
    }

})

const createEmployee = asyncHandler(async (req, res) => {
    if (!req.body || !req.body.empId || !req.body.email) {
        throw new Error("EmpId and Email can not be empty")
    }
    try {
        const data = await createEmployeeAccessor(req)
        res.status(201).send(data)
    } catch (err) {
        throw new Error(`Error occurred while creating Employee: ${err}`)
    }

})

const updateEmployee = asyncHandler(async (req, res) => {
    if (!req.params) {
        throw new Error("Employee Id can not be null")
    }
    try {
        const data = await updateEmployeeAccessor(req)
        res.status(200).send(data)
    } catch (err) {
        throw new Error(`Error occurred while updating Employee: ${err}`)
    }
})

const deleteEmployee = asyncHandler(async (req, res) => {
    if (!req.params) {
        throw new Error("Employee Id can not be null")
    }
    try {
        const data = await deleteEmployeeAccessor(req)
        console.log(data)
        res.status(202).send(data)
    } catch (err) {
        throw new Error(`Error occurred while deleting Employee: ${err}`)
    }

})

const filterEmployee = asyncHandler(async (req, res) => {
    if (!req.body) {
        throw new Error("Request can not be empty")
    }
    try {
        const data = await filterEmployeeAccessor(req)
        res.send(data)
    } catch (err) {
        throw new Error(`Error occurred while filtering employees`)
    }

})

export { getEmployees, getEmployeeWithId, createEmployee, updateEmployee, deleteEmployee, filterEmployee } 