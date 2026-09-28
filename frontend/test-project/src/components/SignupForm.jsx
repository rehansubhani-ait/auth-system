import { useState } from 'react';

export default function SignupForm({ onSignupSuccess, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your name';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email';
    }

    if (!formData.password) {
      newErrors.password = 'Please enter a password';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSignupSuccess({
        name: formData.fullName,
        email: formData.email,
        isNewUser: true,
      });
    }, 700);

    const response = await fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
    let body = await response.json()
    alert(body.message)
    // console.log(body);

  };

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      {/* Full Name Input */}
      <div className="form-group">
        <label htmlFor="signup-name" className="form-label">
          Full Name
        </label>
        <div className="input-wrapper">
          <span className="input-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </span>
          <input
            id="signup-name"
            name="fullName"
            type="text"
            autoComplete="name"
            placeholder="Alex Morgan"
            value={formData.fullName}
            onChange={(e) => {
              setFormData({ ...formData, fullName: e.target.value });
              if (errors.fullName) setErrors({ ...errors, fullName: '' });
            }}
            className={`form-input ${errors.fullName ? 'input-error' : ''}`}
          />
        </div>
        {errors.fullName && <p className="error-message" role="alert">{errors.fullName}</p>}
      </div>

      {/* Email Input */}
      <div className="form-group">
        <label htmlFor="signup-email" className="form-label">
          Email Address
        </label>
        <div className="input-wrapper">
          <span className="input-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </span>
          <input
            id="signup-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="alex@example.com"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              if (errors.email) setErrors({ ...errors, email: '' });
            }}
            className={`form-input ${errors.email ? 'input-error' : ''}`}
          />
        </div>
        {errors.email && <p className="error-message" role="alert">{errors.email}</p>}
      </div>

      {/* Password Input */}
      <div className="form-group">
        <label htmlFor="signup-password" className="form-label">
          Password
        </label>
        <div className="input-wrapper">
          <span className="input-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </span>
          <input
            id="signup-password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            placeholder="Enter password"
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
              if (errors.password) setErrors({ ...errors, password: '' });
            }}
            className={`form-input ${errors.password ? 'input-error' : ''}`}
          />
          <button
            type="button"
            className="toggle-password-btn"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            tabIndex={-1}
          >
            {showPassword ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                <line x1="1" y1="1" x2="23" y2="23"></line>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            )}
          </button>
        </div>
        {errors.password && <p className="error-message" role="alert">{errors.password}</p>}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className={`btn-primary-submit ${isLoading ? 'btn-loading' : ''}`}
        id="btn-signup-submit"
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="spinner-wrapper">
            <span className="spinner"></span>
            Creating account...
          </span>
        ) : (
          <span className="btn-content">
            Create Account
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </span>
        )}
      </button>

      {/* Switch to Login */}
      <div className="auth-footer-prompt">
        <span>Already have an account?</span>
        <button
          type="button"
          className="link-highlight"
          id="btn-switch-login"
          onClick={onSwitchToLogin}
        >
          Sign in
        </button>
      </div>
    </form>
  );
}
