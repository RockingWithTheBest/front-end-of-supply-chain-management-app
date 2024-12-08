import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import './emailing.css';
import TextField from '@mui/material/TextField';

const MailingOrder = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_07gxkvm', 'template_ngmszk6', form.current, {
        publicKey: 'ihrMv_2LLSM4_rNIE',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  return (
    <div className='mailingContainer'>
        <h2>Contact Us to Place an Order</h2>
        <form ref={form} onSubmit={sendEmail} className='emailform'>
            <div className='mailform'>
                <div  className='Name'> 
                    <label style={{color:'black'}}>Name</label>
                    <input type="text" name="from_name" />
                </div>
                <div  className='Email'>
                    <label style={{color:'black'}}>Email</label>
                    <input type="email" name="from_email" />
                </div>
                <div className='textdiv'>
                    <div><label  style={{color:'black'}}><span>Message</span></label></div>
                    <div><textarea name="message" className='fixed-textarea ' placeholder='Type your item details'/></div>
                    <div><input type="submit" value="Send" className='btn'/></div>                  
                </div>
                
            </div>
       
           
        </form>
    </div>
    
  );
};

export default MailingOrder;