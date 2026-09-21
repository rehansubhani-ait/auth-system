import { useState, useEffect } from 'react';
import './App.css';
import SocialButtons from './components/SocialButtons';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import ForgotPasswordModal from './components/ForgotPasswordModal';
import UserDashboardPreview from './components/UserDashboardPreview';
import Toast from './components/Toast';

function App() {
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'signup'
  const [currentUser, setCurrentUser] = useState(null);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('sphere_theme') || 'dark';
  });

  // Handle theme changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('sphere_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const showToast = (title, message, type = 'success') => {
    setToast({ title, message, type });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
    showToast('Signed In Successfully', `Welcome back, ${userData.name || 'user'}!`, 'success');
  };

  const handleSignupSuccess = (userData) => {
    setCurrentUser(userData);
    showToast('Account Created!', `Welcome to Sphere, ${userData.name}! Your workspace is ready.`, 'success');
  };

  const handleSocialAuth = (provider) => {
    showToast(
      'Connecting Social Account',
      `Connecting to ${provider}... Authenticating credentials securely.`,
      'info'
    );
    setTimeout(() => {
      setCurrentUser({
        name: `${provider} Explorer`,
        email: `explorer@${provider.toLowerCase()}.user`,
        authProvider: provider,
        isNewUser: false,
      });
      showToast('Authenticated', `Successfully connected via ${provider}!`, 'success');
    }, 800);
  };

  const handleResetPassword = (email) => {
    showToast('Reset Link Dispatched', `Password reset instructions sent to ${email}`, 'info');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    showToast('Signed Out', 'You have been logged out safely.', 'info');
  };

  return (
    <div className="app-container">
      {/* Dynamic Ambient Background Elements */}
      <div className="ambient-background">
        <div className="glow-orb orb-primary"></div>
        <div className="glow-orb orb-secondary"></div>
        <div className="glow-orb orb-tertiary"></div>
        <div className="grid-overlay"></div>
      </div>

      {/* Top Navigation Bar */}
      <header className="app-header">
        <div className="brand-logo">
          <div className="logo-symbol">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 3a9 9 0 0 1 9 9" />
              <circle cx="12" cy="12" r="3" fill="currentColor" />
            </svg>
          </div>
          <span className="logo-text">Sphere<span className="logo-accent">Auth</span></span>
        </div>

        <div className="header-actions">
          <button 
            type="button" 
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
            <span className="theme-toggle-label">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>
      </header>

      {/* Main Authentication Arena */}
      <main className="main-content">
        <div className="auth-card-container">
          
          {/* LEFT PANEL: Showcase & Branding */}
          <div className="showcase-panel">
            <div className="showcase-content">
              <div className="showcase-badge">
                <span className="badge-sparkle">✦</span>
                <span>Next-Gen Security v2.4</span>
              </div>

              <h1 className="showcase-title">
                One platform to build, ship, & scale.
              </h1>
              <p className="showcase-description">
                Experience high-performance workspace collaboration with zero-friction authentication, granular privacy, and military-grade encryption.
              </p>

              {/* Interactive Vector Art Graphic */}
              <div className="interactive-art-wrapper">
                <div className="art-ring ring-outer"></div>
                <div className="art-ring ring-middle"></div>
                <div className="art-ring ring-inner"></div>
                
                <div className="art-center-orb">
                  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                    <polyline points="2 17 12 22 22 17"></polyline>
                    <polyline points="2 12 12 17 22 12"></polyline>
                  </svg>
                </div>

                {/* Floating Stat Pills */}
                <div className="floating-stat-pill pill-top">
                  <span className="pill-dot"></span>
                  <span>99.99% Uptime</span>
                </div>
                <div className="floating-stat-pill pill-bottom">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>256-Bit SSL Guard</span>
                </div>
              </div>

              {/* Social Proof Footer */}
              <div className="showcase-social-proof">
                <div className="avatar-stack">
                  <div className="avatar av-1">AK</div>
                  <div className="avatar av-2">MJ</div>
                  <div className="avatar av-3">TL</div>
                  <div className="avatar av-4">+4k</div>
                </div>
                <div className="proof-text">
                  <div className="stars-row">
                    {'★★★★★'.split('').map((star, idx) => (
                      <span key={idx} className="star-icon">{star}</span>
                    ))}
                  </div>
                  <span className="proof-label">Trusted by 15,000+ teams globally</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: Auth Card / Dashboard Preview */}
          <div className="auth-form-panel">
            {currentUser ? (
              <UserDashboardPreview user={currentUser} onLogout={handleLogout} />
            ) : (
              <div className="form-card-inner">
                {/* Switcher Tabs */}
                <div className="tabs-header" role="tablist">
                  <button
                    type="button"
                    role="tab"
                    id="tab-login"
                    aria-selected={activeTab === 'login'}
                    className={`tab-btn ${activeTab === 'login' ? 'tab-active' : ''}`}
                    onClick={() => setActiveTab('login')}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    role="tab"
                    id="tab-signup"
                    aria-selected={activeTab === 'signup'}
                    className={`tab-btn ${activeTab === 'signup' ? 'tab-active' : ''}`}
                    onClick={() => setActiveTab('signup')}
                  >
                    Create Account
                  </button>
                  <div 
                    className="tab-indicator" 
                    style={{
                      transform: activeTab === 'login' ? 'translateX(0%)' : 'translateX(100%)'
                    }}
                  />
                </div>

                {/* Form Header */}
                <div className="auth-header-copy">
                  <h2 className="auth-form-title">
                    {activeTab === 'login' ? 'Welcome Back' : 'Get Started Free'}
                  </h2>
                  <p className="auth-form-subtitle">
                    {activeTab === 'login'
                      ? 'Enter your credentials to access your workspace'
                      : 'Join thousands of creators building the next generation of apps'}
                  </p>
                </div>

                {/* Social Buttons */}
                <SocialButtons onSocialClick={handleSocialAuth} />

                {/* Divider */}
                <div className="auth-divider">
                  <span className="divider-line"></span>
                  <span className="divider-text">or continue with email</span>
                  <span className="divider-line"></span>
                </div>

                {/* Active Form */}
                {activeTab === 'login' ? (
                  <LoginForm
                    onLoginSuccess={handleLoginSuccess}
                    onSwitchToSignup={() => setActiveTab('signup')}
                    onForgotPassword={() => setIsForgotModalOpen(true)}
                  />
                ) : (
                  <SignupForm
                    onSignupSuccess={handleSignupSuccess}
                    onSwitchToLogin={() => setActiveTab('login')}
                  />
                )}
              </div>
            )}
          </div>

        </div>
      </main>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={isForgotModalOpen}
        onClose={() => setIsForgotModalOpen(false)}
        onSubmitReset={handleResetPassword}
      />

      {/* Dynamic Toast Alerts */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}

export default App;
