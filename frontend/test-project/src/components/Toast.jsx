export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  return (
    <div className={`toast-notification toast-${toast.type || 'info'}`} role="alert">
      <div className="toast-icon">
        {toast.type === 'success' && (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        )}
        {toast.type === 'info' && (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        )}
        {toast.type === 'error' && (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
        )}
      </div>
      <div className="toast-content">
        <strong className="toast-title">{toast.title}</strong>
        <p className="toast-message">{toast.message}</p>
      </div>
      <button className="toast-close-btn" onClick={onClose} aria-label="Close notification">
        &times;
      </button>
    </div>
  );
}
