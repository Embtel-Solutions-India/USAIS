# US Area Immigration Services — Website

## Project Structure

```
/
├── index.html                        ← Homepage
├── pages/
│   ├── l1a.html                      ← L-1A Visa (4-step journey tabs + EB-1C)
│   ├── l1b.html                      ← L-1B Specialized Knowledge Visa
│   ├── global-reach.html             ← Global Reach & US Offices
│   └── settling-services.html        ← Family Settling-In + Business Operations
├── assets/
│   ├── css/
│   │   └── style.css                 ← All shared styles (35 commented sections)
│   └── js/
│       ├── components.js             ← Shared navbar + footer injection
│       └── main.js                   ← Tabs, FAQ accordion, scroll interactions
└── README.md
```

## Running Locally

```bash
npx serve .
# Open http://localhost:3000
```

## How to Make Common Changes

### Update Navigation Links
Edit `assets/js/components.js` — find the `NAV_LINKS` array at the top.

### Update Footer Links / Columns
Edit `assets/js/components.js` — find the `FOOTER_COLS` array.

### Update Colours / Spacing
Edit `assets/css/style.css` — Section 01 (Design Tokens), lines 1–30.

### Add a New Page
1. Create `pages/new-page.html` — copy structure from any existing page file.
2. Set `<body data-page="new-page">`.
3. Add an entry to `NAV_LINKS` in `components.js`.
4. Link CSS/JS: `../assets/css/style.css` and `../assets/js/components.js` + `main.js`.

### Update a Tab (L-1A Journey / Settling Tabs)
- **L-1A tabs**: `pages/l1a.html` — each `<div class="journey-panel" id="tab-xxx">` is one tab.
- **Settling tabs**: `pages/settling-services.html` — `#settle-personal` and `#settle-business`.

### Update Contact Details
Edit `assets/js/components.js` — find `topbarHTML` for phone/email, and `footerHTML` for footer details.

## JS Interactions (main.js)

| Section | What It Does |
|---|---|
| 1. Sticky navbar | Adds `.scrolled` class + shadow on scroll |
| 2. Hamburger | Toggles mobile `.nav-links.open` |
| 3. Smooth scroll | Handles `<a href="#…">` links |
| 4. Journey tabs | `switchJourneyTab(tabId)` — L-1A step tabs |
| 5. Settle tabs  | `switchSettleTab(tabId)` — Settling page tabs |
| 6. FAQ accordion | `.faq-q` click opens/closes `.faq-a` |
