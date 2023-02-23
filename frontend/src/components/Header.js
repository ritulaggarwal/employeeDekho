import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container } from 'react-bootstrap'
import SearchBox from './SearchBox'


const Header = () => {
    return (
        <header>
            <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
                <Container>

                    <LinkContainer to='/'>
                        <Navbar.Brand>Employee Dekho</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />


                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Routes>
                            <Route render={({ history }) => <SearchBox history={history} />} />
                        </Routes>
                        <SearchBox />
                        <Nav className='ms-auto'>
                            <LinkContainer to='/employees/create'>
                                <Nav.Link>
                                    <i className="fa-solid fa-circle-plus"></i> Add
                                </Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/employees'>
                                <Nav.Link>
                                    <i className="fa-solid fa-users"></i> View Employees
                                </Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header