import { useState } from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';

ChartJS.register(...registerables);

const isTest = typeof process !== 'undefined' && (process.env.NODE_ENV === 'test' || process.env.VITEST);

export default function Spending() {
  const [activeTab, setActiveTab] = useState('This Month');

  // Donut chart data
  const donutData = {
    labels: ['Food', 'Transport', 'Shopping', 'Utilities', 'Entertainment', 'Others'],
    datasets: [
      {
        data: [28, 12, 22, 8, 14, 16],
        backgroundColor: [
          '#ef4444', // Food - Red
          '#3b82f6', // Transport - Blue
          '#f59e0b', // Shopping - Orange
          '#10b981', // Utilities - Green
          '#8b5cf6', // Entertainment - Purple
          '#6b7280'  // Others - Gray
        ],
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
          color: '#111111',
          font: {
            family: 'Inter',
            size: 12
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
          label: (context) => ` ${context.label}: ${context.raw}%`
        }
      }
    }
  };

  // Line chart data: last 6 months trend
  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Monthly Spend (₹)',
        data: [22000, 19500, 24000, 21200, 18800, 20500],
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
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
            family: 'Inter',
            size: 11
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
            family: 'Inter',
            size: 11
          },
          callback: (value) => `₹${value / 1000}k`
        }
      }
    }
  };

  // Merchant table data
  const merchants = [
    { name: 'Swiggy', category: 'Food', amount: 4200, date: 'Jul 4, 2026' },
    { name: 'Amazon', category: 'Shopping', amount: 8500, date: 'Jul 2, 2026' },
    { name: 'Uber', category: 'Transport', amount: 2100, date: 'Jul 1, 2026' },
    { name: 'Netflix', category: 'Entertainment', amount: 799, date: 'Jun 28, 2026' },
    { name: 'BigBasket', category: 'Food/Grocery', amount: 3600, date: 'Jun 25, 2026' }
  ];

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div>
        <h1 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: 600 }}>Spending Analytics</h1>
        <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '14px' }}>Track and analyze your transaction history</p>
      </div>

      {/* Date tabs */}
      <div className="tabs-container">
        {['This Month', 'Last 3M', 'Last 6M'].map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Insight Banner */}
      <div className="banner" style={{ borderLeft: '4px solid var(--warning)' }}>
        <div className="banner-content">
          <div>
            <div style={{ fontWeight: 600, color: 'var(--text)' }}>
              You spent ₹4,200 more on food this month.
            </div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              FinCoach suggests reviewing your dining budget.
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid-2col">
        {/* Donut Chart */}
        <div className="premium-card" style={{ display: 'flex', flexDirection: 'column', height: '340px' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 600 }}>Spending by Category</h3>
          <div style={{ flex: 1, position: 'relative' }}>
            <Doughnut data={donutData} options={donutOptions} />
          </div>
        </div>

        {/* Line Chart */}
        <div className="premium-card" style={{ display: 'flex', flexDirection: 'column', height: '340px' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 600 }}>6-Month Spend Trend</h3>
          <div style={{ flex: 1, position: 'relative' }}>
            <Line data={lineData} options={lineOptions} />
          </div>
        </div>
      </div>

      {/* Merchant Table */}
      <div className="premium-card">
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 600 }}>Top Merchants</h3>
        <div style={{ overflowX: 'auto' }}>
          <table className="premium-table">
            <thead>
              <tr>
                <th>Merchant</th>
                <th>Category</th>
                <th>Date</th>
                <th style={{ textAlign: 'right' }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {merchants.map((m, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 600 }}>{m.name}</td>
                  <td>
                    <span className="badge badge-info">{m.category}</span>
                  </td>
                  <td style={{ color: 'var(--text-muted)' }}>{m.date}</td>
                  <td style={{ textAlign: 'right', fontWeight: 600 }}>₹{m.amount.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
