import { useState } from "react";
import CartContext from "./CartContext";

const CartProvider = ({children}) => {
    const [cart, setCart] = useState({
        products: [],
        totalCount: 0,
    })
    return(
        <CartContext.Provider value={{cart, setCart}}>
            {children}            
        </CartContext.Provider>
    )
}

export default CartProvider;