import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { Table, Button } from 'react-bootstrap'
import axios from 'axios'
import { LinkContainer } from 'react-router-bootstrap'
import { useParams } from 'react-router-dom'
import Paginate from '../components/Paginate'

const EmployeesScreen = () => {
    const params = useParams();
    const keyword = params.keyword;
    const currentPage = params.page
    const sortType = params.sort

    const [numberOfPages, setNumberOfPages] = useState('')
    const [employees, setEmployees] = useState([])
    const fetchEmployees = async (keyword = ``, currentPage = ``, sortType = ``) => {
        console.log("Fetching employees")
        console.log(sortType)
        console.log(params)
        const result = await axios.get(`/api/employees/?keyword=${keyword}&sort=${sortType}&page=${currentPage}`)
        const { data, numberOfPages } = result.data
        setNumberOfPages(numberOfPages)
        setEmployees(data)
    }
    useEffect(() => {
        console.log("Calling fetch Employees from useEffect")
        fetchEmployees(keyword, currentPage, sortType)
    }, [keyword, currentPage, numberOfPages, sortType])

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

    const sortTypes = {
        empId: {
            class: 'sort-up',
            fn: (a, b) => b.empId - a.empId
        },
        name: {
            class: 'sort-down',
            fn: (a, b) => a.name - b.name
        },
        default: {
            class: 'sort',
            fn: (a, b) => a
        }
    };

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
            <Paginate numberOfPages={numberOfPages} page={currentPage} keyword={keyword ? keyword : ''}
                sort={sortType ? sortType : ''} />
        </>
    )
}

export default EmployeesScreen