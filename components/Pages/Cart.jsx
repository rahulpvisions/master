import { useContext } from "react";
import CartContext from "../../CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
    const {cart, setCart} = useContext(CartContext)

    const handleRemoveFromCart = (productId) => {
        setCart((prevCart) => {
            const updatedProducts = prevCart.products.filter(item => item.id !== productId);
            const updatedTotalCount = updatedProducts.reduce((acc, item) => acc + item.quantity, 0);
            const updatedSubTotal = updatedProducts.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    
            return {
                products: updatedProducts,
                totalCount: updatedTotalCount,
                subTotal: updatedSubTotal
            };
        });
    };

    return (
        <div className="container">
            <div className="row">
                <h2 className="text-center">Cart</h2>
                {cart.products.length > 0 && 
                <table className="table">
                    <thead>
                        <tr>
                            <th>Sr no.</th>
                            <th>Product Name</th>
                            <th>Image</th>
                            <th>Price</th>
                            <th>Qty.</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                    { cart.products.map((item, index) => (
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{item.name}</td>
                            <td><img src={item.image} alt={item.name} className="cartImage" /></td>
                            <td>{item.price}</td>
                            <td>{item.quantity}</td>
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
            {cart.products.length > 0 &&
            <div className="d-flex flex-row-reverse">
                <Link to="/checkout" className="btn btn-primary ms-2">Checkout</Link>
                <Link to="/products" className="btn btn-primary">Continue Shopping</Link>
            </div>
            }
        </div>
    )
}

export default Cart;