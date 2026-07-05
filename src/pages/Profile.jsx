export default function Profile({ toggles = { aiNudges: true, spendingAlerts: true, productRecs: false }, onToggle = () => {} }) {

  const goals = [
    { name: 'Emergency Fund', target: '₹3L', progress: 100, color: 'var(--success)' },
    { name: 'Retirement Corpus', target: '₹1.2Cr', progress: 34, color: 'var(--accent)' },
    { name: 'Child Education', target: '₹50L', progress: 8, color: 'var(--warning)' }
  ];

  const linkedAccounts = [
    { name: 'SBI Savings Account', accNo: 'XXXX4521', status: 'Primary' },
    { name: 'SBI FD Account', accNo: 'XXXX8834', status: 'Active' }
  ];

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div>
        <h1 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: 600 }}>Profile / KYC</h1>
        <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '14px' }}>Manage your personal details and compliance settings</p>
      </div>

      {/* Main Content Grid */}
      <div className="grid-2col">
        
        {/* Left Column: User Card & Linked Accounts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* User Card */}
          <div className="premium-card" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '20px',
              color: '#ffffff'
            }}>
              AS
            </div>
            <div>
              <h2 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: 600 }}>Arjun Sharma</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span className="badge badge-success">CIBIL 762 (Excellent)</span>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Customer since 2019</span>
              </div>
            </div>
          </div>

          {/* KYC Status Section */}
          <div className="premium-card">
            <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 600 }}>KYC Status</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                <span>Aadhaar Verification</span>
                <span style={{ color: 'var(--success)', fontWeight: 600 }}>✓ Verified</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                <span>PAN Verification</span>
                <span style={{ color: 'var(--success)', fontWeight: 600 }}>✓ Verified</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                <span>Video KYC</span>
                <span style={{ color: 'var(--success)', fontWeight: 600 }}>✓ Verified</span>
              </div>
            </div>
          </div>

          {/* Linked Accounts */}
          <div className="premium-card">
            <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 600 }}>Linked SBI Accounts</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {linkedAccounts.map((acc, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', paddingBottom: idx < linkedAccounts.length - 1 ? '12px' : 0, borderBottom: idx < linkedAccounts.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <div>
                    <div style={{ fontWeight: 600 }}>{acc.name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Acc No: {acc.accNo}</div>
                  </div>
                  <span className="badge badge-info">{acc.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Financial Goals & Preferences */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Financial Goals Progress */}
          <div className="premium-card">
            <h3 style={{ margin: '0 0 20px 0', fontSize: '16px', fontWeight: 600 }}>Financial Goals</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {goals.map((g, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span style={{ fontWeight: 500 }}>{g.name} (Target: {g.target})</span>
                    <span style={{ fontWeight: 600 }}>{g.progress}%</span>
                  </div>
                  <div className="progress-bar-bg">
                    <div className="progress-bar-fill" style={{ width: `${g.progress}%`, backgroundColor: g.color }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Preferences Settings (Toggles) */}
          <div className="premium-card">
            <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 600 }}>Preferences</h3>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              
              <label className="form-toggle-label">
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600 }}>AI Nudges</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Get automated financial alerts and advice</div>
                </div>
                <div className="switch">
                  <input
                    type="checkbox"
                    checked={toggles.aiNudges}
                    onChange={() => onToggle('aiNudges')}
                  />
                  <span className="slider"></span>
                </div>
              </label>

              <label className="form-toggle-label">
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600 }}>Spending Alerts</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Alert when budget exceeds configured thresholds</div>
                </div>
                <div className="switch">
                  <input
                    type="checkbox"
                    checked={toggles.spendingAlerts}
                    onChange={() => onToggle('spendingAlerts')}
                  />
                  <span className="slider"></span>
                </div>
              </label>

              <label className="form-toggle-label">
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600 }}>Product Recommendations</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Suggest SBI deposits, SIPs, and credit cards</div>
                </div>
                <div className="switch">
                  <input
                    type="checkbox"
                    checked={toggles.productRecs}
                    onChange={() => onToggle('productRecs')}
                  />
                  <span className="slider"></span>
                </div>
              </label>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
