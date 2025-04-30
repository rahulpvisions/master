import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Product from "../Sections/Product";
import CartContext from "../../CartContext";

const Products = () => {
    const [products, setProducts] = useState([]);
    const[loading, setLoading] = useState(true);
    
    const{cart, setCart} = useContext(CartContext);
    
    useEffect(()=>{

        const fetchProducts = async () => {
            try{
                const response = await axios.get("http://localhost/wordpress-new/wp-json/custom/v1/products");
                setProducts(response.data);
                console.log("Products",response.data);
                setLoading(false)
            } catch(error){
                console.log("Error:", error);
                setLoading(false)
            }
        }

        fetchProducts();
        
    },[]);

    const handleAddToCart = (product) => {
        const existingItem = cart.products.find((item) => item.id === product.id);
        let updatedProducts;
    
        if (existingItem) {
            updatedProducts = cart.products.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );
        } else {
            updatedProducts = [...cart.products, { ...product, quantity: 1 }];
        }
    
        // Calculate new total count
        const totalCount = updatedProducts.reduce((acc, item) => acc + item.quantity, 0);

        const subTotal = updatedProducts.reduce((acc, item) => acc + (((item.on_sale) ? parseFloat(item.sale_price) : parseFloat(item.regular_price)) * item.quantity), 0);
    
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
        scrollToTop();
    };    

    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      };

    return(
        <>
        {(loading) ? <div class="loader-container">
                        <div class="loader"></div>
                     </div> : ''
        }

<div className="container mt-4">
            <div className="row">
                <div className="text-center">
                    <h2>Products</h2>
                </div>
            </div>
            
            {!loading && (
            <div className="row">
                {products.map((product, index) => (
                    <Product product={product} key={index} handleAddToCart={handleAddToCart} />
                ))}
            </div>
            )}
        </div>
        </>
    )
}

export default Products;