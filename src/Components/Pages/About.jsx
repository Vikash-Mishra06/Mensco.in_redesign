import React from 'react';
import { motion } from 'framer-motion';

import head from '../../assets/about-head-shape.webp';
import about1 from '/Images/mc-banner-1.png'
import about2 from '/Images/mc-banner-2.png'
import team1 from '../../assets/team-1.webp';
import team2 from '../../assets/team-2.webp';
import team3 from '../../assets/team-3.webp';

import { FaLeaf, FaHeart, FaAward, FaUsers } from 'react-icons/fa';

function About() {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5
            }
        }
    };

    const stats = [
        { number: "5000+", label: "Happy Clients", icon: <FaHeart className="text-primary" /> },
        { number: "10+", label: "Products", icon: <FaLeaf className="text-primary" /> },
        { number: "5+", label: "Years Experience", icon: <FaAward className="text-primary" /> },
        { number: "24/7", label: "Support", icon: <FaUsers className="text-primary" /> }
    ];

    const teamMembers = [
        { name: "Vicky Patel", role: "Founder & CEO", image: team1 },
        { name: "Priyanka Sen", role: "Product Designer", image: team2 },
        { name: "Purvi Singh", role: "Marketing Director", image: team3 }
    ];

    return (
        <>
            {/* Hero Section with Parallax Effect */}
            <motion.section 
                className="about-hero-section d-flex align-items-center position-relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <div className="container">
                    <motion.div 
                        className="row"
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                    >
                        <motion.div className="col-md-8 mx-auto text-center" variants={itemVariants}>
                            <p className="text-uppercase text-white small mb-2 letter-spacing-2">Our Story</p>
                            <h1 className="fw-bold display-4 text-white mb-4">About <span>MENSCO</span></h1>
                            <p className="lead text-white-50 mb-0 fw-semibold">
                                Breaking the Mold: Redefining Skincare for Modern Indian Men Since 2024.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
                <div className="overlay"></div>
            </motion.section>

            {/* Mission Statement */}
            <section className="py-5 py-lg-7 bg-light">
                <div className="container text-center">
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        
                        <h2 className="fw-bold mb-4 display-5">
                            MENSCO <span className="text-primary1">believe</span> in beauty with purpose
                        </h2>
                        <p className="text-muted mx-auto fs-5" style={{ maxWidth: '700px' }}>
                            Mensco is built on the principle that men deserve the same level of attention and care for their skin as women. Skincare transcends mere appearance — it’s a form of self-care that's integral to health, confidence, and overall well-being.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Story Sections */}
            <section className="py-5 py-lg-7">
                <div className="container">
                    <motion.div 
                        className="row align-items-center g-5 mb-5"
                        initial="hidden"
                        whileInView="visible"
                        variants={containerVariants}
                        viewport={{ once: true }}
                    >
                        <motion.div className="col-md-6" variants={itemVariants}>
                            <div className="about-img-container rounded overflow-hidden shadow-lg">
                                <img 
                                    src={about1}
                                    alt="Our Beginnings" 
                                    className="img-fluid w-100 hover-zoom"
                                />
                            </div>
                        </motion.div>
                        <motion.div className="col-md-6" variants={itemVariants}>
                            <span className="text-primary1 small text-uppercase letter-spacing-2">Our Story</span>
                            <h3 className="fw-bold mb-3 display-6">From humble beginnings</h3>
                            <p className="text-muted mb-4">
                                Mensco is thoughtfully crafted for Indian men, addressing skin damage, aging, and pollution exposure with high-quality and easy-to-use products. Backed by science, our products are formulated to deliver tangible results.
                            </p>
                            <ul className="">
                                <li className="mb-2 d-flex align-items-start">
                                    <span className="me-2 text-primary">✓</span>
                                    <span>100% natural ingredients</span>
                                </li>
                                <li className="mb-2 d-flex align-items-start">
                                    <span className="me-2 text-primary">✓</span>
                                    <span>Cruelty-free & vegan formulas</span>
                                </li>
                                <li className="d-flex align-items-start">
                                    <span className="me-2 text-primary">✓</span>
                                    <span>Sustainable packaging</span>
                                </li>
                            </ul>
                        </motion.div>
                    </motion.div>

                    <motion.div 
                        className="row align-items-center g-5 flex-md-row-reverse"
                        initial="hidden"
                        whileInView="visible"
                        variants={containerVariants}
                        viewport={{ once: true }}
                    >
                        <motion.div className="col-md-6" variants={itemVariants}>
                            <div className="about-img-container rounded overflow-hidden shadow-lg">
                                <img 
                                    src={about2}
                                    alt="Our Mission" 
                                    className="img-fluid w-100 hover-zoom"
                                />
                            </div>
                        </motion.div>
                        <motion.div className="col-md-6" variants={itemVariants}>
                            <span className="text-primary1 small text-uppercase letter-spacing-2">Our Promise</span>
                            <h3 className="fw-bold mb-3 display-6">Beauty that cares</h3>
                            <p className="text-muted mb-4">
                                We focus on quality over price. We offer effective solutions tailored to your needs for lasting, visible improvements.
                                Our products are formulated with high-quality ingredients, backed by scientific research, and free from harmful chemicals, GMO and/or animal testing.
                            </p>
                            <div className="d-flex align-items-center mb-3">
                                <div className="bg-primary bg-opacity-10 p-3 rounded-circle me-3">
                                    <FaLeaf className="text-primary fs-4" />
                                </div>
                                <div>
                                    <h5 className="mb-0">Clean Ingredients</h5>
                                    <p className="small text-muted mb-0">No harsh chemicals or toxins</p>
                                </div>
                            </div>
                            <div className="d-flex align-items-center">
                                <div className="bg-primary bg-opacity-10 p-3 rounded-circle me-3">
                                    <FaHeart className="text-primary fs-4" />
                                </div>
                                <div>
                                    <h5 className="mb-0">Cruelty Free</h5>
                                    <p className="small text-muted mb-0">Never tested on animals</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-5 py-lg-7 about-box bg-opacity-5">
                <div className="container">
                    <motion.div 
                        className="row g-4 text-center"
                        initial="hidden"
                        whileInView="visible"
                        variants={containerVariants}
                        viewport={{ once: true }}
                    >
                        {stats.map((stat, index) => (
                            <motion.div 
                                key={index} 
                                className="col-md-3 col-6"
                                variants={itemVariants}
                                whileHover={{ y: -5 }}
                            >
                                <div className="p-4 bg-white rounded shadow-sm h-100">
                                    <div className="icon-lg bg-primary bg-opacity-10 text-primary rounded-circle mb-3 mx-auto">
                                        {stat.icon}
                                    </div>
                                    <h3 className="fw-bold mb-1 text-primary1">{stat.number}</h3>
                                    <p className="mb-0 text-muted ">{stat.label}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-5 py-lg-7">
                <div className="container">
                    <motion.div 
                        className="text-center mb-5"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-primary1 small text-uppercase letter-spacing-2">Our Family</span>
                        <h2 className="fw-bold display-5 mb-3">Meet the Team</h2>
                        <p className="text-muted mx-auto" style={{ maxWidth: '600px' }}>
                            The passionate individuals behind Mensco who work tirelessly to bring you the best in 
                            natural beauty care.
                        </p>
                    </motion.div>

                    <div className="row g-4">
                        {teamMembers.map((member, index) => (
                            <motion.div 
                                key={index}
                                className="col-md-4"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="team-card text-center">
                                    <div className="team-img-container rounded-circle overflow-hidden mx-auto mb-4">
                                        <img 
                                            src={member.image} 
                                            alt={member.name} 
                                            className="img-fluid w-100 hover-zoom"
                                        />
                                    </div>
                                    <h4 className="fw-bold mb-1">{member.name}</h4>
                                    <p className="text-muted mb-3">{member.role}</p>
                                    <div className="social-links d-flex justify-content-center gap-3">
                                        <a href="#" className="text-muted hover-primary"><i className="bi bi-twitter"></i></a>
                                        <a href="#" className="text-muted hover-primary"><i className="bi bi-linkedin"></i></a>
                                        <a href="#" className="text-muted hover-primary"><i className="bi bi-instagram"></i></a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-5 py-lg-7 bg-dark text-white position-relative overflow-hidden mb-0">
                <div className="container position-relative z-index-1">
                    <motion.div 
                        className="row justify-content-center text-center"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <div className="col-lg-8">
                            <h2 className="fw-bold display-5 mb-4">Ready to experience <span className='text-primary1'>MENSCO</span>?</h2>
                            <p className="lead mb-5 opacity-75">
                                Join thousands of satisfied customers who trust our products for their daily beauty routine.
                            </p>
                            <motion.button
                                className="btn btn-lg px-5 py-3 border-0"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Our Collections
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </section>

            
        </>
    );
}

export default About;