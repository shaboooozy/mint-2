# Santa Credit

Lending book of **PoshSanta Investment**. Origination and servicing for Nigerian personal loans, ajo circles, and trader cash-flow loans.

This package combines the Harbor apply wizard, PS. Credit intake, and the NaijaLoan servicing model on a single working backend.

## What it does

- Public site with a live naira calculator (rates update while the page is open)
- Applications: personal, ajo circle (create/join), cash-flow sized to weekly sales
- BVN / NUBAN format checks; last four digits stored, not the full BVN
- Admin credit desk: officer login, live rate table, quote, approve, disburse, collect
- Servicing: repayment schedule, penalty on late principal, allocation (penalty → interest → principal)
- Booked loans keep the rate they were approved at. Changing a product rate does not rewrite old loans.

A quote is not an offer. Disbursement is recorded only after an officer enters a bank reference.

## Run

Needs Node 22+. SQLite is built into Node — no Postgres required.

```powershell
cd santa-credit
copy .env.example .env
npm install
npm test
npm start
```

- Site: http://localhost:3000
- Apply: http://localhost:3000/apply
- Credit desk: http://localhost:3000/admin

Default officer (change after first login):

- Email: `admin@poshsanta.ng`
- Password: `ChangeMe!Santa1`

## Products

| Book | Default APR | How interest is charged | Collection |
|---|---|---|---|
| Personal | 24.90% | Reducing balance | Monthly |
| Ajo circle | 18.90% | Reducing balance | Monthly, split across members |
| Trader cash-flow | 21.00% | Flat | Weekly, capped at 8 weeks of sales |

Officers can move those rates in real time from **Rates** or the **Book** sliders.

## Environment

See `.env.example`. Important keys:

- `ADMIN_EMAIL` / `ADMIN_PASSWORD` — first officer account
- `WHATSAPP_NUMBER` — international digits, used on the application confirmation
- `SEED_DEMO` — sample Nigerian applications for the desk (`true` by default)

## Stack

Express, `node:sqlite`, bcrypt sessions, helmet, live SSE rate feed. No build step.
