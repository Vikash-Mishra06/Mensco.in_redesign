import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
// import Products from './../../Product.json'
const primaryColor = '#4e7661';

function Nav() {

    const [cartCount, setCartCount] = useState();
    const [wishlistCount, setWishlistCount] = useState();

    const updateCounts = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

        const totalCartItems = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
        setCartCount(totalCartItems);
        setWishlistCount(wishlist.length);
    };

    useEffect(() => {
        updateCounts();

        const handleCartUpdate = () => updateCounts()
        const handleWishlistUpdate = () => updateCounts()

        window.addEventListener('cartUpdated', handleCartUpdate)
        window.addEventListener('wishlistUpdated', handleWishlistUpdate);

        const onStorageChange = (e) => {
            if (e.key === 'cart' || e.key === 'wishlist') {
                updateCounts();
            }
        };
        window.addEventListener('storage', onStorageChange);

        return () => {
            window.removeEventListener('cartUpdated', handleCartUpdate);
            window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
            window.removeEventListener('storage', onStorageChange);
        }
    }, [])

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);

    const handleChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value.trim() === '') {
            setFilteredProducts([]);
        }
        else {
            const filtered = Products.filter((product) =>
                product.name.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredProducts(filtered);
        }
    };

    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleProductClick = (product) => {
        setSelectedProduct(product);
        const modal = new window.bootstrap.Modal(document.getElementById(productModal));
        modal.show();
    }
    return (
        <>
            {/* nav */}
            <div className="nav w-100 fixed-top top-0 start-0 bg-light shadow-sm">
                <nav className="container navbar navbar-expand-lg py-2">

                    <Link to='/' className='navbar-brand'>
                        <h3 style={{ color: primaryColor, margin: 0 }}>Furnex</h3>
                    </Link>

                    <div className="d-lg-none mobile-icon d-flex align-items-center gap-3">
                        <Link to='/' >
                            <i className="bi bi-search fs-5"></i>
                        </Link>
                        <Link to='/' >
                            <i className="bi bi-person fs-5"></i>
                        </Link>
                        <Link to='/wishlist' className='position-relative'>
                            <i className="bi bi-heart fs-5"></i>
                            <span className='position-absolute top-0 start-100 translate-middle cart-count rounded-pill'>
                                {wishlistCount ?? 0}</span>
                        </Link>
                        <Link to='/cart' className='position-relative'>
                            <i className="bi bi-bag fs-5"></i>
                            <span className='position-absolute top-0 start-100 translate-middle cart-count rounded-pill'>
                                {cartCount ?? 0}</span>
                        </Link>
                    </div>

                    <button
                        className='navbar-toggler'
                        type='button'
                        data-bs-toggle='collapse'
                        data-bs-target='#navbarNav'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                    >
                        <span className='navbar-toggler-icon'></span>
                    </button>

                    {/* mobile viw */}
                    <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                        {/* Mobile Nav Links */}
                        <ul className="navbar-nav d-lg-none flex-column text-center bg-light w-100 py-3 shadow-sm">
                            <li className="nav-item">
                                    <Link to='/' className='nav-link'>Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/products' className='nav-link'>Products</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/sales' className='nav-link'>Sales</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/about' className='nav-link'>About</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/contact' className='nav-link'>Contact</Link>
                                </li>
                        </ul>

                        {/* Desktop Nav Links */}
                        <div className="d-none d-lg-flex justify-content-center flex-grow-1">
                            <ul className="navbar-nav align-items-center gap-3">
                                <li className="nav-item">
                                    <Link to='/' className='nav-link'>Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/products' className='nav-link'>Products</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/sales' className='nav-link'>Sales</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/about' className='nav-link'>About</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/contact' className='nav-link'>Contact</Link>
                                </li>
                            </ul>
                        </div>


                        {/* desktop view */}
                        <ul className="navbar-nav ms-auto d-none d-lg-flex align-items-center gap-3">
                            <li className="nav-items">
                                <Link to='/' data-bs-toggle='modal' data-bs-target='#searchModal'>
                                    <i className="bi bi-search fs-4 text-dark"></i>
                                </Link>
                            </li>
                            <li className="nav-items">
                                <Link to='/' data-bs-toggle='modal' data-bs-target='#signupModal'>
                                    <i className="bi bi-person fs-4 text-dark"></i>
                                </Link>
                            </li>
                            <li className="nav-items">
                                <Link to='/wishlist' className='position-relative'>
                                    <i className="bi bi-heart fs-4 text-dark"></i>
                                    <span className='position-absolute top-0 start-100 translate-middle cart-count rounded-pill'>
                                        {wishlistCount ?? 0}
                                    </span>
                                </Link>
                            </li>
                            <li className="nav-items">
                                <Link to='/cart' className='position-relative'>
                                    <i className="bi bi-bag fs-4 text-dark"></i>
                                    <span className='position-absolute top-0 start-100 translate-middle cart-count rounded-pill'>
                                        {cartCount ?? 0}
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>

            {/* sign-up */}
            <div className="modal fade" id='signupModal' tabIndex='-1' aria-labelledby='signupModalLabel' aria-hidden='true'>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content p-4">
                        <div className="modal-header border-0">
                            <h5 className="modal-title sign-up-title fw-bold" id='signupModalLabel'>Sign Up</h5>
                            <button type='button' className='btn-close close-modal' data-bs-dismiss='modal' aria-label='close'></button>
                        </div>

                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input type="text" className='form-control border shadow-sm' placeholder='Enter Your Name' />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input type="email" className='form-control border shadow-sm' placeholder='Enter Your Email' />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input type="password" className='form-control border shadow-sm' placeholder='Enter Password' />
                                </div>
                                <p className='terms text-muted'>By Signup, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></p>
                                <button type='button' className='btn text-white btn-signup w-100'>Sign Up</button>
                            </form>
                            <div className=" mt-3">
                                <p className='mb-0 terms'>Already have account? <a href="#" className='fw-bold'>Sign In</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* search */}
            <div className="modal fade" id="searchModal" tabIndex="-1" aria-labelledby='signupModalLabel' aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content p-4">
                        <div className="modal-header border-0">
                            <h5 className="modal-title sign-up-title fw-bold" id='signupModalLabel'>Search</h5>
                            <button type='button' className='btn-close close-modal' data-bs-dismiss='modal' aria-label='close'></button>
                        </div>

                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <input type="text" className="for-control shadow-sm" placeholder='Search for Product' autoFocus onChange={handleChange} />
                                </div>
                                <div className="show-search-product-wrap row">
                                    {searchTerm.trim() !== '' ? (
                                        filteredProducts.length > 0 ? (
                                            filteredProducts.map((product) => (
                                                <div key={product.id} className='ss-wrap border mb-2 col-lg-6'
                                                    onClick={() => handleProductClick(product)}
                                                    style={{ cursor: 'pointer' }}>
                                                    <div className="ssp-img">
                                                        <img src={product.image} className='img-fluid' alt="" />
                                                    </div>
                                                    <div className="ssp-info p-2">
                                                        <h6>{product.name}</h6>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className='text-muted'>No Product found.</p>
                                        )
                                    ) : (
                                        <p className='text-muted'>No Product found.</p>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Nav