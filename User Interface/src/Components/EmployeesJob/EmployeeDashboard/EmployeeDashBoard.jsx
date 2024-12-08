import React,{useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import './EmployeeDashboard.css'

const DashBoard =()=>{
    const {employeeId} = useParams();
    const API_URL = 'https://localhost:7136/';
    const [employee, setEmployee] = useState('');
    console.log('employee IDdhvdgh: ', employeeId);
    const employeeDetails = async()=>{
        try {
            const response = await fetch(`${API_URL}api/Employee/GetSingleEmployeeById?id=${employeeId}`);
            const data = await response.json();

            setEmployee(data);
            return data;
        } catch (error) {
            console.error('Error',error);
        }
    };
    useEffect(() => {
        if(employeeId){
            employeeDetails();            
        }
    }, [employeeId]);

    return (
        <div className='employeeDash'>
            <h1>Dashboard</h1>
            <h2>Welcome to the Dashboard below are your details!</h2>
            {employee && <p>Employee ID: {employee.Id}</p>} 
            {employee && <p>Name: {employee.FirstName} {employee.LastName}</p>} 
            {employee && <p>Address: {employee.Email}</p>} 
            {employee && <p>Date of Birth: {employee.DateOfBirth}</p>}
            {employee && <p>Password: {employee.Password}</p>} 
            {employee && <p>Logged in as Employee your Role ID is {employee.RoleId}</p>} 
     
        </div>
    )
}

export default DashBoard;   