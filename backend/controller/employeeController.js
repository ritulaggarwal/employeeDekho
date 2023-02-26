import asyncHandler from 'express-async-handler'
import pool from '../dao/config/db.js'
import { employeeConstants } from '../constants/employeeConstants.js'
import { fileConstants } from '../constants/fileConstants.js'
import { readFile } from '../utils/fsUtil.js'
import * as path from 'path'
import { query } from '../dao/dataAccessor/employeeDB.js'

const resultPerPage = employeeConstants.EMPLOYEES_PER_PAGE
const getEmployees = asyncHandler((req, res) => {
    const keyword = req.query.keyword
    const prefixFilePath = fileConstants.FILE_PATH_PREFIX
    const getAllEmployeesFilePath = path.join(prefixFilePath, 'fetchAllEmployees.sql').toString()
    const searchEmployeesQuery = req.query.keyword ?
        "SELECT * FROM EMPLOYEES WHERE name LIKE '%" + keyword + "%'"
        : readFile(getAllEmployeesFilePath)

    pool.query(searchEmployeesQuery, req.query.keyword ? [keyword] : [], (err, data) => {
        if (err) {
            console.log(`Error occured while fetching employees: ${err}`)
            return
        }
        const numberOfEmployees = data.length
        const numberOfPages = Math.ceil(numberOfEmployees / resultPerPage)
        let page = req.query.page ? Number(req.query.page) : 1
        if (page > numberOfPages) {
            res.redirect('/?page=' + encodeURIComponent(numberOfPages))
        } else if (page < 1) {
            res.redirect('/?page=' + encodeURIComponent('1'))
        }
        const startingLimit = (page - 1) * resultPerPage
        const sql = `${searchEmployeesQuery} LIMIT ${startingLimit}, ${resultPerPage}`

        pool.query(sql, (err, data) => {
            if (err) {
                console.log(err)
                return
            }
            res.send({ data: data, numberOfPages })
        })
    })
})


const getEmployeeWithId = asyncHandler((req, res) => {
    const { id } = req.params
    const prefixFilePath = fileConstants.FILE_PATH_PREFIX
    const filePath = path.join(prefixFilePath, 'getEmployeeWithId.sql').toString()
    const getEmployeeWithIdQuery = readFile(filePath)
    //query(getEmployeeWithIdQuery, [id])
    pool.query(getEmployeeWithIdQuery, [id], (err, data) => {
        if (err) {
            console.log(`Error occured while fetching employee with id ${id}: ${err}`)
            return
        }
        res.send(data)
    })
})

const createEmployee = asyncHandler((req, res) => {
    const { empId, name, age, salary, department, manager, position, email } = req.body
    const prefixFilePath = fileConstants.FILE_PATH_PREFIX
    const filePath = path.join(prefixFilePath, 'createEmployee.sql').toString()
    const createEmployeeQuery = readFile(filePath)
    pool.query(createEmployeeQuery, [empId, name, age, salary, department, manager, position, email], (err, data) => {
        if (err) {
            console.log(`Error occured while adding employee with id ${empId} : ${err}`)
            res.status(400)
            return
        }
        console.log(`Employee added in the database with id: ${empId}`)
        res.status(201).send()
    })
})

const updateEmployee = asyncHandler((req, res) => {
    const { id } = req.params
    const { name, age, salary, department, manager, position, email } = req.body
    const prefixFilePath = fileConstants.FILE_PATH_PREFIX
    const filePath = path.join(prefixFilePath, 'updateEmployee.sql').toString()
    const updateEmployeeQuery = readFile(filePath)
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
    const prefixFilePath = fileConstants.FILE_PATH_PREFIX
    const filePath = path.join(prefixFilePath, 'deleteEmployee.sql').toString()
    const deleteEmployeeQuery = readFile(filePath)
    pool.query(deleteEmployeeQuery, [id], (err, data) => {
        if (err) {
            console.log(`Error occured while deleting employee with id ${id} : ${err}`)
            return
        }
        console.log(`Employee deleted from the database with id: ${id}`)
        res.status(202).send()
    })
})

export { getEmployees, getEmployeeWithId, createEmployee, updateEmployee, deleteEmployee } 