import { useState } from 'react';

export default function Recommendations() {
  const [actionsTriggered, setActionsTriggered] = useState({});

  const handleAction = (productName, message) => {
    setActionsTriggered(prev => ({
      ...prev,
      [productName]: true
    }));
    alert(message);
  };

  const recommendations = [
    {
      id: 'fd',
      title: 'SBI Fixed Deposit',
      description: 'Park ₹20k for 1 year at 6.8% p.a. → ₹21,360',
      match: '97% match',
      cta: 'Open FD',
      alertMsg: 'Redirecting to open Fixed Deposit details... (Verification of CTA click successful)',
      icon: '🏦',
      badgeClass: 'badge-success'
    },
    {
      id: 'sip',
      title: 'SBI Mutual Fund SIP',
      description: '₹5,000/month in Bluechip Fund — builds ₹73k in 1 year',
      match: '94% match',
      cta: 'Start SIP',
      alertMsg: 'Redirecting to set up your Mutual Fund SIP... (Verification of CTA click successful)',
      icon: '📈',
      badgeClass: 'badge-success'
    },
    {
      id: 'insurance',
      title: 'SBI Term Insurance',
      description: 'Cover of ₹50L at ₹520/month — best age to start is now',
      match: '89% match',
      cta: 'Get Quote',
      alertMsg: 'Fetching customized insurance quotes... (Verification of CTA click successful)',
      icon: '🛡️',
      badgeClass: 'badge-info'
    }
  ];

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div>
        <h1 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: 600 }}>Product Recommendations</h1>
        <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '14px' }}>Personalized banking and investment opportunities</p>
      </div>

      <h2 style={{ margin: '8px 0 0 0', fontSize: '18px', fontWeight: 600 }}>Recommended for Arjun</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        {recommendations.map((rec) => (
          <div key={rec.id} className="premium-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '220px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '28px' }}>{rec.icon}</span>
                <span className={`badge ${rec.badgeClass}`}>{rec.match}</span>
              </div>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 600 }}>{rec.title}</h3>
              <p style={{ margin: '0 0 20px 0', color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.5' }}>
                {rec.description}
              </p>
            </div>
            <button
              className="btn btn-primary"
              style={{ width: '100%' }}
              onClick={() => handleAction(rec.title, rec.alertMsg)}
            >
              {actionsTriggered[rec.title] ? 'Applied ✓' : rec.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
