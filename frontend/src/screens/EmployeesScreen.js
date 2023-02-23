import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { Table, Button } from 'react-bootstrap'
import axios from 'axios'
import { LinkContainer } from 'react-router-bootstrap'
import { useParams } from 'react-router-dom'

const EmployeesScreen = () => {
    const params = useParams();

    const keyword = params.keyword;

    const [employees, setEmployees] = useState([])
    const fetchEmployees = async (keyword = ``) => {
        const { data } = await axios.get(`/api/employees/?keyword=${keyword}`)
        setEmployees(data)
    }
    useEffect(() => {
        fetchEmployees(keyword)
    }, [keyword])

    const deleteEmployee = async (id) => {
        try {
            await axios.delete(`/api/employees/${id}`)
            toast.success("Employee deleted!")
            fetchEmployees()
        } catch (err) {
            toast.error("Error occurred during deletion of employee.")
            console.log(err)
        }

    }

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete the employee?')) {
            deleteEmployee(id)
        }
    }

    return (
        <>
            <h1>Employees List</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Emp. Id</th>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Department</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Manager</th>
                    </tr>
                </thead>

                <tbody>
                    {employees.map((employee, index) => (

                        <tr key={employee.empId}>
                            <td>{employee.empId}</td>
                            <td>{employee.name}</td>
                            <td>{employee.position}</td>
                            <td>{employee.department}</td>
                            <td>{employee.email}</td>
                            <td>{employee.age}</td>
                            <td>{employee.manager}</td>
                            <td>
                                <LinkContainer to={`/employees/edit/${employee.empId}`}>
                                    <Button
                                        variant='info'
                                        className='btn-sm'>
                                        <i className="fa-solid fa-user-pen"></i>
                                    </Button>
                                </LinkContainer>
                            </td>

                            <td>
                                <Button
                                    variant='danger'
                                    className='btn-sm'
                                    onClick={() => deleteHandler(employee.empId)}>
                                    <i className='fas fa-trash'></i>
                                </Button></td>
                        </tr>

                    ))}

                </tbody>

            </Table>
        </>
    )
}

export default EmployeesScreen