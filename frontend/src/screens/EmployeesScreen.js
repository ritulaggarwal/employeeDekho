import React from 'react'
import { Link } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'

const EmployeesScreen = ({ employees }) => {
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
                        <th></th>
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

                        </tr>

                    ))}

                </tbody>


            </Table>



        </>
    )
}

export default EmployeesScreen