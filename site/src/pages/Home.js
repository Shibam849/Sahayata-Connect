import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";

function Home() {
    // State to store the list of events fetched from the server
    const [events, setEvents] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);

    // Static data for the slider remains the same
    const slides = [
        {
            image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop",
            title: "Together We Make a Difference",
            subtitle: "Join our community-driven initiatives and help create positive change in society"
        },
        {
            image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2070&auto=format&fit=crop",
            title: "Empowering Communities",
            subtitle: "Building stronger communities through collective action and shared responsibility"
        }
    ];

    // --- NEW: Effect hook to fetch events from the backend ---
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/event/select`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setEvents(data); // Store the fetched events in state
            } catch (error) {
                console.error("Failed to fetch events:", error);
            }
        };

        fetchEvents();
    }, []); // Empty dependency array ensures this runs only once

    // Effect for the image slider
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length]);

    // Helper function to format date strings
    const formatDate = (dateString) => {
        try {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const date = new Date(dateString);
            return isNaN(date) ? dateString : date.toLocaleDateDateString('en-US', options);
        } catch (error) {
            return dateString;
        }
    };

    return (
        <>
            <Navbar />
            
            {/* Hero Slider Section (No changes) */}
            <section className="hero-slider">
                <div className="slider-wrapper" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                    {slides.map((slide, index) => (
                        <div className="slide" key={index} style={{ backgroundImage: `url(${slide.image})` }}>
                            <div className="slide-overlay" />
                            <div className="slide-content">
                                <h1>{slide.title}</h1>
                                <p>{slide.subtitle}</p>
                                <Link to="/about" className="cta-button">Learn More</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* About Us Summary Section (No changes) */}
            <section className="home-about-section">
                {/* ... existing content ... */}
            </section>

            {/* --- UPDATED: Upcoming Events Section is now DYNAMIC --- */}
            <section className="events-section" id="events">
                <div className="container">
                    <div className="section-header">
                        <h2>Upcoming Events</h2>
                        <p>Join us in making a difference. Participate in our upcoming events and be a part of the change.</p>
                    </div>
                    <div className="events-grid">
                        {/* Map over the fetched events data and render a card for each */}
                        {events.map((event) => (
                            <div className="event-card" key={event._id}>
                                <div className="event-image" style={{ backgroundImage: `url("${process.env.REACT_APP_API_URL}/event_img/${event.eImage}")` }}>
                                </div>
                                <div className="event-content">
                                    <h3 className="event-title">{event.eName}</h3>
                                    <div className="event-meta">
                                        <span className="event-date">
                                            <i className="fas fa-calendar-alt"></i> {formatDate(event.eDate)}
                                        </span>
                                        <span className="event-location">
                                            <i className="fas fa-map-marker-alt"></i> {event.eVenue}
                                        </span>
                                    </div>
                                    <p className="event-description">{event.eDetails.substring(0, 100)}...</p>
                                    <Link to={`/event/${event._id}`} className="join-btn">View Details</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            <Footer />
        </>
    );
}

export default Home;

