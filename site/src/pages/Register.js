import LRFooter from "../common/LRFooter";
import LRNavbar from "../common/LRNavbar";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection


function Register() {
    const navigate = useNavigate(); // Hook for navigation

    // State for all registration form fields
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Handle input changes and update the state
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Basic validation
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/user/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    phone: formData.phone,
                    password: formData.password
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                // If server responds with an error (e.g., user exists)
                throw new Error(data.msg || 'Something went wrong');
            }

            // Handle successful registration
            setSuccess('Registration successful! Redirecting to login...');
            console.log("Registration successful:", data);

            // Redirect to login page after a short delay
            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <>
            <div>
                <LRNavbar />
                <section className="register-section">
                    <div className="register-container">
                        <div className="register-left">
                            <div className="register-content">
                                <div className="register-header">
                                    <h1>Join Our Community</h1>
                                    <p>Start making a difference today</p>
                                </div>
                                <form className="register-form" id="registerForm" onSubmit={handleSubmit}>
                                    {error && <p className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
                                    {success && <p className="success-message" style={{ color: 'green', marginBottom: '1rem' }}>{success}</p>}
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="firstName"><i className="fas fa-user" /> First Name</label>
                                            <input type="text" id="firstName" name="firstName" placeholder="Your first name" value={formData.firstName} onChange={handleChange} required />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="lastName"><i className="fas fa-user" /> Last Name</label>
                                            <input type="text" id="lastName" name="lastName" placeholder="Your last name" value={formData.lastName} onChange={handleChange} required />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email"><i className="fas fa-envelope" /> Email Address</label>
                                        <input type="email" id="email" name="email" placeholder="Your email address" value={formData.email} onChange={handleChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="phone"><i className="fas fa-phone" /> Phone Number</label>
                                        <input type="tel" id="phone" name="phone" placeholder="Your phone number" value={formData.phone} onChange={handleChange} required />
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="password"><i className="fas fa-lock" /> Password</label>
                                            <input type="password" id="password" name="password" placeholder="Create a password" value={formData.password} onChange={handleChange} required />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="confirmPassword"><i className="fas fa-lock" /> Confirm Password</label>
                                            <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm your password" value={formData.confirmPassword} onChange={handleChange} required />
                                        </div>
                                    </div>
                                    <button type="submit" className="register-btn">Create Account</button>
                                </form>
                            </div>
                        </div>
                        <div className="register-right">
                            <img src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Volunteers" />
                        </div>
                    </div>
                </section>
                <LRFooter />
            </div>
        </>
    )
}

export default Register;

