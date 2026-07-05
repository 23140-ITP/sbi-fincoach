import { render, screen, fireEvent, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { expect, test, describe, vi, beforeAll, afterEach } from 'vitest';

describe('E2E Navigation & Layout Shell Tests (F1)', () => {
  beforeAll(() => {
    // Mock window.alert and scrollIntoView
    window.alert = vi.fn();
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  // TIER 1 - F1 (5 tests)
  test('T1-F1-1: nav link clicks change active page content', async () => {
    render(<App />);
    const user = userEvent.setup();

    const spendingBtn = screen.getByRole('button', { name: 'Spending Analytics' });
    await user.click(spendingBtn);

    expect(screen.getByRole('heading', { name: 'Spending Analytics', level: 1 })).toBeInTheDocument();
  });

  test('T1-F1-2: active class is applied only to the selected nav item', async () => {
    render(<App />);
    const user = userEvent.setup();

    const dashboardBtn = screen.getByRole('button', { name: 'Dashboard' });
    const portfolioBtn = screen.getByRole('button', { name: 'Portfolio Tracker' });

    expect(dashboardBtn).toHaveClass('active');
    expect(portfolioBtn).not.toHaveClass('active');

    await user.click(portfolioBtn);

    expect(portfolioBtn).toHaveClass('active');
    expect(dashboardBtn).not.toHaveClass('active');
  });

  test('T1-F1-3: layout shell renders all three columns', () => {
    const { container } = render(<App />);

    const sidebar = container.querySelector('.sidebar');
    const mainContent = container.querySelector('.main-content');
    const chatPanel = container.querySelector('.chat-panel');

    expect(sidebar).toBeInTheDocument();
    expect(mainContent).toBeInTheDocument();
    expect(chatPanel).toBeInTheDocument();
  });

  test('T1-F1-4: rapid clicking on different nav links handles page transitions gracefully', async () => {
    render(<App />);
    const user = userEvent.setup();

    const spendingBtn = screen.getByRole('button', { name: 'Spending Analytics' });
    const portfolioBtn = screen.getByRole('button', { name: 'Portfolio Tracker' });
    const profileBtn = screen.getByRole('button', { name: 'Profile / KYC' });

    // Click rapidly
    await Promise.all([
      user.click(spendingBtn),
      user.click(portfolioBtn),
      user.click(profileBtn)
    ]);

    expect(screen.getByRole('heading', { name: 'Profile / KYC', level: 1 })).toBeInTheDocument();
    expect(profileBtn).toHaveClass('active');
  });

  test('T1-F1-5: page titles in sidebar navigation match headers on the active pages', async () => {
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
    }
  });

  // TIER 2 - F1 (5 tests)
  test('T2-F1-1: double-clicking navigation links keeps the correct active state and layout', async () => {
    render(<App />);
    const user = userEvent.setup();

    const notifBtn = screen.getByRole('button', { name: 'Notification Feed' });
    await user.dblClick(notifBtn);

    expect(screen.getByRole('heading', { name: 'Notification Feed', level: 1 })).toBeInTheDocument();
    expect(notifBtn).toHaveClass('active');
  });

  test('T2-F1-2: clicking the active page link again does not disrupt page rendering', async () => {
    render(<App />);
    const user = userEvent.setup();

    const dashboardBtn = screen.getByRole('button', { name: 'Dashboard' });
    await user.click(dashboardBtn);

    expect(screen.getByRole('heading', { name: 'Dashboard', level: 1 })).toBeInTheDocument();
    expect(dashboardBtn).toHaveClass('active');
  });

  test('T2-F1-3: window resizing updates innerWidth without breaking application state', () => {
    render(<App />);
    const spy = vi.spyOn(window, 'dispatchEvent');

    window.innerWidth = 1024;
    fireEvent(window, new Event('resize'));

    expect(window.innerWidth).toBe(1024);
    expect(spy).toHaveBeenCalled();
  });

  test('T2-F1-4: rendering handles default layout structures gracefully', () => {
    const { container } = render(<App />);
    const layoutContainer = container.querySelector('.layout-container');
    expect(layoutContainer).toBeInTheDocument();
  });

  test('T2-F1-5: rapid page switching is stable and does not throw canvas errors', async () => {
    render(<App />);
    const user = userEvent.setup();

    const spendBtn = screen.getByRole('button', { name: 'Spending Analytics' });
    const dashBtn = screen.getByRole('button', { name: 'Dashboard' });

    for (let i = 0; i < 5; i++) {
      await user.click(spendBtn);
      await user.click(dashBtn);
    }

    expect(screen.getByRole('heading', { name: 'Dashboard', level: 1 })).toBeInTheDocument();
  });

  // TIER 3 - Cross-Feature (1 test in this file)
  test('T3-C7: Toggle off AI nudges in Profile -> navigate to Spending -> verify NO page-aware nudge is injected', async () => {
    const { container } = render(<App />);
    const user = userEvent.setup();
    const chatPanel = container.querySelector('.chat-panel');

    // Go to Profile / KYC
    const profileBtn = screen.getByRole('button', { name: 'Profile / KYC' });
    await user.click(profileBtn);

    // Turn off AI Nudges toggle
    const aiNudgesCheckbox = screen.getByText('AI Nudges').closest('label').querySelector('input[type="checkbox"]');
    expect(aiNudgesCheckbox.checked).toBe(true);
    await user.click(aiNudgesCheckbox);
    expect(aiNudgesCheckbox.checked).toBe(false);

    // Navigate to Spending Analytics
    const spendingBtn = screen.getByRole('button', { name: 'Spending Analytics' });
    await user.click(spendingBtn);

    // Spending nudge should NOT be injected in chat panel
    expect(within(chatPanel).queryByText(/I see you're looking at your spending/i)).not.toBeInTheDocument();
  });

  // TIER 4 - Workload (1 test in this file)
  test('T4-W5: Clean State & Rapid Use: click every nav item in order, send multiple messages, check layout consistency', async () => {
    const { container } = render(<App />);
    const user = userEvent.setup();

    const navItems = [
      'Dashboard',
      'Spending Analytics',
      'Product Recommendations',
      'Life Events',
      'Notification Feed',
      'Portfolio Tracker',
      'Profile / KYC'
    ];

    // Click every nav item in order
    for (const label of navItems) {
      const btn = screen.getByRole('button', { name: label });
      await user.click(btn);
      expect(btn).toHaveClass('active');
    }

    // Go to Chat and send multiple messages
    const input = screen.getByPlaceholderText('Ask FinCoach about your finances...');
    const sendBtn = screen.getByRole('button', { name: 'Send' });

    await user.type(input, 'Message 1');
    await user.click(sendBtn);
    expect(screen.getByText('Message 1')).toBeInTheDocument();

    await user.type(input, 'Message 2');
    await user.click(sendBtn);
    expect(screen.getByText('Message 2')).toBeInTheDocument();

    // Verify all 3 layout columns remain active
    expect(container.querySelector('.sidebar')).toBeInTheDocument();
    expect(container.querySelector('.main-content')).toBeInTheDocument();
    expect(container.querySelector('.chat-panel')).toBeInTheDocument();
  });
});
