
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'


const SortDropdown = () => {
    const [event, setEvent] = useState('')
    const navigate = useNavigate();

    const handleSelect = (event) => {
        console.log("Printing eventkey")
        console.log(event)
        setEvent(event)
        if (event) {
            navigate(`/sort/${event}`);
        } else {
            navigate(`/employees`)
        }

    }

    return (
        <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <NavDropdown title='Sort by' id='nav-dropdown' onSelect={handleSelect}>
                            <NavDropdown.Item eventKey="empId">Employee Id</NavDropdown.Item>
                            <NavDropdown.Item eventKey="name">Name</NavDropdown.Item>
                            <NavDropdown.Item eventKey="age">Age</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
};

export default SortDropdown;