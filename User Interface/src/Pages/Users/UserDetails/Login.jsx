import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import './login.css'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';


const Login= () =>{
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [customerId, setCustomerId] = useState('');
    const [record, setRecord] = useState([]);
    const navigate = useNavigate();
   
    const API_URL = 'https://localhost:7136/';
    const items = async() =>{
        try{
            const response =  await fetch(`${API_URL}api/Customer/GetAllCustomers`)
            const data = await response.json();
            setRecord(data);
            console.log('API Data:', data); 
            return data;
        }
        catch(error){
            console.error('Error:', error);
        }  

    }   
    const checkFields = async (roleId, password, customerId) => {
        const data = await items();
        console.log('RECORDS ', data);

        const matchRecords = record.find(item=>
            item.Id = customerId &&
            item.Password === password &&
            item.RoleId === roleId
        )
        console.log('matchRecords', matchRecords);
        if(matchRecords){
            alert('Login Successful');
            navigate('/userDashboard');
        }
        else{
            alert('Login Failed');
        }
    };
    return(
        <div className='loginpage' id ='root'>
            <form action="" className='formLogin' onSubmit ={(e)=>{e.preventDefault(); checkFields(role,password,customerId)}}>
                 <h2>Hello</h2>
                 <h1>Welcome!</h1>
                <TextField label="Customer ID"  style ={{width:'200px'}} type = 'number'variant="filled" className='textfield' onChange ={(e)=>setCustomerId(e.target.value)}/>
                <TextField label="Password"  style ={{width:'200px'}} type = 'password'variant="filled" className='textfield' onChange ={(e)=>setPassword(e.target.value)}/>
                {/* <InputLabel  className='inputlabel' style ={{width:'200px'}}>Role Id</InputLabel> */}
                <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={role}
                    onChange={(e)=>{setRole(e.target.value)}}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    >
                    <MenuItem value="">
                        <em>Role Id</em>
                    </MenuItem>
                    <MenuItem value={5323542}>Supplier</MenuItem>
                    <MenuItem value={8678576}>Employee</MenuItem>
                    <MenuItem value={37546743}>Customer</MenuItem>
                </Select>
                <Link to = {`/userDashboard/${customerId}`}><Button variant="contained" type ='submit'>Login </Button></Link>
            </form>
        </div>
    );
};

export default Login;