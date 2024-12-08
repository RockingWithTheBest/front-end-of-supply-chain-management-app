import {React,useState} from 'react';
import { MenuItem,TextField  } from '@mui/material';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './AddProduct.css';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';




const Catalogs = [
    {
      value: 'Electronics',
      label: "Electronics",
    },
    {
      value: 'Motors',
      label: 'Motors',
    },
    {
      value: 'Clothes',
      label: 'Clothes',
    }
];

const SupplierId = [
    {
      value: '1',
      label: "1",
    },
    {
      value: '2',
      label: '2',
    },
    {
      value: '3',
      label: '3',
    },
    {
        value: '4',
        label: '4',
    },
    {
        value: '5',
        label: '5',
    }
];
const checkEntry = (entry, numbers)=>{
    for(let i=0; i<entry.length; i++){
        if(entry[i].trim() === ''){
            alert('Please fill all the fields');
            return false;
        }
    }
  
    return true;
}
const AddProduct = ({refreshItems})=>{
    const [productName, setProductName] = useState('');
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [supplierId, setSupplierid] = useState('2');
    const [catalog, setCatalog] = useState('Electronics');

    const handleSubmit =async()=>{
        const entries = [productName,brand,catalog];
        const numberEntries = [price,quantity,supplierId];
        console.log('Price:', price);         // Debugging line
        console.log('Quantity:', quantity); 
        if(checkEntry(entries, numberEntries)){
            const items = {
                Name: productName, // Ensure the property's name matches
                Brand: brand,
                Description: catalog,
                Price: parseFloat(price), // Convert to float
                StockQuantity: parseInt(quantity, 10), // Convert to integer
                SupplierId: parseInt(supplierId, 10) // Convert to integer
            }
            
            console.log('Submitting:', items)

            // const data =new FormData();
            // data.append('product', JSON.stringify(items));
            const API_URL = 'https://localhost:7136/';
            
            try{
                fetch(`${API_URL}api/Product/AddOrder`,
                    {  method:'POST',

                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(items)
                    });
                refreshItems(); 
            }
            catch(error){
                console.error('Error adding product:', error);
                alert('Error adding product, please try again later');
            }
        }    
        alert('added successfully')
    }


     return (
        <div>
            <Popup trigger=
                {<Button variant="contained" endIcon={<CloudUploadIcon/>}>Add Product</Button>} 
                modal nested>
                {
                    close => (
                        <div className='modal'>
                            <h1>Welcome Supplier ......</h1>
                            <p>Add the product you desire</p>
                            <div className='content'>
                                <div>
                                    <TextField 
                                    className="text-field" 
                                    id="productName" label="Product Name" 
                                    placeholder="Product Name" multiline variant="filled" value = {productName} 
                                    onChange={(e)=>setProductName(e.target.value)}/>
                                </div>
                                <div>
                                    <TextField  
                                    className="text-field" 
                                    id="brand" label="Brand" 
                                    placeholder="Brand" multiline variant="filled" value = {brand} 
                                    onChange={(e)=>setBrand(e.target.value)}/>
                                </div>
                                <div>
                                    <TextField  
                                    className="text-field" 
                                    id="price" label="Price" 
                                    placeholder="00.00$" multiline variant="filled" value = {price} 
                                    onChange={(e)=>setPrice(e.target.value)}/>
                                </div>
                                <div>
                                    <TextField  
                                    className="text-field" 
                                    id="quantity" label="Quantity" 
                                    placeholder="Quantity" multiline variant="filled" value = {quantity} 
                                    onChange={(e)=>setQuantity(e.target.value)}/>
                                </div>
                                <div>
                                    <TextField  
                                    className="text-field" id="supplierId" select 
                                    label="Supplier ID" defaultValue="2" 
                                    helperText="Please select Supplier Id" variant="filled" value={supplierId} 
                                    onChange={(e)=>setSupplierid(e.target.value)}>
                                    {SupplierId.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                        </MenuItem>
                                    ))}
                                    </TextField>
                                </div>
                                <div className='Catalog-textfield'>
                                    <TextField  
                                    className="text-field" id="Catalogs" select 
                                    label="Catalog" defaultValue="Electronics" 
                                    helperText="Please select Catalog" variant="filled" value={catalog}  
                                    onChange={(e)=>setCatalog(e.target.value)}>
                                    {Catalogs.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                        </MenuItem>
                                    ))}
                                    </TextField>
                                </div> 
                                <div>
                                 <button onClick = {handleSubmit}>Submit Entries</button>   
                                <button onClick=
                                    {() => close()}>
                                        Close modal
                                </button>
                            </div>                         
                            </div>
                            
                        </div>
                    )
                }
            </Popup>
        </div>
    )
}

export default AddProduct;