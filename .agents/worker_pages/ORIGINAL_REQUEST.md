## 2026-07-05T09:47:09Z
Implement all 7 page components for SBI FinCoach as specified in ORIGINAL_REQUEST.md.
Instructions:
1. Review the files:
   - `src/pages/Dashboard.jsx`
   - `src/pages/Spending.jsx`
   - `src/pages/Recommendations.jsx`
   - `src/pages/LifeEvents.jsx`
   - `src/pages/Notifications.jsx`
   - `src/pages/Portfolio.jsx`
   - `src/pages/Profile.jsx`
2. Implement Dashboard.jsx:
   - Header: Welcome message "Good morning, Arjun 👋" and current date (formatted like "Sunday, July 5, 2026").
   - 4 stat cards in a row: Net Worth (₹12.4L), Monthly Savings (₹18,200), Credit Score (762), Active Products (4). Each has a label, value, trend arrow/badge (e.g. green +8.4%, yellow, etc.).
   - Life event banner: 🎉 "Salary credited — ₹85,000. Want to move ₹20k to a recurring deposit?" with CTA button "Move to RD".
   - Mini bar chart using react-chartjs-2 showing last 7 days of spending (e.g., Mon: 1200, Tue: 900, Wed: 2300, Thu: 1500, Fri: 800, Sat: 3200, Sun: 1900) in dark styling.
   - Quick Action buttons: "Start SIP", "Open FD", "Apply for Loan". Ensure they are clickable. They should call corresponding event handler props (e.g., onQuickAction) to switch pages and inject messages in App.jsx.
3. Implement Spending.jsx:
   - Date range tabs: This Month / Last 3M / Last 6M (clickable, stateful).
   - Large donut chart: Food 28%, Transport 12%, Shopping 22%, Utilities 8%, Entertainment 14%, Others 16%.
   - Line chart: Monthly spend trend (last 6 months, hardcoded values: e.g., ₹22k, ₹19.5k, etc.).
   - Top merchants table: Swiggy, Amazon, Uber, Netflix, BigBasket with amounts (e.g., ₹4,200, ₹8,500, etc.).
   - Insight banner: "⚡ You spent ₹4,200 more on food this month. FinCoach suggests reviewing your dining budget."
4. Implement Recommendations.jsx:
   - Heading: "Recommended for Arjun".
   - 3 product cards:
     - SBI Fixed Deposit: "Park ₹20k for 1 year at 6.8% p.a. → ₹21,360", match badge "97% match", CTA "Open FD"
     - SBI Mutual Fund SIP: "₹5,000/month in Bluechip Fund — builds ₹73k in 1 year", match badge "94% match", CTA "Start SIP"
     - SBI Term Insurance: "Cover of ₹50L at ₹520/month — best age to start is now", match badge "89% match", CTA "Get Quote"
5. Implement LifeEvents.jsx:
   - Timeline of 4 events:
     - 🎓 "Education EMI ending in 2 months — free up ₹8,500/month. Start investing?"
     - 💍 "Wedding-related spending detected. Want to open a joint savings account?"
     - 🏠 "Home loan pre-payment opportunity — you have ₹40k idle in savings"
     - 📈 "Salary hike detected (+15%) — upgrade your SIP by ₹2,000?"
   - AI badge, description, CTA button, Dismiss button (uses local state to hide elements).
6. Implement Notifications.jsx:
   - Tabs: All / Nudges / Alerts / Offers (uses local state filtering).
   - 5 items:
     - 🔔 "Your FD of ₹50,000 matures in 7 days. Renew or withdraw?" (Alerts)
     - 💰 "₹12,000 sitting idle in savings for 30+ days. Move to liquid fund?" (Nudges)
     - 🛡️ "Account security tip: Enable 2FA for YONO app" (Alerts)
     - 🎁 "You qualify for SBI SimplyCLICK credit card. 5% cashback on Amazon" (Offers)
     - 📊 "Monthly spending report ready. You saved 18% more than last month!" (Nudges)
   - Read/unread indicator.
7. Implement Portfolio.jsx:
   - Hero net worth value: ₹3,84,200 (+8.4% YTD).
   - Holdings table: SBI Bluechip Fund (₹1,20,000, +12.3%), SBI FD (₹50,000, 6.8%), SBI Savings (₹84,200, 3.5%), Stocks (₹1,30,000, +9.1%).
   - Donut chart: portfolio split.
   - Line/area chart: 12-month performance timeline.
   - AI insight card: "Your portfolio has outperformed your savings goal by 2.4%. Consider adding ₹10k/month to maintain momentum."
8. Implement Profile.jsx:
   - User card: Arjun Sharma, CIBIL 762 (colored nicely, e.g. green for excellent score), Customer since 2019, avatar initials "AS".
   - KYC status section: Verified Aadhaar, PAN, Video KYC with checkmarks.
   - Linked accounts: Savings XXXX4521, FD Account XXXX8834.
   - Financial goals progress bars: Retirement corpus ₹1.2Cr (34%), Emergency fund ₹3L (100%), Child education ₹50L (8%).
   - Toggles: AI nudges, spending alerts, product recommendations (allow state toggle). Let's make sure the toggles are functional in local state or integrated globally if passed.
9. Important Chart Configuration:
   - For all charts, import and call `Chart.register(...registerables)` from `chart.js` inside the page components to avoid double register canvas errors. Set dark backgrounds, white text labels, and grid lines color `#2a2a2a` to match the theme.
10. Ensure premium look and feel (Cal.com dark theme colors, thin borders, hover transformations).
11. Run build and tests to verify. Update progress and write handoff report.
