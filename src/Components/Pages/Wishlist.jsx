import React, { useEffect, useState, useCallback } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Link, NavLink } from 'react-router-dom';
import 'react-toastify/ReactToastify.css';

function Wishlist() {
    const [wishlist, setWishlist] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setWishlist(storedWishlist);
        setCart(storedCart);
    }, []);

    const removeFromWishlist = useCallback((productId) => {
        const updatedWishlist = wishlist.filter(item => item.id !== productId);
        setWishlist(updatedWishlist);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
        window.dispatchEvent(new Event('wishlistUpdated'));
        toast.error('Item removed from wishlist');
    }, [wishlist]);

    const addToCart = useCallback((product) => {
        const existingProduct = cart.find(item => item.id === product.id);
        let updatedCart;

        if (existingProduct) {
            updatedCart = cart.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );
        } else {
            updatedCart = [...cart, { ...product, quantity: 1 }];
        }

        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        window.dispatchEvent(new Event('cartUpdated'));

        toast.success(`${product.productName} added to cart!`, {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }, [cart]);

    return (
        <>
            <ol className="shop-banner py-3 position-relative">
                <li className="position-relative"><Link to='/'>Home</Link></li>
                <li className="position-relative active "><span className="ps-5">Wishlist</span></li>
            </ol>

            <div className="container my-5">
                <h2 className="text-color text-center fw-bold mb-4">❤️ Your Wishlist</h2>

                {wishlist.length === 0 ? (
                    <div className="text-center">
                        <p className="lead text-muted">Your wishlist is empty</p>
                        <Link to='/shop' className='btn1'>
                            <i className='ri-shopping-bag-line me-2'></i>Browse Products
                        </Link>
                    </div>
                ) : (
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
                        {wishlist.map(product => (
                            <div className="col" key={product.id}>
                                <div className="card h-100 shadow-sm border-0">
                                    <Link to={`/product/${product.id}`} className="text-decoration-none text-black">
                                        <div className="position-relative overflow-hidden" style={{ height: '250px', backgroundColor: '#f8f9fa' }}>
                                            <img
                                                src={product.image}
                                                className="card-img-top h-100 object-fit-cover"
                                                alt={product.productName}
                                            />
                                            {product.tag && (
                                                <span
                                                    className={`badge position-absolute top-0 end-0 m-2 ${product.tag === 'New' ? 'bg-danger' : 'bg-success'
                                                        }`}
                                                >
                                                    {product.tag}
                                                </span>
                                            )}
                                        </div>
                                    </Link>

                                    <div className="card-body d-flex flex-column text-center">
                                        <p className="card-text fs-5 fw-semibold text-dark">{product.price}</p>
                                        <Link to={`/product/${product.id}`} className="text-decoration-none text-black">
                                            <h5 className="card-title">{product.productName}</h5>
                                        </Link>

                                        <div className="mt-auto d-flex justify-content-between gap-2">
                                            <button className="btn1 btn-dark btn-sm w-100" onClick={() => addToCart(product)}>
                                                <i className="ri-shopping-cart-2-line me-1"></i>Add to Cart
                                            </button>
                                            <button className="btn1 btn-dark btn-sm w-100" onClick={() => removeFromWishlist(product.id)}>
                                                <i className="ri-delete-bin-line me-1"></i>Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
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

export default Wishlist;