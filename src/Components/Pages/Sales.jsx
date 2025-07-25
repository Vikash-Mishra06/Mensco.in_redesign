import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import productsData from '../../Product.json';

function Sales() {
    const saleProducts = productsData.filter(
        product => product.tag.toLowerCase() === 'sale'
    );

    const addToWishlist = (product) => {
        const existing = JSON.parse(localStorage.getItem('wishlist')) || [];
        if (!existing.some(p => p.id === product.id)) {
            const updated = [...existing, product];
            localStorage.setItem('wishlist', JSON.stringify(updated));
            window.dispatchEvent(new Event('wishlistUpdated'));
            toast.success(`${product.productName} added to Wishlist`);
        } else {
            toast.info(`${product.productName} is already in Wishlist`);
        }
    };

    const addToCart = (product) => {
        const existing = JSON.parse(localStorage.getItem('cart')) || [];
        const alreadyInCart = existing.find(p => p.id === product.id);
        if (!alreadyInCart) {
            const updatedProduct = { ...product, quantity: 1 };
            const updatedCart = [...existing, updatedProduct];
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            window.dispatchEvent(new Event('cartUpdated'));
            toast.success(`${product.productName} added to Cart`);
        } else {
            toast.info(`${product.productName} is already in Cart`);
        }
    };

    return (
        <>
            <ToastContainer position="top-center" />

            <ol className="shop-banner py-3 position-relative">
                <li className="position-relative"><Link to='/'>Home</Link></li>
                <li className="position-relative active "><span className="ps-5">Sale Products</span></li>
            </ol>

            <div className="shop-container slide-in">
                <div className="container">
                    <h1 className="text-center py-4 fw-semibold">Sale Products</h1>

                    <div className="row">
                        {saleProducts.map(product => (
                            <div className="col-md-3 mb-4" key={product.id}>
                                <div className="product-item text-center position-relative">

                                    <Link to={`/product/${product.id}`} className="text-decoration-none text-black">
                                        <div className="product-image w-100 position-relative overflow-hidden">
                                            <img src={product.image} alt="Primary" className="img-fluid" />
                                            <img src={product.secondaryImage} alt="Secondary" className="img-fluid" />

                                            <div className="product-icons gap-3">
                                                <div
                                                    className="product-icon gap-3"
                                                    title="Add to Wishlist"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        addToWishlist(product);
                                                    }}
                                                >
                                                    <i className="bi bi-heart fs-5"></i>
                                                </div>
                                                <div
                                                    className="product-icon gap-3"
                                                    title="Add to Cart"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        addToCart(product);
                                                    }}
                                                >
                                                    <i className="bi bi-cart3 fs-5"></i>
                                                </div>
                                            </div>

                                            <span className="tag badge text-white bg-success">
                                                {product.tag}
                                            </span>
                                        </div>
                                    </Link>

                                    <Link to={`/product/${product.id}`} className="text-decoration-none text-black">
                                        <div className="product-content pt-3">
                                            {product.oldprice ? (
                                                <div className="price">
                                                    <span className="text-muted text-decoration-line-through me-2">{product.oldprice}</span>
                                                    <span className="fw-bold text-muted">{product.price}</span>
                                                </div>
                                            ) : (
                                                <span className="price">{product.price}</span>
                                            )}
                                            <h3 className="title pt-1">{product.productName}</h3>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                pauseOnHover
                draggable
            />
        </>
    );
}

export default Sales;
