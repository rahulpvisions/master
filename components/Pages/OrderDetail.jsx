import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const OrderDetail = () => {
    const { orderId } = useParams();
    const [loading, setLoading] = useState(true);
    const [orderData, setOrderData] = useState(null);

    useEffect(() => {
        const fetchOrderDetail = async () => {
            try {
                const response = await axios.get(`http://localhost/wordpress-new/wp-json/v1/custom/orderDetail/?order_id=${orderId}`);
                console.log('Order Detail', response.data);
                if(response.data) {
                    setOrderData(response.data);
                }                
            } catch (err) {
                console.error('Error fetching order:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetail();
    },[orderId]);
    

    return (
        <div className="container mt-4">
            <div className="row mt-4 text-center">
                <h3>Order Detail</h3>
            </div>
            {!loading && (
                <>
                <div className='row mt-4'>
                    <div className='col-md-6'>
                        <h4>Order Info</h4>
                        <table className='table table-borderless table-dark'>
                            <tbody>
                                <tr>
                                    <th>Order Id :</th>
                                    <td>#{orderData.order_id}</td>
                                </tr>
                                <tr>
                                    <th>Billing Email :</th>
                                    <td>{orderData.billing_email}</td>
                                </tr>
                                {(orderData.billing_phone) ? <tr>
                                    <th>Billing Email :</th>
                                    <td>{orderData.billing_email}</td>
                                </tr> : ''}
                                <tr>
                                    <th>Currency :</th>
                                    <td>{orderData.currency}</td>
                                </tr>
                                <tr>
                                    <th>Total :</th>
                                    <td dangerouslySetInnerHTML={{ __html: orderData.total }}></td>
                                </tr>
                                <tr>
                                    <th>Status :</th>
                                    <td>{orderData.status}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='col-md-6'>
                        <h4>Shipping info</h4>
                        <table className='table table-borderless table-dark'>
                            <tbody>
                                {(orderData.shipping.first_name) ? <tr>
                                    <th>Name :</th>
                                    <td>{orderData.shipping.first_name}, {orderData.shipping.last_name}</td>
                                </tr> : '' }
                                <tr>
                                    <th>Method :</th>
                                    <td>{orderData.shipping.method}</td>
                                </tr>
                                <tr>
                                    <th>Address :</th>
                                    <td>{orderData.shipping.address.address_1}, {orderData.shipping.address.city}, <br/>{orderData.shipping.address.state}, {orderData.shipping.address.country}, {orderData.shipping.address.postcode}</td>
                                </tr>
                                <tr>
                                    <th>Shipping Total :</th>
                                    <td dangerouslySetInnerHTML={{ __html: orderData.shipping.total }}></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='row mt-4'>
                    <h4>Items</h4>
                    <table className='table table-striped table-bordered'>
                        <thead className='thead-dark'>
                            <tr>
                                <th>Product ID</th>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderData.items.map((item)=>(
                                <tr>
                                    <td>#{item.product_id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.quantity}</td>
                                    <td dangerouslySetInnerHTML={{ __html: item.total }}></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                </>
            )}
        </div>
    );
}
export default OrderDetail;