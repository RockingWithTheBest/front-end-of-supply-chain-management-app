import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import './LoginEmployee.css'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';



const LoginEmployee= () =>{
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [employeeId, setCustomerId] = useState('');
    const [record, setRecord] = useState([]);
    const navigate = useNavigate();
   
    const API_URL = 'https://localhost:7136/';
    const items = async() =>{
       
        try{
            const response =  await fetch(`${API_URL}api/Employee/GetAllEmployeeRecords`)
            const data = await response.json();
            setRecord(data);
            console.log('API Data:', data); 
            return data;
        }
        catch(error){
            console.error('Error:', error);
        }  

    }   
    const checkFields = async (roleId, password, employeeId) => {
        const data = await items();
        console.log('RECORDS ', data);
       
        const matchRecords = data.find(item=>
            item.Id == employeeId &&
            item.Password === password &&
            item.RoleId === roleId
        )
        console.log('matchRecords', matchRecords);
        console.log('employeeId', employeeId);
        console.log('Password', password);
        console.log('employeeId', roleId);
        if(matchRecords){
            alert('Login Successful');
            navigate(`/EmployeeDashboard/${employeeId}`);
        }
        else{
            alert('Login Failed');
        }
    };
    return(
        <div className='loginpage' id ='root'>
            <form action="" className='formLogin' onSubmit ={(e)=>{e.preventDefault(); checkFields(role,password,employeeId)}}>
                 <h2>Hello</h2>
                 <h1>Welcome to Employee login!</h1>
                <TextField label="Employee ID"  style ={{width:'200px'}} type = 'number'variant="filled" className='textfield' onChange ={(e)=>setCustomerId(e.target.value)}/>
                <TextField label="Password"  style ={{width:'200px'}} type = 'password'variant="filled" className='textfield' onChange ={(e)=>setPassword(e.target.value)}/>
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
                <Button variant="contained" type ='submit'>Login </Button>
            </form>
        </div>
    );
};

export default LoginEmployee;
