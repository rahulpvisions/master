import { useContext } from "react";
import CartContext from "../../CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
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



    const incrementDecrement = (operator, productId) => {
        
        let updatedProducts;
        let totalCount;
        let subTotal;
        switch (operator){
            case 'plus':
            default:
                updatedProducts = cart.products.map((item) =>
                    item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
                );
                totalCount = updatedProducts.reduce((acc, item) => acc + item.quantity, 0);
                subTotal = updatedProducts.reduce((acc, item) => acc + (((item.on_sale) ? parseFloat(item.sale_price) : parseFloat(item.regular_price)) * item.quantity), 0);
                break;
            case 'minus':
                updatedProducts = cart.products.map((item) =>
                    (item.id === productId && item.quantity > 1) ? { ...item, quantity: item.quantity - 1 } : item
                );
                totalCount = updatedProducts.reduce((acc, item) => acc + item.quantity, 0);
                subTotal = updatedProducts.reduce((acc, item) => acc + (((item.on_sale) ? parseFloat(item.sale_price) : parseFloat(item.regular_price)) * item.quantity), 0);
                break;
        }
    
        setCart({
            products: updatedProducts,
            totalCount: totalCount,
            subTotal: subTotal
        });
        
        localStorage.setItem("cart", JSON.stringify({
            products: updatedProducts,
            totalCount: totalCount,
            subTotal: subTotal
        }));
    }

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
                            <td><button onClick={() => incrementDecrement('minus',item.id)}>-</button><input type="number" readOnly value={item.quantity} /><button onClick={() => incrementDecrement('plus',item.id)}>+</button></td>
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