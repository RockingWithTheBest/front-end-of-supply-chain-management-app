import React  from 'react';
import './Navbar.css';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Mailing  from '../MailingOrder/Mailing';


const Navbar =()=>{

    return(
        <div className='navEmp'>
            <div className='navdivider'>
                <p className='RockTitle'>Welcome Employee</p>
                <div className='emailsupplier'>
                    <Popup trigger =
                        {<Button variant="contained" endIcon={<SendIcon/>}>
                        Email Supplier
                    </Button>} modal nested>
                    {
                        close=>(
                            <div className="modal">
                                <div className="content">
                                    <Mailing/>
                                </div>
                                <div>
                                    <button onClick={()=>close()}>
                                        close
                                    </button>
                                </div>
                                
                            </div>
                        )   
                    }
                    </Popup>
                </div>
                
            </div>
            
        </div>
    )
}

export default Navbar;