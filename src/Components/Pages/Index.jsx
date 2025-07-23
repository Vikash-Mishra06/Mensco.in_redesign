import React, { useState } from "react";

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'

import Products from './../../Product.json';
import { Link, useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css'

import subBanner1 from '../../assets/banner-1.webp'
import subBanner2 from '../../assets/banner-2.webp'

import serviceImg1 from './../../assets/service-icon-1.svg'
import serviceImg2 from './../../assets/service-icon-2.svg'
import serviceImg3 from './../../assets/service-icon-3.svg'
import serviceImg4 from './../../assets/service-icon-4.svg'

import brand1 from './../../assets/brand-1.png'
import brand2 from './../../assets/brand-2.png'
import brand3 from './../../assets/brand-3.png'

import femalebanner from './../../assets/banner-female.webp';

import discover1 from '../../assets/discover-1.webp'
import discover2 from '../../assets/discover-2.webp'

import socialImage1 from './../../assets/social-image-1.jpg'
import socialImage2 from './../../assets/social-image-2.jpg'
import socialImage3 from './../../assets/social-image-3.jpg'
import socialImage4 from './../../assets/social-image-4.jpg'
import socialImage5 from './../../assets/social-image-5.jpg'



function Index() {

    const [filterSortOption, setFilterSortOption] = useState('all');

    const navigate = useNavigate();

    const addToWishlist = (product) => {
        const existing = JSON.parse(localStorage.getItem('wishlist')) || [];
        if (!existing.some(p => p.id === product.id)) {
            const updated = [...existing, product];
            localStorage.setItem('wishlist', JSON.stringify(updated));
            window.dispatchEvent(new Event('wishlistUpdated'))
            toast.success(`${product.productName} Added to Wishlist`)
        } else {
            toast.info(`${product.productName} is Already in Wishlist`)
        }
    }

    const addToCart = (product) => {
        const existing = JSON.parse(localStorage.getItem('cart')) || [];
        const alreadyInCart = existing.find(p => p.id === product.id);
        if (!alreadyInCart) {
            const updatedProduct = { ...product, quantity: 1 };
            const updatedCart = [...existing, updatedProduct]
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            window.dispatchEvent(new Event('cartUpdated'))
            toast.success(`${product.productName} Added to Cart!`)
        } else {
            toast.info(`${product.productName} is Already in Cart!`)
        }
    }

    return (
        <>
            {/* hero */}
            <div className="hero ">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={0}
                    modules={[Autoplay, EffectFade]}
                    effect="fade"
                    loop={true}
                    autoplay={{
                        delay: 3000
                    }}
                >
                    <SwiperSlide>
                        <div className="hero-wrap hero-wrap1">
                            <div className="hero-content">
                                <h5>- ESSENTIAL ITEMS -</h5>
                                <h1>Beauty Inspired <br />by Real Life</h1>
                                <p className="my-3">Made using clean, non-toxic ingredients, our products are designed for everyone</p>
                                <Link to='/cart' className="btn hero-btn mt-3">Shop Now</Link>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="hero-wrap hero-wrap2">
                            <div className="hero-content">
                                <h5>- NEW COLLECTION -</h5>
                                <h1>Get The Perfectly Hydrated Skin</h1>
                                <p className="my-3">Made using clean, non-toxic ingredients, our products are designed for everyone</p>
                                <Link to='/cart' className="btn hero-btn mt-3">Shop Now</Link>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="hero-wrap hero-wrap3">
                            <div className="hero-content">
                                <h5>- GET THE GLOW -</h5>
                                <h1>Be Your Kind <br />of Beauty</h1>
                                <p className="my-3">Made using clean, non-toxic ingredients, our products are designed for everyone</p>
                                <Link to='/cart' className="btn hero-btn mt-3">Shop Now</Link>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>

            {/* Products  */}
            <div className="product-container py-5 my-5">
                <div className="container position-relative">
                    <div className="row">
                        <div className="section-title mb-5 product-title text-center">
                            <h2 className="fw-semibold fs-1">Our Featured Products</h2>
                            <p className="text-muted">Get the skin you want to feel</p>
                        </div>
                    </div>

                    <Swiper
                        slidesPerView={4}
                        spaceBetween={20}
                        navigation={{ nextEl: ".product-swiper-next", prevEl: ".product-swiper-prev" }}
                        breakpoints={{
                            1399: { slidesPerView: 4 },
                            1199: { slidesPerView: 3 },
                            991: { slidesPerView: 2 },
                            767: { slidesPerView: 1.5 },
                            0: { slidesPerView: 1 },
                        }}
                        className="mt-4 swiper position-relative"
                    >
                        {Products.filter(product => product.id >= 5 && product.id <= 10).map(product => (
                            <SwiperSlide key={product.id}>
                                <div className="product-item text-center position-relative">
                                    <Link to={`/product/${product.id}`} className="text-decoration-none text-black">
                                        <div className="product-image w-100 position-relative overflow-hidden">
                                            <img src={product.image} alt="Primary product image" className="img-fluid" />
                                            <img src={product.secondaryImage} alt="Secondary product image" className="img-fluid" />

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
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        addToCart(product);
                                                    }}
                                                >
                                                    <i className="bi bi-cart3 fs-5" title="Add to Cart"></i>
                                                </div>
                                            </div>

                                            <span className={`tag badge text-white ${product.tag === 'New' ? 'bg-danger' : 'bg-success'}`}>
                                                {product.tag}
                                            </span>
                                        </div>
                                    </Link>

                                    <Link to={`/product/${product.id}`} className="text-decoration-none text-black">
                                        <div className="product-content pt-3">
                                            <span className="price text-decoration-none">{product.price}</span>
                                            <h3 className="title pt-1">{product.productName}</h3>
                                        </div>
                                    </Link>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            {/* Banner */}
            <div className="banners py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 banner-card overflow-hidden position-relative">
                            <img src={subBanner1} alt="" className="img-fluid rounded banner-img" />
                            <div className="banner-content position-absolute">
                                <h3>NEW COLLECTION</h3>
                                <h1>Intensive Glow C+ <br />Serum <br /> </h1>
                                <button className="btn banner-btn mt-2">EXPLORE MORE</button>
                            </div>
                        </div>
                        <div className="col-lg-6 banner-card1 overflow-hidden position-relative">
                            <img src={subBanner2} alt="" className="img-fluid rounded banner-img" />
                            <div className="banner-content position-absolute">
                                <h1>25% off Everything</h1>
                                <p>Makeup with extended range in <br />colors for every human.</p>
                                <button className="btn banner-btn mt-2">SHOP NOW</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Service */}
            <div className="container py-5 my-5">
                <div className="row text-center">
                    <div className="col-lg-3 col-sm-6 mb-4">
                        <img src={serviceImg1} alt="" className="img-fluid" />
                        <h4 className="mt-3 mb-1">Free Shipping</h4>
                        <p className="text-muted fs-6 fw-semibold">Free Shipping for orders over $100.</p>
                    </div>
                    <div className="col-lg-3 col-sm-6 mb-4">
                        <img src={serviceImg2} alt="" className="img-fluid" />
                        <h4 className="mt-3 mb-1">Returns</h4>
                        <p className="text-muted fs-6 fw-semibold">Within 48hrs after cancellation.</p>
                    </div>
                    <div className="col-lg-3 col-sm-6 mb-4">
                        <img src={serviceImg3} alt="" className="img-fluid" />
                        <h4 className="mt-3 mb-1">Online Support</h4>
                        <p className="text-muted fs-6 fw-semibold">24 hours Online Support, Contact anytime.</p>
                    </div>
                    <div className="col-lg-3 col-sm-6 mb-4">
                        <img src={serviceImg1} alt="" className="img-fluid" />
                        <h4 className="mt-3 mb-1">Flexible Payment</h4>
                        <p className="text-muted fs-6 fw-semibold">Pay with Multiple payment Methods</p>
                    </div>
                </div>
            </div>

            {/* seen in */}
            <div className="text-center my-5 seen-in">
                <div className="container">
                    <h1 className="mb-5 fw-semibold">As seen in</h1>
                    <div className="row pt-3 justify-content-center">
                        <div className="col-md-4 mb-4 seen-card">
                            <img src={brand1} alt="" className="img-fluid" />
                            <p className="text-dark fs-5 mt-2 fw-semibold">"Also the customer service is phenoinal. I would purchase again".</p>
                        </div>
                        <div className="col-md-4 mb-4 seen-card">
                            <img src={brand2} alt="" className="img-fluid" />
                            <p className="text-dark fs-5 mt-2 fw-semibold">"Great Product line. very attractive staff to deal with".</p>
                        </div>
                        <div className="col-md-4 mb-4 seen-card">
                            <img src={brand3} alt="" className="img-fluid" />
                            <p className="text-dark fs-5 mt-2 fw-semibold">"Are you looking to your beauty at an affordable price? Look no further".</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* favourite */}
            <div className="favourite-beauty py-5 my-5">
                <div className="container">
                    <div className="row">
                        <div className="section-title mb-5 product-title text-center">
                            <h2 className="fw-semibold fs-1">Customer favourite essentials</h2>
                            <p>Our product are designed beautifully and also affordable for everyone.</p>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-5">
                            <div className="favourite-beauty-banner mb-lg-0 mb-5 position-relative">
                                <img src={femalebanner} className="img-fluid" alt="" />
                                <div className="favourite-beauty-banner-title">
                                    <h3 className="fs-2">Empower Yourself</h3>
                                    <p className="fs-6">Get the skin you want to feel</p>
                                    <button className="btn btn-default">Explore More</button>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-7">
                            <div className="row">
                                {Products.filter(product => product.id >= 10 && product.id <= 15).map(product => (
                                    <div className="col-md-6 col-lg-4 mb-4" key={product.id}>
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
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                addToCart(product);
                                                            }}
                                                        >
                                                            <i className="bi bi-cart3 fs-5" title="Add to Cart"></i>
                                                        </div>
                                                    </div>

                                                    <span className={`tag badge text-white ${product.tag === 'New' ? 'bg-danger' : 'bg-success'}`}>
                                                        {product.tag}
                                                    </span>
                                                </div>
                                            </Link>

                                            <Link to={`/product/${product.id}`} className="text-decoration-none text-black">
                                                <div className="product-content pt-3">
                                                    <span className="price">{product.price}</span>
                                                    <h3 className="title pt-1">{product.productName}</h3>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Discover */}
            <div className="discover container py-5">
                <div className="section-title mb-5 favourite-beauty-title text-center">
                    <h2 className="fw-semibold fs-1">More to Discover</h2>
                    <p className="text-center">Our bundles were designed to conveniently package <br />your tanning essentials while saving your money</p>
                </div>
                <div className="row g-5">
                    <div className="col-md-6 discover-card text-center">
                        <div className="discover-img section-image rounded">
                            <img src={discover1} alt="Summer Collection" className="img-fluid rounded" />
                        </div>
                        <div className="discover-info mt-3">
                            <div>Summer Collection</div>
                            <button className="btn mt-2">Shop Now <i className="bi bi-arrow-right ms-2"></i></button>
                        </div>
                    </div>
                    <div className="col-md-6 discover-card text-center">
                        <div className="discover-img section-image rounded">
                            <img src={discover2} alt="From our Blog" className="img-fluid rounded" />
                        </div>
                        <div className="discover-info mt-3">
                            <div>Summer Collection</div>
                            <button className="btn mt-2">Read More <i className="bi bi-arrow-right ms-2"></i></button>
                        </div>
                    </div>
                </div>
            </div>

            {/* social */}
            <div className="social-image-container py-5 px-5 mx-auto">
                <div className="row g-4">
                    <div className="col-lg-2 col-md-4">
                        <div className="social-wrapper position-relative overflow-hidden">
                            <img src={socialImage1} alt="" className="img-fluid" />
                            <i className="bi bi-instagram"></i>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-4">
                        <div className="social-wrapper position-relative overflow-hidden">
                            <img src={socialImage2} alt="" className="img-fluid" />
                            <i className="bi bi-instagram"></i>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-4">
                        <div className="social-wrapper position-relative overflow-hidden">
                            <img src={socialImage3} alt="" className="img-fluid" />
                            <i className="bi bi-instagram"></i>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-4">
                        <div className="social-wrapper position-relative overflow-hidden">
                            <img src={socialImage4} alt="" className="img-fluid" />
                            <i className="bi bi-instagram"></i>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-4">
                        <div className="social-wrapper position-relative overflow-hidden">
                            <img src={socialImage5} alt="" className="img-fluid" />
                            <i className="bi bi-instagram"></i>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-4">
                        <div className="social-wrapper position-relative overflow-hidden">
                            <img src={socialImage1} alt="" className="img-fluid" />
                            <i className="bi bi-instagram"></i>
                        </div>
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
    )
}

export default Index