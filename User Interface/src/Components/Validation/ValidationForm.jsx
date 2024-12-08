import React ,{useState}from 'react';
import './ValidationForm.css'


const ValidationForm =()=>{

    const [formData, setFormData] =  useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:"",
        phoneNumber:"",
        age:"",
        genders:"",
        interests:[],
        birthDate:""
    });
    const [errors, setErrors] = useState({});

    const validateForm =()=>{
        let newErrors = {};

        if(!formData.firstName){
            newErrors.firstName = "First Name is required";
        }

        if(!formData.lastName){
            newErrors.lastName = "Last Name is required";
        }

        if(!formData.email){
            newErrors.email = "Email is required";
        }
        else if(!isValidEmail(formData.email)){
            newErrors.email = "Invalid Email format";
        }

        if(!formData.phoneNumber){
            newErrors.phoneNumber = "Phone Number is required";
        }
        else if(!isValidPhoneNumber(formData.phoneNumber)){
            newErrors.phoneNumber = "Phone Number must have 10 digits";
        }

        if(!formData.password){
            newErrors.password = "Password is required";
        }
        else if(isValidPassword(formData.password)){
            newErrors.password = "Password must be at least 8 characters long and at least one symbol, one number, one lowercase letter and one uppercase letter";
        }

        if(!formData.confirmPassword){
            newErrors.confirmPassword = "Confirm Password is required";
        }
        else if(formData.password !== formData.confirmPassword){
            newErrors.confirmPassword = "Passwords do not match";
        }

        if(!formData.age){
            newErrors.age = "Age is required";
        }
        else if(!isValidAge(formData.age)){
            newErrors.age = "Age must be a number and greater than or equal to 18 and less than 100";
        }

        if(!formData.genders){
            newErrors.genders = "Gender is required";
        }
        if(formData.interests.length ===0){
            newErrors.interests = "Select at least one interest";
        }

        if(!formData.birthDate){
            newErrors.birthDate = "Birth Date is required";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;

    };
    console.log(errors);
    const isValidEmail = (email) => {
        const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        return regex.test(email);
    };
    const isValidPhoneNumber = (phoneNumber) => {
        const regex = /^[0-9]{10}$/;
        return regex.test(phoneNumber);
    };
    const isValidPassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    };
    const isValidAge = (age) => {
        return parseInt(age)>=18 && parseInt(age) < 100;
    };
    const handleSubmit = (e) => {
        
      e.preventDefault();
      const isValid = validateForm();
      if(isValid){
        console.log("Form Submitted", formData);
      }
      else{
        console.log("Form Not submitted");
      }
    };
  
    const handleChange=(e)=>{
        const {name, value} = e.target;
        setFormData({...formData, [name]:value});
    }
    const handleCheckboxChange = (e) => {
        const {name, checked} = e.target;
        let UpdatedInterest = [...formData.interests];
         
        if(checked){
            UpdatedInterest.push(name);
        }else {
            UpdatedInterest = UpdatedInterest.filter((interests) => interests!==name)
        }
        setFormData({
            ...formData,
            interests:UpdatedInterest
        })
    }; 
 
    return(
        <form onSubmit ={handleSubmit} className='form'>
            <div>
                <label htmlFor="">FirstName : </label>
                <input type="text"
                name = "firstName"
                value = {formData.firstName}
                placeholder='Enter your first name' 
                onChange={handleChange}/>
                {errors.firstName && <div className='error'>{errors.firstName}</div>}
            </div>
            <div>
                <label htmlFor="">LastName : </label>
                <input type="text"
                name = "lastName"
                value = {formData.lastName}
                placeholder='Enter your last name' 
                onChange={handleChange}/>
                  {errors.lastName && <div className='error'>{errors.lastName}</div>}
            </div>
            <div>
                <label htmlFor="">Email : </label>
                <input type="email"
                name = "email"
                value = {formData.email}
                placeholder='Enter your email address' 
                onChange={handleChange}/>
                {errors.email && <div className='error'>{errors.email}</div>}
            </div>
            <div>
                <label htmlFor="">Phone Number : </label>
                <input type="number"
                name = "phoneNumber"
                value = {formData.phoneNumber}
                placeholder='Enter your phone number' 
                onChange={handleChange}/>
                {errors.phoneNumber && <div className='error'>{errors.phoneNumber}</div>}
            </div>
            <div>
                <label htmlFor="">password : </label>
                <input type="password"
                name = "password"
                value = {formData.password}
                placeholder='Enter your password'
                onChange={handleChange} />
                {errors.password && <div className='error'>{errors.password}</div>}
            </div>
            <div>
                <label htmlFor="">Confirm Password : </label>
                <input type="password"
                name = "confirmPassword"
                value = {formData.confirmPassword}
                placeholder='Enter your password again' 
                onChange={handleChange}/>
                {errors.confirmPassword && <div className='error'>{errors.confirmPassword}</div>}
            </div>
            <div>
                <label htmlFor="">Age : </label>
                <input type="number"
                name = "age"
                value = {formData.age}
                placeholder='Enter your age' 
                onChange={handleChange}/>
                {errors.age && <div className='error'>{errors.age}</div>}
            </div>
            <div>
                <label htmlFor="">Gender : </label>
                <select name="genders" id="" value ={formData.genders} onChange={handleChange}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
                {errors.genders && <div className='error'>{errors.genders}</div>}
            </div>
            <div>
                <label htmlFor="">Interests :</label>
                <label htmlFor="">
                    <input type="checkbox" name='coding' checked={formData.interests.includes("coding")} onChange={handleCheckboxChange} />
                    Coding
                </label>
                <label htmlFor="">
                    <input type="checkbox" name='sports' checked={formData.interests.includes("sports")} onChange={handleCheckboxChange} />
                    Sports
                </label>
                <label htmlFor="">
                    <input type="checkbox" name='reading' checked={formData.interests.includes("reading")} onChange={handleCheckboxChange} />
                    Reading
                </label>
                {errors.interests && <div className='error'>{errors.interests}</div>}
            </div>
            <div>
                <label htmlFor="">Date of Birth : </label>
                <input type="date"
                name = "birthDate"
                value = {formData.birthDate}
                placeholder='Enter your DOB'
                onChange={handleChange} />
                {errors.birthDate && <div className='error'>{errors.birthDate}</div>}
            </div>
            <div>
                <button type='Submit'>Submit</button>
            </div>
            
        </form>
    );

}

export default ValidationForm;