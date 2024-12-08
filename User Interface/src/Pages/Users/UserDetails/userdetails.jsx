import React ,{useEffect, useState}from 'react';
import DataTable  from 'react-data-table-component';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import './userdetails.css';
import { useParams } from 'react-router-dom';
import Dashboard from './dashboard';
import Navbar from '../Navbar/Navbar'

const columns =(ConfirmOrder)=> [
    {
        name: 'Id',
        selector:row=>row.Id,
        sortable: true  
    },
    {
        name: 'Quantity',
        selector:row=>row.Quantity,
        sortable: true
    },
    {
        name: 'Fee',
        width: '140px',
        selector:row=>row.PricePaid,
        sortable: true
    },
    {
        name: 'Order Status',
        selector:row=>row.Status,
        sortable: true
    },
    {
        name: 'Product Name',
        selector:row=>row.ProductName,
        sortable: true
    },
    {
        name: 'Customer Id',
        width: '300px',
        cell: row => (
            <>
            <Button variant="outlined" startIcon={<DeleteIcon /> } onClick={()=>ConfirmOrder(row.Id)}>
                 Confirm Reception
            </Button>
            </>    
        )
        
    }
]
const columnNewOrder =()=> [
    {
        name: 'Id',
        selector:row=>row.Id,
        sortable: true  
    },
    {
        name: 'Quantity',
        width: '180px',
        selector:row=>row.Quantity,
        sortable: true
    },
    {
        name: 'Fee',
        width: '140px',
        selector:row=>row.PricePaid,
        sortable: true
    },
    {
        name: 'Order Status',
        width: '200px',
        selector:row=>row.Status,
        sortable: true
    },
    {
        name: 'Product Name',
        width: '180px',
        selector:row=>row.ProductName,
        sortable: true
    }
]
const customStyles = {
    headCells:{
      style:{
        backgroundColor: "black",
        color: "white",
        fontSize: "17px",
        fontWeight: "bold"
      }
    }
} 

const OrderTable = () => {
    const [newRecords, setNewRecords] = useState([]);
    const [oldRecords, setOldRecords] = useState([]);
    const API_URL = 'https://localhost:7136/';
    const {customerId} = useParams();


    const inventoryData = async() =>{
        try {
            const response = await fetch(`${API_URL}api/Inventory/GetByNew-OrderByCustomerId?id=${customerId}`);
            const data = await response.json();
            setOldRecords(data);
            return data;
        } catch (error) {
            console.error('Error:', error);
        }
    }
   

    useEffect(() =>{
        inventoryData();
        ConfirmOrder();
        GetNew();
    },[])
    const GetNew = async() =>{
        try{
            const confirmResponse = await fetch(`${API_URL}api/Inventory/GetByConfirmed-OrderByCustomerId?id=${customerId}`);
                if (!confirmResponse.ok) {
                    const confirmedErrorData = await confirmedResponse.json();
                    console.error('Error fetching confirmed orders:', confirmedErrorData);
                    return; // Exit if there's an error
                }
                const confirmedData = await confirmResponse.json();
                setNewRecords(confirmedData);
                console.log('DATAS', confirmedData);      
        }
        catch(error){
            console.error('Error:', error);
        }

    }
    const ConfirmOrder= async (Id)=>{
        try {
            const requestBody = {Id: Id};
            const response = await fetch(`${API_URL}api/Inventory/UpdateOrderStatus?id=${Id}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error updating order status:', errorData);
                return; // Exit if there's an error
            }  
        GetNew();

        } catch (error) {
            console.error('Error in ConfirmOrder:', error);
        }

    }
    return(
        <div>
            <Navbar />
             <div className='dashboard'>
        
            <div className='customerDash'><Dashboard customerId ={customerId}/></div>
            <div className='tables'>
                <div>
                    <h1>Orders just recieved</h1>
                    <DataTable columns={columns(ConfirmOrder)} data = {oldRecords} customStyles = {customStyles} pagination  />
                </div>
                <div>
                    <h1>Confirmed Orders</h1>
                    <DataTable columns={columnNewOrder()} data = {newRecords} customStyles = {customStyles} pagination  />
                </div>
            </div>
        </div>
        </div>
       
    );
};

export default OrderTable;