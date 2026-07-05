export default function Sidebar({ activePage, setActivePage }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'spending', label: 'Spending Analytics' },
    { id: 'recommendations', label: 'Product Recommendations' },
    { id: 'life-events', label: 'Life Events' },
    { id: 'notifications', label: 'Notification Feed' },
    { id: 'portfolio', label: 'Portfolio Tracker' },
    { id: 'profile', label: 'Profile / KYC' },
  ];

  return (
    <aside className="sidebar">
      {/* Branding Logo */}
      <div className="sidebar-logo-container">
        <div className="sidebar-logo-icon">S</div>
        <span className="sidebar-logo-text">SBI FinCoach</span>
      </div>

      {/* Navigation Items */}
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
