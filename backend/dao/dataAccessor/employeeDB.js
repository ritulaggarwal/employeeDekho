import pool from '../config/db.js'
import { readFile } from '../../utils/fsUtil.js'
import { employeeConstants } from '../../constants/employeeConstants.js'
import { paginate } from '../../services/paginate.js'
import { joinPath } from '../../utils/pathUtil.js'

const resultPerPage = employeeConstants.EMPLOYEES_PER_PAGE

const getEmployeeWithIdAccessor = ((req) => {
    const { id } = req.params
    const filePath = joinPath('getEmployeeWithId.sql')
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
    const filePath = joinPath('createEmployee.sql')
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

const filterEmployeeAccessor = ((req) => {
    console.log("Calling in accessor")
    const filterObject = req.body
    //  console.log(req)
    console.log(filterObject)
    console.log(filterObject.department)
    const department = filterObject.department ? filterObject.department : ["Operations", "Engineer"]
    let departmentQuery = `'${department[0]}'`
    for (var i = 1; i < department.length; i++) {
        departmentQuery = `${departmentQuery}, '${department[i]}'`
    }
    const startAge = filterObject.startAge ? filterObject.startAge : '1'
    const endAge = filterObject.endAge ? filterObject.endAge : '100'
    const filePath = joinPath('createEmployee.sql')
    // const createEmployeeQuery = readFile(filePath)
    const filterEmployeeQuery = `SELECT * FROM EMPLOYEES WHERE DEPARTMENT IN (${departmentQuery})
    AND AGE BETWEEN ${startAge} AND ${endAge}`

    console.log(filterEmployeeQuery)
    return new Promise((resolve, reject) => {
        pool.query(filterEmployeeQuery, (err, data) => {
            if (err) {
                console.log(`Error occured while filtering`)
                console.log(err)
                return reject(err)
            }
            return resolve(data)
        })
    })
})

const updateEmployeeAccessor = ((req) => {
    const { id } = req.params
    const { name, age, salary, department, manager, position, email } = req.body
    const filePath = joinPath('updateEmployee.sql')
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
    const filePath = joinPath('deleteEmployee.sql')
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
    console.log("IN ACCessor")
    const keyword = req.query.keyword ? req.query.keyword : ''
    const sortType = req.query.sort ? req.query.sort : 'empId'
    const getAllEmployeesFilePath = joinPath('fetchAllEmployees.sql')


    const filterObject = req.body
    console.log(filterObject)
    console.log(...filterObject.department)
    console.log(filterObject.department.length)
    const department = filterObject.department.length > 0 ? filterObject.department : ["Operations", "Engineer"]
    let departmentQuery = `'${department[0]}'`
    console.log()
    for (var i = 1; i < department.length; i++) {
        departmentQuery = `${departmentQuery}, '${department[i]}'`
    }
    const startAge = filterObject.startAge ? filterObject.startAge : '1'
    const endAge = filterObject.endAge ? filterObject.endAge : '100'
    const searchEmployeesQuery = `SELECT * FROM EMPLOYEES WHERE (name LIKE '%${keyword}%' or email LIKE '%${keyword}%') AND department IN (${departmentQuery})
    AND AGE BETWEEN ${startAge} AND ${endAge} ORDER BY ${sortType}`


    console.log("Query")
    console.log(searchEmployeesQuery)






    /*const searchEmployeesQuery = req.query.keyword || req.query.sort ?
        "SELECT * FROM EMPLOYEES WHERE (name LIKE '%" + keyword + "%' or email LIKE '%" + keyword + "%') ORDER BY " + sortType + ""
        : readFile(getAllEmployeesFilePath)

*/



    return new Promise((resolve, reject) => {
        pool.query(searchEmployeesQuery, req.query.keyword ? [keyword] : [], (err, data) => {
            if (err) {
                console.log(`Error occured while fetching employees: ${err}`)
                return reject(err)
            }
            const startingLimit = paginate(req, data.length)
            const numberOfPages = Math.ceil(data.length / resultPerPage)
            const sql = `${searchEmployeesQuery} LIMIT ${startingLimit}, ${resultPerPage}`
            const fetchedEmployees = () => {
                return new Promise((resolve, reject) => {
                    pool.query(sql, (err, data) => {
                        if (err) {
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
    updateEmployeeAccessor, deleteEmployeeAccessor, filterEmployeeAccessor
}