import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { Table, Button, Form } from 'react-bootstrap'
import axios from 'axios'
import { LinkContainer } from 'react-router-bootstrap'
import { useParams } from 'react-router-dom'
import Paginate from '../components/Paginate'
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import { useMemo } from 'react'


const EmployeesScreen = () => {
    const optionsArray = [
        { key: "Engineer", label: "Engineer" },
        { key: "Operations", label: "Operations" },
    ];
    const params = useParams();
    const keyword = params.keyword;
    const currentPage = params.page
    const sortType = params.sort
    const [startAge, setStartAge] = useState('')
    const [endAge, setEndAge] = useState('')
    var filtering = false
    const [departments, setDepartments] = useState([])
    const filterObject = useMemo(() => {
        return {
            "department": departments,
            "startAge": startAge,
            "endAge": endAge
        }
    }, [departments])
    const [numberOfPages, setNumberOfPages] = useState('')
    const [employees, setEmployees] = useState([])
    const fetchEmployees = async (keyword = ``, currentPage = ``, sortType = ``, filterObject = {}) => {
        console.log("Fetching employees")
        const result = await axios.post(`/api/employees/?keyword=${keyword}&sort=${sortType}&page=${currentPage}`, filterObject)
        const { data, numberOfPages } = result.data
        setNumberOfPages(numberOfPages)
        setEmployees(data)
    }
    useEffect(() => {
        console.log("Calling fetch Employees from useEffect")
        fetchEmployees(keyword, currentPage, sortType, filterObject)
    }, [keyword, currentPage, numberOfPages, sortType, filterObject])

    const filterEmployees = async (selected) => {
        filtering = true
        filterObject.department = selected

    }
    const submitHandler = (e) => {
        e.preventDefault()
        filterObject.startAge = startAge
        filterObject.endAge = endAge
        fetchEmployees(keyword, currentPage, sortType, filterObject)
    }

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
                        <th>Department
                            <DropdownMultiselect handleOnChange={(selected) => {
                                setDepartments(selected)
                                filterEmployees(selected)

                            }}
                                options={optionsArray} name="dept" />
                        </th>
                        <th>Email</th>
                        <th>Age
                            <Form onSubmit={submitHandler}>
                                <Form.Group controlId='startAge'>
                                    <Form.Label>Age From</Form.Label>
                                    <Form.Control
                                        type='startAge'
                                        placeholder='Age from'
                                        value={startAge}
                                        onChange={(e) => setStartAge(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>
                                <Form.Group controlId='endAge'>
                                    <Form.Label>To</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Age till'
                                        value={endAge}
                                        onChange={(e) => setEndAge(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>




                                <Button type='submit' variant='primary'>
                                    Filter
                                </Button>
                            </Form>

                        </th>
                        <th>Date of Birth</th>
                        <th>Manager</th>
                    </tr>
                </thead>

                <tbody>
                    {employees.map((employee, index) => (

                        <tr key={employee.empId}>
                            <td>{employee.empId}</td>
                            <td>{employee.name}</td>
                            <td>{employee.department}</td>
                            <td>{employee.email}</td>
                            <td>{employee.aged}</td>
                            <td>{employee.date_of_birth}</td>
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