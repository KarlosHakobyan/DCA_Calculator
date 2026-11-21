# Compound Interest & DCA Calculator

An interactive web dashboard for modeling **Compound Interest**, **Dollar-Cost Averaging (DCA)**, **Average Buy Price**, and multi-year portfolio growth. Built with plain **HTML5**, **CSS3**, **JavaScript (ES6+)**, and **Chart.js** with zero build steps or server dependencies.

---

## Features

- **Compounding & DCA Simulation:** Models an initial lump sum, regular monthly DCA contributions, compounding frequency (monthly, quarterly, annually, or daily), annual expense fees, and annual price volatility ($\sigma$).
- **Strategy Presets:** Built-in presets for **Index DCA**, **Volatile DCA**, and **Income / Div** scenarios, plus one-click reset.
- **Multi-Currency & Auto Conversion:** Supports **$ USD**, **€ EUR**, **₽ RUB**, and **֏ AMD** with editable exchange rates relative to `$` and an **Auto** toggle that converts monetary inputs, charts, and tables when switching currencies.
- **Multi-Language Interface:** Full UI translation in **English (`EN`)**, **Russian (`RU`)**, and **Armenian (`HY`)**, starting in English by default.
- **Interactive Charts & Yearly Schedule:**
  - **Portfolio Growth Chart:** Compares projected portfolio value against total invested capital year by year.
  - **DCA Average Buy Price Chart:** Tracks average cost basis against simulated market asset price over time.
  - **Yearly Projection Table:** Breaks down invested capital, accumulated interest, portfolio value, average buy price, and units held per year.
- **Theme Switcher, Guide Modal & Exports:** Includes dark/light themes, an `Info` modal with instructions and glossary, clipboard report copying, and **CSV** / **JSON** exports.

---

## Project Structure

```text
├── index.html   # Page structure, parameter controls, KPI grid, charts, schedule table, and Info modal
├── styles.css   # CSS custom properties, dark/light themes, responsive layout, and modal styles
├── app.js       # Simulation engine, FX rate converter, i18n strings, Chart.js setup, and exports
└── README.md    # Project documentation
```

---

## Key Formulas

| Metric | Formula | Notes |
| :--- | :--- | :--- |
| **Effective Annual Gross Return** | $(1 + r / n)^n - 1$ | $r$ = nominal annual return, $n$ = compounding periods per year |
| **Effective Net Return** | $\text{Effective Gross Return} - f$ | $f$ = annual fee / expense ratio |
| **DCA Average Buy Price** | $\text{Total Cost Basis} / \text{Total Units}$ | Smooths entry price across market price swings |
| **Capital Multiple** | $\text{Final Portfolio Value} / \text{Total Invested}$ | Measures total growth relative to contributed capital |
| **~4% Safe Monthly Drawdown** | $(\text{Final Portfolio Value} \times 0.04) / 12$ | Illustrative monthly withdrawal estimate |

---

## Getting Started

1. Place `index.html`, `styles.css`, and `app.js` in the same directory.
2. Open `index.html` directly in any modern web browser.

---

## License

(C) Karlos Hakobyan
