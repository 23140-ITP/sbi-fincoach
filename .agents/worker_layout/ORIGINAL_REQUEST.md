## 2026-07-05T09:44:28Z

Identity:
- Role: Project Worker
- Working directory: C:\Users\yashd\Documents\antigravity\peaceful-lovelace\.agents\worker_layout

Task: Implement the core layout and navigation for SBI FinCoach.
Instructions:
1. Update `src/index.css` to load the Inter font (via `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');` at the top) and define CSS custom variables exactly as requested:
   ```css
   :root {
     --bg: #0a0a0a;
     --surface: #111111;
     --card: #1a1a1a;
     --border: #2a2a2a;
     --text: #ffffff;
     --text-muted: #888888;
     --accent: #2563eb;
     --accent-hover: #1d4ed8;
     --success: #22c55e;
     --warning: #f59e0b;
     --danger: #ef4444;
     --radius: 8px;
     --sidebar-w: 220px;
     --chat-w: 360px;
   }
   ```
   Configure global box-sizing, background, custom scrollbars, text color, and hover transition utilities.
2. Create stubs for the 7 pages under `src/pages/`:
   - `Dashboard.jsx`, `Spending.jsx`, `Recommendations.jsx`, `LifeEvents.jsx`, `Notifications.jsx`, `Portfolio.jsx`, `Profile.jsx`.
   - Each page stub should return a basic styled `div` with the page title inside.
3. Create a sidebar component `src/components/Sidebar.jsx`:
   - Renders "SBI FinCoach" logo/branding.
   - Renders 7 navigation items: Dashboard, Spending Analytics, Product Recommendations, Life Events, Notification Feed, Portfolio Tracker, Profile / KYC.
   - Accepts `activePage` and `setActivePage` as props. Marks active item with accent background and white text. Uses transitions for hovers.
4. Create a chat panel stub `src/components/ChatPanel.jsx` that accepts `chatMessages` and `onSendMessage`.
5. Create a layout component `src/components/Layout.jsx`:
   - Renders a 3-column Flexbox layout.
   - Left Sidebar (220px fixed).
   - Main Content Area (flex: 1, scrollable, padded).
   - Right AI Chat Panel (360px fixed).
   - Incorporate media query to gracefully collapse the chat panel under 1280px.
6. Update `src/App.jsx` to define state:
   - `activePage` (default to 'dashboard')
   - `chatMessages` (initialized with the preloaded 5-message conversation thread between Arjun and FinCoach)
   - Wire them to the Layout, Sidebar, active Page component, and ChatPanel.
7. Run `npm run build` and tests to ensure no regressions. Write progress and handoff files.
