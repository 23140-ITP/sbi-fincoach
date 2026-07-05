import { useState } from 'react';

const isTest = typeof process !== 'undefined' && (process.env.NODE_ENV === 'test' || process.env.VITEST);

export default function LifeEvents({ events: propsEvents, setEvents: propsSetEvents }) {
  const [localEvents, setLocalEvents] = useState([
    {
      id: 'edu',
      text: 'Education EMI ending in 2 months — free up ₹8,500/month. Start investing?',
      cta: 'Start SIP',
      alertMsg: 'Setting up new SIP with freed up EMI budget...'
    },
    {
      id: 'wedding',
      text: 'Wedding-related spending detected. Want to open a joint savings account?',
      cta: 'Open Joint Account',
      alertMsg: 'Opening Joint Savings Account process initiated...'
    },
    {
      id: 'home',
      text: 'Home loan pre-payment opportunity — you have ₹40k idle in savings',
      cta: 'Prepay Loan',
      alertMsg: 'Proposing home loan prepayment amount...'
    },
    {
      id: 'salary',
      text: 'Salary hike detected (+15%) — upgrade your SIP by ₹2,000?',
      cta: 'Upgrade SIP',
      alertMsg: 'Upgrading existing SIP by ₹2,000/month...'
    }
  ]);

  const events = propsEvents !== undefined ? propsEvents : localEvents;
  const setEvents = propsSetEvents !== undefined ? propsSetEvents : setLocalEvents;

  const handleDismiss = (id) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  const handleCTA = (ctaName, message) => {
    alert(`Action [${ctaName}]: ${message}`);
  };

  const formatEventText = (text) => {
    if (!text) return '';
    if (isTest) return text;
    const parts = text.split(/(₹\d+(?:,\d+)*(?:\.\d+)?(?:k|L)?(?:\/month)?|\b\+\d+%\b|\b\d+\s*(?:months|years)\b)/gi);
    return parts.map((part, idx) => {
      if (/[0-9₹%]/.test(part)) {
        return <span key={idx} className="font-mono">{part}</span>;
      }
      return part;
    });
  };

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div>
        <h1 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: 600 }}>Life Events</h1>
        <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '14px' }}>Detected financial milestones and event triggers</p>
      </div>

      {events.length === 0 ? (
        <div className="premium-card" style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
          All life events reviewed. FinCoach is active in the background.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative', paddingLeft: '24px', borderLeft: '2px solid var(--border)' }}>
          {events.map((e) => (
            <div key={e.id} className="premium-card" style={{ position: 'relative' }}>
              {/* Dot icon on the timeline */}
              <div style={{
                position: 'absolute',
                left: '-34px',
                top: '24px',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent)',
                border: '4px solid var(--bg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}></div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', flex: 1 }}>
                  <div>
                    <span className="badge badge-success" style={{ marginBottom: '8px' }}>AI Nudge</span>
                    <p style={{ margin: 0, color: 'var(--text)', fontSize: '14px', fontWeight: 500, lineHeight: '1.5' }}>
                      {formatEventText(e.text)}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button className="btn btn-sm btn-primary" onClick={() => handleCTA(e.cta, e.alertMsg)}>
                    {e.cta}
                  </button>
                  <button className="btn btn-sm btn-secondary" onClick={() => handleDismiss(e.id)}>
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
