import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'


const Footer = () => {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className="py-3 text-center">
                        Copyright &copy; Ritul Aggarwal
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
