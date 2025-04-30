import { useContext, useState } from "react";
import CartContext from "../../CartContext";
import { Link } from "react-router-dom";
import LoginContext from "../../LoginContext";

import axios from "axios";

const Checkout = () => {

    const {cart, setCart} = useContext(CartContext);
    const [flatShipping] = useState(50);
    const {user} = useContext(LoginContext);
    const [loading, setLoading] = useState(false);

    const hanldeCheckout = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            setLoading(true);
            const orderData = {
                cart: cart,
                shipping: flatShipping,
                total: parseFloat(cart.subTotal)+parseFloat(flatShipping),
                user: user,
                orderId: cart.orderId
            }

            console.log("OrderData", orderData);
            
            const response = await axios.post("http://localhost/wordpress-new/wp-json/custom/v1/create-payment-checkout", orderData);
            console.log("Response", response);
            setCart(prevCart => ({ ...prevCart, orderId: response.data.checkout_response.metadata.order_id }))
            console.log("Current Order Id", response.data.checkout_response.metadata.order_id);
            localStorage.setItem('currentOrderId',response.data.checkout_response.metadata.order_id);
            window.location = response.data.checkout_response.url;
        }catch(error){
            console.log(error);
        }finally{
            setLoading(false);
        }
    }

    return (
        
        <>
        {(loading) ? <div class="loader-container">
                        <div class="loader"></div>
                     </div> : ''
        }
        <section className="h-100 h-custom" style={{backgroundColor: '#eee'}}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                
                    <div className="col">
                        <div className="card">
                            <div className="card-body p-4">
                                <div className="row">
                                    <div className="col-lg-7">
                                        <h5 className="mb-3">
                                            <Link to="/products" className="text-body">
                                                <i className="fas fa-long-arrow-alt-left me-2"></i>
                                                Continue shopping</Link>
                                        </h5>
                                        <hr />
                                        <div className="d-flex justify-content-between align-items-center mb-4">
                                            <div>
                                                <p className="mb-1">Shopping cart</p>
                                                <p className="mb-0">You have {cart.totalCount} items in your cart</p>
                                            </div>
                                        </div>
                                        {
                                            cart.products.map((item, index) => (
                                                <div className="card mb-3" key={index}>
                                                    <div className="card-body">
                                                        <div className="d-flex justify-content-between">
                                                            <div className="d-flex flex-row align-items-center">
                                                                <div>
                                                                    <img src={item.image} className="img-fluid rounded-3" alt="Shopping item" style={{width: '65px'}} />
                                                                </div>
                                                                <div className="ms-3">
                                                                    <h5>{item.name}</h5>
                                                                    <p className="small mb-0"><span className="woocommerce-Price-currencySymbol">&#8377;</span>{ (item.on_sale) ? item.sale_price : item.regular_price }</p>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex flex-row align-items-center">
                                                                <div style={{width: '50px'}}>
                                                                    <h5 className="fw-normal mb-0">{item.quantity}</h5>
                                                                </div>
                                                                <div style={{width: '80px'}}>
                                                                    <h5 className="mb-0">
                                                                        <span className="woocommerce-Price-currencySymbol">&#8377;</span>
                                                                        {(((item.on_sale) ? item.sale_price : item.regular_price) * item.quantity).toFixed(2)}
                                                                    </h5>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <div className="col-lg-5">
                                        <div className="card bg-primary text-white rounded-3">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between align-items-center mb-4">
                                                    <h5 className="mb-0">Order details</h5>
                                                </div>
                                                {/* <div className="d-flex justify-content-between align-items-center mb-4">
                                                    <h5 className="mb-0">Card details</h5>
                                                </div>
                                                <p className="small mb-2">Card type</p>
                                                <a href="#!" type="submit" className="text-white"><i
                                                    className="fab fa-cc-mastercard fa-2x me-2"></i></a>
                                                <a href="#!" type="submit" className="text-white"><i
                                                    className="fab fa-cc-visa fa-2x me-2"></i></a>
                                                <a href="#!" type="submit" className="text-white"><i
                                                    className="fab fa-cc-amex fa-2x me-2"></i></a>
                                                <a href="#!" type="submit" className="text-white"><i className="fab fa-cc-paypal fa-2x"></i></a>

                                                <form className="mt-4">
                                                    <div data-mdb-input-init className="form-outline form-white mb-4">
                                                        <input type="text" id="typeName" className="form-control form-control-lg" size="17"
                                                        placeholder="Cardholder's Name" />
                                                        <label className="form-label" for="typeName">Cardholder's Name</label>
                                                    </div>
                                                    <div data-mdb-input-init className="form-outline form-white mb-4">
                                                        <input type="text" id="typeText" className="form-control form-control-lg" size="17"
                                                        placeholder="1234 5678 9012 3457" minlength="19" maxlength="19" />
                                                        <label className="form-label" for="typeText">Card Number</label>
                                                    </div>
                                                    <div className="row mb-4">
                                                        <div className="col-md-6">
                                                            <div data-mdb-input-init className="form-outline form-white">
                                                                <input type="text" id="typeExp" className="form-control form-control-lg" placeholder="MM/YYYY" size="7" minlength="7" maxlength="7" />
                                                                <label className="form-label" for="typeExp">Expiration</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div data-mdb-input-init className="form-outline form-white">
                                                                <input type="password" id="typeText" className="form-control form-control-lg" placeholder="&#9679;&#9679;&#9679;" size="1" minlength="3" maxlength="3" />
                                                                <label className="form-label" for="typeText">Cvv</label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </form> */}

                                                <hr className="my-4" />

                                                <div className="d-flex justify-content-between">
                                                    <p className="mb-2">Subtotal</p>
                                                    <p className="mb-2">${parseFloat(cart.subTotal).toFixed(2)}</p>
                                                </div>

                                                <div className="d-flex justify-content-between">
                                                    <p className="mb-2">Shipping</p>
                                                    <p className="mb-2">${parseFloat(flatShipping).toFixed(2)}</p>
                                                </div>

                                                <div className="d-flex justify-content-between mb-4">
                                                    <p className="mb-2">Total(Incl. taxes)</p>
                                                    <p className="mb-2">${(parseFloat(cart.subTotal) + parseFloat(flatShipping)).toFixed(2)}</p>
                                                </div>
                                                {(user) ? (
                                                    <button type="button" onClick={hanldeCheckout} data-mdb-button-init data-mdb-ripple-init className="btn btn-info btn-block btn-lg w-100">
                                                        <div className="d-flex justify-content-between">
                                                            <span>${(parseFloat(cart.subTotal) + parseFloat(flatShipping)).toFixed(2)}</span>
                                                            <span> Place Order <i className="fas fa-long-arrow-alt-right ms-2"></i></span>
                                                        </div>
                                                    </button>
                                                ) : (
                                                    <p>You need to login first to make order!</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

export default Checkout;