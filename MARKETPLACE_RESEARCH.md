# API/MCP/Skills Marketplace Research — Actionable Strategy Guide
**Date:** 2026-03-20
**Purpose:** crypto-signal-api + future products monetization

---

## PART 1: MARKETPLACE-BY-MARKETPLACE BREAKDOWN

---

### 1. RapidAPI

**What it is:** World's largest API marketplace. Nokia acquired it recently.

**Registration:**
- Sign up at rapidapi.com (Google/GitHub/email)
- Go to "My APIs" → Provider Dashboard → Add New API
- Point RapidAPI to your hosted API endpoint (you host it yourself)
- Set up pricing tiers, documentation auto-generated from OpenAPI spec

**Revenue Split:**
- RapidAPI takes **25% flat** on all sales
- You keep **75%**
- PayPal processing fee on top: ~2% (max $20 cap)

**Payout:**
- **PayPal ONLY** — no Stripe, no wire transfer
- Consolidated monthly: charges from Month 1 paid out end of Month 2
- Minimum payout: not explicitly stated, but PayPal minimums apply

**Recommended Pricing Tiers for crypto-signal-api:**
| Tier | Price | Quota | Target |
|------|-------|-------|--------|
| Free | $0 | 100 req/mo, 3 symbols | Hook users |
| Basic | $15/mo | 5,000 req/mo, all symbols | Hobbyists |
| Pro | $50/mo | 50,000 req/mo + screener | Active traders |
| Ultra | $100/mo | 200,000 req/mo + priority | Bot builders |

**What Sells Well:**
- Crypto price/signal APIs ($10-$100/mo tiers)
- AI/ML APIs (text, image, sentiment)
- Data enrichment APIs
- Finance/stock APIs
- The crypto signal niche is active — competitors price at $10-$100/mo

**Time to First Sale:** 2-6 weeks (requires SEO optimization of listing + free tier to attract users)

**Money Flow:** RapidAPI → PayPal (USD) → Woori Bank (KRW)

---

### 2. Gumroad

**What it is:** Digital product marketplace. Strong for code bundles, templates, one-time purchases.

**Registration:**
- Sign up at gumroad.com (email)
- Verify identity (standard KYC)
- Add PayPal or bank account for payouts
- Create product listing (upload files, set price)

**Revenue Split / Fees:**
- **Direct sales (your traffic):** 10% + $0.50 per transaction
- **Discover marketplace sales:** 30% fee
- Payment processing (Stripe underneath): ~2.9% + $0.30
- **Total effective fee on direct:** ~13-14%
- **Total effective fee on marketplace discovery:** ~33%
- Gumroad is Merchant of Record since Jan 2025 (handles all VAT/GST/sales tax)

**Payout:**
- Weekly on Fridays
- PayPal for international creators (2-3% PayPal receiving fee)
- USD only — currency conversion spread ~1-2% on top

**Best Product Strategy for crypto-signal-api:**
- Sell as a **code bundle + self-hosted API** ($49-$99 one-time)
- Sell **monthly API access keys** ($19/mo subscription)
- Include setup guide, Docker compose, ENV template
- Upsell: Premium tier with more symbols/faster updates

**What Sells Well on Gumroad:**
- Specific niche tools > generic products (always)
- Developer templates and boilerplates ($29-$149)
- AI prompt packs ($9-$49)
- Automation workflow bundles ($29-$99)
- Code snippets with docs ($19-$79)

**Time to First Sale:** 1-4 weeks (faster if you drive own traffic via Twitter/X)

**Money Flow:** Gumroad → PayPal (USD) → Woori Bank (KRW)

---

### 3. MCPize (mcpize.com)

**What it is:** Only MCP-specific marketplace with hosting + monetization in one platform. 350+ servers, 20+ categories.

**Registration:**
1. Sign up at mcpize.com (Google/GitHub/email)
2. Complete developer profile, verify email
3. Install CLI: `npm install -g @mcpize/cli`
4. Login: `mcpize login` (browser-based auth)

**Deployment:**
```bash
mcpize init my-server
cd my-server
mcpize deploy
```

**Revenue Split:**
- **85/15** — you keep 85%, MCPize takes 15%
- Stripe payouts (you connect your own Stripe account)

**Pricing Configuration:**
- Done via MCPize Dashboard after deployment
- Set pricing tiers, define plan features through web UI
- Subscription model recommended for recurring revenue

**Payout:**
- Via Stripe Connect — monthly on 1st
- Stripe supports banks in 45+ countries
- **BLOCKER:** Stripe does not support Korean individual accounts directly. Need Stripe Atlas LLC or Payoneer workaround (see Part 3)

**Recommended Pricing for crypto-signal-api MCP server:**
| Tier | Price | Features |
|------|-------|----------|
| Free | $0 | 3 symbols, basic signals |
| Starter | $9/mo | All symbols, 5-min intervals |
| Pro | $29/mo | All symbols, 1-min intervals, screener |
| Enterprise | $99/mo | Priority, custom intervals, webhook alerts |

**Time to First Sale:** 2-4 weeks (MCP ecosystem growing fast, less competition than RapidAPI)

**Money Flow:** MCPize → Stripe → (Stripe Atlas US bank → Wise/PayPal → Woori Bank) OR (Payoneer virtual US bank)

---

### 4. Apify Store

**What it is:** Web scraping/automation marketplace. 20,000+ actors. Top creators earn $10K+/mo.

**Registration:**
1. Sign up at apify.com
2. Build your Actor using Apify SDK (Node.js/Python)
3. Publish to Apify Store
4. Complete KYC verification for payouts
5. Set pricing model

**Revenue Split:**
- You earn **80%** of revenue minus platform usage costs
- Apify takes 20%

**Pricing Models (choose one):**
- **Pay per result** — users pay for each data item returned
- **Pay per event** — users pay per API call or page processed
- **Pay per usage** — users pay for compute resources consumed
- ~~Rental~~ — being sunset in 2026 (April: no new rental, October: fully retired)

**Payout Process:**
- Day 11 of each month: invoice generated for previous month
- Days 11-14: review/approve (auto-approved if no action)
- Days 15-22: payment released
- **Wire transfer or PayPal** only
- Minimum: $20 (PayPal), $100 (wire transfer)
- All payouts in USD

**Best Product Strategy:**
- Build crypto data scrapers (exchange data, on-chain, social sentiment)
- Not ideal for our signal API directly, but great for complementary products
- Web scrapers for crypto news, social media sentiment, whale tracking

**Time to First Sale:** 3-6 weeks (requires KYC + building within Apify framework)

**Money Flow:** Apify → Wire/PayPal (USD) → Woori Bank (KRW)

---

### 5. Cryptohopper Marketplace

**What it is:** Trading bot platform with marketplace for signals, strategies, templates. 500K+ users.

**Registration Requirements (strict):**
- Must reach **Master level** (auto-approved) OR **Expert level** with 6+ months trading history
- Need active community + proven track record
- Own social media presence required
- KYC/identity verification required (Dany must do this)

**Revenue Split:**
- Standard: **70%** (Cryptohopper takes 30%)
- Exclusive sellers: **85%** (Cryptohopper takes 15%)

**Payout:**
- Credits deposited 1.5 months after month-end
- Minimum $75 to withdraw
- **Payout via BitPay** (crypto: USDT, BTC, etc.)
- No bank transfer — crypto only

**Pricing for Signal Subscriptions:**
- Signal providers typically charge $15-$50/month
- Strategy templates: $10-$100 one-time
- Bot templates: $15-$75

**Time to First Sale:** 4-8 weeks (qualification process takes time)

**Money Flow:** Cryptohopper → BitPay (USDT/BTC) → Exchange (Upbit/Binance) → KRW → Woori Bank

---

### 6. Lemon Squeezy (Stripe-owned)

**What it is:** All-in-one platform for SaaS and digital products. Merchant of Record. Best for subscription-based API access.

**Why Consider It:**
- Handles ALL tax compliance (VAT/GST/sales tax) in 100+ countries
- Lower fees than Gumroad for direct sales
- REST API + webhooks for automating license key delivery
- Official SDKs: JS/TS, Python, PHP, Go

**Fees:**
- **5% + $0.50** per transaction (base)
- +1.5% for international transactions
- +3% if affiliate program used
- **Total effective: ~6.5-8.5%** (much cheaper than Gumroad's 13%+)

**Payout:**
- Via Stripe (Lemon Squeezy is owned by Stripe)
- Same Stripe Korea limitation applies
- Need Stripe Atlas LLC or workaround

**Best Use Case:**
- Sell API subscription access with auto-generated license keys
- Sell code bundles with embedded API access
- Better than Gumroad for developer tools specifically

---

### 7. n8n Workflow Marketplace(s)

**What it is:** Multiple third-party marketplaces for selling n8n automation templates.

**Platforms:**
- n8nmarket.com — dedicated n8n marketplace
- ManageN8N marketplace
- Gumroad (cross-list)
- HaveWorkflow.com

**Revenue Potential:**
- Simple workflows: $29-$99
- Complex industry-specific: $149-$299+
- Real-world example: $3,200/month from 5 templates (passive)
- Another example: $4,200 total over 4 months

**Best Strategy:**
- Create n8n workflow that USES our crypto-signal-api
- "Crypto Trading Signal Dashboard" template
- "Auto-post Crypto Signals to Telegram/Discord" workflow
- Cross-list on multiple platforms

---

### 8. Other Marketplaces Worth Noting

| Platform | Type | Revenue | Notes |
|----------|------|---------|-------|
| **SkillsMP** | Claude/Codex skills directory | Free/open source | Discovery only, not direct sales. Good for visibility. |
| **SkillHub** | Claude skills marketplace | TBD | Newer platform |
| **MCP Market** (mcpmarket.com) | MCP server directory | Free listing | Discovery/ranking, drives traffic |
| **LobeHub Skills** | Agent skills marketplace | Free | Large directory, cross-platform |
| **Fiverr/Upwork** | Service marketplace | 80% (Fiverr 20% fee) | Sell as a service: "I'll set up crypto signals for you" |

---

## PART 2: PAYMENT INFRASTRUCTURE FOR KOREAN SELLERS

---

### Option A: PayPal Korea (Simplest — Start Here)

**Status:** Fully available in Korea. Woori Bank supported.

**Setup:**
1. Create PayPal account at paypal.com/kr
2. Link Woori Bank account
3. Verify identity

**Withdrawal to Woori Bank:**
- Minimum: $10 USD
- Fee: **FREE if withdrawing 150,000 KRW or more** (~$110 USD)
- Fee if under 150,000 KRW: small fixed fee applies
- Processing time: 3-5 business days
- Daily limit: $20,000 USD equivalent
- **Xoom (PayPal subsidiary) deposits to Woori Bank arrive within minutes**

**Works With:**
- RapidAPI (PayPal only)
- Gumroad (PayPal for international)
- Apify (PayPal option)

**Total Cost Chain Example (RapidAPI $100 sale):**
- RapidAPI takes 25%: -$25
- PayPal receiving fee: ~2% = -$1.50
- PayPal withdrawal to Woori: FREE (if >150K KRW)
- Currency conversion spread: ~2.5% = -$1.83
- **Net received: ~$71.67 (~71.7%)**

---

### Option B: Stripe Atlas Delaware LLC (Best Long-term)

**What:** Form a US LLC via Stripe ($500 one-time). Gets you a real US business entity.

**Why You Need This:**
- **Stripe does NOT allow Korean individuals to create accounts directly**
- Korean corporations also cannot open Stripe accounts (as of 2026)
- Stripe Atlas LLC is the standard workaround for Korean sellers

**What You Get:**
- Delaware LLC formation
- EIN (US tax ID)
- US business bank account (Mercury or similar)
- Full Stripe payment processing account
- Cost: **$500 one-time** + $300/year Delaware LLC tax

**Process:**
1. Go to stripe.com/atlas
2. Fill out application (Korean passport + address is fine)
3. Choose LLC (single-member = sole proprietorship tax treatment)
4. Wait ~1-3 weeks for formation
5. Receive EIN, open US bank account
6. Connect Stripe for payments

**Tax Implications:**
- Annual Delaware LLC fee: $300
- Single-member LLC with non-US activity: generally pass-through to personal Korean taxes
- US-Korea tax treaty exists — prevents double taxation
- **MUST consult Korean tax professional** for proper reporting
- May need to report foreign financial accounts to Korean NTS (국세청)

**Works With:**
- MCPize (Stripe Connect required)
- Lemon Squeezy (Stripe-based)
- Gumroad (as additional payout option)
- Any Stripe-dependent platform

**Total Cost Chain Example (MCPize $100 sale):**
- MCPize takes 15%: -$15
- Stripe processing: ~2.9% + $0.30 = -$3.20
- Stripe to US bank: FREE
- US bank to Woori (via Wise): ~0.5-1% = -$0.82
- **Net received: ~$80.98 (~81%)**

---

### Option C: Payoneer (Middle Ground)

**What:** International payment platform. Virtual US/EU bank accounts.

**Why Consider:**
- Creates virtual US bank account you can link to platforms that need "US bank details"
- Can potentially use as Stripe workaround (Australian account trick — grey area)
- Good for receiving marketplace payouts

**Fees:**
- Account: Free
- Receiving payments: up to 3%
- Withdrawal to Korean bank: ~2% + currency conversion
- Processing time: ~2 business days

**Works With:**
- Can receive from various platforms as bank transfer
- Some sellers use Payoneer virtual bank to create Stripe accounts

---

### Option D: Wise Business (Supplementary)

**Status:** Available in Korea (wise.com/kr)

**Features:**
- Hold, convert, send in 40+ currencies
- Get USD account details for receiving
- Mid-market exchange rate (best rates)
- Conversion fee: ~0.5-1%

**Best Use:**
- Use as intermediate step: US bank (from Stripe Atlas) → Wise → Woori Bank
- Cheapest conversion rates available

---

### RECOMMENDED PAYMENT SETUP (Priority Order)

```
IMMEDIATE (Week 1):
  1. PayPal Korea → Woori Bank
     - Enables: RapidAPI, Gumroad, Apify
     - Cost: FREE to set up
     - Works TODAY

MONTH 1:
  2. Stripe Atlas Delaware LLC ($500)
     - Enables: MCPize, Lemon Squeezy, any Stripe platform
     - Opens up ALL marketplaces
     - Professional business entity

MONTH 1-2:
  3. Wise Business Account
     - Best exchange rates for USD → KRW
     - Use for Stripe Atlas LLC bank → Wise → Woori Bank transfers
```

---

## PART 3: STRATEGY — WHAT TO DO FIRST

---

### Week 1: Quick Wins (PayPal-based platforms)

1. **Dany creates PayPal Korea account** → links Woori Bank
2. **List on RapidAPI** (crypto-signal-api as REST API)
   - Host on Railway/Render/Fly.io ($5-7/mo)
   - Set 4 pricing tiers (Free/$15/$50/$100)
   - Optimize listing: good description, example responses, logo
3. **List on Gumroad** (code bundle + API access)
   - Package: source code + Docker + setup guide + 1-month API key
   - Price: $49 one-time OR $19/mo subscription
4. **Publish on Apify** (build a complementary crypto scraper Actor)

### Week 2-3: Stripe-based platforms

5. **Dany applies for Stripe Atlas** ($500)
6. While waiting, prepare MCPize deployment
7. Build Lemon Squeezy product page

### Week 3-4: Expand

8. MCPize goes live once Stripe Atlas completes
9. Cross-list on n8n marketplace (workflow using our API)
10. Apply for Cryptohopper seller (long qualification)

### Month 2+: Scale

11. Second product: Korean exchange MCP server (KIS, Upbit APIs)
12. Third product: Social sentiment scraper (Apify Actor)
13. n8n workflow packs
14. Fiverr gig: "Set up crypto trading signals for your bot"

---

## PART 4: REALISTIC REVENUE PROJECTIONS

| Timeline | Source | Estimate |
|----------|--------|----------|
| Week 2-3 | First Gumroad sales (own marketing) | $50-$200 |
| Week 3-4 | First RapidAPI subscriptions | $30-$100/mo |
| Month 2 | MCPize + Gumroad combined | $200-$500/mo |
| Month 3 | All platforms + second product | $500-$1,500/mo |
| Month 6 | Multiple products, optimization | $2,000-$5,000/mo |

**Key Success Factors:**
- Free tiers are essential (hook users → convert to paid)
- Twitter/X marketing drives Gumroad sales more than anything
- RapidAPI SEO matters: keyword-rich titles and descriptions
- Respond to every user review/question within 24h
- Ship fast, iterate based on feedback

---

## PART 5: DANY ACTION ITEMS (BLOCKERS)

These require human identity verification — lazymac cannot do them:

| Priority | Action | Estimated Time | Enables |
|----------|--------|---------------|---------|
| 1 | **PayPal Korea 계정 생성** + Woori Bank 연동 | 30 min | RapidAPI, Gumroad, Apify |
| 2 | **RapidAPI 계정 생성** (가입 + provider 설정) | 15 min | API 판매 |
| 3 | **Gumroad 계정 생성** (가입 + PayPal 연동) | 15 min | 디지털 제품 판매 |
| 4 | **Stripe Atlas 신청** ($500, Korean passport) | 1 hour | MCPize, Lemon Squeezy |
| 5 | **MCPize 계정 생성** + Stripe Connect | 20 min | MCP 서버 판매 |
| 6 | **Apify 계정 생성** + KYC 인증 | 30 min | Actor 판매 |
| 7 | **Cryptohopper seller 신청** (6개월 트레이딩 기록 필요) | Ongoing | 시그널 판매 |

**Total Dany time needed to unblock everything: ~3 hours**
**Minimum viable (PayPal + RapidAPI + Gumroad): ~1 hour**

---

## Sources

- [RapidAPI Payouts and Finance](https://docs.rapidapi.com/docs/payouts-and-finance)
- [RapidAPI Monetizing Your API](https://docs.rapidapi.com/docs/monetizing-your-api-on-rapidapicom)
- [Gumroad Pricing](https://gumroad.com/pricing)
- [Gumroad Fees Help Center](https://gumroad.com/help/article/66-gumroads-fees)
- [Gumroad Fees Explained 2026 (Dodo Payments)](https://dodopayments.com/blogs/gumroad-fees-explained)
- [MCPize Platform](https://mcpize.com/platform)
- [MCPize Monetize Guide](https://mcpize.com/developers/monetize-mcp-servers)
- [MCPize CLI (GitHub)](https://github.com/mcpize/cli)
- [Apify Actor Monetization](https://docs.apify.com/platform/actors/publishing/monetize)
- [Apify Developer Payouts](https://help.apify.com/en/articles/10057167-how-developer-payouts-work)
- [Apify How Monetization Works](https://docs.apify.com/academy/actor-marketing-playbook/store-basics/how-actor-monetization-works)
- [Cryptohopper Sellers Docs](https://docs.cryptohopper.com/docs/sellers/)
- [Cryptohopper Withdraw Earnings](https://docs.cryptohopper.com/docs/sellers/withdraw-earnings/)
- [Cryptohopper Seller Terms](https://docs.cryptohopper.com/docs/sellers/terms-and-conditions/)
- [Lemon Squeezy Fees](https://docs.lemonsqueezy.com/help/getting-started/fees)
- [Lemon Squeezy Pricing](https://www.lemonsqueezy.com/pricing)
- [Stripe Atlas](https://stripe.com/atlas)
- [Stripe Atlas Business Taxes](https://docs.stripe.com/atlas/business-taxes)
- [Stripe Korea Payments](https://docs.stripe.com/payments/countries/korea)
- [Stripe Korea 한국 사용 가능 여부 (inblog)](https://inblog.ai/ko/blog/stripe-in-korea)
- [PayPal Korea Withdrawal](https://www.paypal.com/kr/webapps/mpp/paypal-withdrawal?locale.x=en_KR)
- [Payoneer Pricing](https://www.payoneer.com/about/pricing/)
- [Wise Korea](https://wise.com/kr/)
- [SkillsMP Marketplace](https://skillsmp.com)
- [n8n Workflow Selling Guide](https://www.browseract.com/blog/how-to-make-money-with-n8n-workflow-automation)
- [Top API Marketplaces 2026 (DigitalAPI)](https://www.digitalapi.ai/blogs/best-api-marketplaces)
- [Top Platforms to Monetize APIs (Market Clarity)](https://mktclarity.com/blogs/news/list-sell-api-data)
