const express = require('express');
const cors = require('cors');
const binance = require('./binance');
const indicators = require('./indicators');
const signals = require('./signals');

const app = express();
const PORT = process.env.PORT || 3100;

app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.json({
    name: 'crypto-signal-api',
    version: '1.0.0',
    endpoints: [
      'GET /api/v1/signal/:symbol',
      'GET /api/v1/indicators/:symbol',
      'GET /api/v1/candles/:symbol',
      'GET /api/v1/screener',
    ],
  });
});

// Signal — combined buy/sell/hold recommendation
app.get('/api/v1/signal/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    const interval = req.query.interval || '1h';
    const candles = await binance.getCandles(symbol, interval, 100);
    const ind = indicators.calculate(candles);
    const signal = signals.generate(ind);

    res.json({
      symbol: symbol.toUpperCase(),
      interval,
      timestamp: Date.now(),
      signal,
      indicators: ind,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Indicators only
app.get('/api/v1/indicators/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    const interval = req.query.interval || '1h';
    const candles = await binance.getCandles(symbol, interval, 100);
    const ind = indicators.calculate(candles);

    res.json({
      symbol: symbol.toUpperCase(),
      interval,
      timestamp: Date.now(),
      indicators: ind,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Raw candle data
app.get('/api/v1/candles/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    const interval = req.query.interval || '1h';
    const limit = Math.min(parseInt(req.query.limit) || 100, 500);
    const candles = await binance.getCandles(symbol, interval, limit);

    res.json({
      symbol: symbol.toUpperCase(),
      interval,
      count: candles.length,
      candles,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Screener — scan top coins
app.get('/api/v1/screener', async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 20, 50);
    const interval = req.query.interval || '1h';
    const topSymbols = await binance.getTopSymbols(limit);

    const results = await Promise.allSettled(
      topSymbols.map(async (t) => {
        const candles = await binance.getCandles(t.symbol, interval, 100);
        const ind = indicators.calculate(candles);
        const signal = signals.generate(ind);
        return {
          symbol: t.symbol,
          price: t.price,
          change24h: t.change24h,
          volume24h: t.volume24h,
          signal: signal.action,
          strength: signal.strength,
          confidence: signal.confidence,
          score: signal.score,
        };
      })
    );

    const screener = results
      .filter((r) => r.status === 'fulfilled')
      .map((r) => r.value)
      .sort((a, b) => b.score - a.score);

    res.json({
      timestamp: Date.now(),
      interval,
      count: screener.length,
      results: screener,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`crypto-signal-api running on http://localhost:${PORT}`);
});
