import React from 'react'
import EmployeeDashboard from '../../Components/EmployeesJob/EmployeeDashBoard/EmployeeDashBoard'
import './Dashboard.css'
import OrderCheckSupplier from '../../Components/SuppliersJob/OrderCheckSupplier/OrderCheckSupplier'
import NavBar from '../../Components/EmployeesJob/EmployeeNav/Navbar'
const Dashboard=()=>{
    return  (
      <div>
         <NavBar/>
        <div className='EmployeeDashboard'>
                <div><EmployeeDashboard/></div>
                <div><OrderCheckSupplier/></div>    
        
            
        </div>
      </div>
        
    )
}
export default Dashboard; 