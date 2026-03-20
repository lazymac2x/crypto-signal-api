# Crypto Signal API — Setup Guide

## Quick Start (30 seconds)

```bash
git clone https://github.com/lazymac2x/crypto-signal-api.git
cd crypto-signal-api
npm install
npm start
```

Open http://localhost:3100 — done!

## API Endpoints

```bash
# Get BUY/SELL/HOLD signal for Bitcoin
curl http://localhost:3100/api/v1/signal/BTCUSDT

# Get signal for Ethereum on 4h timeframe
curl http://localhost:3100/api/v1/signal/ETHUSDT?interval=4h

# Get detailed technical indicators
curl http://localhost:3100/api/v1/indicators/SOLUSDT

# Scan top 20 coins
curl http://localhost:3100/api/v1/screener?limit=20

# Get raw candle data
curl http://localhost:3100/api/v1/candles/BTCUSDT?interval=1d&limit=30
```

## Available Intervals

`1m` `5m` `15m` `1h` `4h` `1d`

## Signal Interpretation

| Signal | Score | Meaning |
|--------|-------|---------|
| STRONG_BUY | ≥ +4 | Multiple indicators aligned bullish |
| BUY | +2 to +3 | Moderate bullish bias |
| HOLD | -1 to +1 | No clear direction |
| SELL | -2 to -3 | Moderate bearish bias |
| STRONG_SELL | ≤ -4 | Multiple indicators aligned bearish |

## Indicators Analyzed

1. **RSI (14)** — Relative Strength Index
2. **MACD (12, 26, 9)** — Moving Average Convergence Divergence
3. **EMA (9, 21, 50)** — Exponential Moving Averages alignment
4. **Bollinger Bands (20, 2)** — Price position relative to bands
5. **Stochastic RSI (14, 14, 3, 3)** — Momentum oscillator
6. **Volume** — Current vs 20-period average ratio

## Deploy to Cloud

### Railway (recommended)
```bash
npm i -g @railway/cli
railway login
railway init
railway up
```

### Docker
```bash
docker build -t crypto-signal-api .
docker run -p 3100:3100 crypto-signal-api
```

## MCP Server (for AI Agents)

```bash
node src/mcp-server.js
```

Add to Claude Desktop config:
```json
{
  "mcpServers": {
    "crypto-signals": {
      "command": "node",
      "args": ["/path/to/crypto-signal-api/src/mcp-server.js"]
    }
  }
}
```

## No API Key Required

This uses Binance's public market data API. No registration or authentication needed.

## Support

GitHub: https://github.com/lazymac2x/crypto-signal-api
