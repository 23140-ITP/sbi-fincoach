# Project: SBI FinCoach

## Architecture
SBI FinCoach is a high-fidelity, clickable React banking AI dashboard designed for a dark-themed desktop experience. The layout is a persistent 3-column design:
1. **Left Sidebar (220px fixed)**: SBI FinCoach logo/wordmark, 7 nav links, active state indicators.
2. **Main Content Area (flex: 1, scrollable)**: Renders the active page component dynamically based on the state.
3. **Right AI Chat Panel (360px fixed)**: Always visible, manages interactive conversation and context-aware nudges.

### Data Flow
- Root component (`App.jsx`) holds core state:
  - `activePage`: tracks current page ID (dashboard, spending, recommendations, life-events, notifications, portfolio, profile).
  - `chatMessages`: array of chat message objects `{ sender: 'bot'|'user', text: string, timestamp: Date }`.
- Action handlers:
  - Navigation handlers to switch pages.
  - Chat triggers: Action buttons on pages inject prompt messages into chat, triggering bot replies.
  - Page-aware nudges: Switching `activePage` fires a `useEffect` that appends a page-specific AI comment to the chat history.

## Code Layout
```
/
├── .agents/                      # Agent metadata (plans, progress, handoffs)
├── src/
│   ├── assets/                   # Images, icons, static assets
│   ├── components/
│   │   ├── ChatPanel.jsx         # Persistent right sidebar AI chat component
│   │   ├── Sidebar.jsx           # Persistent left sidebar navigation component
│   │   └── Layout.jsx            # 3-column layout wrapper
│   ├── pages/
│   │   ├── Dashboard.jsx         # Page 1: Dashboard with stat cards, chart, actions
│   │   ├── Spending.jsx          # Page 2: Spending analytics with donut/line charts
│   │   ├── Recommendations.jsx   # Page 3: Product recommendations with match cards
│   │   ├── LifeEvents.jsx        # Page 4: Timeline of AI-detected events
│   │   ├── Notifications.jsx     # Page 5: Filterable feed of bank notifications
│   │   ├── Portfolio.jsx         # Page 6: Asset split holdings and historical performance
│   │   └── Profile.jsx           # Page 7: Customer info, KYC status, goal tracking
│   ├── tests/
│   │   └── e2e/                  # End-to-End opaque-box test suites (Vitest/RTL)
│   │       ├── dashboard.test.jsx
│   │       ├── navigation.test.jsx
│   │       ├── pages.test.jsx
│   │       └── chat.test.jsx
│   ├── App.jsx                   # Application entry point, handles global state
│   ├── index.css                 # Dark theme custom variables and base styles
│   ├── main.jsx                  # React bootstrap file
│   ├── package.json                  # Dependencies & scripts
│   ├── vite.config.js                # Vite configuration
│   └── TEST_INFRA.md                 # E2E test suite plan and inventory
```

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | Project Scaffolding | Bootstrap Vite React project, install dependencies (Chart.js, Vitest, RTL) | None | DONE |
| 2 | Core Layout & Navigation | Implement 3-column Layout, Sidebar, and App page switching state | M1 | DONE |
| 3 | Page Implementation | Implement all 7 hardcoded page components with styling and mock charts | M2 | DONE |
| 4 | Chat Panel & Nudges | Implement ChatPanel, message list, typing indicators, page nudges | M3 | DONE |
| 5 | E2E Test Suite | Design and code all E2E test cases in `src/tests/e2e` and publish `TEST_READY.md` | M2 | DONE |
| 6 | Premium Visual Polish | Add micro-animations, transitions, dark-mode refinement, CIBIL colors | M4 | DONE |
| 7 | Verification & Audit | Run all verification passes, execute full test suite, pass forensic audit | M5, M6 | DONE |

## Interface Contracts
### Global App State
- `activePage` (string): The current page active in the content area.
- `setActivePage` (function): Navigation function.
- `chatMessages` (Array<{ id, sender, text, timestamp }>): Conversation logs.
- `sendChatMessage` (function): Function to send/append user message and trigger delayed bot responses.
- `injectBotNudge` (function): Function to immediately inject a bot nudge into the conversation history.
