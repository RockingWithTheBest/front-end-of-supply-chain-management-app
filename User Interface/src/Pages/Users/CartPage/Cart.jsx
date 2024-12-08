import React ,{useState} from 'react';
import Navbar from '../Navbar/Navbar';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import DataTable from "react-data-table-component";

const columns =()=> [
    {
        name: 'Id',
        selector:row=>row.Id,
        sortable: true
    },
    {
        name: 'Product Name',
        width: '180px',
        selector:row=>row.Name,
        sortable: true
    },
    {
        name: 'Brand',
        selector:row=>row.Brand,
        sortable: true
    }
    ,
    {
        name: 'Catergory',
        width: '140px',
        selector:row=>row.Description,
        sortable: true
    },
    {
        name: 'Price',
        selector:row=>row.Price,
        sortable: true
    },
    {
        name: 'Stock Quantity',
        width: '200px',
        selector:row=>row.StockQuantity,
        sortable: true
    },
    {
        name: 'Supplier',
        width: '150px',
        selector:row=>row.SupplierId,
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
const Cart =()=>{
    const[clientName, setClientName]  = useState('ahsdcfswe');
    const [records, setRecords] = useState([]);
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
      };
    
    return(
        <div>
            <Navbar/>
            <div className='productRecieved'>
                <h1>Welcome {clientName}</h1>
                <p>The Order you placed is now available for pick up and below are the orders details</p>
                <p>Choose the payment method</p>
                <div>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={handleChange}
                >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                <DataTable columns={columns()} data = {records} customStyles = {customStyles} pagination  />
                </div>
            </div>
            
        </div>
    )
};

export default Cart;