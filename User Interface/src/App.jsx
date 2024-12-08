import React from 'react';
import { useState } from 'react'
import './App.css'
import Supplier from './Components/SuppliersJob/Supplier'
import {BrowserRouter, Routes,Route } from 'react-router-dom';
import OrderLink from './Components/SuppliersJob/Linking/Linking'
import OrderCheckSupplier from './Components/SuppliersJob/OrderCheckSupplier/OrderCheckSupplier'
import MailingOrder from './Components/SuppliersJob/MailingOrder/MailingOrder'
import RebuiltForm from './Components/Validation/RebuiltForm';
import UserRoute from './Pages/UserRoute'
import PlaceOrder from './Pages/Users/placeOrder/placeOrder' 
import CartPage from './Pages/Users/CartPage/Cart';
import Login from './Pages/Users/UserDetails/Login';
import UserDashboard from './Pages/Users/UserDetails/userdetails';
import EmployeeRegistration from './Pages/Employees/Registration';
import EmployeeLogin from './Pages/Employees/Login';
import EmployeeDashboard from './Components/EmployeesJob/EmployeeDashboard/EmployeeDashBoard';
import EmployeeDash from './Pages/Employees/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path ='/userDashboard/:customerId' element ={<UserDashboard/>}/>
        <Route path ='/Login' element ={<Login/>}/>
        <Route path ='/EmployeeDashboard/:employeeId' element ={<EmployeeDash/>}/>
        <Route path = '/Registration-Employee' element = {<EmployeeRegistration/>}/>
        <Route path='/LoginEmployee' element={<EmployeeLogin/>}/>
        <Route path ='/Customer/*' element ={<UserRoute/>}/>
        {/* <Route path='/:slug' element={<ProductDetail />} /> */}
        <Route path="/UserValidation" element={<RebuiltForm />}/>
        <Route path="/Supplier" element={<Supplier />} />
        <Route path="/OrderLinkinToProduct" element={<OrderLink/>} />
        <Route path="/OrderCheckSupplier" element={<OrderCheckSupplier />} />
        <Route path="/MailingOrder" element={<MailingOrder />} />
        <Route path ='/product/:id' element ={<PlaceOrder/>}/>
        <Route path = '/cart' element ={<CartPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
