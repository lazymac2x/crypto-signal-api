# crypto-signal-api

## Description
Real-time cryptocurrency trading signal generator. Analyzes 6 technical indicators (RSI, MACD, EMA, Bollinger Bands, Stochastic RSI, Volume) from Binance live data to produce BUY/SELL/HOLD signals with confidence scores. Available as REST API and MCP server.

## Category
Finance / Crypto / Trading

## Tags
crypto, trading, technical-analysis, signals, binance, bitcoin, ethereum, RSI, MACD, MCP

## Features
- Live market data from Binance (no API key needed)
- 6 technical indicators with detailed breakdown
- Composite signal scoring (STRONG_BUY → STRONG_SELL)
- Market screener: scan top coins by volume
- REST API + MCP server dual interface
- Zero configuration required

## Usage

### As REST API
```bash
npm install && npm start
# GET http://localhost:3100/api/v1/signal/BTCUSDT
```

### As MCP Tool
```bash
node src/mcp-server.js
```
Tools: `get_crypto_signal`, `get_crypto_indicators`, `screen_crypto_market`

## Pricing
- Free tier: 100 requests/day
- Pro: $9.99/month (unlimited)
- Enterprise: Contact

## Author
lazymac2x
