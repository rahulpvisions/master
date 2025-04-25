import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function CancelOrder(){
    /*
    useEffect(() => {
        // get order_id from url
        const cancel_order = async () => {
            try{
                const urlString = window.location.href;
                const url = new URL(urlString);
                const orderId = url.searchParams.get('order_id');
               
                // send request to cancel order
                await axios.post("http://localhost/wordpress-new/wp-json/custom/v1/cancel-order", {order_id: orderId});
            }catch(error){
                console.log(error);
            }
        }
        cancel_order();
    },[]);*/
    return(
        <div className="container mt-4">
            <div className="row">
                <div className="flex flex-col items-center justify-center h-screen">
                    <div className="flex flex-col items-center justify-center w-1/2">
                        <h1 className="text-4xl font-bold text-gray-800">Sorry, something wrong!</h1>
                        <p className="text-xl font-semibold text-gray-600">Your payment has been cancelled. <Link className="text-indigo-600" to="/checkout">click here complete payment</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}