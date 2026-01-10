import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';

function Profile() {
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const userName = localStorage.getItem('userName');

    useEffect(() => {
        const fetchRegistrations = async () => {
            const token = localStorage.getItem('userToken');
            if (!token) {
                setLoading(false);
                return;
            }
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/user/my-registrations`, {
                    headers: { 'x-auth-token': token }
                });
                if (!response.ok) throw new Error('Failed to fetch registrations.');
                const data = await response.json();
                setRegistrations(data);
            } catch (error) {
                console.error(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchRegistrations();
    }, []);

    // --- THE DEFINITIVE DATE FIX IS HERE ---
    // This new, more robust function can parse "dd/mm/yyyy" and other formats.
    const formatDate = (dateString) => {
        if (!dateString || typeof dateString !== 'string') return 'Date Not Specified';

        let date;
        // Check for formats like "dd/mm/yyyy" or "dd-mm-yyyy"
        if (dateString.includes('/') || dateString.includes('-')) {
            const parts = dateString.split(/[/ -]/);
            if (parts.length === 3) {
                // Assuming format is Day, Month, Year
                const [day, month, year] = parts;
                // Note: month is 0-indexed in JavaScript's Date object (0=Jan, 1=Feb, etc.)
                date = new Date(year, month - 1, day);
            }
        }
        
        // Fallback for ISO or other standard formats if the above fails
        if (!date || isNaN(date.getTime())) {
            date = new Date(dateString);
        }

        // Final check to prevent displaying "Invalid Date"
        if (isNaN(date.getTime())) {
            return 'Invalid Date Format';
        }

        const options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    };

    return (
        <>
            <Navbar />
            <div className="profile-page-container">
                <div className="profile-header">
                    <h2>Welcome, {userName || 'User'}!</h2>
                    <p>Here are the events you have registered for.</p>
                </div>
                <div className="event-grid">
                    {loading && <p>Loading your registered events...</p>}
                    {!loading && registrations.length > 0 ? (
                        registrations.map((registration) => (
                            <div className="event-card" key={registration._id}>
                                <div className="event-image" style={{backgroundImage: `url(${process.env.REACT_APP_API_URL}/event_img/${registration.eventId.eImage})`}}></div>
                                <div className="event-content">
                                    <h3 className="event-title">{registration.eventId.eName}</h3>
                                    <div className="event-meta">
                                        <span className="event-date">
                                            <i className="fas fa-calendar-alt"></i> {formatDate(registration.eventId.eDate)}
                                        </span>
                                        <span className="event-location">
                                            <i className="fas fa-map-marker-alt"></i> {registration.eventId.eVenue}
                                        </span>
                                    </div>
                                    <p className="event-description">{registration.eventId.eDetails.substring(0, 100)}...</p>
                                    <Link to={`/event/${registration.eventId._id}`} className="join-btn">View Details</Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        !loading && (
                            <div className="no-registrations">
                                <h3>No Registered Events Found</h3>
                                <p>You haven't registered for any events yet.</p>
                            </div>
                        )
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Profile;