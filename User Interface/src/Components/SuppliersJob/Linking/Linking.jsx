import React from 'react';
import {Link} from 'react-router-dom';
import DataTable from "react-data-table-component";
import { useState, useEffect} from 'react';
    import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import GenerateProduct from '../GenerateProduct/GenerateProduct';
import  Logistics  from '../Logistics/Logistics';
import './Linking.css'
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';




const columns =(onGetProduct)=> [
    {
        name: 'Id',
        selector:row=>row.Id,
        sortable: true
    },
    {
        name: 'Order Status',
        width: '180px',
        selector:row=>row.OrderStatus,
        sortable: true
    },
    {
        name: 'Tax Status',
        selector:row=>row.TaxStatus,
        sortable: true
    }
    ,
    {
        name: 'Quantity',
        width: '140px',
        selector:row=>row.Quantity,
        sortable: true
    },
    {
        name: 'Product Id',
        selector:row=>row.ProductId,
        sortable: true
    },
    {
        name: 'Actions',
        width: '140px',
        cell: row => (
            <>
                <button onClick ={()=>onGetProduct(row.ProductId)}>Get Product</button>
            </>    
        )
        
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

const OrderLink = () =>{
    const [records, setRecordOfOrders] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [open, setOpen] = useState(false);


    const API_URL = 'https://localhost:7136/';
    const refreshItems = async ()=> {
        try{
          const response  = await fetch(`${API_URL}api/Order/IndexingAll`);
          const data = await response.json();
          console.log(data);
          setRecordOfOrders(data);
        }
        catch(error){
            console.error('Error fetching notes:', error);
        }
        
    }
    useEffect(() => {
        refreshItems(); 
    }, []);

    const handleGetProduct =(productId)=>{
        setSelectedProductId(productId);
        setOpen(true);
        console.log(productId);
    }
    return (
        <div className='DataLog'>
           <div className='logistic'><Logistics/></div>
           <div>
                  <Button style ={{ background:'white', color:'black', border:'2px solid black' }}variant="contained" endIcon={<AddShoppingCartIcon />}>
                    Add Order
                  </Button>
                  <DataTable columns={columns(handleGetProduct)} data = {records} customStyles = {customStyles} pagination  />
                  <Popup open = {open} onClose ={()=> setOpen(false)} model nested>
                    <div>
                            <h2>Linking order to Product</h2>
                            <GenerateProduct productid ={selectedProductId}/>
                            <button onClick={() => setOpen(false)}>Close</button>
                    </div>
                  </Popup>
                
           </div>
        </div>
    );
};

export default OrderLink;