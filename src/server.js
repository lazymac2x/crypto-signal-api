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
      'POST /mcp',
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

// ============================================================
// MCP HTTP Endpoint — JSON-RPC 2.0 over POST /mcp
// ============================================================

const MCP_SERVER_INFO = {
  name: 'crypto-signal-api',
  version: '1.0.0',
};

const MCP_TOOLS = [
  {
    name: 'get_crypto_signal',
    description: 'Get a buy/sell/hold trading signal for a cryptocurrency pair with technical analysis',
    inputSchema: {
      type: 'object',
      properties: {
        symbol: { type: 'string', description: 'Trading pair (e.g. BTCUSDT, ETHUSDT)', default: 'BTCUSDT' },
        interval: { type: 'string', description: 'Candle interval (1m,5m,15m,1h,4h,1d)', default: '1h' },
      },
      required: ['symbol'],
    },
  },
  {
    name: 'get_crypto_indicators',
    description: 'Get detailed technical indicators (RSI, MACD, EMA, Bollinger Bands, etc.) for a crypto pair',
    inputSchema: {
      type: 'object',
      properties: {
        symbol: { type: 'string', description: 'Trading pair (e.g. BTCUSDT)', default: 'BTCUSDT' },
        interval: { type: 'string', description: 'Candle interval', default: '1h' },
      },
      required: ['symbol'],
    },
  },
  {
    name: 'screen_crypto_market',
    description: 'Scan top cryptocurrencies by volume and return trading signals for each',
    inputSchema: {
      type: 'object',
      properties: {
        limit: { type: 'number', description: 'Number of top coins to scan (max 50)', default: 20 },
        interval: { type: 'string', description: 'Candle interval', default: '1h' },
      },
    },
  },
];

async function mcpExecuteTool(name, args) {
  switch (name) {
    case 'get_crypto_signal': {
      const symbol = args.symbol || 'BTCUSDT';
      const interval = args.interval || '1h';
      const candles = await binance.getCandles(symbol, interval, 100);
      const ind = indicators.calculate(candles);
      const signal = signals.generate(ind);
      return { symbol: symbol.toUpperCase(), interval, signal, indicators: ind };
    }

    case 'get_crypto_indicators': {
      const symbol = args.symbol || 'BTCUSDT';
      const interval = args.interval || '1h';
      const candles = await binance.getCandles(symbol, interval, 100);
      const ind = indicators.calculate(candles);
      return { symbol: symbol.toUpperCase(), interval, indicators: ind };
    }

    case 'screen_crypto_market': {
      const limit = Math.min(args.limit || 20, 50);
      const interval = args.interval || '1h';
      const topSymbols = await binance.getTopSymbols(limit);
      const results = await Promise.allSettled(
        topSymbols.map(async (t) => {
          const candles = await binance.getCandles(t.symbol, interval, 100);
          const ind = indicators.calculate(candles);
          const signal = signals.generate(ind);
          return {
            symbol: t.symbol, price: t.price, change24h: t.change24h,
            signal: signal.action, confidence: signal.confidence, score: signal.score,
          };
        })
      );
      const screener = results.filter((r) => r.status === 'fulfilled').map((r) => r.value).sort((a, b) => b.score - a.score);
      return { count: screener.length, interval, results: screener };
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

async function handleMcpRequest(body) {
  const { id, method, params } = body;

  switch (method) {
    case 'initialize':
      return {
        jsonrpc: '2.0',
        id,
        result: {
          protocolVersion: '2024-11-05',
          capabilities: { tools: {} },
          serverInfo: MCP_SERVER_INFO,
        },
      };

    case 'notifications/initialized':
      return { jsonrpc: '2.0', id, result: {} };

    case 'tools/list':
      return { jsonrpc: '2.0', id, result: { tools: MCP_TOOLS } };

    case 'tools/call':
      try {
        const result = await mcpExecuteTool(params.name, params.arguments || {});
        return {
          jsonrpc: '2.0',
          id,
          result: {
            content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
          },
        };
      } catch (err) {
        return {
          jsonrpc: '2.0',
          id,
          result: {
            content: [{ type: 'text', text: `Error: ${err.message}` }],
            isError: true,
          },
        };
      }

    default:
      return {
        jsonrpc: '2.0',
        id,
        error: { code: -32601, message: `Method not found: ${method}` },
      };
  }
}

app.post('/mcp', async (req, res) => {
  try {
    const response = await handleMcpRequest(req.body);
    res.json(response);
  } catch (err) {
    res.status(500).json({
      jsonrpc: '2.0',
      id: req.body?.id || null,
      error: { code: -32603, message: `Internal error: ${err.message}` },
    });
  }
});

// ============================================================

app.listen(PORT, () => {
  console.log(`crypto-signal-api running on http://localhost:${PORT}`);
});
