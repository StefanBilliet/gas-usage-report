# Gas costs over 7 months

## Problem
Show how a Belgian residential gas contract evolved over a fixed 7-month period, so it is easy to compare monthly consumption, monthly cost, and cost per kWh.

## Scope
- In scope: one fixed gas scenario, one simple visualization, backend simulation via Open Energie API.
- Out of scope: contract comparison dropdown.

## Plan
1. Frontend requests results for a predefined period.
2. Backend accepts a period and runs the simulations for each month in that period.
3. Backend uses the tariff version active in each month.
4. Backend returns month, consumption, total cost incl. VAT, and cost per kWh.
5. Frontend renders the results in a simple chart or table.
6. If the API fails, frontend shows a generic error message.

## Acceptance Criteria
- Given the app loads, when it requests data, then it uses the predefined period October 2025 through April 2026.
- Given the backend receives a period, when it runs the simulation, then it returns results for each month in that period.
- Given the results are returned, then the frontend displays all 7 months.
- Given a month is displayed, then it shows monthly consumption (kWh), monthly cost (€ incl. VAT), and cost per kWh (€c/kWh).
- Given the data is shown, then the user can see how cost per kWh changes over time.
- Given the Open Energie API fails or is unavailable, then the app shows a generic error message instead of the data.
- Given this story is implemented, then no user input form is required.
- Given this story is implemented, then the contract comparison dropdown is not included.

## Notes
- The period is fixed for the exercise, but the backend should accept a period parameter so the same flow can be reused later.
- The tariff version should be resolved per month based on what is active in that month.
