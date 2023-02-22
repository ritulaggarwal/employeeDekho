import express from 'express'
import { getEmployees, getEmployeeWithId, createEmployee, updateEmployee, deleteEmployee } from '../controller/employeeController.js'

const router = express.Router()

router.get('/', getEmployees)

router.get('/:id', getEmployeeWithId)
router.post('/create', createEmployee)
router.put('/edit/:id', updateEmployee)
router.route('/:id').delete(deleteEmployee)

export default router