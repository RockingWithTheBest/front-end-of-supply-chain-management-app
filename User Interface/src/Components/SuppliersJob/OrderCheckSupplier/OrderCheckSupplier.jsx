import React ,{useState, useEffect}from 'react';
import DataTable from "react-data-table-component";
import'./Order.css';


const columns =(addToCart)=> [
    {
        name: 'Id',
        selector:row=>row.Id,
        sortable: true
    },
    {
        name: 'Order Id',
        width: '180px',
        selector:row=>row.OrderId,
        sortable: true
    },
    {
        name: 'Product Id',
        selector:row=>row.ProductId,
        sortable: true
    }
    ,
    {
        name: 'Status',
        width: '140px',
        selector:row=>row.Status,
        sortable: true
    },
    {
        name: 'Name',
        selector:row=>row.ProductName,
        sortable: true
    },
    {
        name: 'Product Quantity',
        width: '200px',
        selector:row=>row.ProductQuantity,
        sortable: true
    },
    {
        name: 'Add To Cart',
        width: '200px',
        selector:row=>{
            return <button onClick={()=>addToCart(row.OrderId)}>Add to Cart</button>
        },
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


const OrderCheckSupplier =()=>{
    const [records, setRecords] = useState([]);
    const [orderId, setOrderId] = useState("");
    

    const API_URL = 'https://localhost:7136/';
    const refreshItemsOrderCheck = async () =>{
        try{
            const response = await fetch(`${API_URL}api/OrderCheck/GetAll`);
            const data = await response.json();
            setRecords(data);
        }
        catch(error){
            console.error('Error fetching notes:', error);
        }
    }
    const addToCart = async (OrderId) => {
        setOrderId(OrderId);
        const inventory = {
            OrderId:orderId
        }
        try{
            const response = await fetch(`${API_URL}api/Inventory/AddRecordToCart?OrderId=${OrderId}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }, 
                body: JSON.stringify(inventory)
            });
            const data = await response.json();
            console.log("fetched data: ",data);
            alert('The order has been succesfully data ', data);
        }
        catch(error){
            console.error('Error fetching notes:', error);
        }
    };
    useEffect(()=>{
        refreshItemsOrderCheck();
    }, []);
    return(
        <div>
            <DataTable columns={columns(addToCart)} customStyles ={customStyles} data ={records} pagination className='tabledata'/>
        </div>
    );
};

export default OrderCheckSupplier;