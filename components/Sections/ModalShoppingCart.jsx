import { useContext } from "react";
import CartContext from "../../CartContext";
import Modal from 'react-bootstrap/Modal';

const ModalShoppongCart = ( {show, setShow} ) => {
    const {cart, setCart} = useContext(CartContext)

    const handleRemoveFromCart = (productId) => {
        setCart((prevCart) => {
            const updatedProducts = prevCart.products.filter(item => item.id !== productId);
            const updatedTotalCount = updatedProducts.reduce((acc, item) => acc + item.quantity, 0);
            const updatedSubTotal = updatedProducts.reduce((acc, item) => acc + (((item.sale_price) ? item.sale_price : item.regular_price) * item.quantity), 0);
            
            localStorage.setItem("cart", JSON.stringify({
                products: updatedProducts,
                totalCount: updatedTotalCount,
                subTotal: updatedSubTotal
            }));

            return {
                products: updatedProducts,
                totalCount: updatedTotalCount,
                subTotal: updatedSubTotal
            };
        });
    };

    const handleClose = () => {
        setShow(false);
    }

    return (
        <>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Cart</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container">
                    <div className="row">
                        {cart.products.length > 0 && 
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Sr no.</th>
                                    <th>Product Name</th>
                                    <th>Image</th>
                                    <th>Price</th>
                                    <th>Qty.</th>
                                    <th>Sub Total</th>
                                    <th>&nbsp;</th>
                                </tr>
                            </thead>
                            <tbody>
                            { cart.products.map((item, index) => (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.name}</td>
                                    <td><img src={item.image} alt={item.name} className="cartImage" /></td>
                                    <td dangerouslySetInnerHTML={{ __html: (item.sale_price) ? item.display_sale_price : item.display_regular_price }}></td>
                                    <td>{item.quantity}</td>
                                    <td>
                                        <>
                                        <span className="woocommerce-Price-currencySymbol">&#8377;</span>
                                        {((item.on_sale) ? item.sale_price : item.regular_price) * item.quantity}
                                        </>
                                    </td>
                                    <td><button onClick={() => handleRemoveFromCart(item.id)} className="btn btn-danger btn-sm">Delete</button></td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        }

                        {cart.products.length <= 0 && 
                            <p>no products in cart, continue shopping!</p>
                        }
                    </div>
                </div>
            </Modal.Body>
        </Modal>
        </>
    )
}
export default ModalShoppongCart;