## 2026-07-05T09:54:26Z

Identity:
- Role: Project Worker
- Working directory: C:\Users\yashd\Documents\antigravity\peaceful-lovelace\.agents\worker_tests

Task: Design and implement the E2E test suite for SBI FinCoach as specified in `TEST_INFRA.md`.
Instructions:
1. Create a folder `src/tests/e2e/` if it does not exist.
2. Implement 104+ test cases inside test files under `src/tests/e2e/` (e.g. `navigation.test.jsx`, `pages.test.jsx`, `chat.test.jsx`, `integration.test.jsx` or similar structured files) utilizing Vitest and React Testing Library:
   - **Tier 1 (Feature Coverage, >=45 tests)**: Assert layout columns, headers, stat cards, custom tables, tabs switching, holdings list, Profile CIBIL, preloaded chat history, input fields.
   - **Tier 2 (Boundary & Corner Cases, >=45 tests)**: Assert double clicks, resizing mock layouts, clicking active pages, rapid transitions, local dismissals (LifeEvents dismiss makes events disappear statefully), notification tab empty states, typing indicator delays (use fake timers in Vitest), empty chats, long chat messages, rotating response indexing.
   - **Tier 3 (Cross-Feature Combinations, >=9 tests)**: Check Dashboard Quick Actions (SIP, FD, Loan) triggering page-switches and chat prompt injections; page switches triggering bot nudges; Profile AI nudges toggle turning off page-aware nudges.
   - **Tier 4 (Real-World Workloads, >=5 tests)**: End-to-end multi-step flows (e.g. Arjun logs in, sees credit, moves to RD, checks portfolio, switches alerts, reviews goals, applies for SIP).
3. Ensure you mock the HTML Canvas Context in the test files (or setup) so that Chart.js does not throw errors under JSDOM. If there is already a mock in `src/test/setup.js`, make sure it is loaded and used.
4. Run the test suite via `powershell -ExecutionPolicy Bypass -Command "npx vitest run"` to verify all 104+ test cases pass perfectly.
5. Create `TEST_READY.md` at the project root following the format in Project pattern:
   - Test runner command: `npx vitest run`
   - Table displaying Tiers, counts, and descriptions.
   - Checklist mapping each feature (F1 to F9) to its coverage across the tiers.
6. Verify production build compiles cleanly and OxLint is warning-free.

MANDATORY INTEGRITY WARNING:
> DO NOT CHEAT. All implementations must be genuine. DO NOT
> hardcode test results, create dummy/facade implementations, or
> circumvent the intended task. A Forensic Auditor will independently
> verify your work. Integrity violations WILL be detected and your
> work WILL be rejected.
