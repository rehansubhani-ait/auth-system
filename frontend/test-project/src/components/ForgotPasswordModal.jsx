import { useState } from 'react';

export default function ForgotPasswordModal({ isOpen, onClose, onSubmitReset }) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    setError('');
    setIsSubmitted(true);
    onSubmitReset(email);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setEmail('');
    setError('');
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="forgot-password-title"
      >
        <button 
          className="modal-close-btn" 
          onClick={handleClose}
          aria-label="Close dialog"
        >
          &times;
        </button>

        {!isSubmitted ? (
          <>
            <div className="modal-icon-wrapper">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <h2 id="forgot-password-title" className="modal-title">Reset your password</h2>
            <p className="modal-subtitle">
              Enter the email associated with your account and we will send you a link to reset your password.
            </p>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="input-group">
                <label htmlFor="reset-email" className="input-label">Email address</label>
                <div className="input-wrapper">
                  <span className="input-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </span>
                  <input
                    id="reset-email"
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError('');
                    }}
                    className={`form-input ${error ? 'input-error' : ''}`}
                    autoFocus
                  />
                </div>
                {error && <span className="error-message">{error}</span>}
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={handleClose}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" id="btn-submit-reset">
                  Send reset link
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="modal-success-state">
            <div className="modal-icon-wrapper success-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <h2 className="modal-title">Check your inbox</h2>
            <p className="modal-subtitle">
              We've sent a password recovery link to <strong>{email}</strong>. Please check your spam folder if you don't see it within a few minutes.
            </p>
            <button type="button" className="btn-primary full-width" onClick={handleClose}>
              Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
