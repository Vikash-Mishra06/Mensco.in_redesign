import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Link, NavLink } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

function Cart() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(savedCart);
    }, []);

    const updateQuantity = (id, type) => {
        const updated = cartItems.map(item => {
            if (item.id === id) {
                if (type === 'increase') {
                    return { ...item, quantity: item.quantity + 1 };
                } else if (type === 'decrease' && item.quantity > 1) {
                    return { ...item, quantity: item.quantity - 1 };
                }
            }
            return item;
        });
        setCartItems(updated);
        localStorage.setItem('cart', JSON.stringify(updated));
    };

    const removeItem = (id) => {
        const updated = cartItems.filter(item => item.id !== id);
        setCartItems(updated);
        localStorage.setItem('cart', JSON.stringify(updated));
        window.dispatchEvent(new Event('cartUpdated'));
        toast.error('Item Removed From Cart!');
    };

    const totalPrice = cartItems.reduce((acc, item) => {
        const price = parseFloat(item.price.replace('$', ''));
        return acc + price * item.quantity;
    }, 0).toFixed(2);

    return (
        <>
            <ol className="shop-banner py-3 position-relative">
                <li className="position-relative"><Link to='/'>Home</Link></li>
                <li className="position-relative active "><span className="ps-5">Cart</span></li>
            </ol>

            <div className="container my-5">
                <h2 className="text-color text-center fw-bold mb-4">❤️ Your Cart</h2>

                {cartItems.length === 0 ? (
                    <div className="text-center">
                        <p className="lead text-muted">Your Cart is empty</p>
                        <Link to='/shop' className='btn1'>
                            <i className='ri-shopping-bag-line me-2'></i>Browse Products
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="d-flex flex-column gap-4">
                            {cartItems.map(item => (
                                <div key={item.id} className="d-flex flex-column flex-md-row align-items-center justify-content-between p-3 bg-white shadow-sm rounded gap-3">

                                    {/* Image */}
                                    <div style={{ width: '100px', height: '100px' }} className="flex-shrink-0">
                                        <img
                                            src={item.image}
                                            alt={item.productName}
                                            className="img-fluid h-100 w-100 object-fit-cover rounded"
                                        />
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex-grow-1 text-center text-md-start">
                                        <h5 className="fw-semibold mb-1">{item.productName}</h5>
                                        <p className="mb-1">Price: {item.price}</p>
                                        <p className="mb-0">
                                            Total: ${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}
                                        </p>
                                    </div>

                                    {/* Quantity & Remove */}
                                    <div className="d-flex align-items-center gap-2 mt-3 mt-md-0">
                                        <button
                                            className="btn1 btn-dark btn-sm px-2 py-1"
                                            onClick={() => updateQuantity(item.id, 'decrease')}
                                        >-</button>

                                        <span className="px-2">{item.quantity}</span>

                                        <button
                                            className="btn1 btn-dark btn-sm px-2 py-1"
                                            onClick={() => updateQuantity(item.id, 'increase')}
                                        >+</button>

                                        <button
                                            className="btn1 btn-dark btn-sm px-3 py-1 ms-2"
                                            onClick={() => removeItem(item.id)}
                                        ><i className="ri-delete-bin-line me-1"></i>Remove
                                        </button>
                                    </div>

                                </div>
                            ))}
                        </div>
                        
                        <div className="text-end mt-4">
                            <h4 className=" fw-semibold">Total Items:<span> {cartItems.length}</span></h4>
                            
                        </div>
                        <div className="text-end mt-4">
                            <h4 className="fw-bold">Total: ${totalPrice}</h4><br />
                            <Link to='/checkout' className='btn w-100'><i class="ri-shopping-cart-2-line"></i> Checkout</Link>
                        </div>
                    </>
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

export default Cart;
