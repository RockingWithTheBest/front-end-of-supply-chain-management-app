import React  from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Shop from './Users/Shop/Shop'
import CartPage from './Users/CartPage/Cart'

import Navbar from './Users/Navbar/Navbar'



const UserRoute =  ()=> {
  return (
    <div>
       <Navbar/>
        <Routes>
            <Route path = '/' element ={<Shop/>} />
            <Route path = '/Customer/cart' element ={<CartPage/>} />
        
            <Route/>
        </Routes>
    </div>
   

  )
}

export default UserRoute;
