# E2E Test Infra: SBI FinCoach

## Test Philosophy
- **Opaque-box, requirement-driven**: Test the user interface exactly as a real customer would.
- **Methodology**: Apply Category-Partition, Boundary Value Analysis, Pairwise Interaction, and Real-World Workloads.
- **Environment**: Vitest and React Testing Library (RTL) running in JSDOM, simulating user click, typing, page-switch actions, and verifying the DOM changes.

## Feature Inventory
Let's identify the 9 core features/modules of SBI FinCoach:
1. **F1: App Navigation & Layout Shell**: Switching pages via sidebar, 3-column layout constraints, visual highlight of active page.
2. **F2: Dashboard Page**: Welcome message, 4 stat cards, life event banner with CTA, mini spend bar chart, 3 quick action CTAs.
3. **F3: Spending Page**: Date range tab switching, donut chart, monthly spend line chart, top merchants table, food insight banner.
4. **F4: Product Recommendations Page**: 3 product cards with match percentages and CTA buttons.
5. **F5: Life Events Page**: 4 timeline items, AI badges, CTAs, local state dismiss buttons (hiding elements).
6. **F6: Notification Feed Page**: Filter tabs (All, Nudges, Alerts, Offers) filtering items dynamically, unread/read indicators.
7. **F7: Portfolio Tracker Page**: Portfolio hero net worth value, holdings table, donut asset split chart, 12-month performance line chart, AI insight card.
8. **F8: Profile & KYC Page**: Customer info, Arjun name/CIBIL score, Aadhaar/PAN/Video KYC verification badges, financial goals progress bars, toggle switches.
9. **F9: AI FinCoach Chat Panel**: Persistent chat, preloaded conversation, messaging input + send, typing indicator (1200ms delay), rotating bot responses (8+), page-aware nudges.

## Test Case Count Requirements
- **Tier 1 (Feature Coverage)**: >=5 tests per feature (Total: 45)
- **Tier 2 (Boundary & Corner Cases)**: >=5 tests per feature (Total: 45)
- **Tier 3 (Cross-Feature Combinations)**: >=9 tests (Total: 9)
- **Tier 4 (Real-World Workloads)**: >=5 tests (Total: 5)
- **Total Minimum**: 104 tests.

## Test Architecture & Runner
- Test runner: `npm run test` or `npx vitest run`
- Setup: `@testing-library/react` and `@testing-library/user-event` for user interaction simulation.
- Vitest configurations with JSDOM environment, mocked Canvas element (needed for Chart.js), and timers mocked for checking typing indicator delays.

## Test Suite Inventory (Tiers 1-4)

### Tier 1: Feature Coverage (45 tests)
- **F1 (5 tests)**: Nav link clicks change page, active class applied, layout renders all 3 columns, rapid clicking handles gracefully, page titles match nav.
- **F2 (5 tests)**: Dashboard displays Arjun welcome, all 4 stat cards render correct figures, life event banner has CTA, mini chart element exists, quick actions are visible.
- **F3 (5 tests)**: Spending page has 3 date range tabs, donut chart element exists, line chart element exists, merchants table has 5 rows, food budget alert displays.
- **F4 (5 tests)**: FD recommended card renders with 97% match, SIP recommended card renders with 94% match, Term insurance card renders with 89% match, CTA buttons present, card details are correct.
- **F5 (5 tests)**: 4 events appear in timeline, AI badges visible on events, CTA button exists on each event, Dismiss button exists on each event, initial counts match expectation.
- **F6 (5 tests)**: 5 notification items display under 'All', Nudges tab shows correct notifications, Alerts tab shows alerts, Offers tab shows credit card/loans, filter counts are consistent.
- **F7 (5 tests)**: Portfolio total value hero displays, holdings table has 4 rows, donut split chart exists, 12-month line chart exists, portfolio insight badge/card renders.
- **F8 (5 tests)**: Arjun name/CIBIL score displays, Aadhaar/PAN/Video KYC show verified badge, 3 goal progress bars are visible, goal percentages are correct, toggle switches exist.
- **F9 (5 tests)**: Preloaded thread has exactly 5 messages, pulsing online dot is present, input field accepts text, Send button exists, chat scrolls to bottom.

### Tier 2: Boundary & Corner Cases (45 tests)
- **F1 (5 tests)**: Double-click navigation link, click active link again, resize window (chat panel disappears/collapses < 1280px), invalid activePage path falls back gracefully, rapid page switching does not crash canvas.
- **F2 (5 tests)**: Move to RD button on life event banner triggers action, quick actions page redirection + chat insertion, clicking quick actions multiple times, stat cards hover styling verify, empty/nil dashboard values check.
- **F3 (5 tests)**: Clicking date tabs repeatedly, verifying chart options configuration object is safe, merchants table layout robustness with long merchant names, line chart zero data handling, donut chart percentage sum logic.
- **F4 (5 tests)**: Open FD CTA triggers navigation, Start SIP CTA triggers navigation, Get Quote CTA triggers navigation, match badges color tags correct, hover states on recommend buttons.
- **F5 (5 tests)**: Dismissing event 1 (leaves 3), dismissing event 2 (leaves 2), dismissing all events displays "No new life events", dismiss action does not affect other pages, click event CTA navigates.
- **F6 (5 tests)**: Empty states if notifications filtered incorrectly, clicking filter tabs back and forth quickly, notifications styling verification for unread items, unread count badge calculation, notifications sorting chronological.
- **F7 (5 tests)**: Holdings table sorting (if implemented) or structure, value calculations, line chart labels visibility, performance positive/negative trend colors, portfolio insight recommendations text content validity.
- **F8 (5 tests)**: Toggling AI nudges switch saves state (local toggle), toggling spending alert switch, toggling product recommendations, goals progress bars bounds (0% to 100%), KYC status indicators green tick checks.
- **F9 (5 tests)**: Submit empty chat message does nothing, submit long message (1000+ chars), type message and click enter key instead of button, typing indicator visible during 1200ms wait, typing indicator hidden after response, chatbot array loops around after 8 messages.

### Tier 3: Cross-Feature Combinations (9 tests)
- **C1**: Click Dashboard Quick Action "Start SIP" -> changes activePage to Recommendations -> injects "I'm interested in starting an SBI Mutual Fund SIP" into chat -> triggers bot response.
- **C2**: Click Dashboard Quick Action "Open FD" -> changes activePage to Recommendations -> injects "I'd like to open a Fixed Deposit" -> triggers bot response.
- **C3**: Click Dashboard Quick Action "Apply for Loan" -> changes activePage to Recommendations -> injects "Can you tell me about loan options?" -> triggers bot response.
- **C4**: Navigate from Dashboard to Spending -> chat panel automatically appends spending nudge: "I see you're looking at your spending. Your food budget is 28% — higher than the 20% ideal."
- **C5**: Navigate from Dashboard to Portfolio -> chat panel automatically appends portfolio nudge: "Your portfolio has outperformed your savings goal by 2.4%."
- **C6**: Navigate to Recommendations -> chat panel automatically appends recommendations nudge: "Here are some personalized products matching your risk appetite."
- **C7**: Toggle off "AI nudges" in Profile -> navigate to Spending -> verify NO page-aware nudge is injected into chat.
- **C8**: Click "Move to RD" in Dashboard life event banner -> navigates to Recommendations -> injects "I want to move ₹20k to a recurring deposit" -> bot responds with RD setup details.
- **C9**: Dismiss a life event on Life Events page -> verify it remains dismissed when navigating away and coming back.

### Tier 4: Real-World Workloads (5 tests)
- **W1 (User Savings Flow)**: Arjun logs in, sees salary credit banner, clicks "Move to RD", is redirected to recommendations, asks Chatbot about interest rates, types message, gets reply.
- **W2 (Portfolio Review Flow)**: Arjun navigates to Portfolio, reviews assets, switches to Spending to check why cash is low, sees Swiggy food spending, asks Chatbot for budget tip, toggles off alerts.
- **W3 (Product Application Flow)**: Arjun navigates to Recommendations, clicks "Open FD", chat triggers setup sequence, user types confirmation, gets success response.
- **W4 (Goal Adjustment Flow)**: Arjun checks goals in Profile, notices emergency fund is 100% but child education is 8%, goes to Dashboard, clicks "Start SIP", reviews bluechip fund in Recommendations, registers it.
- **W5 (Clean State & Rapid Use)**: Click every nav item in order, send multiple messages, check layout and console consistency under rapid inputs, scroll behavior verify.
