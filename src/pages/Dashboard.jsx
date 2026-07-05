import { useState } from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(...registerables);

const isTest = typeof process !== 'undefined' && (process.env.NODE_ENV === 'test' || process.env.VITEST);

export default function Dashboard({ onQuickAction }) {
  const [showBanner, setShowBanner] = useState(true);

  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const handleMoveToRD = () => {
    if (onQuickAction) {
      onQuickAction('Move to RD');
    }
    setShowBanner(false);
  };

  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Spending (₹)',
        data: [1200, 900, 2300, 1500, 800, 3200, 1900],
        backgroundColor: '#0052ff',
        hoverBackgroundColor: '#003ecc',
        borderRadius: 4,
      }
    ]
  };

  const chartOptions = {
    responsive: !isTest,
    maintainAspectRatio: false,
    animation: !isTest ? { duration: 0 } : undefined,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#ffffff',
        titleColor: '#111111',
        bodyColor: '#111111',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        callbacks: {
          label: (context) => `₹${context.raw}`
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: '#e5e7eb',
          drawBorder: false,
        },
        ticks: {
          color: '#6b7280',
          font: {
            family: 'JetBrains Mono, monospace',
            size: 11
          }
        }
      },
      y: {
        grid: {
          color: '#e5e7eb',
          drawBorder: false,
        },
        ticks: {
          color: '#6b7280',
          font: {
            family: 'JetBrains Mono, monospace',
            size: 11
          },
          callback: (value) => `₹${value}`
        }
      }
    }
  };

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Test-required headers */}
      <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>
        <h1 style={{ margin: '0 0 4px 0', fontSize: '24px', fontWeight: 600 }}>Dashboard</h1>
        <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '14px' }}>Welcome to SBI FinCoach Dashboard</p>
      </div>

      {/* Bento Grid */}
      <div className="bento-grid">
        
        {/* Welcome Greetings Card */}
        <div className="premium-card bento-col-2 bento-item" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '24px' }}>
          <div>
            <h2 style={{ margin: '0 0 4px 0', fontSize: '20px', fontWeight: 500 }}>Good morning, Arjun</h2>
            <p style={{ margin: '0 0 16px 0', color: 'var(--text-muted)', fontSize: '13px' }}>{formattedDate}</p>
          </div>
          <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
            AI Assistant: Your Emergency Fund is fully funded and savings have grown by 8.4% YTD. Start a SIP to keep your progress on track.
          </p>
        </div>

        {/* Net Worth Card */}
        <div className="premium-card bento-item">
          <div className="stat-label">Net Worth</div>
          <div>
            <div className="stat-value font-mono" style={{ margin: '0 0 8px 0' }}>₹12.4L</div>
            <span className="badge badge-success font-mono">+8.4% YTD</span>
          </div>
        </div>

        {/* Monthly Savings Card */}
        <div className="premium-card bento-item">
          <div className="stat-label">Monthly Savings</div>
          <div>
            <div className="stat-value font-mono" style={{ margin: '0 0 8px 0' }}>₹18,200</div>
            <span className="badge badge-success font-mono">+5.2% MoM</span>
          </div>
        </div>

        {/* Spending Chart Card */}
        <div className="premium-card bento-col-2 bento-row-2" style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: '276px' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: 600 }}>Last 7 Days Spending</h3>
          <div style={{ flex: 1, position: 'relative' }}>
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Credit Score Card */}
        <div className="premium-card bento-item">
          <div className="stat-label">Credit Score</div>
          <div>
            <div className="stat-value font-mono" style={{ margin: '0 0 8px 0' }}>762</div>
            <span className="badge badge-success">Excellent</span>
          </div>
        </div>

        {/* Active Products Card */}
        <div className="premium-card bento-item">
          <div className="stat-label">Active Products</div>
          <div>
            <div className="stat-value font-mono" style={{ margin: '0 0 8px 0' }}>4</div>
            <span className="badge badge-warning">Stable</span>
          </div>
        </div>

        {/* Life Event Card / Alert */}
        <div className="premium-card bento-col-2 bento-item" style={{ padding: '20px', minHeight: '130px', justifyContent: 'center' }}>
          {showBanner ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '100%', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text)' }}>Salary credited — <span className="font-mono">₹85,000</span></div>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>Want to move <span className="font-mono">₹20k</span> to a recurring deposit?</div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="btn btn-sm btn-primary" onClick={handleMoveToRD}>Move to RD</button>
                <button className="btn btn-sm btn-secondary" onClick={() => setShowBanner(false)}>Dismiss</button>
              </div>
            </div>
          ) : (
            <div style={{ color: 'var(--text-muted)', fontSize: '13px', textAlign: 'center', padding: '24px 0' }}>
              All alerts reviewed. FinCoach is active in the background.
            </div>
          )}
        </div>

        {/* Quick Actions Card */}
        <div className="premium-card bento-col-4" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 600 }}>Quick Actions</h3>
              <p style={{ margin: '4px 0 0 0', color: 'var(--text-muted)', fontSize: '12px' }}>Automate, invest, or apply with a single click.</p>
            </div>
            <div style={{ display: 'flex', gap: '12px', flex: 1, justifyContent: 'flex-end', minWidth: '280px' }}>
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => onQuickAction && onQuickAction('Start SIP')}>
                Start SIP
              </button>
              <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => onQuickAction && onQuickAction('Open FD')}>
                Open FD
              </button>
              <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => onQuickAction && onQuickAction('Apply for Loan')}>
                Apply for Loan
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
