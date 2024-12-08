import {React, useState, useEffect} from 'react';
import DataTable from "react-data-table-component";
import AddProduct from './AddProduct/AddProduct';
import Catalog from './Catalogs/Catalog';
import './Supplier.css'
import Logistics from './Logistics/Logistics';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';



const columns =(handleDelete)=> [
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
    },
    {
        name: 'Actions',
        width: '200px',
        cell: row => (
            <>
            <Button variant="outlined" startIcon={<DeleteIcon /> } onClick={()=>handleDelete(row.Id)}>
                 Delete
            </Button>
            {/* <button onClick={()=>handleDelete(row.Id)}>Delete</button> */}
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


const Supplier = ()=>{

    const [records, setRecords] = useState([]);
    const [cloneRecords, setCloneRecords] = useState([]);
 

    const API_URL = 'https://localhost:7136/';
    const refreshItems = async ()=> {
        try{
          const response  = await fetch(`${API_URL}api/Product/Index`);
          const data = await response.json();
          setRecords(data);
          setCloneRecords(data);
        }
        catch(error){
            console.error('Error fetching notes:', error);
        }
        
    }
    useEffect(() => {
        refreshItems(); // Call refreshItems on component mount
    }, []);

   console.log(records);
   const handleChange=(e)=>{
        let query = e.target.value;
        if(query === ''){
            setRecords(cloneRecords);
        }
        else{
            const newRecords =records.filter(records => records.Name.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
            setRecords(newRecords);
        }
    }  

    const handleDelete = async(id)=>{
        const confirmDelete = confirm("Are you sure you want to delete this record?");
        if(confirmDelete){
            try{
                const response = await fetch(`${API_URL}api/Product/Delete?id=${id}`,{
                    method: 'DELETE',
                });
                if(response.ok){
                    alert('Product deleted successfully');
                    refreshItems();
                }
                else{
                    throw new Error('Could not delete');
                }
            }
            catch(error){
                console.error('Error deleting note:', error);
            }
           
        }

    }
    return (
        <div className='divider'>
            <div className='logistics'>
                <Logistics/>
            </div>         
            <div className='dividerTable'>
                    <Catalog/>
                    <div className='allCata'>
                        <h2>All Catergories</h2>
                        
                        <div className='filterProduc'>
                            <TextField hiddenLabel type="text" placeholder='filter by Product'  onChange={handleChange} id="filled-hidden-label-small" variant="filled" size="small" />
                            <AddProduct refreshItems={refreshItems}/>
                        </div>
                        
                    </div>
                    <div>
                        <DataTable columns={columns(handleDelete)} data={records} customStyles={customStyles}  pagination/>
                        
                    </div>
            </div>        
        </div>   
    );
};

export default Supplier;