import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ResetPassword.css'; // Import the new dedicated stylesheet

function ResetPassword() {
    const { token } = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [feedback, setFeedback] = useState({ message: '', type: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFeedback({ message: '', type: '' });
        if (password !== confirmPassword) {
            setFeedback({ message: 'Passwords do not match.', type: 'error' });
            return;
        }
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/user/reset-password/${token}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.msg || 'Failed to reset password.');
            }
            setFeedback({ message: 'Password has been reset successfully! You can now log in.', type: 'success' });
        } catch (error) {
            setFeedback({ message: error.message, type: 'error' });
        }
    };

    return (
        <div className="reset-page-wrapper">
            <div className="reset-page-container">
                <div className="reset-page-header">
                    <h1>Reset Your Password</h1>
                    <p>Enter and confirm your new password below.</p>
                </div>

                {feedback.message && (
                    <div className={`form-feedback ${feedback.type}`}>
                        {feedback.message}
                    </div>
                )}
                
                {feedback.type !== 'success' ? (
                    <form onSubmit={handleSubmit} className="reset-page-form">
                        <div className="form-group">
                            <label htmlFor="password"><i className="fas fa-lock" /> New Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword"><i className="fas fa-lock" /> Confirm New Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="reset-page-btn">Reset Password</button>
                    </form>
                ) : (
                    <div className="reset-page-footer">
                        {/* --- THE FIX IS HERE --- */}
                        <Link 
                            to="/login" 
                            className="reset-page-btn" 
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            Go to Login
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ResetPassword;