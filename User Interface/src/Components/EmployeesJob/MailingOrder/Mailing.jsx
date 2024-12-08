import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import './Mailing.css'

const Mailing = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_t19wnyo', 'template_qq2gqwf', form.current, {
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
    <form ref={form} onSubmit={sendEmail} className='mailingEmployee'>
        <h2>Sending Order Email to Supplier</h2>
      <div>
        <label className='name'>Name</label>
        <input className= 'name'type="text" name="from_name" />
      </div>
      <div>
        <label className='email'>Email</label>
        <input className='email' type="email" name="from_email" />
      </div>
      <div className='messageDiv'>
        <label className='message'>Message</label>
        <textarea name="message" className='textfieldMessage'/>
        <input type="submit" value="Send" className='send-btn' />
      </div>
    </form>
  );
};

export default Mailing;