import React,{useContext, useEffect} from "react"
import axios from "axios";
import CartContext from "../../CartContext";

export default function OrderSuccess(){
    const {cart, setCart} = useContext(CartContext)
    
    useEffect(()=>{
        localStorage.removeItem("cart");
        localStorage.removeItem("currentOrderId");
        setCart({
            products: [],
            totalCount: 0,
        });

        const completeOrder = async () => {
            
            try{
                const urlString = window.location.href;
                const url = new URL(urlString);
                const orderId = url.searchParams.get('order_id');
                console.log("Order ID", orderId);
                // send request to cancel order
                await axios.post("http://localhost/wordpress-new/wp-json/custom/v1/complete-order", {order_id: orderId});
            }catch(error){
                console.log(error);
            }
        }
        completeOrder();

    },[]);

    return(
        <>
        <div className="container mt-4">
            <div className="row">
                <div className="flex flex-col items-center justify-center h-screen">
                    <div className="flex flex-col items-center justify-center w-1/2">
                        <h1 className="text-4xl font-bold text-gray-800">Thank you for your Order with us</h1>
                        <p className="text-xl font-semibold text-gray-600">Your order is being processed</p>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}