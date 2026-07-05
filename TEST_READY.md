# Test Suite Readiness: SBI FinCoach

All E2E test cases have been successfully implemented and verified to pass.

## Test Runner Command
```bash
npx vitest run
```

## Test Tiers and Counts

| Tier | Test Count | Description |
| --- | --- | --- |
| **Tier 1 (Feature Coverage)** | 45 | Comprehensive coverage of layout, columns, greetings, cards, charts, tables, timeline items, notification filters, portfolio net worth, KYC details, goals, and chat panel features. |
| **Tier 2 (Boundary & Corner Cases)** | 45 | Edge-case behavior checking including double clicks, inactive actions, window resizing properties, dismissal states, empty notification states, typing delay simulators, empty inputs, long messages, and rotated response indexing. |
| **Tier 3 (Cross-Feature Combinations)** | 9 | Cross-feature integrations: dashboard quick actions triggering page redirection & chat prompt injection; page navigation triggering bot nudges; profile AI nudges toggle turning off page-aware nudges; life events dismissals persisting across page navigation. |
| **Tier 4 (Real-World Workloads)** | 5 | E2E multi-step flows representing complete customer scenarios (Arjun logs in and moves salary to RD; audits spending and disables alert switches; applies for FD; adjustments of goal target paths; rapid state consistency checks). |
| **Total E2E Cases** | **104** | Total test cases implemented across `src/tests/e2e/`. |

## Feature-to-Tier Mapping Checklist

- [x] **F1: App Navigation & Layout Shell**
  - Tier 1: Checked nav link page updates, active classes, layout column presence, transitions, title match.
  - Tier 2: Checked double clicks, inactive clicks, resize window states, invalid pages fallbacks, rapid transition canvas stability.
- [x] **F2: Dashboard Page**
  - Tier 1: Verified welcome Arjun, 4 stats cards rendering, RD banner CTA, mini spending chart, quick action CTAs.
  - Tier 2: Verified RD banner redirection, quick actions redirection/messages, multiple clicks, stat hover details, banner dismissals.
- [x] **F3: Spending Page**
  - Tier 1: Checked 3 date range tabs, donut and line chart existence, top merchants table rows, food budget alert.
  - Tier 2: Checked date tab repeated clicks, chart configs, table name wrapping robustness, line chart zero values, donut totals.
- [x] **F4: Product Recommendations Page**
  - Tier 1: Checked 97% FD match, 94% SIP match, 89% Insurance match, CTA presence, card details.
  - Tier 2: Checked Open FD CTA alert, Start SIP CTA alert, Get Quote CTA alert, color tags classes, hover states.
- [x] **F5: Life Events Page**
  - Tier 1: Verified 4 events in timeline, AI badges, CTAs, Dismiss buttons, initial count.
  - Tier 2: Verified dismissing events statefully (leaves 3, leaves 2, leaves 0 displaying reviewed message), CTA navigation alerts.
- [x] **F6: Notification Feed Page**
  - Tier 1: Verified 5 notifications in 'All', Nudges tab, Alerts tab, Offers tab, filter counts.
  - Tier 2: Verified empty states, switching filter tabs back/forth, read/unread borders toggle, unread calculation.
- [x] **F7: Portfolio Tracker Page**
  - Tier 1: Checked current net worth hero value, holdings table rows, donut split asset allocation, line chart growth.
  - Tier 2: Checked holdings table structure, value calculations, line labels, performance trend colors, insight contents.
- [x] **F8: Profile & KYC Page**
  - Tier 1: Verified Arjun CIBIL score details, Aadhaar/PAN/Video KYC badges, 3 goals progress bars, goals percentages, toggles.
  - Tier 2: Verified AI nudges toggle, spending alert toggle, product recommendations toggle, goals progress bounds, green verification tick labels.
- [x] **F9: AI FinCoach Chat Panel**
  - Tier 1: Verified preloaded thread 5 messages count, online status dot presence, input field, send button.
  - Tier 2: Verified empty message submit block, long message (1000+ chars) support, Enter key submit, typing indicator delay visibility, chatbot responses wrap-around rotation index.
