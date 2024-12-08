import React,{useState,useEffect} from 'react';
import {useParams} from 'react-router-dom'
import {useSelector} from "react-redux";
import Emailing from './Emailing'
import './placeOrder.css'
import {Link} from 'react-router-dom'
import Navbar from '../Navbar/Navbar'

const ProductDetails = () => {
    const {id}  = useParams();
    const items = useSelector((state)=>state.products);
    const [record, setRecords] = useState([]);
    console.log(items); 
    const filterRecords = (items)=>{
        const filtered = items.filter((item)=>item.id === parseInt(id));
        setRecords(filtered);
        return filtered;
    }
    useEffect(()=>{
        filterRecords(items);
        setRecords(filterRecords(items));
    },[items]);
    return(
       <div>
            <Navbar/>
            <div className='itemsdiv'>
            <div className='productItems'>
                {record.map((eachRecord)=>{
                return(
                    <div key={eachRecord.id} className='productDetail'>
                        <Link  to ={`/Customer/product/:${eachRecord.id}`} ><img src={eachRecord.productImage} alt=''/></Link>
                        <p><span>Name : </span>{eachRecord.productName}</p>
                        <p><span>Catalog : </span>{eachRecord.description}</p>
                        <p><span>Brand : </span>{eachRecord.brand}</p>
                        <p><span>Price : </span>${eachRecord.price}</p>
                    </div>
                    ) 
                })}
            </div>
            <div className='mailing'>
                <Emailing/>
            </div>           
        </div>
       </div>
        
    );
}

export default ProductDetails;
