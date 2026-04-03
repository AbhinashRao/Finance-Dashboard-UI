# Finance-Dashboard-UI

A modern, production-grade Finance Dashboard built with React 18, Tailwind CSS, and Recharts. Features role-based access control, interactive charts, full transaction management, and financial insights — all with a sleek dark glassmorphism UI.

---

## Features

### Dashboard Overview
- Summary Cards — Total Balance, Income, and Expenses with month-over-month trend indicators
- Balance Trend Chart — Area chart showing income, expense, and net balance across 6 months
- Spending Breakdown — Donut chart with per-category percentage bars and color coding

### Transactions
- Full table with Date, Description, Amount, Category, and Type
- Live search by description
- Filter by type: All / Income / Expense
- Sort by Date or Amount with ascending/descending toggle
- Empty state UI when no results match filters

### Role-Based UI (Frontend Only)

| Feature | Admin | Viewer |
|---|:---:|:---:|
| View all data | Yes | Yes |
| Add transaction | Yes | No |
| Edit transaction | Yes | No |
| Delete transaction | Yes | No |

- Toggle between Admin and Viewer from the top navbar
- Role persists across sessions via localStorage

### Insights
- Top Spending Category with visual progress bar
- Total Transaction Count split by income and expense
- Income vs Last Month with percentage delta
- Expense vs Last Month with percentage delta
- Monthly Bar Chart — side-by-side May vs June comparison

### UX Details
- Responsive layout — works on mobile, tablet, and desktop
- Dark glassmorphism theme with light mode toggle ready
- State persists to localStorage so data survives page refresh
- Two-step delete confirmation to prevent accidental deletions
- Form validation on Add/Edit transaction modal
- Smooth CSS animations on page transitions and card hovers

---

## Tech Stack

| Layer | Choice |
|---|---|
| UI Framework | React 18 (functional components + hooks) |
| Styling | Tailwind CSS v3 |
| Charts | Recharts |
| Icons | Lucide React |
| State Management | React Context API + useReducer |
| Persistence | localStorage |
| Build Tool | Vite 5 |
| Fonts | DM Serif Display, DM Sans, JetBrains Mono |

---

## Project Structure

```
finance-dashboard/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── SummaryCards.jsx
│   │   ├── BalanceChart.jsx
│   │   ├── SpendingChart.jsx
│   │   ├── TransactionsTable.jsx
│   │   ├── TransactionModal.jsx
│   │   └── Insights.jsx
│   ├── pages/
│   │   ├── DashboardPage.jsx
│   │   ├── TransactionsPage.jsx
│   │   └── InsightsPage.jsx
│   ├── context/
│   │   └── FinanceContext.jsx
│   ├── data/
│   │   └── mockData.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## Getting Started

### Prerequisites
- Node.js 18 or above
- npm 9 or above

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/finance-dashboard.git
cd finance-dashboard

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open http://localhost:5173 in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## State Management

All global state lives in src/context/FinanceContext.jsx using React Context API and useReducer.

| State Slice | Description |
|---|---|
| transactions | Array of all income and expense records |
| role | admin or viewer |
| darkMode | Boolean for theme toggle |
| filters | search, type, sortBy, sortDir |
| activeTab | Current page: dashboard, transactions, or insights |

State is automatically synced to localStorage on every change.

### Available Actions

```js
dispatch({ type: 'ADD_TRANSACTION',    payload: transaction })
dispatch({ type: 'EDIT_TRANSACTION',   payload: transaction })
dispatch({ type: 'DELETE_TRANSACTION', payload: id })
dispatch({ type: 'SET_ROLE',           payload: 'admin' | 'viewer' })
dispatch({ type: 'TOGGLE_DARK' })
dispatch({ type: 'SET_FILTER',         payload: { search, type, sortBy, sortDir } })
dispatch({ type: 'SET_TAB',            payload: 'dashboard' | 'transactions' | 'insights' })
```

---

## Mock Data

Comes with 28 pre-loaded transactions across June and May 2025 covering 12 categories:

Salary, Freelance, Investment, Housing, Food and Dining, Transport, Entertainment, Healthcare, Shopping, Utilities, Travel, Education

### Reset Data

To wipe all saved data and restore defaults, run this in your browser DevTools console:

```js
localStorage.removeItem('finance_dashboard_v1')
```

Then refresh the page.

---

## Roadmap

- Complete dark and light mode CSS theme switching
- Export transactions as CSV
- Date range picker for filtering
- Budget limits per category with alert indicators
- Backend integration with REST or Firebase
- Multi-currency support

---

## License

MIT — free to use, modify, and distribute.
