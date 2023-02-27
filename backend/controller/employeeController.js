import asyncHandler from 'express-async-handler'
import { getEmployeeWithIdAccessor, createEmployeeAccessor, updateEmployeeAccessor, deleteEmployeeAccessor, getEmployeesAccessor } from '../dao/dataAccessor/employeeDB.js'

const getEmployees = asyncHandler(async (req, res) => {
    if (!req) {
        throw new Error("Request can not be empty")
    }
    const data = await getEmployeesAccessor(req)
    res.send(data)
})

const getEmployeeWithId = asyncHandler(async (req, res) => {
    if (!req.params) {
        throw new Error("Employee Id is required to fetch employee with Id.")
    }
    const data = await getEmployeeWithIdAccessor(req)
    res.send(data)
})

const createEmployee = asyncHandler(async (req, res) => {
    if (!req.body || !req.body.empId || !req.body.email) {
        throw new Error("EmpId and Email can not be empty")
    }
    const data = await createEmployeeAccessor(req)
    res.status(201).send(data)
})

const updateEmployee = asyncHandler(async (req, res) => {
    if (!req.params) {
        throw new Error("Employee Id can not be null")
    }
    const data = await updateEmployeeAccessor(req)
    res.status(200).send(data)
})

const deleteEmployee = asyncHandler(async (req, res) => {
    if (!req.params) {
        throw new Error("Employee Id can not be null")
    }
    const data = await deleteEmployeeAccessor(req)
    console.log(data)
    res.status(202).send(data)
})

export { getEmployees, getEmployeeWithId, createEmployee, updateEmployee, deleteEmployee } 