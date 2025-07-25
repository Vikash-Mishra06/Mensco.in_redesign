import React, { useEffect, useState } from 'react';
import products from './../../Product.json';
import { Link, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProductDetails() {
  const { id } = useParams();
  const product = products.find((p) => String(p.id) === id);

  const [mainImage, setMainImage] = useState(null);
  const [images, setImages] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    if (product) {
      setMainImage(product.image);
      setImages([product.image, product.secondaryImage].filter(Boolean));
      setQuantity(1);
    }
  }, [product]);

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
      const updatedProduct = { ...product, quantity: quantity };
      const updatedCart = [...existing, updatedProduct];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      window.dispatchEvent(new Event('cartUpdated'));
      toast.success(`${product.productName} added to Cart`);
    } else {
      toast.info(`${product.productName} is already in Cart`);
    }
  };

  if (!product) return (
    <div className="container py-5 text-center">
      <h2 className="mb-4">Product not found</h2>
      <Link to="/shop" className="btn btn-primary">Continue Shopping</Link>
    </div>
  );

  return (
    <>
      <ToastContainer position="top-center" />

      {/* Breadcrumbs */}
      <ol className="shop-banner py-3 position-relative">
        <li className="position-relative"><Link to='/'>Home</Link></li>
        <li className="position-relative active"><span className="ps-5">{product.productName}</span></li>
      </ol>

      {/* Product Section */}
      <div className="container py-5">
        <div className="row g-4">
          {/* Product Images */}
          <div className="col-lg-6">
            <div className="row">
              {/* Thumbnails - Vertical on left */}
              <div className="col-2 pe-0">
                <div className="d-flex flex-column h-100">
                  {images.map((img, idx) => (
                    <div
                      key={idx}
                      className={`mb-2 border ${mainImage === img ? 'border-primary border-2' : 'border-1'}`}
                      style={{ height: '80px', cursor: 'pointer', overflow: 'hidden' }}
                      onClick={() => setMainImage(img)}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${idx}`}
                        className="img-fluid h-100 w-100 object-fit-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Main Image */}
              <div className="col-10">
                <div className="product-image w-100 position-relative overflow-hidden border" style={{ height: '500px' }}>
                  <img
                    src={mainImage}
                    alt="Main Product"
                    className="img-fluid h-100 w-100 object-fit-contain p-3"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="col-lg-6">
            <div className="product-details">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <h1 className="mb-0" style={{ fontSize: '28px', fontWeight: '700' }}>{product.productName}</h1>
                <span className={`tag badge text-white ${product.tag === 'New' ? 'bg-danger' : 'bg-success'}`}>
                  {product.tag}
                </span>
              </div>

              <div className="price-section mb-3">
                <span className="current-price fw-bold" style={{ fontSize: '24px', color: '#4e7661' }}>
                  {product.price}
                </span>
                {product.oldprice && (
                  <span className="old-price text-decoration-line-through text-muted ms-2">
                    {product.oldprice}
                  </span>
                )}
              </div>

              <p className="mb-4 fw-semibold" style={{ fontSize: '16px', color: '#666' }}>
                {product.description || "Premium quality product with excellent features."}
              </p>

              <div className="quantity-selector mb-4">
                <div className="d-flex align-items-center">
                  <label className="me-3 fw-bold" style={{ fontSize: '16px' }}>Quantity:</label>
                  <div className="d-flex align-items-center">
                    <button
                      className="btn1 btn-dark btn-sm px-2 py-1"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      style={{ fontSize: '20px', padding: '0 10px' }}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="text-center mx-2"
                      style={{
                        width: '50px',
                        height: '40px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        appearance: 'none',
                        MozAppearance: 'textfield'
                      }}
                    />
                    <button
                      className="btn1 btn-dark btn-sm px-2 py-1"
                      onClick={() => setQuantity(quantity + 1)}
                      style={{ fontSize: '20px', padding: '0 10px' }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="button-group d-flex gap-4 mb-3">
                <button
                  className="btn-custome2 w-100 border-0"
                  onClick={() => addToCart(product)}
                  style={{ height: '50px', fontSize: '16px' }}
                >
                  <i className="bi bi-cart3 me-2"></i> ADD TO CART
                </button>
                <button
                  className="btn-custome2 w-100 border-0"
                  onClick={() => addToWishlist(product)}
                  style={{ height: '50px', fontSize: '16px' }}

                >
                  <i className="bi bi-heart me-2"></i> ADD TO WISHLIST
                </button>
              </div>

              <div className="btn-custome2 mb-5">
                <Link
                  to='/checkout'
                  className='w-100 d-flex justify-content-center align-items-center'
                  style={{
                    height: '50px',
                    fontSize: '16px',
                    backgroundColor: '#4e7661',
                    color: 'white',
                    borderRadius: '5px',
                    textDecoration: 'none'
                  }}
                >
                  <i className="ri-shopping-cart-2-line" style={{ marginRight: '8px' }}></i>
                  Checkout
                </Link>
              </div>

              <div className="product-meta">
                <div className="d-flex mb-2">
                  <span className="text-muted me-2 fw-semibold" style={{ width: '120px', fontSize: '14px' }}>SKU:</span>
                  <span style={{ fontSize: '14px' }}>BEAU-{product.id}</span>
                </div>
                <div className="d-flex mb-2">
                  <span className="text-muted me-2 fw-semibold" style={{ width: '120px', fontSize: '14px' }}>Category:</span>
                  <span style={{ fontSize: '14px' }}>Beauty & Cosmetics</span>
                </div>
                <div className="d-flex">
                  <span className="text-muted me-2 fw-semibold" style={{ width: '120px', fontSize: '14px' }}>Availability:</span>
                  <span className="text-success fw-semibold" style={{ fontSize: '16px' }}>In Stock</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="container mb-5">
        <div className="product-tabs">
          <ul className="nav nav-tabs border-0 justify-content-center mb-4" id="productTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link tab border-0 fw-bold fs-5 px-4 py-2 ${activeTab === 'description' ? 'active' : ''}`}
                onClick={() => setActiveTab('description')}
              >
                DESCRIPTION
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link tab border-0 fw-bold fs-5 px-4 py-2 ${activeTab === 'shipping' ? 'active' : ''}`}
                onClick={() => setActiveTab('shipping')}
              >
                SHIPPING & RETURN
              </button>
            </li>
          </ul>

          <div className="tab-content">
            {activeTab === 'description' && (
              <div className="tab-pane fade show active px-3 fw-semibold">
                <p className="mb-2"><strong style={{ fontSize: '16px' }}>For Normal, Oily, Combined Skin Types</strong></p>
                <p className="mb-3" style={{ fontSize: '15px', color: '#666' }}>
                  Complexion-perfecting natural foundation enriched with antioxidant-packed superfruits and vitamins.
                </p>
                <h5 className="mt-4 mb-3" style={{ fontSize: '18px', fontWeight: '600' }}>Benefits</h5>
                <ul className="list-unstyled ps-3">
                  <li className="mb-2 position-relative" style={{ fontSize: '15px', color: '#666', paddingLeft: '25px' }}>
                    <i className="bi bi-check-circle-fill text-primary position-absolute" style={{ left: '0', top: '3px' }}></i>
                    Buildable medium-to-full coverage
                  </li>
                  <li className="mb-2 position-relative" style={{ fontSize: '15px', color: '#666', paddingLeft: '25px' }}>
                    <i className="bi bi-check-circle-fill text-primary position-absolute" style={{ left: '0', top: '3px' }}></i>
                    Weightless, airy feel—no caking!
                  </li>
                  <li className="mb-2 position-relative" style={{ fontSize: '15px', color: '#666', paddingLeft: '25px' }}>
                    <i className="bi bi-check-circle-fill text-primary position-absolute" style={{ left: '0', top: '3px' }}></i>
                    Long-wearing
                  </li>
                  <li className="mb-2 position-relative" style={{ fontSize: '15px', color: '#666', paddingLeft: '25px' }}>
                    <i className="bi bi-check-circle-fill text-primary position-absolute" style={{ left: '0', top: '3px' }}></i>
                    Evens skin tone
                  </li>
                  <li className="mb-2 position-relative" style={{ fontSize: '15px', color: '#666', paddingLeft: '25px' }}>
                    <i className="bi bi-check-circle-fill text-primary position-absolute" style={{ left: '0', top: '3px' }}></i>
                    Available in 7 shades
                  </li>
                </ul>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="tab-pane fade show active px-3 fw-semibold">
                <div className="mb-4">
                  <h5 className="mb-3" style={{ fontSize: '18px', fontWeight: '600' }}>Shipping Policy</h5>
                  <p style={{ fontSize: '15px', color: '#666' }}>
                    We typically process and ship orders within 1-2 business days. Shipping cost is calculated at checkout based on your location.
                  </p>
                  <ul style={{ fontSize: '15px', color: '#666', listStyleType: 'none', paddingLeft: '0' }}>
                    <li className="mb-2 position-relative" style={{ paddingLeft: '25px' }}>
                      <i className="bi bi-truck text-primary position-absolute" style={{ left: '0', top: '3px' }}></i>
                      Standard Shipping: 3-5 business days
                    </li>
                    <li className="position-relative" style={{ paddingLeft: '25px' }}>
                      <i className="bi bi-lightning-charge text-primary position-absolute" style={{ left: '0', top: '3px' }}></i>
                      Express Shipping: 1-2 business days
                    </li>
                  </ul>
                </div>
                <div>
                  <h5 className="mb-3" style={{ fontSize: '18px', fontWeight: '600' }}>Return Policy</h5>
                  <p style={{ fontSize: '15px', color: '#666' }}>
                    We offer a 30-day money-back guarantee. If you're not satisfied with your purchase, you can return it for a full refund.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="container mb-5">
        <h3 className="text-center mb-5 fw-semibold fs-1">You May Also Like</h3>
        <div className="row">
          {products
            .filter(p => p.id !== product.id)
            .slice(0, 4)
            .map(relatedProduct => (
              <div className="col-md-3 mb-4" key={relatedProduct.id}>
                <div className="product-item text-center position-relative">
                  <Link to={`/product/${relatedProduct.id}`} className="text-decoration-none text-black">
                    <div className="product-image w-100 position-relative overflow-hidden">
                      <img src={relatedProduct.image} alt="Primary" className="img-fluid" />
                      <img src={relatedProduct.secondaryImage} alt="Secondary" className="img-fluid" />

                      <div className="product-icons gap-3">
                        <div
                          className="product-icon gap-3"
                          title="Add to Wishlist"
                          onClick={(e) => {
                            e.preventDefault();
                            addToWishlist(relatedProduct);
                          }}
                        >
                          <i className="bi bi-heart fs-5"></i>
                        </div>
                        <div
                          className="product-icon gap-3"
                          title="Add to Cart"
                          onClick={(e) => {
                            e.preventDefault();
                            addToCart(relatedProduct);
                          }}
                        >
                          <i className="bi bi-cart3 fs-5"></i>
                        </div>
                      </div>

                      <span className={`tag badge text-white ${relatedProduct.tag === 'New' ? 'bg-danger' : 'bg-success'}`}>
                        {relatedProduct.tag}
                      </span>
                    </div>
                  </Link>

                  <Link to={`/product/${relatedProduct.id}`} className="text-decoration-none text-black">
                    <div className="product-content pt-3">
                      <span className="price">{relatedProduct.price}</span>
                      <h3 className="title pt-1">{relatedProduct.productName}</h3>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default ProductDetails;