import React, { useEffect, useRef, useState } from 'react';


import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'

import Products from './../../Product.json';
import { Link, useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css'

import subBanner1 from '/Images/mc-banner-1.png'
import subBanner2 from '/Images/mc-banner-3.png'

import favourite1 from '/Images/mc-favourite1.png'

import serviceImg1 from './../../assets/service-icon-1.svg'
import serviceImg2 from './../../assets/service-icon-2.svg'
import serviceImg3 from './../../assets/service-icon-3.svg'
import serviceImg4 from './../../assets/service-icon-4.svg'

import aibanner from '/Images/Mc-hero2.jpg'

import discover1 from '/Images/mc-discover1.png'
import discover2 from '/Images/mc-discover3.png'

import socialImage1 from '/Images/mc-product-1f.png'
import socialImage2 from '/Images/mc-product-2f.png'
import socialImage3 from '/Images/mc-product-3f.png'
import socialImage4 from '/Images/mc-product-4f.png'
import socialImage5 from '/Images/mc-product-5f.png'
import socialImage6 from '/Images/mc-product-6f.png'




function Index() {

    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect(); // Only animate once
                }
            },
            { threshold: 0.2 } // Trigger when 20% visible
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const containerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1
        });

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, []);

    const discoverRef = useRef(null);
    const [isDiscoverVisible, setIsDiscoverVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setIsDiscoverVisible(true);
                    observer.unobserve(entry.target);
                }
            });
        });

        if (discoverRef.current) observer.observe(discoverRef.current);

        return () => {
            if (discoverRef.current) observer.unobserve(discoverRef.current);
        };
    }, []);

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
            toast.info(<div className="shake">{`${product.productName} is Already in Wishlist`}</div>)
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
            toast.info(<div className="shake">{`${product.productName} is Already in Cart!`}</div>);
        }
    }

    return (
        <>
            {/* hero */}
            <div className="hero fade-in">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={0}
                    modules={[Autoplay, EffectFade]}
                    effect="fade"
                    loop={true}
                    autoplay={{ delay: 3000 }}
                >
                    <SwiperSlide>
                        <div className="hero-wrap hero-wrap1">
                            <div className="hero-content">
                                <Link to="/cart" className="btn hero-btn mt-3">Shop Now</Link>
                            </div>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className="hero-wrap hero-wrap2">
                            <div className="hero-content">
                                <Link to="/cart" className="btn hero-btn mt-3">Shop Now</Link>
                            </div>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className="hero-wrap hero-wrap3">
                            <div className="hero-content">
                                <Link to="/cart" className="btn hero-btn mt-3">Shop Now</Link>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="hero-wrap hero-wrap4">
                            <div className="hero-content">
                                <Link to="/cart" className="btn hero-btn mt-3">Shop Now</Link>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="hero-wrap hero-wrap5">
                            <div className="hero-content">
                                <Link to="/cart" className="btn hero-btn mt-3">Shop Now</Link>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>

            {/* Products  */}
            <div className="product-container py-5 my-3" ref={containerRef}>
                <div className="container position-relative">
                    <div className="row">
                        <div className="section-title mb-2 product-title text-center">
                            <h2 className="fw-semibold fs-1">Our Featured Products</h2>
                            <p className="text-muted">Get the skin you want to feel</p>
                        </div>
                    </div>


                    <Swiper
                        slidesPerView={4}
                        spaceBetween={20}
                        autoplay={{
                            delay: 3000, // 3 seconds between slides
                            disableOnInteraction: false, // continue autoplay after user interaction
                            pauseOnMouseEnter: true, // pause when mouse hovers over slider
                        }}
                        modules={[Autoplay]}
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
                        {Products.filter(product => product.id >= 1 && product.id <= 10).map(product => (
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
                            </SwiperSlide>
                        ))}
                        <div className="text-center mt-4 ">
                            <Link to='/products' className="btn pulse">View All<i className="bi bi-arrow-right ms-2"></i></Link>
                        </div>
                    </Swiper>
                </div>
            </div>

            {/* Banner */}
            <div className="banners py-5" ref={sectionRef}>
                <div className="container">
                    <div className="row g-5">
                        <div className={`col-md-6 discover-card text-center ${isVisible ? 'fade-in-left' : 'hidden'}`}>
                            <div className="discover-img section-image rounded">
                                <img src={subBanner1} alt="Winter Collection" className="img-fluid rounded" />
                            </div>
                            <div className="discover-info mt-3">
                                <Link to='/products' className="btn mt-2 pulse">Explore Now <i className="bi bi-arrow-right ms-2"></i></Link>
                            </div>
                        </div>
                        <div className={`col-md-6 discover-card text-center ${isVisible ? 'fade-in-right' : 'hidden'}`}>
                            <div className="discover-img section-image rounded">
                                <img src={subBanner2} alt="Summer Collection" className="img-fluid rounded" />
                            </div>
                            <div className="discover-info mt-3">
                                <Link to='/cart' className="btn mt-2 pulse">Buy Now <i className="bi bi-arrow-right ms-2"></i></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Service */}
            <div className="service-section" style={{ backgroundColor: '#EDF1F0' }}>
                <div className="container py-5 my-5" >
                    <div className="row text-center">
                        <div className="col-lg-3 col-sm-6 mb-4 fade-in" style={{ animationDelay: '0.3s' }}>
                            <img src={serviceImg1} alt="" className="img-fluid2" />
                            <h4 className="mt-3 mb-1 ">Free Shipping</h4>
                            <p className="text-muted fs-6 fw-semibold">Free Shipping for orders over $100.</p>
                        </div>
                        <div className="col-lg-3 col-sm-6 mb-4 fade-in" style={{ animationDelay: '0.3s' }}>
                            <img src={serviceImg2} alt="" className="img-fluid2" />
                            <h4 className="mt-3 mb-1">Returns</h4>
                            <p className="text-muted fs-6 fw-semibold">Within 48hrs after cancellation.</p>
                        </div>
                        <div className="col-lg-3 col-sm-6 mb-4 fade-in" style={{ animationDelay: '0.3s' }}>
                            <img src={serviceImg3} alt="" className="img-fluid2" />
                            <h4 className="mt-3 mb-1">Online Support</h4>
                            <p className="text-muted fs-6 fw-semibold">24 hours Online Support, Contact anytime.</p>
                        </div>
                        <div className="col-lg-3 col-sm-6 mb-4 fade-in" style={{ animationDelay: '0.3s' }}>
                            <img src={serviceImg4} alt="" className="img-fluid2" />
                            <h4 className="mt-3 mb-1">Flexible Payment</h4>
                            <p className="text-muted fs-6 fw-semibold">Pay with Multiple payment Methods</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* seen in */}
            <div className="text-center p-0 m-0 seen-in" style={{ backgroundColor: '#fff' }}>
                <div className="section-title mb-5 product-title text-center">
                    <h2 className="fw-semibold fs-1">AI Skin Analysis</h2>
                    <p>Confused about where to start your skincare journey? We've got you covered.</p>
                </div>
                <img src={aibanner} alt="" className="img-fluid float" />
            </div>

            {/* favourite */}
            <div className="favourite-beauty py-5 my-5">
                <div className="container">
                    <div className="row">
                        <div className="section-title mb-5 product-title text-center">
                            <h2 className="fw-semibold fs-1 bounce">Customer favourite essentials</h2>
                            <p>Our product are designed beautifully and also affordable for everyone.</p>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-5">
                            <div className="favourite-card ">
                                <div className="favourite-beauty-banner mb-lg-0 mb-2 position-relative">
                                    <img src={favourite1} className="img-fluid" alt="" />
                                </div>
                                <div className="discover-info mt-3">
                                    <h3 className="fs-2">Empower Yourself</h3>
                                    <p className="fs-4">Get the skin you want to feel</p>
                                    <Link to='/products' className="btn mt-2">Explore Now <i className="bi bi-arrow-right ms-2"></i></Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-7">
                            <div className="row">
                                {Products.filter(product => product.id >= 1 && product.id <= 9).map(product => (
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
                                                <div className="price-section d-flex gap-3 justify-content-center align-items-center pt-2 mb-2">
                                                    {product.oldprice && (
                                                        <span className="old-price text-decoration-line-through text-muted ms-2">
                                                            {product.oldprice}
                                                        </span>
                                                    )}
                                                    <span className="current-price fw-bold" style={{ fontSize: '18px', color: '#4e7661' }}>
                                                        {product.price}
                                                    </span>
                                                </div>
                                                <h3 className="title fw-semibold" style={{ fontSize: '18px' }}>{product.productName}</h3>
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
            <div className="discover container"  ref={discoverRef}>
                <div className="section-title mb-5 favourite-beauty-title text-center">
                    <h2 className="fw-semibold fs-1">More to Discover</h2>
                    <p className="text-center">Our bundles were designed to conveniently package <br />your tanning essentials while saving your money</p>
                </div>
                <div className="row g-5">
                    <div className={`col-md-6 discover-card text-center ${isDiscoverVisible ? 'fade-in-left' : 'hidden'}`}>
                        <div className="discover-img section-image rounded">
                            <img src={discover1} alt="Winter Collection" className="img-fluid rounded" />
                        </div>
                        <div className="discover-info mt-3">
                            <div>Winter Collection</div>
                            <Link to='/products' className="btn mt-2">Shop Now <i className="bi bi-arrow-right ms-2"></i></Link>
                        </div>
                    </div>
                    <div className={`col-md-6 discover-card text-center ${isDiscoverVisible ? 'fade-in-right' : 'hidden'}`}>
                        <div className="discover-img section-image rounded">
                            <img src={discover2} alt="Summer Collection" className="img-fluid rounded" />
                        </div>
                        <div className="discover-info mt-3">
                            <div>Summer Collection</div>
                            <Link to='/products' className="btn mt-2">Read More <i className="bi bi-arrow-right ms-2"></i></Link>
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
                            <a href="https://www.instagram.com/mensco.in/"><i className="bi bi-instagram"></i></a>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-4">
                        <div className="social-wrapper position-relative overflow-hidden">
                            <img src={socialImage2} alt="" className="img-fluid" />
                            <a href="https://www.instagram.com/mensco.in/"><i className="bi bi-instagram"></i></a>

                        </div>
                    </div>
                    <div className="col-lg-2 col-md-4">
                        <div className="social-wrapper position-relative overflow-hidden">
                            <img src={socialImage3} alt="" className="img-fluid" />
                            <a href="https://www.instagram.com/mensco.in/"><i className="bi bi-instagram"></i></a>

                        </div>
                    </div>
                    <div className="col-lg-2 col-md-4">
                        <div className="social-wrapper position-relative overflow-hidden">
                            <img src={socialImage4} alt="" className="img-fluid" />
                            <a href="https://www.instagram.com/mensco.in/"><i className="bi bi-instagram"></i></a>

                        </div>
                    </div>
                    <div className="col-lg-2 col-md-4">
                        <div className="social-wrapper position-relative overflow-hidden">
                            <img src={socialImage5} alt="" className="img-fluid" />
                            <a href="https://www.instagram.com/mensco.in/"><i className="bi bi-instagram"></i></a>

                        </div>
                    </div>
                    <div className="col-lg-2 col-md-4">
                        <div className="social-wrapper position-relative overflow-hidden">
                            <img src={socialImage6} alt="" className="img-fluid" />
                            <a href="https://www.instagram.com/mensco.in/"><i className="bi bi-instagram"></i></a>

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