import LRFooter from "../common/LRFooter";
import LRNavbar from "../common/LRNavbar";
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';


function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.msg || 'Login failed. Please check your credentials.');
            }

            localStorage.setItem('userToken', data.token);
            localStorage.setItem('userName', data.user.name); 

            setSuccess('Login successful! Redirecting...');
            setTimeout(() => navigate('/profile'), 1500);

        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <>
            <div className="auth-page-wrapper">
                <LRNavbar />
                <section className="login-section">
                    <div className="login-container">
                        <div className="login-left">
                            <div className="login-header">
                                <h1>Welcome Back!</h1>
                                <p>Sign in to continue to Sahayata Connect.</p>
                            </div>
                            {error && <div className="form-feedback error">{error}</div>}
                            {success && <div className="form-feedback success">{success}</div>}
                            <form onSubmit={handleSubmit} className="login-form">
                                <div className="form-group">
                                    <label htmlFor="email"><i className="fas fa-envelope" /> Email Address</label>
                                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password"><i className="fas fa-lock" /> Password</label>
                                    <div className="password-wrapper">
                                        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
                                    </div>
                                </div>
                                <div className="form-options">

                                    {/* --- "Remember me" CHECKBOX REMOVED --- */}
                                    
                                    <Link to="/forgot-password" className="forgot-password">Forgot password?</Link>
                                </div>
                                <button type="submit" className="login-btn">Sign In</button>
                            </form>
                        </div>
                        <div className="login-right">
                            <img src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Community Impact" />
                        </div>
                    </div>
                </section>
                <LRFooter />
            </div>
        </>
    )
}

export default Login;