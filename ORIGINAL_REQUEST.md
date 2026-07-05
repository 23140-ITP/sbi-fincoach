# Original User Request

## Initial Request — 2026-07-05T15:05:44+05:30

Build a high-fidelity, clickable banking AI dashboard called **SBI FinCoach** for the SBI Hackathon @ GFF 2026. This is a demo web app — no backend, all data hardcoded, all AI responses scripted. It must look and feel production-grade enough to impress a jury of SBI senior executives.

Working directory: `C:\Users\yashd\Documents\antigravity\peaceful-lovelace`
Integrity mode: development

---

## Requirements

### R1. Scaffold a Vite + React project and install dependencies

Bootstrap the project using:
```bash
npm create vite@latest . -- --template react --force
npm install
npm install react-chartjs-2 chart.js
```

The dev server must start with `npm run dev` on `http://localhost:5173` with zero errors.

---

### R2. Build the 3-column layout shell

The app must have a persistent 3-column Flexbox layout:
- **Left sidebar** (220px fixed): SBI FinCoach logo/wordmark, 7 navigation items, active state highlight
- **Main content area** (flex: 1, scrollable): renders the currently selected page
- **Right AI chat panel** (360px fixed): always visible, never hidden on desktop

Design system (Cal.com-inspired dark theme, CSS custom properties in `src/index.css`):
```css
--bg: #0a0a0a; --surface: #111111; --card: #1a1a1a; --border: #2a2a2a;
--text: #ffffff; --text-muted: #888888; --accent: #2563eb; --accent-hover: #1d4ed8;
--success: #22c55e; --warning: #f59e0b; --danger: #ef4444;
--radius: 8px; --sidebar-w: 220px; --chat-w: 360px;
```

Font: Inter from Google Fonts. Micro-animations on hover (transform, opacity transitions). No gradients. Tight whitespace. Thin borders (`1px solid var(--border)`).

State management: `activePage` (string) and `chatMessages` (array) lifted to `App.jsx`, passed as props. No Redux, no React Router (use JS state switching).

---

### R3. Build all 7 page components with hardcoded data

All data is hardcoded. No API calls. Pages switch via `activePage` state in `App.jsx`.

**Page 1 — Dashboard (`src/pages/Dashboard.jsx`):**
- Header: "Good morning, Arjun 👋" + current date
- 4 stat cards in a row: Net Worth (₹12.4L), Monthly Savings (₹18,200), Credit Score (762), Active Products (4). Each card: label, value, trend arrow/badge.
- Life event banner (highlighted): 🎉 "Salary credited — ₹85,000. Want to move ₹20k to a recurring deposit?" with CTA "Move to RD"
- Mini bar chart (last 7 days spending) using react-chartjs-2
- Quick action buttons: "Start SIP", "Open FD", "Apply for Loan" — clicking each navigates to the relevant page AND injects a relevant message into the chat panel

**Page 2 — Spending Analytics (`src/pages/Spending.jsx`):**
- Date range tabs: This Month / Last 3M / Last 6M
- Large donut chart: Food 28%, Transport 12%, Shopping 22%, Utilities 8%, Entertainment 14%, Others 16%
- Line chart: monthly spend trend (last 6 months, hardcoded values)
- Top merchants table: Swiggy, Amazon, Uber, Netflix, BigBasket with amounts
- Insight banner: "⚡ You spent ₹4,200 more on food this month. FinCoach suggests reviewing your dining budget."

**Page 3 — Product Recommendations (`src/pages/Recommendations.jsx`):**
- Heading: "Recommended for Arjun"
- 3 product cards:
  - SBI Fixed Deposit: "Park ₹20k for 1 year at 6.8% p.a. → ₹21,360", match badge "97% match", CTA "Open FD"
  - SBI Mutual Fund SIP: "₹5,000/month in Bluechip Fund — builds ₹73k in 1 year", match badge "94% match", CTA "Start SIP"
  - SBI Term Insurance: "Cover of ₹50L at ₹520/month — best age to start is now", match badge "89% match", CTA "Get Quote"

**Page 4 — Life Events (`src/pages/LifeEvents.jsx`):**
- Timeline-style list of 4 AI-detected events:
  - 🎓 "Education EMI ending in 2 months — free up ₹8,500/month. Start investing?"
  - 💍 "Wedding-related spending detected. Want to open a joint savings account?"
  - 🏠 "Home loan pre-payment opportunity — you have ₹40k idle in savings"
  - 📈 "Salary hike detected (+15%) — upgrade your SIP by ₹2,000?"
- Each event: AI badge, explanation text, CTA button, Dismiss button (local useState to hide on dismiss)

**Page 5 — Notification Feed (`src/pages/Notifications.jsx`):**
- Filter tabs: All / Nudges / Alerts / Offers (local state filtering)
- 5 notification items with emoji icons, timestamp, read/unread dot:
  - 🔔 "Your FD of ₹50,000 matures in 7 days. Renew or withdraw?"
  - 💰 "₹12,000 sitting idle in savings for 30+ days. Move to liquid fund?"
  - 🛡️ "Account security tip: Enable 2FA for YONO app"
  - 🎁 "You qualify for SBI SimplyCLICK credit card. 5% cashback on Amazon"
  - 📊 "Monthly spending report ready. You saved 18% more than last month!"

**Page 6 — Portfolio Tracker (`src/pages/Portfolio.jsx`):**
- Total portfolio value hero: ₹3,84,200 (+8.4% YTD)
- Holdings table: SBI Bluechip Fund (₹1,20,000, +12.3%), SBI FD (₹50,000, 6.8%), SBI Savings (₹84,200, 3.5%), Stocks (₹1,30,000, +9.1%)
- Donut chart: portfolio split
- Line/area chart: 12-month performance timeline
- AI insight card: "Your portfolio has outperformed your savings goal by 2.4%. Consider adding ₹10k/month to maintain momentum."

**Page 7 — Profile / KYC (`src/pages/Profile.jsx`):**
- User card: Arjun Sharma, CIBIL 762, Customer since 2019, avatar initials "AS"
- KYC status section: Verified ✅ for Aadhaar, PAN, Video KYC
- Linked accounts: Savings XXXX4521, FD Account XXXX8834
- Financial goals with progress bars: Retirement corpus ₹1.2Cr (34%), Emergency fund ₹3L (100%), Child education ₹50L (8%)
- Toggle switches: AI nudges, spending alerts, product recommendations

---

### R4. Build the AI FinCoach chat panel

File: `src/components/ChatPanel.jsx`

- Header: "FinCoach AI" text + green pulsing status dot (CSS animation)
- Pre-loaded conversation thread (defined as `INITIAL_MESSAGES` constant in App.jsx):
  - Bot: "Hi Arjun! 👋 I noticed your salary was credited today (₹85,000). Want me to help you plan this month's savings?"
  - User: "Yes, what do you suggest?"
  - Bot: "Based on your spending patterns, I recommend: ₹20k → Recurring Deposit, ₹5k → SIP top-up, ₹10k → Emergency buffer. This leaves you ₹50k for expenses. Sound good?"
  - User: "Sounds great. What SIP should I pick?"
  - Bot: "Given your moderate risk appetite, I'd recommend **SBI Bluechip Fund**. ₹5,000/month for 5 years grows to ₹3.7L at 12% p.a. Want me to set that up?"
- Chat input bar (bottom): text input + Send button
- `sendMessage()` behavior: append user message → show 3-dot typing indicator for 1200ms → append bot response from rotating `BOT_RESPONSES` array → clear typing
- Typing indicator: 3 dots with staggered CSS bounce animation
- Page-aware nudges: when `activePage` changes, a context-aware bot message is automatically injected (e.g., switching to Spending page triggers "I see you're looking at your spending. Your food budget is 28% — higher than the 20% ideal.")
- Rotating bot responses array (at least 8 responses covering savings, investments, insurance, spending tips)
- Messages scroll to bottom automatically on new message

**Critical implementation note:** Use `react-chartjs-2` components (`<Doughnut>`, `<Line>`, `<Bar>`) — NOT raw `new Chart()`. Each chart file must call `Chart.register(...registerables)` to avoid "Canvas is already in use" errors on page switch.

---

### R5. Quality bar: premium visual polish

The app must feel like a real banking product, not a student project. Specific requirements:
- All hover states have transitions (150–200ms ease)
- Active sidebar nav item: accent background, white text
- Stat cards: subtle hover lift (`transform: translateY(-2px)`)
- CTA buttons: filled accent blue with hover darkening
- Charts: dark background (`#1a1a1a`), white labels, accent color datasets
- Typography hierarchy: page titles ~24px, section headers ~16px, body 14px, muted labels 12px
- No placeholder text, no "Lorem ipsum", no TODO comments visible in UI
- All Indian Rupee amounts use ₹ symbol with proper formatting (₹12.4L, ₹85,000)
- Responsive at 1280px minimum (chat panel collapses gracefully below 1280px)

---

## Acceptance Criteria

### Build
- [ ] `npm run dev` starts with zero errors and zero warnings in terminal
- [ ] App loads at `http://localhost:5173` in browser without console errors

### Navigation
- [ ] All 7 sidebar nav items are clickable and render the correct page
- [ ] Clicking nav items rapidly (within 200ms) causes no console errors (especially no "Canvas is already in use")
- [ ] Active nav item is visually distinguished (accent color background or border)

### Pages
- [ ] Dashboard: all 4 stat cards visible, life event banner visible, mini chart renders, 3 quick action buttons visible
- [ ] Spending: donut chart renders, line chart renders, top merchants table has 5 rows, date range tabs are clickable
- [ ] Recommendations: all 3 product cards visible with match badges and CTA buttons
- [ ] Life Events: all 4 events visible, dismiss button removes event from view (local state)
- [ ] Notifications: filter tabs work (clicking "Nudges" filters to nudge-type items), all 5 items visible under "All"
- [ ] Portfolio: donut chart renders, area/line chart renders, holdings table has 4 rows
- [ ] Profile: progress bars for 3 financial goals are visible, KYC verified badges visible

### Chat Panel
- [ ] Chat panel is visible on all 7 pages simultaneously
- [ ] Sending any message shows typing indicator (3 dots) for ~1 second before response
- [ ] Bot response appears after typing indicator
- [ ] Chat scrolls to latest message automatically
- [ ] Switching pages triggers a new bot nudge message

### Visual Quality
- [ ] Font is Inter (not system default serif/sans-serif)
- [ ] Background is dark (#0a0a0a or similar near-black), not white
- [ ] Charts have dark backgrounds and are readable (white/accent colored labels)
- [ ] All hover states on nav items and buttons have visible transitions
- [ ] No visible layout overflow or horizontal scrollbars at 1440px viewport

### Polish
- [ ] All amounts show ₹ symbol
- [ ] No visible "TODO", "placeholder", or "Lorem ipsum" text in UI
- [ ] Page title area for each page shows the correct page name
- [ ] SBI FinCoach branding visible in sidebar

---

## Verification Protocol (build → test → fix loop)

After building the app, run this loop until all acceptance criteria pass:

1. **Start dev server:** `npm run dev` — confirm it starts on port 5173 with no errors
2. **Run browser QA:** Open `http://localhost:5173`, click through all 7 pages systematically, check console for errors
3. **Check each acceptance criterion** — mark passing/failing
4. **Fix all failures** — edit source files, dev server hot-reloads
5. **Re-verify** — repeat until all criteria pass
6. **Visual inspection at 1440px** — ensure layout, typography, spacing, and charts look premium
7. **Final check:** switch pages 3x rapidly → no canvas errors in console

Do NOT stop until all acceptance criteria pass. This is a hackathon submission that will be judged visually — quality matters.
