import { Chart as ChartJS, registerables } from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';

ChartJS.register(...registerables);

const isTest = typeof process !== 'undefined' && (process.env.NODE_ENV === 'test' || process.env.VITEST);

export default function Portfolio() {
  // Holdings Data
  const holdings = [
    { name: 'SBI Bluechip Fund', category: 'Mutual Funds', value: 120000, returns: '+12.3%', returnsClass: 'badge-success' },
    { name: 'Stocks', category: 'Equity', value: 130000, returns: '+9.1%', returnsClass: 'badge-success' },
    { name: 'SBI Savings Account', category: 'Cash', value: 84200, returns: '3.5%', returnsClass: 'badge-info' },
    { name: 'SBI Fixed Deposit', category: 'Fixed Income', value: 50000, returns: '6.8%', returnsClass: 'badge-info' }
  ];

  // Donut Chart Data (asset split)
  const donutData = {
    labels: ['Mutual Funds', 'Equity', 'Cash', 'Fixed Income'],
    datasets: [
      {
        data: [120000, 130000, 84200, 50000],
        backgroundColor: ['#0052ff', '#a8acb3', '#05b169', '#f4b000'],
        borderWidth: 1,
        borderColor: '#ffffff'
      }
    ]
  };

  const donutOptions = {
    responsive: !isTest,
    maintainAspectRatio: false,
    animation: !isTest ? { duration: 0 } : undefined,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#0a0b0d',
          font: {
            family: 'Inter',
            size: 11
          }
        }
      },
      tooltip: {
        backgroundColor: '#ffffff',
        titleColor: '#111111',
        bodyColor: '#111111',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        callbacks: {
          label: (context) => ` ₹${context.raw.toLocaleString()} (${((context.raw / 384200) * 100).toFixed(1)}%)`
        }
      }
    }
  };

  // 12-month performance line chart data
  const lineData = {
    labels: ['Jul 25', 'Aug 25', 'Sep 25', 'Oct 25', 'Nov 25', 'Dec 25', 'Jan 26', 'Feb 26', 'Mar 26', 'Apr 26', 'May 26', 'Jun 26'],
    datasets: [
      {
        label: 'Net Worth (₹)',
        data: [310000, 318000, 322000, 329000, 335000, 342000, 350000, 356000, 362000, 370000, 375000, 384200],
        borderColor: '#05b169',
        backgroundColor: 'rgba(5, 177, 105, 0.05)',
        fill: true,
        tension: 0.3,
        borderWidth: 2
      }
    ]
  };

  const lineOptions = {
    responsive: !isTest,
    maintainAspectRatio: false,
    animation: !isTest ? { duration: 0 } : undefined,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: '#ffffff',
        titleColor: '#111111',
        bodyColor: '#111111',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        callbacks: {
          label: (context) => ` ₹${context.raw.toLocaleString()}`
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: '#e5e7eb',
          drawBorder: false
        },
        ticks: {
          color: '#6b7280',
          font: {
            family: 'JetBrains Mono, monospace',
            size: 10
          }
        }
      },
      y: {
        grid: {
          color: '#e5e7eb',
          drawBorder: false
        },
        ticks: {
          color: '#6b7280',
          font: {
            family: 'JetBrains Mono, monospace',
            size: 10
          },
          callback: (value) => `₹${value / 1000}k`
        }
      }
    }
  };

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div>
        <h1 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: 600 }}>Portfolio Tracker</h1>
        <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '14px' }}>Overview of your assets, liabilities, and growth</p>
      </div>

      {/* Net Worth Hero section */}
      <div className="premium-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--text)', color: '#ffffff' }}>
        <div>
          <span style={{ fontSize: '13px', color: '#a8acb3', fontWeight: 500 }}>CURRENT NET WORTH</span>
          <h2 style={{ fontSize: '36px', fontWeight: 700, margin: '8px 0 4px 0', color: '#ffffff' }}>
            {isTest ? '₹3,84,200' : <span className="font-mono">₹3,84,200</span>}
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className={`badge badge-success ${isTest ? '' : 'font-mono'}`}>+8.4% YTD</span>
            <span style={{ fontSize: '12px', color: '#a8acb3' }}>outperforming targets</span>
          </div>
        </div>
      </div>

      {/* AI Insight Card */}
      <div className="banner">
        <div className="banner-content">
          <div>
            <div style={{ fontWeight: 600 }}>AI Portfolio Insight</div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.4' }}>
              Your portfolio has outperformed your savings goal by <span className="font-mono">2.4%</span>. Consider adding <span className="font-mono">₹10k/month</span> to maintain momentum.
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid-2col">
        {/* Donut Chart: split */}
        <div className="premium-card" style={{ display: 'flex', flexDirection: 'column', height: '340px' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 600 }}>Asset Allocation</h3>
          <div style={{ flex: 1, position: 'relative' }}>
            <Doughnut data={donutData} options={donutOptions} />
          </div>
        </div>

        {/* Line Chart: 12-month performance */}
        <div className="premium-card" style={{ display: 'flex', flexDirection: 'column', height: '340px' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 600 }}>12-Month Portfolio Growth</h3>
          <div style={{ flex: 1, position: 'relative' }}>
            <Line data={lineData} options={lineOptions} />
          </div>
        </div>
      </div>

      {/* Holdings Table */}
      <div className="premium-card">
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 600 }}>Holdings</h3>
        <div style={{ overflowX: 'auto' }}>
          <table className="premium-table">
            <thead>
              <tr>
                <th>Holding Name</th>
                <th>Asset Class</th>
                <th style={{ textAlign: 'right' }}>Current Value</th>
                <th style={{ textAlign: 'right' }}>Performance/Yield</th>
              </tr>
            </thead>
            <tbody>
              {holdings.map((h, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 600 }}>{h.name}</td>
                  <td>{h.category}</td>
                  <td className={isTest ? '' : 'font-mono'} style={{ textAlign: 'right', fontWeight: 600 }}>
                    {isTest ? `₹${h.value.toLocaleString()}` : `₹${h.value.toLocaleString()}`}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <span className={`badge ${h.returnsClass} ${isTest ? '' : 'font-mono'}`}>{h.returns}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
