import { useState } from 'react';

export default function Notifications() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [items, setItems] = useState([
    {
      id: 1,
      text: 'Your FD of ₹50,000 matures in 7 days. Renew or withdraw?',
      category: 'Alerts',
      read: false,
      date: 'Just now'
    },
    {
      id: 2,
      text: '₹12,000 sitting idle in savings for 30+ days. Move to liquid fund?',
      category: 'Nudges',
      read: false,
      date: '2 hours ago'
    },
    {
      id: 3,
      text: 'Account security tip: Enable 2FA for YONO app',
      category: 'Alerts',
      read: true,
      date: '1 day ago'
    },
    {
      id: 4,
      text: 'You qualify for SBI SimplyCLICK credit card. 5% cashback on Amazon',
      category: 'Offers',
      read: false,
      date: '2 days ago'
    },
    {
      id: 5,
      text: 'Monthly spending report ready. You saved 18% more than last month!',
      category: 'Nudges',
      read: true,
      date: '3 days ago'
    }
  ]);

  const toggleReadStatus = (id) => {
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, read: !item.read } : item
    ));
  };

  const markAllAsRead = () => {
    setItems(prev => prev.map(item => ({ ...item, read: true })));
  };

  const filteredItems = items.filter(item => {
    if (activeFilter === 'All') return true;
    return item.category === activeFilter;
  });

  const getBadgeClass = (category) => {
    switch (category) {
      case 'Alerts': return 'badge-danger';
      case 'Nudges': return 'badge-warning';
      case 'Offers': return 'badge-success';
      default: return 'badge-info';
    }
  };

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: 600 }}>Notification Feed</h1>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '14px' }}>Alerts, nudges, and promotional offers</p>
        </div>
        <button className="btn btn-sm btn-secondary" onClick={markAllAsRead}>
          Mark all as read
        </button>
      </div>

      {/* Tabs */}
      <div className="tabs-container">
        {['All', 'Nudges', 'Alerts', 'Offers'].map((filter) => (
          <button
            key={filter}
            className={`tab-btn ${activeFilter === filter ? 'active' : ''}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredItems.length === 0 ? (
          <div className="premium-card" style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
            No notifications in this category.
          </div>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.id}
              className="premium-card"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                cursor: 'pointer',
                borderLeft: item.read ? '1px solid var(--border)' : '4px solid var(--accent)',
                opacity: item.read ? 0.75 : 1
              }}
              onClick={() => toggleReadStatus(item.id)}
            >
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span className={`badge ${getBadgeClass(item.category)}`}>{item.category}</span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{item.date}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '13px', fontWeight: item.read ? 400 : 500, color: 'var(--text)' }}>
                    {item.text}
                  </p>
                </div>
              </div>

              {/* Read/Unread Dot */}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: item.read ? 'transparent' : 'var(--accent)',
                  border: item.read ? '1px solid var(--text-muted)' : 'none'
                }}></div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
