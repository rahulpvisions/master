import React, {useContext, useState} from "react";
import Logo from '../../assets/images/logopal.svg'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../../assets/css/style.css';
import { Link } from "react-router-dom";
import CartContext from "../../CartContext";
import ModalShoppongCart from "./ModalShoppingCart";

const Header = React.memo(( { user } ) =>{
    console.log("User:", user);
    const {cart} = useContext(CartContext);

    const [show, setShow] = useState(false);
    return (
        <>
            <div className="container">
                <div className="row align-items-center justify-content-space-between flex-wrap-wrap">
                    <div className="col-md-4">
                        <img className="headerLogo" src={Logo} alt="Pal" />
                    </div>
                    <div className="col-md-7">
                        <nav className="navbar navbar-expand-lg">
                            <div class="container-fluid">
                                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span class="navbar-toggler-icon"></span>
                                </button>
                                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/">Home</Link>
                                        </li>
                                        {(!user) ? (
                                                <>
                                                    <li>
                                                        <Link className="nav-link" to="/login">Login</Link>
                                                    </li>
                                                    <li>
                                                        <Link className="nav-link" to="/register">Register</Link>
                                                    </li>
                                                </>
                                            ) :
                                            (
                                                <>
                                                    <li>
                                                        <Link className="nav-link" to="/dashboard">Dashboard</Link>
                                                    </li>
                                                </>
                                            )
                                        }
                                        <li>
                                            <Link className="nav-link" to="/products">Products</Link>
                                        </li>
                                        {(cart.totalCount > 0) ? (
                                            <>
                                            <li>
                                                <Link className="nav-link" to="/cart">Cart</Link>
                                            </li>
                                            <li><Link className="nav-link" to="/checkout">Checkout</Link></li>
                                            </>
                                        ) : ''}
                                        
                                        <li>
                                            <Link className="nav-link" to="/blog">Blog</Link>
                                        </li>
                                        <li>
                                            <Link className="nav-link" to="/contact-us">Contact Us</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>
                    <div className="col-md-1">
                        {/* <Link className="nav-link" to="/cart"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                        </svg>({cart.totalCount})</Link> */}
                        <button onClick={() => setShow(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                            </svg>({cart.totalCount})
                        </button>
                    </div>
                </div>
            </div>
            <ModalShoppongCart show={show} setShow={setShow} />
        </>
    );
});

export default Header;