import React, {useState,useEffect} from "react";
import './userdetails.css';

const Dashboard = ({customerId})=>{
    const API_URL = 'https://localhost:7136/';
    const [customer, setCustomer] = useState('');
    console.log('Customer IDdhvdgh: ', customerId);
    const customerDetail = async()=>{
        try {
            const response = await fetch(`${API_URL}api/Customer/GetCustomerById?id=${customerId}`);
            const data = await response.json();
            console.log('hey');
            console.log('data', data);
            setCustomer(data);
            return data;
        } catch (error) {
            console.error('Error',error);
        }
    };
    useEffect(() => {
        if(customerId){
            customerDetail();            
        }
    }, [customerId]);
   
    return (    
        <div>
            <h1>Dashboard</h1>
            <h2>Welcome to the Dashboard below are your details!</h2>
            {customer && <p>Customer ID: {customer.Id}</p>} 
            {customer && <p>Name: {customer.FirstName} {customer.LastName}</p>} 
            {customer && <p>Address: {customer.ShippingAddress}</p>} 
            {customer && <p>Address: {customer.Email}</p>} 
            {customer && <p>Date of Birth: {customer.DateOfBirth}</p>}
            {customer && <p>Password: {customer.Password}</p>} 
            {customer && <p>Logged in as Customer your Role ID is {customer.RoleId}</p>} 
            {customer && <p>Return ID: {customer.ReturnId}</p>}
        </div>
    )
}

export default Dashboard;
