
import React, { useState, useEffect } from 'react';
import 'reactjs-popup/dist/index.css';
import TextField from '@mui/material/TextField';
import { useNavigate, useParams } from 'react-router-dom';
import './GenerateProduct.css'


const GenerateProduct = ({productid})=> {
    const [productData, setProductData] = useState(null);
    const navigate = useNavigate(); 
    const [productOrderId, setProductId] = useState(0);

    const [orderId,setOrderId] = useState(0);
    const [productStatus, setProductStatus] = useState('');
    const [productName, setProductName] = useState('');
    const [productQuantity, setProductQuantity] = useState(0);
    
    const API_URL = 'https://localhost:7136/';

    const fetchProduct = async (Id) => {
        try{
            const response = await fetch(`${API_URL}api/Product/GetItemThroughId?Id=${Id}`);
            
            if(!response.ok){
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setProductData(data);
            setProductId(data.Id);
            setProductName(data.Name);
        }
        catch(error){
            console.error('Error:', error);
        }
    }
    const addProductToOrderCheck = async (productOrderId) => {
        try{
            fetch(`${API_URL}api/OrderCheck/Add-OrderCheck?productId=${productOrderId}`,
            {method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    OrderId: orderId,
                    ProductId: productOrderId,
                    ProductQuantity: productQuantity,
                    Status:productStatus,
                    ProductName: productName,
                })
            })
            console.log('Added orderCheck order');
       
        }
        catch(error){
            console.error('Error:', error);
        }
       
    };
    useEffect(() => {
        if(productid){
            fetchProduct(productid); // Call refreshItems on component mount
        }
    }, [productid]);

    const checkQuantity = () => {
        const userConfirmed = window.confirm('Check Quantity again and OrderId');
        if (!userConfirmed) {
            addProductToOrderCheck(productid);
            navigate('/Supplier'); 
        }
        // If OK is clicked, do nothing (stay on the current page)
    };

    return (
        <div className = 'generate'>
            {
                productData ? (
                    <div>
                    <h2>Product Details</h2>
                    <p>Product ID: {productData.Id}</p>
                    <p>Name: {productData.Name}</p>
                    <p>Description: {productData.Description}</p>
                    <p>Price: {productData.Price}</p>      
                    <p><TextField id="standard-basic" label="Quantiy" variant="standard" onChange ={(e)=>setProductQuantity(e.target.value)} /></p>
                    <p><TextField id="standard-basic" label="OrderId" variant="standard" onChange ={(e)=>setOrderId(e.target.value)} /></p>
                    <p><TextField id="standard-basic" label="Product Status" variant="standard" onChange ={(e)=>setProductStatus(e.target.value)} /></p>
                   <button onClick={()=>checkQuantity()}>Link   </button>
                </div>
                ):(
                    <p>Loading product information...</p>
                )
            }
            
        </div>
    );
};
export default GenerateProduct;

