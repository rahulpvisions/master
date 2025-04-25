import { useEffect, useState } from "react";
import CartContext from "./CartContext";

const CartProvider = ({children}) => {
    const [cart, setCart] = useState({
        products: [],
        totalCount: 0,
        subTotal: 0,
        orderId: 0
    });

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        const currentOrderId = localStorage.getItem('currentOrderId');
        if(storedCart){
            try {
                setCart(JSON.parse(storedCart));
                setCart(prevCart => ({ ...prevCart, orderId: currentOrderId }))
            } catch (e) {
                console.error("Failed to parse user from localStorage", e);
                localStorage.removeItem("cart");
            }
        }
    },[]);

    return(
        <CartContext.Provider value={{cart, setCart}}>
            {children}            
        </CartContext.Provider>
    )
}

export default CartProvider;