import React ,{useState} from 'react';
import {Link} from 'react-router-dom'
import Carticon from '../../assets/CartImg/carticon.png'
import './navbar.css';


const Navbar =()=>{

    return(
        <div className='navbar'>
            <div className='links'></div>
            <p className='RockTitle'>RockinWithTheBest SCM</p>
            {/* <Link to = {`/userDashboard/${customerId}`} className='shop'>Dashboard</Link> */}
            <Link to='/Customer'><img src={Carticon} alt="" style={{width:32, height:32}}/></Link>
        </div>
    )
}

export default Navbar;