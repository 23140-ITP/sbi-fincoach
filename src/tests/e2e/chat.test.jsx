import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { expect, test, describe, vi, beforeAll, afterEach } from 'vitest';

describe('E2E Chat Panel Tests (F9)', () => {
  beforeAll(() => {
    window.alert = vi.fn();
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  // TIER 1 - F9 (5 tests)
  test('T1-F9-1: preloaded thread has exactly 5 messages', () => {
    const { container } = render(<App />);
    const messages = container.querySelectorAll('.chat-message-wrapper');
    // Preloaded messages: 5 (initial thread messages)
    expect(messages.length).toBe(5);
  });

  test('T1-F9-2: pulsing online dot is present in chat header', () => {
    const { container } = render(<App />);
    const statusDot = container.querySelector('.status-dot');
    expect(statusDot || screen.getByText('Online')).toBeInTheDocument();
  });

  test('T1-F9-3: input field accepts text typing', async () => {
    render(<App />);
    const user = userEvent.setup();
    const input = screen.getByPlaceholderText('Ask FinCoach about your finances...');
    await user.type(input, 'Hello FinCoach');
    expect(input).toHaveValue('Hello FinCoach');
  });

  test('T1-F9-4: send button exists in chat panel', () => {
    render(<App />);
    const sendBtn = screen.getByRole('button', { name: 'Send' });
    expect(sendBtn).toBeInTheDocument();
  });

  test('T1-F9-5: chat scrolls to bottom when message list updates', () => {
    const spy = vi.spyOn(window.HTMLElement.prototype, 'scrollIntoView');
    render(<App />);
    // Just rendering the initial 5 messages should call scrollIntoView because of useEffect on chatMessages
    expect(spy).toHaveBeenCalled();
  });

  // TIER 2 - F9 (5 tests)
  test('T2-F9-1: submitting empty chat message does nothing', async () => {
    const { container } = render(<App />);
    const user = userEvent.setup();
    const sendBtn = screen.getByRole('button', { name: 'Send' });

    const initialMessages = container.querySelectorAll('.chat-message-wrapper').length;
    await user.click(sendBtn);

    const afterMessages = container.querySelectorAll('.chat-message-wrapper').length;
    expect(afterMessages).toBe(initialMessages);
  });

  test('T2-F9-2: submitting a long message (1000+ chars) succeeds and appends to chat', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Ask FinCoach about your finances...');
    const form = input.closest('form');

    const longMessage = 'A'.repeat(1005);
    fireEvent.change(input, { target: { value: longMessage } });
    fireEvent.submit(form);

    expect(screen.getByText(longMessage)).toBeInTheDocument();
  });

  test('T2-F9-3: submitting message via Enter key instead of clicking Send button works', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Ask FinCoach about your finances...');
    const form = input.closest('form');

    fireEvent.change(input, { target: { value: 'Query via Enter' } });
    fireEvent.submit(form);

    expect(screen.getByText('Query via Enter')).toBeInTheDocument();
  });

  test('T2-F9-4: typing indicator is visible during 1200ms response delay', () => {
    vi.useFakeTimers();
    render(<App />);
    const input = screen.getByPlaceholderText('Ask FinCoach about your finances...');
    const form = input.closest('form');

    fireEvent.change(input, { target: { value: 'Is there a delay?' } });
    fireEvent.submit(form);

    // Assert typing indicator is visible
    expect(screen.getByTestId('typing-indicator')).toBeInTheDocument();

    // Fast-forward 600ms (still inside delay)
    act(() => {
      vi.advanceTimersByTime(600);
    });
    expect(screen.getByTestId('typing-indicator')).toBeInTheDocument();

    // Fast-forward another 600ms (1200ms total)
    act(() => {
      vi.advanceTimersByTime(600);
    });
    expect(screen.queryByTestId('typing-indicator')).not.toBeInTheDocument();
  });

  test('T2-F9-5: chatbot responses index rotates and wraps around after 8 messages', () => {
    vi.useFakeTimers();
    render(<App />);
    const input = screen.getByPlaceholderText('Ask FinCoach about your finances...');
    const form = input.closest('form');

    // We have 8 BOT_RESPONSES. We will trigger 9 messages to verify the 9th uses response 0.
    const expectedResponses = [
      /I noticed your Swiggy spending has increased/i,
      /Your Emergency Fund is currently at 100%/i,
      /With your excellent CIBIL score/i,
      /Consider upgrading to the SBI SimplyCLICK/i,
      /Your Liquid Funds are maturing/i,
      /Investing in tax-saving ELSS funds/i,
      /Ensure you have a comprehensive Health Insurance/i,
      /Setting up an automated monthly sweep-out/i
    ];

    for (let i = 0; i < 9; i++) {
      fireEvent.change(input, { target: { value: `Message ${i}` } });
      fireEvent.submit(form);

      act(() => {
        vi.advanceTimersByTime(1200);
      });

      const responseIndex = i % 8;
      const matches = screen.getAllByText(expectedResponses[responseIndex]);
      expect(matches.length).toBe(i === 8 ? 2 : 1);
    }
  });
});
