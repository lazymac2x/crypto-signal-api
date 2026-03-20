#!/usr/bin/env node

/**
 * crypto-signal-api MCP Server
 * Exposes crypto technical analysis as MCP tools for AI agents.
 * Protocol: JSON-RPC 2.0 over stdio
 */

const binance = require('./binance');
const indicators = require('./indicators');
const signals = require('./signals');

const TOOLS = [
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

async function handleToolCall(name, args) {
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

// JSON-RPC stdio transport
let buffer = '';

process.stdin.setEncoding('utf8');
process.stdin.on('data', (chunk) => {
  buffer += chunk;
  const lines = buffer.split('\n');
  buffer = lines.pop();
  for (const line of lines) {
    if (line.trim()) handleMessage(line.trim());
  }
});

async function handleMessage(raw) {
  let msg;
  try {
    msg = JSON.parse(raw);
  } catch {
    return;
  }

  const { id, method, params } = msg;

  switch (method) {
    case 'initialize':
      send({
        id,
        result: {
          protocolVersion: '2024-11-05',
          capabilities: { tools: {} },
          serverInfo: { name: 'crypto-signal-api', version: '1.0.0' },
        },
      });
      break;

    case 'notifications/initialized':
      break;

    case 'tools/list':
      send({ id, result: { tools: TOOLS } });
      break;

    case 'tools/call':
      try {
        const result = await handleToolCall(params.name, params.arguments || {});
        send({ id, result: { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] } });
      } catch (err) {
        send({ id, result: { content: [{ type: 'text', text: `Error: ${err.message}` }], isError: true } });
      }
      break;

    default:
      send({ id, error: { code: -32601, message: `Method not found: ${method}` } });
  }
}

function send(obj) {
  process.stdout.write(JSON.stringify({ jsonrpc: '2.0', ...obj }) + '\n');
}

process.stderr.write('crypto-signal-api MCP server started (stdio)\n');
