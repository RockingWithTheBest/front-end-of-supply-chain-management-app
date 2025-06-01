import React from 'react';
import {Link} from 'react-router-dom';
import DataTable from "react-data-table-component";
import { useState, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import GenerateProduct from '../GenerateProduct/GenerateProduct';
import  Logistics  from '../Logistics/Logistics';

import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import './Linking.css'



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
        width: '140px',
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
    const [openOrderPop, setOpenOrderPop] = useState(false)
    const [orderstatus, setOrderStatus] =  useState("")
    const [taxstatus, setTaxStatus] =  useState("")
    const [quantity, setQuantity] =  useState("")
    const [productId, setProductId] =  useState("")
    const [clientId, setClientID] =  useState("")


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
    const PostOrder = ()=>{
        const newOrder =   {
            orderStatus: orderstatus,
            taxStatus: taxstatus,
            quantity: quantity,
            productId: productId,
            customerId: clientId           
          }
          console.log("PPPP",newOrder)
        if(newOrder.customerId === '' || 
            newOrder.orderStatus===''|| newOrder.taxStatus===''||
            newOrder.quantity===''||newOrder.productId===''){
            alert("Поля не заполнены")
        }
        else{
            try{
                fetch(`${API_URL}api/Order/Add-Order`,
                    {
                        method: 'POST',
                        headers:{
                            'Content-Type':'application/json'
                        },
                        body:JSON.stringify(newOrder)
                    }
                )
                refreshItems(); 
                alert("Успешно добавлено")
            }
            catch(error){
                console.error('Error posting data:', error);
            }        
        }    
    }
    const addOrder = ()=>{
        setOpenOrderPop(true)
         refreshItems();  
    }
    return (
        <div className='DataLog'>
           <div className='logistic'><Logistics/></div>
           <div>
                  <Button onClick = {()=>addOrder()} style ={{ background:'white', color:'black', border:'2px solid black' }}variant="contained" endIcon={<AddShoppingCartIcon />}>
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
                  <Popup open ={openOrderPop} onClose={()=>setOpenOrderPop(false)} model nested>
                    <div className='addorder'>
                        <h2>Добавление заказ в таблице</h2>
                        <TextField id="standard-basic" label="Order Status" variant="standard" className = 'text-standard' onChange={(e)=>setOrderStatus(e.target.value)} />
                        <TextField id="standard-basic" label="Tax Status" variant="standard"  className = 'text-standard' onChange={(e)=>setTaxStatus(e.target.value)}/>
                        <TextField id="standard-basic" label="Количество" variant="standard"  className = 'text-standard'  onChange={(e)=>setQuantity(e.target.value)}/>
                        <TextField id="standard-basic" label="Продукт ID" variant="standard"  className = 'text-standard'  onChange={(e)=>setProductId(e.target.value)}/>
                        <TextField id="standard-basic" label=" Клиент ID" variant="standard"  className = 'text-standard'  onChange={(e)=>setClientID(e.target.value)}/>
                        <div><button onClick ={()=>PostOrder()}>Добавь</button></div>                        
                    </div>
                  </Popup>
           </div>
        </div>
    );
};

export default OrderLink;
