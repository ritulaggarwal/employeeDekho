import React from 'react'
import { Container } from 'react-bootstrap'

const HomeScreen = () => {
    return (
        <>
            <Container className="home-page">
                <div className="title">
                    <h1>Welcome to the Employee Dekho</h1>
                    <br />
                </div>
                <img className="employee-image" src="/employee-image.png" alt="employee" />

            </Container>
        </>
    )
}

export default HomeScreen
