import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'


const EditEmployeeScreen = () => {
    const initialEmployee = {
        empId: "",
        name: "",
        age: "",
        salary: "",
        department: "",
        position: "",
        email: "",
        manager: ""
    }

    const [employee, setEmployee] = useState(initialEmployee)
    const { empId, name, age, salary, department, position, email, manager } = employee;

    const { id } = useParams()

    const fetchEmployee = async (id) => {
        const { data } = await axios.get(`/api/employees/${id}`)
        setEmployee(...data)
    }

    useEffect(() => {
        fetchEmployee(id)
    }, [id])


    const updateEmployee = async (employee) => {
        try {
            await axios.put(`/api/employees/edit/${id}`, employee)
            toast.success("Employee Updated successfully")
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
        updateEmployee({ empId, name, age, salary, department, position, email, manager })

    }

    return (
        <FormContainer>
            <h1>Update Employee Information</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='empId'>
                    <Form.Label>Employee Id</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Employee Id'
                        value={empId || ""}
                        readOnly
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter name'
                        defaultValue={name || ""}
                        onChange={(e) => setEmployee(employee => { return { ...employee, name: e.target.value } })}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter Email'
                        defaultValue={email || ""}
                        onChange={(e) => setEmployee(employee => { return { ...employee, email: e.target.value } })}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='department'>
                    <Form.Label>Department</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Department'
                        defaultValue={department || ""}
                        onChange={(e) => setEmployee(employee => { return { ...employee, department: e.target.value } })}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='position'>
                    <Form.Label>Position</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Position'
                        defaultValue={position || ""}
                        onChange={(e) => setEmployee(employee => { return { ...employee, position: e.target.value } })}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='manager'>
                    <Form.Label>Manager</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Manager Name'
                        defaultValue={manager || ""}
                        onChange={(e) => setEmployee(employee => { return { ...employee, manager: e.target.value } })}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='salary'>
                    <Form.Label>Salary</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Salary'
                        defaultValue={salary || ""}
                        onChange={(e) => setEmployee(employee => { return { ...employee, salary: e.target.value } })}
                    ></Form.Control>
                </Form.Group>

                <Form.Group className='mb-3' controlId='age'>
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Age'
                        defaultValue={age || ""}
                        onChange={(e) => setEmployee(employee => { return { ...employee, age: e.target.value } })}
                    ></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Update
                </Button>
            </Form>

        </FormContainer>
    )
}

export default EditEmployeeScreen