import { render, screen, fireEvent, act, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { expect, test, describe, vi, beforeAll, afterEach } from 'vitest';

describe('E2E Integration & Cross-Feature Tests (T3 & T4)', () => {
  beforeAll(() => {
    window.alert = vi.fn();
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  // TIER 3 - CROSS FEATURE COMBINATIONS (8 tests)
  test('T3-C1: Dashboard Quick Action Start SIP triggers page switch and chat prompt injection', async () => {
    render(<App />);
    const user = userEvent.setup();

    const startSipBtn = screen.getByRole('button', { name: /Start SIP/i });
    await user.click(startSipBtn);

    expect(screen.getByRole('heading', { name: 'Product Recommendations', level: 1 })).toBeInTheDocument();
    expect(screen.getByText('I want to start a Mutual Fund SIP.')).toBeInTheDocument();
    expect(screen.getByText(/Great choice! Here are our recommended mutual fund SIPs/i)).toBeInTheDocument();
  });

  test('T3-C2: Dashboard Quick Action Open FD triggers page switch and chat prompt injection', async () => {
    render(<App />);
    const user = userEvent.setup();

    const openFdBtn = screen.getByRole('button', { name: /Open FD/i });
    await user.click(openFdBtn);

    expect(screen.getByRole('heading', { name: 'Product Recommendations', level: 1 })).toBeInTheDocument();
    expect(screen.getByText('I want to open a Fixed Deposit.')).toBeInTheDocument();
    expect(screen.getByText(/Excellent. You can open a Fixed Deposit/i)).toBeInTheDocument();
  });

  test('T3-C3: Dashboard Quick Action Apply for Loan triggers page switch and chat prompt injection', async () => {
    render(<App />);
    const user = userEvent.setup();

    const loanBtn = screen.getByRole('button', { name: /Apply for Loan/i });
    await user.click(loanBtn);

    expect(screen.getByRole('heading', { name: 'Product Recommendations', level: 1 })).toBeInTheDocument();
    expect(screen.getByText('I want to apply for a Loan.')).toBeInTheDocument();
    expect(screen.getByText(/Sure! I can help you apply for an SBI Home Loan/i)).toBeInTheDocument();
  });

  test('T3-C4: page switches to Spending trigger spending bot nudge in chat panel', async () => {
    const { container } = render(<App />);
    const user = userEvent.setup();
    const chatPanel = container.querySelector('.chat-panel');

    const spendingBtn = screen.getByRole('button', { name: 'Spending Analytics' });
    await user.click(spendingBtn);

    expect(within(chatPanel).getByText(/I see you're looking at your spending/i)).toBeInTheDocument();
  });

  test('T3-C5: page switches to Portfolio trigger portfolio bot nudge in chat panel', async () => {
    const { container } = render(<App />);
    const user = userEvent.setup();
    const chatPanel = container.querySelector('.chat-panel');

    const portfolioBtn = screen.getByRole('button', { name: 'Portfolio Tracker' });
    await user.click(portfolioBtn);

    expect(within(chatPanel).getByText(/Your portfolio has outperformed your savings goal/i)).toBeInTheDocument();
  });

  test('T3-C6: page switches to Recommendations trigger recommendations bot nudge in chat panel', async () => {
    const { container } = render(<App />);
    const user = userEvent.setup();
    const chatPanel = container.querySelector('.chat-panel');

    const recsBtn = screen.getByRole('button', { name: 'Product Recommendations' });
    await user.click(recsBtn);

    expect(within(chatPanel).getByText(/Here are some personalized products/i)).toBeInTheDocument();
  });

  test('T3-C8: Move to RD button on Dashboard salary banner triggers redirection and chat RD details injection', async () => {
    render(<App />);
    const user = userEvent.setup();

    const moveRdBtn = screen.getByRole('button', { name: 'Move to RD' });
    await user.click(moveRdBtn);

    expect(screen.getByRole('heading', { name: 'Portfolio Tracker', level: 1 })).toBeInTheDocument();
    expect(screen.getByText('Move ₹20k from my salary to a Recurring Deposit.')).toBeInTheDocument();
    expect(screen.getByText(/Done! I have initiated moving ₹20,000/i)).toBeInTheDocument();
  });

  test('T3-C9: dismiss a life event -> navigate away -> navigate back -> verify event remains dismissed', async () => {
    render(<App />);
    const user = userEvent.setup();

    // Go to Life Events page
    const lifeBtn = screen.getByRole('button', { name: 'Life Events' });
    await user.click(lifeBtn);

    // Initial check: 4 events
    expect(screen.getAllByText(/AI Nudge/i).length).toBe(4);

    // Dismiss the first event
    const dismissBtns = screen.getAllByRole('button', { name: 'Dismiss' });
    await user.click(dismissBtns[0]);
    expect(screen.getAllByText(/AI Nudge/i).length).toBe(3);

    // Navigate to Dashboard
    const dashBtn = screen.getByRole('button', { name: 'Dashboard' });
    await user.click(dashBtn);

    // Navigate back to Life Events
    await user.click(lifeBtn);

    // Should still have only 3 events remaining
    expect(screen.getAllByText(/AI Nudge/i).length).toBe(3);
  });

  // TIER 4 - REAL WORLD WORKLOADS (4 tests)
  test('T4-W1: Arjun Savings Flow - logs in, moves salary to RD, asks chatbot about interest rates', async () => {
    vi.useFakeTimers();
    render(<App />);

    // Step 1: Move salary to RD from banner
    const moveRdBtn = screen.getByRole('button', { name: 'Move to RD' });
    fireEvent.click(moveRdBtn);
    expect(screen.getByRole('heading', { name: 'Portfolio Tracker', level: 1 })).toBeInTheDocument();

    // Step 2: Types message in chat about interest rates
    const input = screen.getByPlaceholderText('Ask FinCoach about your finances...');
    const form = input.closest('form');

    fireEvent.change(input, { target: { value: 'What are current RD interest rates?' } });
    fireEvent.submit(form);

    expect(screen.getByText('What are current RD interest rates?')).toBeInTheDocument();
    expect(screen.getByTestId('typing-indicator')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1200);
    });

    expect(screen.queryByTestId('typing-indicator')).not.toBeInTheDocument();
  });

  test('T4-W2: Arjun Portfolio & Spending Audit - reviews portfolio, audits Swiggy spending, disables notifications alerts', async () => {
    render(<App />);
    const user = userEvent.setup();

    // Step 1: Reviews Portfolio
    const portBtn = screen.getByRole('button', { name: 'Portfolio Tracker' });
    await user.click(portBtn);
    expect(screen.getByText('₹3,84,200')).toBeInTheDocument();

    // Step 2: Switches to Spending to audit dining
    const spendBtn = screen.getByRole('button', { name: 'Spending Analytics' });
    await user.click(spendBtn);
    expect(screen.getByText('Swiggy')).toBeInTheDocument();

    // Step 3: Goes to Profile to disable spending alerts
    const profileBtn = screen.getByRole('button', { name: 'Profile / KYC' });
    await user.click(profileBtn);

    const alertCheckbox = screen.getByText('Spending Alerts').closest('label').querySelector('input[type="checkbox"]');
    expect(alertCheckbox.checked).toBe(true);
    await user.click(alertCheckbox);
    expect(alertCheckbox.checked).toBe(false);
  });

  test('T4-W3: Arjun FD Application Flow - goes to recommendations, clicks Open FD, triggers alert', async () => {
    render(<App />);
    const user = userEvent.setup();

    // Step 1: Navigate to Recommendations
    const recsBtn = screen.getByRole('button', { name: 'Product Recommendations' });
    await user.click(recsBtn);

    // Step 2: Clicks Open FD CTA
    const fdBtn = screen.getByRole('button', { name: 'Open FD' });
    await user.click(fdBtn);

    expect(window.alert).toHaveBeenCalledWith(expect.stringContaining('Redirecting to open Fixed Deposit details'));
  });

  test('T4-W4: Arjun Goals Adjust Flow - checks goals in Profile, goes to Dashboard, starts SIP, views Recommendations', async () => {
    render(<App />);
    const user = userEvent.setup();

    // Step 1: Check Profile goals
    const profileBtn = screen.getByRole('button', { name: 'Profile / KYC' });
    await user.click(profileBtn);
    expect(screen.getByText('Emergency Fund (Target: ₹3L)')).toBeInTheDocument();

    // Step 2: Go to Dashboard
    const dashBtn = screen.getByRole('button', { name: 'Dashboard' });
    await user.click(dashBtn);

    // Step 3: Click Start SIP quick action
    const startSipBtn = screen.getByRole('button', { name: /Start SIP/i });
    await user.click(startSipBtn);

    // Step 4: Verify Recommendations page is active and shows SIP card
    expect(screen.getByRole('heading', { name: 'Product Recommendations', level: 1 })).toBeInTheDocument();
    expect(screen.getByText('SBI Mutual Fund SIP')).toBeInTheDocument();
  });
});
