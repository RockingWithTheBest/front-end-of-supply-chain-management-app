import {createSlice} from '@reduxjs/toolkit'
import {PRODUCTS} from '../../products'

const initialState = {
    shopItems: PRODUCTS,
    purpose: "Ecomerce"
}


const productSlice = createSlice({
    name: 'products',
    initialState: initialState.shopItems,
    reducers:{
        toCart : (state, action)=>{
            state.push(action.payload);
        }
    }
})

export const {toCart} = productSlice.actions;

export const productReducer = productSlice.reducer;