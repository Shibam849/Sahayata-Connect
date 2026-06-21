import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";

function Footer() {
    // State to check if a user is logged in.
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check for login status when the component loads.
        const token = localStorage.getItem('userToken');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>About Sahayata Connect</h3>
                    <p>We are a non-profit organization dedicated to creating positive social impact through community-driven initiatives.</p>
                    <div className="social-icons">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon"><i className="fab fa-facebook-f" /></a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon"><i className="fab fa-twitter" /></a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon"><i className="fab fa-instagram" /></a>
                    </div>
                </div>

                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <NavLink to="/">Home</NavLink><br />
                    <NavLink to="/about">About Us</NavLink><br />
                    <NavLink to={isLoggedIn ? "/profile" : "/register"}>Volunteer</NavLink><br />
                    <NavLink to="/events">Events</NavLink><br />
                </div>

                <div className="footer-section">
                    <h3>Contact Info</h3>
                    <p><i className="fas fa-envelope" /> info@sahayataconnect.org</p>
                    <p><i className="fas fa-phone" /> +91 98765 43210</p>
                    <p><i className="fas fa-map-marker-alt" /> 123 NGO Street, New Delhi</p>
                </div>

                <div className="footer-section">
                    <h3>Newsletter</h3>
                    <p>Stay updated with our latest events and campaigns.</p>
                    <div className="newsletter">
                        <input type="email" placeholder="Your email address" className="newsletter-input" />
                        <button className="newsletter-btn">Subscribe</button>
                    </div>
                </div>
            </div>
            
            <div className="footer-bottom">
               
                <p>
                    &copy; 2024 Sahayata Connect. All rights reserved. | 
                    <NavLink to="/privacy">Privacy Policy</NavLink> | 
                    <NavLink to="/terms">Terms of Service</NavLink>
                </p>
            </div>
        </footer>
    );
}

export default Footer;

