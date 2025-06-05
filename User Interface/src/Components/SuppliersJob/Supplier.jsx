import {React, useState, useEffect} from 'react';
import DataTable from "react-data-table-component";
import AddProduct from './AddProduct/AddProduct';
import Catalog from './Catalogs/Catalog';
import './Supplier.css'
import Logistics from './Logistics/Logistics';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


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

     const generatePDF = ()=>{
        const doc =  new jsPDF();
        doc.text("Доступные продукты", 20, 10)
        const headers = ["Name", "Brand", "Catergory", "Price", "Quantity"]
        const headerY = 20;
        headers.forEach((header,index)=>{
            doc.setFontSize(12);
            doc.text(header, 20 + index * 40, headerY + 10);
        })

        let rowY = headerY+20;
        records.forEach(product=>{
            const data = [
                String(product.Name || ""),
                String(product.Brand || ""),
                String(product.Description || ""),
                String(product.Price || ""),
                String(product.StockQuantity || "")
             ]
             data.forEach((item,index)=>{
                doc.text(item, 20+index*40, rowY)
             })
             rowY+=10;
        })

        doc.save("Отчет_продуктов.pdf")
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
                            <button onClick ={generatePDF}>Сгенерирование отчета</button>
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
