import axios from "axios";
import { useContext, useEffect, useState } from "react";
import LoginContext from "../../LoginContext";
import { Link } from "react-router-dom";

const Orders = () => {
    const {user} = useContext(LoginContext);
    const [ordersData, setOrdersData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try{
                
                const response = await axios.get(`http://localhost/wordpress-new/wp-json/custom/v1/user-orders/${user.id}`);
                console.log("Orders", response?.data);
                if(response.status === 200){
                    console.log("Orders", response?.data);
                    setOrdersData(response?.data);
                }
            }
            catch(error){
                console.log("Error: ", error);
            }
            finally{
                setLoading(false);
            }
        }

        fetchOrders();
    },[user]);

    return (
        <div className="container mt-4">
            <div className="row">
                <h2 className="text-center">Orders</h2>
                {(loading)? (
                    <>
                    <p>Loading...</p>
                    </>
                ): (
                    <table className="table table-striped table-bordered table-hover ">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="row">Id</th>
                                <th>Dated</th>
                                <th>Status</th>
                                <th>Total</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {ordersData.map( (order, key) => (
                                <tr key={key}>
                                    <td>{order.order_id}</td>
                                    <td>{new Date(order.date_created).toLocaleDateString('en-US', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric',
                                    })}</td>
                                    <td>{order.status}</td>
                                    <td dangerouslySetInnerHTML={{ __html: order.total }}></td>
                                    <td><Link to={`/order-detail/${order.order_id}`}>details</Link></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}

export default Orders;