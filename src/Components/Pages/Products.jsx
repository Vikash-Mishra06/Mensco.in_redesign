import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import productsData from '../../Product.json';

function Products() {
    const [filterSortOption, setFilterSortOption] = useState('all');

    const handleFilterSort = () => {
        let filtered = [...productsData];

        if (filterSortOption === 'new' || filterSortOption === 'sale') {
            filtered = filtered.filter(product =>
                product.tag.toLowerCase() === filterSortOption
            );
        }

        if (filterSortOption === 'low') {
            filtered.sort((a, b) =>
                parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', ''))
            );
        }

        if (filterSortOption === 'high') {
            filtered.sort((a, b) =>
                parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', ''))
            );
        }

        return filtered;
    };

    const displayedProducts = handleFilterSort();

    const addToWishlist = (product, e) => {
        e.preventDefault();
        const existing = JSON.parse(localStorage.getItem('wishlist')) || [];
        if (!existing.some(p => p.id === product.id)) {
            const updated = [...existing, product];
            localStorage.setItem('wishlist', JSON.stringify(updated));
            window.dispatchEvent(new Event('wishlistUpdated'));
            toast.success(`${product.productName} added to Wishlist`);
        } else {
            toast.info(<div className="shake">{`${product.productName} is Already in Wishlist`}</div>);
        }
    };

    const addToCart = (product, e) => {
        e.preventDefault();
        const existing = JSON.parse(localStorage.getItem('cart')) || [];
        const alreadyInCart = existing.find(p => p.id === product.id);
        if (!alreadyInCart) {
            const updatedProduct = { ...product, quantity: 1 };
            const updatedCart = [...existing, updatedProduct];
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            window.dispatchEvent(new Event('cartUpdated'));
            toast.success(`${product.productName} added to Cart`);
        } else {
            toast.info(<div className="shake">{`${product.productName} is Already in Cart!`}</div>);
        }
    };

    return (
        <>
            <ToastContainer position="top-center" />

            <ol className="shop-banner py-3 position-relative">
                <li className="position-relative"><Link to='/'>Home</Link></li>
                <li className="position-relative active "><span className="ps-5">Products</span></li>
            </ol>

            <div className="shop-container">
                <div className="container">
                    <h1 className="text-center py-4 fw-semibold">Products</h1>

                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 my-4">
                        <div className="text-muted fs-6">
                            Showing <strong>{displayedProducts.length}</strong> product{displayedProducts.length !== 1 && 's'} for "{filterSortOption === 'all' ? 'All' : filterSortOption.charAt(0).toUpperCase() + filterSortOption.slice(1)}"
                        </div>
                        <div>
                            <select
                                className="form-select py-2"
                                style={{ minWidth: '260px', backgroundColor: '#f5f5f5', border: '0px' }}
                                value={filterSortOption}
                                onChange={(e) => setFilterSortOption(e.target.value)}
                            >
                                <option value="all">All Product</option>
                                <option value="new">New Product</option>
                                <option value="sale">Sale Products</option>
                            </select>
                        </div>
                    </div>

                    <div className="row slide-in">
                        {displayedProducts.map(product => (
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
                                                    onClick={(e) => addToWishlist(product, e)}
                                                >
                                                    <i className="bi bi-heart fs-5"></i>
                                                </div>
                                                <div
                                                    className="product-icon gap-3"
                                                    title="Add to Cart"
                                                    onClick={(e) => addToCart(product, e)}
                                                >
                                                    <i className="bi bi-cart3 fs-5"></i>
                                                </div>
                                            </div>

                                            <span
                                                className={`tag badge text-white ${product.tag === 'New' ? 'bg-danger' : 'bg-success'
                                                    }`}
                                            >
                                                {product.tag}
                                            </span>
                                        </div>
                                    </Link>

                                    <Link to={`/product/${product.id}`} className="text-decoration-none text-black">
                                        <div className="price-section d-flex gap-3 justify-content-center align-items-center pt-2 mb-2">
                                            {product.oldprice && (
                                                <span className="old-price text-decoration-line-through text-muted ms-2">
                                                    {product.oldprice}
                                                </span>
                                            )}
                                            <span className="current-price fw-bold" style={{ fontSize: '20px', color: '#4e7661' }}>
                                                {product.price}
                                            </span>
                                        </div>
                                        <h3 className="title fw-semibold" style={{ fontSize: '20px' }}>{product.productName}</h3>
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

export default Products;