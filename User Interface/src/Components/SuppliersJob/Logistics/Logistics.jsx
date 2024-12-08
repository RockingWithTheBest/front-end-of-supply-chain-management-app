import React, { useState, useEffect } from 'react';
import './Logistics.css';
import Order from '../../../assets/Logistics/order.png'
import Dashboard from  '../../../assets/Logistics/dashboard.png'
import Graphs from  '../../../assets/Logistics/graphs.png'
import Warehouse from  '../../../assets/Logistics/warehouse.png'
import Employees from  '../../../assets/Logistics/employees.png'
import BadgeAvatars from '../Badge/Badge'
import { useNavigate, useParams } from 'react-router-dom';
import {Link} from  'react-router-dom';
const Logistics =()=>{
    const [notificationCount, setNoticationCount] = useState(0);
    const navigate = useNavigate();

    const handleNotifyClick = () =>{
        setNoticationCount(prevCount => prevCount + 1);
    }
    const translateToOrderCheck = () => {
        console.log('translateToOrderCheck');
        navigate('/OrderCheckSupplier')
    }
    return(
        <div>
            <BadgeAvatars/>
            <div className='warehouse'>
            <h1>Warehouse</h1>
            <div>
                <ul className ='edittext'>
                    <li className='dash'><img src={Dashboard} alt="" className='icon-1' />Dashboard</li>
                    <Link to = '/OrderCheckSupplier'><li className='order' onClick ={translateToOrderCheck}><span className="notification-count">{notificationCount}</span><img src={Order} alt="" className='icon-2'/>Orders</li></Link>          
                    <li className='employ'><img src={Employees} alt="" className='icon-3'/>Employees</li>
                    <Link to = '/OrderLinkinToProduct'><li className='ware'><img src={Warehouse} alt="" className='icon-4'/>Warehouse</li></Link>
                    <li className='goods'><img src={Graphs} alt="" className='icon-5'/>Goods Graphing</li>
                </ul>
            </div>

            <button className="" onClick={handleNotifyClick}>
                Click to Link Order Notification
            </button>
       
            <div>
            
            </div>
        </div>
        </div>
       
    )
}

export default Logistics;