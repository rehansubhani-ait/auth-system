export default function UserDashboardPreview({ user, onLogout }) {
  return (
    <div className="dashboard-preview-card">
      <div className="dashboard-status-badge">
        <span className="pulse-dot"></span>
        <span>Authenticated Session Active</span>
      </div>

      <div className="avatar-preview-wrapper">
        <div className="avatar-ring">
          <div className="avatar-initials">
            {user.name ? user.name.slice(0, 2).toUpperCase() : 'US'}
          </div>
        </div>
      </div>

      <h2 className="dashboard-title">
        {user.isNewUser ? 'Welcome to Sphere!' : 'Welcome back!'}
      </h2>
      <p className="dashboard-subtitle">{user.name || 'Valued User'}</p>
      
      <div className="session-info-card">
        <div className="info-row">
          <span className="info-label">Account Email</span>
          <span className="info-value">{user.email}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Auth Method</span>
          <span className="info-value info-highlight">
            {user.authProvider ? user.authProvider : 'Direct Password'}
          </span>
        </div>
        <div className="info-row">
          <span className="info-label">Security Tier</span>
          <span className="info-value security-badge">256-Bit Encrypted</span>
        </div>
        <div className="info-row">
          <span className="info-label">Status</span>
          <span className="info-value status-verified">Verified & Active</span>
        </div>
      </div>

      <div className="dashboard-features-grid">
        <div className="feature-mini-pill">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
          Multi-Factor Ready
        </div>
        <div className="feature-mini-pill">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 14 14"></polyline>
          </svg>
          30-Day Session
        </div>
      </div>

      <button
        type="button"
        className="btn-logout"
        id="btn-logout"
        onClick={onLogout}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
          <polyline points="16 17 21 12 16 7"></polyline>
          <line x1="21" y1="12" x2="9" y2="12"></line>
        </svg>
        Sign Out & Return
      </button>
    </div>
  );
}
