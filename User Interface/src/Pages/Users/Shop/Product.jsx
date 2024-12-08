import React from "react";
import './Product.css'
import './Shop.css'
import { Link } from "react-router-dom";



const Product = (props)=>{
    const {id,productName,price,productImage,description,brand } = props.data;
    return(
        <div className = 'product'>
            <Link to ={`/product/${id}`}><img src={productImage} alt="" /></Link>            
            <div className="description">
                <p><b>{productName}</b></p>
                <p>{brand}</p>
                <p>{description}</p>
                <p>${price}</p>
            </div>
        </div>
    );
};

export default Product;