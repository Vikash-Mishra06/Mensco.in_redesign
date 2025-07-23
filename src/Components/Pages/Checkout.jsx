import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

function Checkout() {
    const [deliveryOption, setDeliveryOption] = useState('ship');
    const [cartItems, setCartItems] = useState([]);
    const [placedOrder, setPlacedOrder] = useState(null); // New state to store order summary
    const [useShippingAsBilling, setUseShippingAsBilling] = useState(true);
    const [paymentMethod, setPaymentMethod] = useState('credit');

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(savedCart);
    }, []);

    const calculateTotal = (items) => {
        return items.reduce((acc, item) => {
            const price = parseFloat(item.price.replace('$', ''));
            return acc + price;
        }, 0);
    };

    const handlePlaceOrder = () => {
        if (cartItems.length === 0) {
            toast.error('Your cart is empty!');
            return;
        }

        const orderTotal = calculateTotal(cartItems);
        const tax = parseFloat((orderTotal * 0.1).toFixed(2));

        // Store the order
        setPlacedOrder({
            items: cartItems,
            total: orderTotal,
            tax: tax
        });

        toast.success('🎉 Order Placed Successfully!');
        localStorage.removeItem('cart');
        setCartItems([]);
    };

    const displayItems = placedOrder ? placedOrder.items : cartItems;
    const totalPrice = placedOrder ? placedOrder.total : calculateTotal(cartItems);
    const estimatedTax = placedOrder ? placedOrder.tax : parseFloat((totalPrice * 0.1).toFixed(2));

    return (
        <>
            <div className="checkout container my-5 pt-1">
                <div className="row g-4 mt-5">
                    {/* LEFT SIDE */}
                    <div className="col-lg-7">
                        <h5>Contact</h5>
                        <input type="text" className="form-control mb-3" placeholder="Email or Mobile Number" />
                        <div className="form-check mb-4">
                            <input type="checkbox" className="form-check-input" id="newsCheck" />
                            <label htmlFor="newsCheck" className="form-check-label">
                                Email me with news and offers
                            </label>
                        </div>

                        <h5>Delivery</h5>

                        {deliveryOption === 'ship' && (
                            <div className="row mb-3">
                                <div className="mb-3">
                                    <select className="form-select">
                                        <option>Delhi</option>
                                        <option>Gujarat</option>
                                        <option>Maharashtra</option>
                                        <option>Uttar Pradesh</option>
                                        <option>Haryana</option>
                                        <option>Bihar</option>
                                        <option>Tamil Nadu</option>
                                        <option>Himachal Pradesh</option>
                                    </select>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <input type="text" className="form-control" placeholder="First Name" />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <input type="text" className="form-control" placeholder="Last Name" />
                                </div>
                                <div className="col-12 mb-3">
                                    <input type="text" className="form-control" placeholder="Address" />
                                </div>
                            </div>
                        )}

                        <div className="border rounded p-4 bg-white shadow-sm">
                            <h6 className="mb-4">Credit card</h6>
                            <div className="row g-3">
                                <div className="col-12">
                                    <input type="text" className="form-control" placeholder="Card number" />
                                </div>
                                <div className="col-md-6">
                                    <input type="text" className="form-control" placeholder="Expiration date (MM / YY)" />
                                </div>
                                <div className="col-md-6">
                                    <input type="text" className="form-control" placeholder="Security code" />
                                </div>
                                <div className="col-12">
                                    <input type="text" className="form-control" placeholder="Name on card" />
                                </div>
                                <div className="form-check mt-3 ms-1">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="billingAddress"
                                        checked={useShippingAsBilling}
                                        onChange={(e) => setUseShippingAsBilling(e.target.checked)}
                                    />
                                    <label className="form-check-label" htmlFor="billingAddress">
                                        Use shipping address as billing address
                                    </label>
                                </div>
                            </div>
                        </div>

                        <h5 className="mt-5">Payment Method</h5>
                        <div className="mb-3">
                            {['credit', 'debit', 'upi'].map((method) => (
                                <div className="form-check" key={method}>
                                    <input
                                        type="radio"
                                        id={method}
                                        name="paymentMethod"
                                        value={method}
                                        className="form-check-input"
                                        checked={paymentMethod === method}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                    />
                                    <label htmlFor={method} className="form-check-label text-capitalize">
                                        {method === 'upi' ? 'UPI' : `${method} card`}
                                    </label>
                                </div>
                            ))}
                        </div>

                        <button className="btn btn-dark w-100 mt-3">Pay now</button>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="col-lg-5">
                        <div className="border p-4 rounded shadow-sm">
                            <h5 className="mb-3">Order Summary</h5>
                            {placedOrder && (
                                <div className="alert alert-success py-2">
                                    🎉 Your order has been placed successfully!
                                </div>
                            )}
                            <ul className="list-group mb-3">
                                {displayItems.map((item, index) => (
                                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                        <span><img src={item.image} alt="" className='order-img '/></span>
                                        <span className='fw-semibold'>{item.productName}</span>
                                        <span className='fw-semibold'>{item.price}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="d-flex  justify-content-between mb-3">
                                <strong>Estimated Tax (10%):</strong>
                                <span>$ {estimatedTax.toFixed(2)}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                                <strong>Total:</strong>
                                <span className='fw-semibold'>$ {totalPrice+estimatedTax}</span>
                            </div>
                            <div className="row d-flex justify-content-center gap-3">
                                {!placedOrder && (
                                    <button
                                        className="btn btn-dark w-100"
                                        onClick={handlePlaceOrder}
                                    >
                                        Place Order
                                    </button>
                                )}
                                <Link to="/cart" className="btn btn-outline-dark w-100">
                                    <i className="ri-arrow-left-line me-1" /> Back to Cart!
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer position="top-center" />
        </>
    );
}

export default Checkout;
