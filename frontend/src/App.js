import React from 'react'
import './bootstrap.min.css'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen'
import EmployeesScreen from './screens/EmployeesScreen';
import AddEmployeeScreen from './screens/AddEmployeeScreen';
import EditEmployeeScreen from './screens/EditEmployeeScreen';

const App = () => {
  return (
    <Router>
      <ToastContainer position='top-center' />
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path='/' element={<HomeScreen />} exact />
            <Route path='/employees' element={<EmployeesScreen />} />
            <Route path='/employees/create' element={<AddEmployeeScreen />} />
            <Route path='/employees/edit/:id' element={<EditEmployeeScreen />} />
            <Route path='/search/:keyword' element={<EmployeesScreen />} exact />
            <Route path='/page/:page' element={<EmployeesScreen />} exact />
            <Route path='/search/:keyword/page/:page' element={<EmployeesScreen />} exact />
          </Routes>
        </Container>
      </main>
      <Footer />

    </Router>
  );
}

export default App;
