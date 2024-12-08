import {configureStore} from '@reduxjs/toolkit'
import {productReducer} from '../reducer/reducer'

const store = configureStore({
  reducer: {
    products: productReducer,
  },
})

export default store;