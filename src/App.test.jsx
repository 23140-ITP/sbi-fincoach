import { render, screen, fireEvent, act, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { expect, test, describe, vi, afterEach } from 'vitest';

describe('SBI FinCoach Layout and Navigation Shell (F1)', () => {
  test('renders 3-column layout structure', () => {
    const { container } = render(<App />);
    
    // 1. Left Sidebar
    const sidebar = container.querySelector('.sidebar');
    expect(sidebar).toBeInTheDocument();
    expect(screen.getByText('SBI FinCoach')).toBeInTheDocument();

    // 2. Main Content
    const mainContent = container.querySelector('.main-content');
    expect(mainContent).toBeInTheDocument();

    // 3. Right Chat Panel
    const chatPanel = container.querySelector('.chat-panel');
    expect(chatPanel).toBeInTheDocument();
  });

  test('default active page is Dashboard and shows Arjun welcome message', () => {
    render(<App />);
    
    // Check that Dashboard page content is shown
    expect(screen.getByRole('heading', { name: 'Dashboard', level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/Welcome to SBI FinCoach Dashboard/i)).toBeInTheDocument();

    // Check that Dashboard nav item is marked as active
    const dashboardBtn = screen.getByRole('button', { name: 'Dashboard' });
    expect(dashboardBtn).toHaveClass('active');
  });

  test('clicking navigation links switches the active page and updates button active state', async () => {
    render(<App />);
    const user = userEvent.setup();

    // Verify initial active state
    const dashboardBtn = screen.getByRole('button', { name: 'Dashboard' });
    const spendingBtn = screen.getByRole('button', { name: 'Spending Analytics' });
    
    expect(dashboardBtn).toHaveClass('active');
    expect(spendingBtn).not.toHaveClass('active');

    // Click Spending Analytics
    await user.click(spendingBtn);

    // Verify it updates active page content and active button class
    expect(screen.getByRole('heading', { name: 'Spending Analytics', level: 1 })).toBeInTheDocument();
    expect(spendingBtn).toHaveClass('active');
    expect(dashboardBtn).not.toHaveClass('active');
  });

  test('navigation through all 7 pages updates page title correctly', async () => {
    render(<App />);
    const user = userEvent.setup();

    const pages = [
      { name: 'Dashboard', heading: 'Dashboard' },
      { name: 'Spending Analytics', heading: 'Spending Analytics' },
      { name: 'Product Recommendations', heading: 'Product Recommendations' },
      { name: 'Life Events', heading: 'Life Events' },
      { name: 'Notification Feed', heading: 'Notification Feed' },
      { name: 'Portfolio Tracker', heading: 'Portfolio Tracker' },
      { name: 'Profile / KYC', heading: 'Profile / KYC' },
    ];

    for (const page of pages) {
      const navBtn = screen.getByRole('button', { name: page.name });
      await user.click(navBtn);
      
      expect(screen.getByRole('heading', { name: page.heading, level: 1 })).toBeInTheDocument();
      expect(navBtn).toHaveClass('active');
    }
  });

  test('clicking the active page link again does not disrupt rendering', async () => {
    render(<App />);
    const user = userEvent.setup();

    const dashboardBtn = screen.getByRole('button', { name: 'Dashboard' });
    expect(dashboardBtn).toHaveClass('active');

    // Click it again
    await user.click(dashboardBtn);

    // Should still be active and display Dashboard content
    expect(screen.getByRole('heading', { name: 'Dashboard', level: 1 })).toBeInTheDocument();
    expect(dashboardBtn).toHaveClass('active');
  });
});

describe('SBI FinCoach Chat Panel (F9)', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  test('chat panel loads preloaded thread with 5 messages', () => {
    render(<App />);
    
    // Check chatbot header
    expect(screen.getByText('FinCoach AI')).toBeInTheDocument();
    expect(screen.getByText('Online')).toBeInTheDocument();

    // Check preloaded messages as specified in R4
    expect(screen.getByText(/salary was credited today/i)).toBeInTheDocument();
    expect(screen.getByText(/Yes, what do you suggest\?/i)).toBeInTheDocument();
    expect(screen.getByText(/₹20k → Recurring Deposit/i)).toBeInTheDocument();
    expect(screen.getByText(/What SIP should I pick\?/i)).toBeInTheDocument();
    expect(screen.getByText(/SBI Bluechip Fund/i)).toBeInTheDocument();
  });

  test('submitting a new chat message appends it to the conversation list', async () => {
    render(<App />);
    const user = userEvent.setup();

    const input = screen.getByPlaceholderText('Ask FinCoach about your finances...');
    const sendBtn = screen.getByRole('button', { name: 'Send' });

    // Type a message
    await user.type(input, 'Tell me about fixed deposit rates');
    await user.click(sendBtn);

    // Input should be cleared
    expect(input).toHaveValue('');

    // Message should be displayed in chat
    expect(screen.getByText('Tell me about fixed deposit rates')).toBeInTheDocument();
  });

  test('sending a message sets typing indicator and appends bot response after 1200ms delay', () => {
    vi.useFakeTimers();
    render(<App />);

    const input = screen.getByPlaceholderText('Ask FinCoach about your finances...');
    const form = input.closest('form');

    // Simulate user typing and sending a message
    fireEvent.change(input, { target: { value: 'How is my spending?' } });
    fireEvent.submit(form);

    // 1. User message should be appended immediately
    expect(screen.getByText('How is my spending?')).toBeInTheDocument();

    // 2. Typing indicator should be displayed immediately
    expect(screen.getByTestId('typing-indicator')).toBeInTheDocument();

    // 3. Advance timers by 1200ms
    act(() => {
      vi.advanceTimersByTime(1200);
    });

    // 4. Typing indicator should disappear and bot response should be added
    expect(screen.queryByTestId('typing-indicator')).not.toBeInTheDocument();
    
    // The first response from BOT_RESPONSES is:
    // "I noticed your Swiggy spending has increased by 15% this month. Try setting a weekly budget to save more!"
    expect(screen.getByText(/I noticed your Swiggy spending has increased/i)).toBeInTheDocument();

    vi.useRealTimers();
  });

  test('navigating to pages appends page-aware nudges when AI Nudges are enabled', async () => {
    const { container } = render(<App />);
    const user = userEvent.setup();
    const chatPanel = container.querySelector('.chat-panel');

    // 1. Navigate to Spending Analytics.
    const spendingBtn = screen.getByRole('button', { name: 'Spending Analytics' });
    await user.click(spendingBtn);

    // Verify spending nudge is appended to chat
    expect(within(chatPanel).getByText(/I see you're looking at your spending/i)).toBeInTheDocument();

    // 2. Navigate to Product Recommendations.
    const recsBtn = screen.getByRole('button', { name: 'Product Recommendations' });
    await user.click(recsBtn);

    // Verify recommendations nudge is appended to chat
    expect(within(chatPanel).getByText(/Here are some personalized products/i)).toBeInTheDocument();

    // 3. Navigate to Portfolio Tracker.
    const portfolioBtn = screen.getByRole('button', { name: 'Portfolio Tracker' });
    await user.click(portfolioBtn);

    // Verify portfolio nudge is appended to chat
    expect(within(chatPanel).getByText(/Your portfolio has outperformed your savings goal/i)).toBeInTheDocument();
  });

  test('does not append page-aware nudges when AI Nudges are disabled', async () => {
    const { container } = render(<App />);
    const user = userEvent.setup();
    const chatPanel = container.querySelector('.chat-panel');

    // Go to Profile / KYC
    const profileBtn = screen.getByRole('button', { name: 'Profile / KYC' });
    await user.click(profileBtn);

    // Check nudge is appended first (because profile itself triggers nudge when switched to, if enabled)
    expect(within(chatPanel).getByText(/Please review your KYC details and linked SBI accounts/i)).toBeInTheDocument();

    // Toggle AI Nudges switch off
    const aiNudgesCheckbox = screen.getByText('AI Nudges').closest('label').querySelector('input[type="checkbox"]');
    expect(aiNudgesCheckbox.checked).toBe(true);

    // Toggle it off
    await user.click(aiNudgesCheckbox);
    expect(aiNudgesCheckbox.checked).toBe(false);

    // Navigate to Spending Analytics
    const spendingBtn = screen.getByRole('button', { name: 'Spending Analytics' });
    await user.click(spendingBtn);

    // Spending nudge should NOT be appended since AI Nudges is now disabled
    expect(within(chatPanel).queryByText(/I see you're looking at your spending/i)).not.toBeInTheDocument();
  });
});

describe('SBI FinCoach Page Features & Interactivity (F2-F8)', () => {
  test('Dashboard displays stat cards, greeting and date', () => {
    render(<App />);

    // Check greetings and date
    expect(screen.getByText('Good morning, Arjun')).toBeInTheDocument();
    
    // Check 4 stat cards
    expect(screen.getByText('Net Worth')).toBeInTheDocument();
    expect(screen.getByText('₹12.4L')).toBeInTheDocument();
    expect(screen.getByText('Monthly Savings')).toBeInTheDocument();
    expect(screen.getByText('₹18,200')).toBeInTheDocument();
    expect(screen.getByText('Credit Score')).toBeInTheDocument();
    expect(screen.getByText('762')).toBeInTheDocument();
    expect(screen.getByText('Active Products')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  test('Dashboard "Start SIP" quick action switches to recommendations and injects chat messages', async () => {
    render(<App />);
    const user = userEvent.setup();

    // Click "Start SIP" quick action button
    const startSipBtn = screen.getByRole('button', { name: /Start SIP/i });
    await user.click(startSipBtn);

    // Should switch to Product Recommendations
    expect(screen.getByRole('heading', { name: 'Product Recommendations', level: 1 })).toBeInTheDocument();

    // Verify injected messages in chat panel
    expect(screen.getByText('I want to start a Mutual Fund SIP.')).toBeInTheDocument();
    expect(screen.getByText(/Great choice! Here are our recommended mutual fund SIPs/i)).toBeInTheDocument();
  });

  test('Dashboard "Move to RD" CTA banner moves salary and switches to portfolio', async () => {
    render(<App />);
    const user = userEvent.setup();

    // Click "Move to RD" button in salary banner
    const moveRdBtn = screen.getByRole('button', { name: 'Move to RD' });
    await user.click(moveRdBtn);

    // Should switch to Portfolio Tracker page
    expect(screen.getByRole('heading', { name: 'Portfolio Tracker', level: 1 })).toBeInTheDocument();

    // Verify injected messages in chat panel
    expect(screen.getByText('Move ₹20k from my salary to a Recurring Deposit.')).toBeInTheDocument();
    expect(screen.getByText(/Done! I have initiated moving ₹20,000 to a recurring deposit/i)).toBeInTheDocument();
  });

  test('Recommendations page displays 3 correct product cards and match percentages', async () => {
    render(<App />);
    const user = userEvent.setup();

    // Navigate to Recommendations page
    const recsBtn = screen.getByRole('button', { name: 'Product Recommendations' });
    await user.click(recsBtn);

    // Recommended for Arjun subtitle
    expect(screen.getByText('Recommended for Arjun')).toBeInTheDocument();

    // Product card 1: SBI Fixed Deposit
    expect(screen.getByText('SBI Fixed Deposit')).toBeInTheDocument();
    expect(screen.getByText(/Park ₹20k for 1 year at 6.8% p.a./i)).toBeInTheDocument();
    expect(screen.getByText('97% match')).toBeInTheDocument();

    // Product card 2: SBI Mutual Fund SIP
    expect(screen.getByText('SBI Mutual Fund SIP')).toBeInTheDocument();
    expect(screen.getByText(/₹5,000\/month in Bluechip Fund/i)).toBeInTheDocument();
    expect(screen.getByText('94% match')).toBeInTheDocument();

    // Product card 3: SBI Term Insurance
    expect(screen.getByText('SBI Term Insurance')).toBeInTheDocument();
    expect(screen.getByText(/Cover of ₹50L at ₹520\/month/i)).toBeInTheDocument();
    expect(screen.getByText('89% match')).toBeInTheDocument();
  });

  test('Notification Feed filters notifications correctly by category tabs', async () => {
    render(<App />);
    const user = userEvent.setup();

    // Navigate to Notification Feed
    const notifBtn = screen.getByRole('button', { name: 'Notification Feed' });
    await user.click(notifBtn);

    // Verify initial layout with 5 items (under 'All' tab)
    expect(screen.getByText(/Your FD of ₹50,000 matures in 7 days/i)).toBeInTheDocument();
    expect(screen.getByText(/₹12,000 sitting idle in savings/i)).toBeInTheDocument();
    expect(screen.getByText(/Account security tip: Enable 2FA/i)).toBeInTheDocument();
    expect(screen.getByText(/You qualify for SBI SimplyCLICK/i)).toBeInTheDocument();
    expect(screen.getByText(/Monthly spending report ready/i)).toBeInTheDocument();

    // Click on 'Alerts' tab
    const alertsTab = screen.getByRole('button', { name: 'Alerts' });
    await user.click(alertsTab);

    // Alerts should be visible
    expect(screen.getByText(/Your FD of ₹50,000 matures in 7 days/i)).toBeInTheDocument();
    expect(screen.getByText(/Account security tip: Enable 2FA/i)).toBeInTheDocument();

    // Other categories should NOT be visible
    expect(screen.queryByText(/You qualify for SBI SimplyCLICK/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/₹12,000 sitting idle in savings/i)).not.toBeInTheDocument();
  });

  test('Profile page displays CIBIL score, Linked Accounts, and Financial Goal progress', async () => {
    render(<App />);
    const user = userEvent.setup();

    // Navigate to Profile page
    const profileBtn = screen.getByRole('button', { name: 'Profile / KYC' });
    await user.click(profileBtn);

    // User details and CIBIL
    expect(screen.getByText('Arjun Sharma')).toBeInTheDocument();
    expect(screen.getByText('CIBIL 762 (Excellent)')).toBeInTheDocument();
    expect(screen.getByText('Customer since 2019')).toBeInTheDocument();

    // KYC checkmarks
    expect(screen.getByText('Aadhaar Verification')).toBeInTheDocument();
    expect(screen.getByText('PAN Verification')).toBeInTheDocument();
    expect(screen.getByText('Video KYC')).toBeInTheDocument();

    // Linked Accounts
    expect(screen.getByText(/XXXX4521/)).toBeInTheDocument();
    expect(screen.getByText(/XXXX8834/)).toBeInTheDocument();

    // Goals Progress
    expect(screen.getByText(/Emergency Fund/i, { selector: 'span' })).toBeInTheDocument();
    expect(screen.getByText('100%')).toBeInTheDocument();
    expect(screen.getByText(/Retirement Corpus/i, { selector: 'span' })).toBeInTheDocument();
    expect(screen.getByText('34%')).toBeInTheDocument();
    expect(screen.getByText(/Child Education/i, { selector: 'span' })).toBeInTheDocument();
    expect(screen.getByText('8%')).toBeInTheDocument();
  });
});

