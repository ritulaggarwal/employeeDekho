import pool from '../config/db.js'
import { fileConstants } from '../../constants/fileConstants.js'
import * as path from 'path'
import { readFile } from '../../utils/fsUtil.js'
import { employeeConstants } from '../../constants/employeeConstants.js'

const resultPerPage = employeeConstants.EMPLOYEES_PER_PAGE

const getEmployeeWithIdAccessor = ((req) => {
    const { id } = req.params
    const prefixFilePath = fileConstants.FILE_PATH_PREFIX
    const filePath = path.join(prefixFilePath, 'getEmployeeWithId.sql').toString()
    const getEmployeeWithIdQuery = readFile(filePath)
    return new Promise((resolve, reject) => {
        pool.query(getEmployeeWithIdQuery, [id], (err, data) => {
            if (err) {
                console.log(`Error occured while fetching employee with id ${id}: ${err}`)
                return reject(err)
            }
            return resolve(data)
        })
    })
})

const createEmployeeAccessor = ((req) => {
    const { empId, name, age, salary, department, manager, position, email } = req.body
    const prefixFilePath = fileConstants.FILE_PATH_PREFIX
    const filePath = path.join(prefixFilePath, 'createEmployee.sql').toString()
    const createEmployeeQuery = readFile(filePath)
    return new Promise((resolve, reject) => {
        pool.query(createEmployeeQuery, [empId, name, age, salary, department, manager, position, email], (err, data) => {
            if (err) {
                console.log(`Error occured while adding employee with id ${empId} : ${err}`)
                return reject(err)
            }
            return resolve(data)
        })
    })
})

const updateEmployeeAccessor = ((req) => {
    const { id } = req.params
    const { name, age, salary, department, manager, position, email } = req.body
    const prefixFilePath = fileConstants.FILE_PATH_PREFIX
    const filePath = path.join(prefixFilePath, 'updateEmployee.sql').toString()
    const updateEmployeeQuery = readFile(filePath)
    return new Promise((resolve, reject) => {
        pool.query(updateEmployeeQuery, [name, age, salary, department, manager, position, email, id], (err, data) => {
            if (err) {
                console.log(`Error occured while updating employee with id ${id} : ${err}`)
                return reject(err)
            }
            console.log(`Employee updated in the database with id: ${id}`)
            return resolve(data)
        })
    })

})

const deleteEmployeeAccessor = ((req) => {
    const { id } = req.params
    const prefixFilePath = fileConstants.FILE_PATH_PREFIX
    const filePath = path.join(prefixFilePath, 'deleteEmployee.sql').toString()
    const deleteEmployeeQuery = readFile(filePath)
    return new Promise((resolve, reject) => {
        pool.query(deleteEmployeeQuery, [id], (err, data) => {
            if (err) {
                console.log(`Error occured while deleting employee with id ${id} : ${err}`)
                return reject(err)
            }
            console.log(`Employee deleted from the database with id: ${id}`)
            return resolve(data)
        })
    })

})

const getEmployeesAccessor = ((req) => {
    const keyword = req.query.keyword
    const prefixFilePath = fileConstants.FILE_PATH_PREFIX
    const getAllEmployeesFilePath = path.join(prefixFilePath, 'fetchAllEmployees.sql').toString()
    const searchEmployeesQuery = req.query.keyword ?
        "SELECT * FROM EMPLOYEES WHERE name LIKE '%" + keyword + "%'"
        : readFile(getAllEmployeesFilePath)

    return new Promise((resolve, reject) => {
        pool.query(searchEmployeesQuery, req.query.keyword ? [keyword] : [], (err, data) => {
            if (err) {
                console.log(`Error occured while fetching employees: ${err}`)
                return reject(err)
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
            const fetchedEmployees = () => {
                return new Promise((resolve, reject) => {
                    pool.query(sql, (err, data) => {
                        if (err) {
                            console.log("Error occurred in nested pool")
                            console.log(err)
                            return reject(err)
                        }
                        return resolve({ data: data, numberOfPages })

                    })
                })
            }
            return resolve(fetchedEmployees())
        })
    })

})

export {
    getEmployeeWithIdAccessor, createEmployeeAccessor, getEmployeesAccessor,
    updateEmployeeAccessor, deleteEmployeeAccessor
}