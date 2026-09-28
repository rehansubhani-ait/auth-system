import { useState } from 'react';

export default function LoginForm({ onLoginSuccess, onSwitchToSignup, onForgotPassword }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    // rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email';
    }

    if (!formData.password) {
      newErrors.password = 'Please enter your password';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    // Simulate network latency for authentic feel
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        email: formData.email,
        name: formData.email.split('@')[0],
        // rememberMe: formData.rememberMe,
      });
    }, 900);

    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
    console.log(response);
    if (response.ok) {
      onLoginSuccess()
    } else {
      alert('Login failed')
    }
  };

  const handleFillDemo = () => {
    setFormData({
      email: 'alex.morgan@sphere.io',
      password: 'SuperSecret123!',
      // rememberMe: true,
    });
    setErrors({});
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      {/* Demo Credentials Quick-Fill Banner */}
      <div className="demo-hint-box">
        <span className="demo-badge">Quick Demo</span>
        <span className="demo-text">Test quickly with demo credentials:</span>
        <button 
          type="button" 
          className="demo-fill-btn" 
          onClick={handleFillDemo}
          title="Auto-fill with sample credentials"
        >
          Auto Fill
        </button>
      </div>

      {/* Email Input */}
      <div className="form-group">
        <label htmlFor="login-email" className="form-label">
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
            id="login-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
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
        <div className="label-with-action">
          <label htmlFor="login-password" className="form-label">
            Password
          </label>
          <button
            type="button"
            className="text-link-subtle"
            onClick={onForgotPassword}
            tabIndex={0}
          >
            Forgot password?
          </button>
        </div>
        <div className="input-wrapper">
          <span className="input-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </span>
          <input
            id="login-password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="••••••••••••"
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

      {/* Remember Me Checkbox */}
      {/*   <div className="form-row-checkbox">
        <label className="custom-checkbox-container">
          <input
            type="checkbox"
            id="login-remember"
            checked={formData.rememberMe}
            onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
          />
          <span className="checkbox-custom">
            <svg width="12" height="10" viewBox="0 0 12 10" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="1.5 5 4.5 8 10.5 1.5"></polyline>
            </svg>
          </span>
          <span className="checkbox-label-text">Remember me for 30 days</span>
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className={`btn-primary-submit ${isLoading ? 'btn-loading' : ''}`}
        id="btn-login-submit"
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="spinner-wrapper">
            <span className="spinner"></span>
            Signing in...
          </span>
        ) : (
          <span className="btn-content">
            Sign In to Account
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </span>
        )}
      </button>

      {/* Switch to Signup */}
      <div className="auth-footer-prompt">
        <span>Don't have an account?</span>
        <button
          type="button"
          className="link-highlight"
          id="btn-switch-signup"
          onClick={onSwitchToSignup}
        >
          Create account
        </button>
      </div>
    </form>
  );
}
