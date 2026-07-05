# Implementation Plan for SBI FinCoach Pages

This document outlines the step-by-step implementation plan for the 7 page components of the SBI FinCoach application.

## Step 1: Update App.jsx
- Implement the `onQuickAction` callback in `App.jsx`.
- The callback will switch the `activePage` state (e.g., to `'recommendations'`) and append user and bot messages to the `chatMessages` array.
- Pass `onQuickAction` to `<Dashboard />`.

## Step 2: Implement Dashboard.jsx
- Heading: "Dashboard" and `<p>Welcome to SBI FinCoach Dashboard</p>` to preserve test compatibility.
- Header area: "Good morning, Arjun 👋" and current formatted date (e.g. "Sunday, July 5, 2026").
- Stat Cards: Net Worth (₹12.4L, +8.4%), Monthly Savings (₹18,200, +5.2%), Credit Score (762, Excellent), Active Products (4, Stable).
- Life event banner: 🎉 "Salary credited — ₹85,000. Want to move ₹20k to a recurring deposit?" with clickable button "Move to RD".
- Mini bar chart: `react-chartjs-2` showing 7 days of spending with dark styling (white labels, grid lines `#2a2a2a`).
- Quick Action buttons: "Start SIP", "Open FD", "Apply for Loan" calling `onQuickAction`.

## Step 3: Implement Spending.jsx
- Heading: "Spending Analytics".
- Date range tabs: "This Month", "Last 3M", "Last 6M" (clickable tab state).
- Donut chart: Food 28%, Transport 12%, Shopping 22%, Utilities 8%, Entertainment 14%, Others 16%.
- Line chart: Monthly spend trend (last 6 months, e.g. ₹22k, ₹19.5k, ₹24k, ₹21.2k, ₹18.8k, ₹20.5k).
- Merchants table: Swiggy (₹4,200), Amazon (₹8,500), Uber (₹2,100), Netflix (₹799), BigBasket (₹3,600).
- Insight banner: "⚡ You spent ₹4,200 more on food this month. FinCoach suggests reviewing your dining budget."

## Step 4: Implement Recommendations.jsx
- Heading: "Product Recommendations" and subheading "Recommended for Arjun".
- 3 Product Cards:
  - SBI Fixed Deposit: "Park ₹20k for 1 year at 6.8% p.a. → ₹21,360", badge "97% match", CTA "Open FD"
  - SBI Mutual Fund SIP: "₹5,000/month in Bluechip Fund — builds ₹73k in 1 year", badge "94% match", CTA "Start SIP"
  - SBI Term Insurance: "Cover of ₹50L at ₹520/month — best age to start is now", badge "89% match", CTA "Get Quote"

## Step 5: Implement LifeEvents.jsx
- Heading: "Life Events".
- 4 timeline event items with local state dismissal:
  - 🎓 Education EMI ending in 2 months...
  - 💍 Wedding-related spending detected...
  - 🏠 Home loan pre-payment opportunity...
  - 📈 Salary hike detected (+15%)...
- Each card has an AI badge, description, CTA button, and Dismiss button to hide the item.

## Step 6: Implement Notifications.jsx
- Heading: "Notification Feed".
- Filter tabs: All / Nudges / Alerts / Offers.
- 5 items with read/unread toggle:
  - 🔔 FD matures in 7 days (Alerts)
  - 💰 ₹12,000 sitting idle (Nudges)
  - 🛡️ Enable 2FA for YONO (Alerts)
  - 🎁 SimplyCLICK credit card (Offers)
  - 📊 Monthly spending report ready (Nudges)

## Step 7: Implement Portfolio.jsx
- Heading: "Portfolio Tracker".
- Hero net worth value: ₹3,84,200 (+8.4% YTD).
- Holdings table: SBI Bluechip Fund, SBI FD, SBI Savings, Stocks.
- Donut chart: portfolio asset split.
- Line/area chart: 12-month performance.
- AI insight card: "Your portfolio has outperformed... Consider adding ₹10k/month..."

## Step 8: Implement Profile.jsx
- Heading: "Profile / KYC".
- User card: Arjun Sharma, CIBIL 762, customer since 2019, AS initials.
- KYC status section: Aadhaar, PAN, Video KYC verified.
- Linked accounts: Savings and FD.
- Financial goals progress: Retirement corpus, Emergency fund, Child education.
- Toggles: AI nudges, spending alerts, product recommendations (functional in local state).

## Step 9: Design & Refinement
- Add premium styles (Cal.com look: dark colors, thin borders, hover transformations) to `src/App.css` or inline.
- Setup chart.js registrations and custom dark theme settings inside page components.
- Run tests and verify build.
