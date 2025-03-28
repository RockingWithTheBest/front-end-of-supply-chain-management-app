import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Logistics from './Logistics/Logistics';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './GraphingGoods.css'

const Goodgraphing =()=>{
    const [goods, setGoodGraphing]= useState([]);
    const API_URL ='https://localhost:7136/';
    const allRecords = async()=>{
        try{
            const response = await axios.get(`${API_URL}api/Deliveries/GetAllRecords`)
            const formattedData = response.data.map(item=>(
                {
                    ...item,
                    EstimatedDelivery: new Date(item.EstimatedDelivery).toLocaleDateString() 
                }
            ))
            console.log(formattedData)
            setGoodGraphing(formattedData)
        }
        catch(error){
            console.error("Error fetching notes: ",error)
        }
    }
    
    useEffect(()=>{
        allRecords();
    },[])
    return(
        <div className='graphing'>
            <div className='log'>
                <Logistics/> 
            </div>
            <div>
                <ResponsiveContainer width="100%" height={400}>
                <h1>Логистический график поставок</h1>
                <LineChart data={goods}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                        dataKey="EstimatedDelivery" 
                        tickFormatter={date => date}
                    />
                    <YAxis />
                    <Tooltip 
                        formatter={(value,name)=>{
                            if(name ==="Id")
                                return ["Номер доставки: "+value];
                            return [value];
                        }} 
                        labelFormatter={(label)=>{
                            const record = goods.find(item=>item.EstimatedDelivery===label);
                            return record ? `Дата: ${label}\n,    Статус: ${record.DeliveryStatus}\n,   Трек-номер: ${record.TrackNumber}` : label;
                        }}   
                    />
                    <Legend />
                    <Line type="monotone" dataKey="Id" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
                
                </ResponsiveContainer>
            </div>
        </div>
    
       
    );
}
export default Goodgraphing;