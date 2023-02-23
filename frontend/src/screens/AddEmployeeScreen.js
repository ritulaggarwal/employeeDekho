import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { toast } from 'react-toastify'
import axios from 'axios'


const AddEmployeeScreen = () => {
    const [empId, setEmpId] = useState('')
    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [salary, setSalary] = useState('')
    const [department, setDepartment] = useState('')
    const [position, setPosition] = useState('')
    const [email, setEmail] = useState('')
    const [manager, setManager] = useState('')

    const createEmployee = async (employee) => {
        try {
            await axios.post('/api/employees/create', employee)

            toast.success("Employee Created successfully")
            setEmail('')
            setEmpId('')
            setName('')
            setAge('')
            setDepartment('')
            setManager('')
            setPosition('')
            setSalary('')
        } catch (err) {
            toast.error(`Error occured while creating Employee`)
            console.log(`Error occured while creating Employee: ${employee}`)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        if (!empId || !email) {
            toast.error("EmployeeId and email can not be empty")
            return
        }
        createEmployee({ empId, name, age, salary, department, position, email, manager })
    }

    return (
        <FormContainer>
            <h1>Add Employee</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='empId'>
                    <Form.Label>Employee Id</Form.Label>
                    <Form.Control
                        type='empId'
                        placeholder='Enter Employee Id'
                        value={empId}
                        onChange={(e) => setEmpId(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='department'>
                    <Form.Label>Department</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Department'
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='position'>
                    <Form.Label>Position</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Position'
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='manager'>
                    <Form.Label>Manager</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Manager Name'
                        value={manager}
                        onChange={(e) => setManager(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='salary'>
                    <Form.Label>Salary</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Salary'
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group className='mb-3' controlId='age'>
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Age'
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Create
                </Button>
            </Form>

        </FormContainer>
    )
}

export default AddEmployeeScreen