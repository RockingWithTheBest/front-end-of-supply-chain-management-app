import React ,{useState}from 'react';
import './EmployeeRegistartion.css'
import * as Yup from 'yup'
import BackImage from '../../../assets/ValidationPictures/back.png'
import BackShadow  from '../../../assets/ValidationPictures/shadow.png'
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';


const EmployeeRegistartion =()=>{

    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [roleid, setRoleid] = useState();
    const [birthDate, setBirthDate] = useState();
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().
        min(8,"Password must be at least 8 characters long").
        matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password is of invalid format")
        .required("Password is required"),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required("Confirm Password is required"),
    roleid: Yup.string().oneOf(["5323542","8678576","37546743"], "Role Id must be one of the specified values").required("Role Id is required"),
    birthDate: Yup.date().required("Date of birth is required")
  })
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData ={
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        roleid,
        birthDate
      }

      const itemsToRegister = {
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        Password: password,
        ConfirmPassword: confirmPassword,
        Roleid: roleid,
        BirthDate: birthDate
      }
      const API_URL = 'https://localhost:7136/';
      try{
        await validationSchema.validate(formData, {abortEarly: false});
        try{
            fetch(`${API_URL}api/Employee/AddSingleRecord`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(itemsToRegister),
                    
                })
                console.log("Form submitted successfully", formData);
                alert("Form submitted successfully", formData);
                navigate('/LoginEmployee');
        }
        catch(error){
            alert('An error occured while registering reload the page and try again ', error.message);
           console.error("Failed adding role : ", error);
          
        }
   
      }
      catch(error){
       alert('An error occured while registering reload the page and try again ', error.message);
       const newErrors ={};
       error.inner.forEach((err)=>{
        newErrors[err.path] = err.message
       })
        setErrors(newErrors);
        console.log(newErrors);
      }

     
    };
  
    const handleChange=(e)=>{
        const {name, value} = e.target;
        switch (name) {
            case 'firstName':
                setFirstName(value);
                break;
            case 'lastName':
                setLastName(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 'confirmPassword':
                setConfirmPassword(value);
                break;
            case 'roleid':
                setRoleid(value);
                break;
            case 'birthDate':
                setBirthDate(value);
                break;
            default:
                break;
        }
    };

    const divStyle = {
        backgroundImage: `url(${BackImage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        height: '100vh',
        width: '100vw',
        display: 'flex', // Optional: use flexbox for centering content
        justifyContent: 'center', // Optional: centers content horizontally
        alignItems: 'center', // Optional: centers content vertically
       
    }

    const formImage = {
        backgroundImage: `url(${BackShadow})`,
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        height: '90vh',
        width: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 'inset rgba(0, 0, 0, 0.2) -7px 3px 13px 17px', // Optional: standard box shadow
        flexDirection: 'column',
        borderRadius: '18px'
    }
 
    return(
        <div className='backEdition' style ={divStyle}>
            <h1 style={{color:'white'}}>Employee Registration</h1>

         <form onSubmit ={handleSubmit} className='form' style = {formImage}>
            <div className='inputLabel'>
                <label htmlFor="">FirstName : </label>
                <input type="text"
                name = "firstName"
                value = {firstName}
                placeholder='Enter your first name' 
                onChange={handleChange}
                className = 'inputfields'/>
                {errors.firstName && <div className='error'>{errors.firstName}</div>}
            </div>
            <div className='inputLabel'>
                <label htmlFor="">LastName : </label>
                <input type="text"
                name = "lastName"
                value = {lastName}
                placeholder='Enter your last name' 
                onChange={handleChange}
                className = 'inputfields'/>
                  {errors.lastName && <div className='error'>{errors.lastName}</div>}
            </div>
            <div className='inputLabel'>
                <label htmlFor="">Email : </label>
                <input type="email"
                name = "email"
                value = {email}
                placeholder='Enter your email address' 
                onChange={handleChange}
                className = 'inputfields'/>
                {errors.email && <div className='error'>{errors.email}</div>}
            </div>
            <div className='inputLabel'>
                <label htmlFor="">Role ID : </label>
                <input type="text"
                name = "roleid"
                value = {roleid}
                placeholder='Enter your Role ID' 
                onChange={handleChange}
                className = 'inputfields'/>
                {errors.roleid && <div className='error'>{errors.roleid}</div>}
            </div>
            <div className='inputLabel'>
                <label htmlFor="">Password : </label>
                <input type="password"
                name = "password"
                value = {password}
                placeholder='Enter your password'
                onChange={handleChange} 
                className = 'inputfields'/>
                {errors.password && <div className='error'>{errors.password}</div>}
            </div>
            <div className='inputLabel'>
                <label htmlFor="">Confirm Password : </label>
                <input type="password"
                name = "confirmPassword"
                value = {confirmPassword}
                placeholder='Enter your password again' 
                onChange={handleChange}
                className = 'inputfields'/>
                {errors.confirmPassword && <div className='error'>{errors.confirmPassword}</div>}
            </div>  
        
            <div className='inputLabel'>
                <label htmlFor="">Date of Birth : </label>
                <input 
                type="date"
                name = "birthDate"
                value = {birthDate}
                placeholder='Enter your DOB'
                onChange={handleChange} 
                className = 'inputfields'/>
                {errors.birthDate && <div className='error'>{errors.birthDate}</div>}
            </div>
            <div className ='btn'>
                <Button type='Submit' variant="contained" endIcon={<SendIcon />}>Submit</Button>
            </div>
            
        </form>
        </div>
     
    );

}

export default EmployeeRegistartion;