import React from 'react'
import './bootstrap.min.css'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen'
import employees from './employees';
import EmployeesScreen from './screens/EmployeesScreen';

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path='/' element={<HomeScreen />} exact />
            <Route path='/employees' element={<EmployeesScreen employees={employees} />} />
          </Routes>
        </Container>
      </main>
      <Footer />

    </Router>
  );
}

export default App;
