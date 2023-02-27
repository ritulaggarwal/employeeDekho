import { employeeConstants } from '../constants/employeeConstants.js'

const resultPerPage = employeeConstants.EMPLOYEES_PER_PAGE
const paginate = (req, length) => {
    const numberOfEmployees = length
    const numberOfPages = Math.ceil(numberOfEmployees / resultPerPage)
    let page = req.query.page ? Number(req.query.page) : 1
    if (page > numberOfPages || page < 1) {
        return 1
    }
    const offset = (page - 1) * resultPerPage
    return offset
}

export { paginate }