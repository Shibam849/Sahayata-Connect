import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LRNavbar from '../common/LRNavbar';
import LRFooter from '../common/LRFooter';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [feedback, setFeedback] = useState({ message: '', type: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFeedback({ message: '', type: '' });

        if (!email) {
            setFeedback({ message: 'Please enter your email address.', type: 'error' });
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/user/forgot-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            let data = {};
            if (response.headers.get('content-type')?.includes('application/json')) {
                data = await response.json();
            }

            if (!response.ok) {
                throw new Error(data.msg || 'An unknown error occurred.');
            }
            
            setFeedback({
                message: 'If an account with that email exists, a password reset link has been sent.',
                type: 'success'
            });

        } catch (error) {
            setFeedback({ message: error.message, type: 'error' });
        }
    };

    return (
        <div className="auth-page-wrapper">
            <LRNavbar />
            <main className="auth-content-container">
                <div className="auth-container">
                    <div className="auth-header">
                        <h1>Forgot Password</h1>
                        <p>Enter your email to receive a reset link.</p>
                    </div>

                    {feedback.message && (
                        <div className={`form-feedback ${feedback.type}`}>
                            {feedback.message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label htmlFor="email">
                                <i className="fas fa-envelope" /> Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="auth-btn">
                            Send Reset Link
                        </button>
                    </form>

                    <div className="auth-footer">
                        <p>
                            Remember your password? <Link to="/login">Sign In</Link>
                        </p>
                    </div>
                </div>
            </main>
            <LRFooter />
        </div>
    );
}

export default ForgotPassword;
