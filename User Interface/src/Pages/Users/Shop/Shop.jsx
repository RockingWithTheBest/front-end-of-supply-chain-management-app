import {PRODUCTS} from '../../products'
import Product from './Product'
import './Shop.css'
import {useSelector} from "react-redux";


const Shop =()=>{

    const items = useSelector((state)=>state.products);
    return(
        <div className='shop'>
            <div className='shopTitle'>
            </div>
            <div className='products'>
                {""}
                {items.map((product)=>(
                    <Product  data = {product}/>
                ))}
            </div>
        </div>
    );
}
export default Shop;