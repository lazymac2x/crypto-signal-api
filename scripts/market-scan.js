#!/usr/bin/env node

/**
 * Market scan script — top movers with signals
 * Used by Lumen's revenue-sensing cron job
 */

const binance = require('../src/binance');
const indicators = require('../src/indicators');
const signals = require('../src/signals');

async function scan() {
  const top = await binance.getTopSymbols(20);
  const results = [];

  for (const t of top) {
    try {
      const candles = await binance.getCandles(t.symbol, '1h', 100);
      const ind = indicators.calculate(candles);
      const sig = signals.generate(ind);
      results.push({
        symbol: t.symbol,
        price: t.price,
        change24h: t.change24h,
        signal: sig.action,
        score: sig.score,
        confidence: sig.confidence,
        rsi: ind.rsi,
      });
    } catch {
      // skip failed symbols
    }
  }

  results.sort((a, b) => b.score - a.score);

  // Format output
  const buys = results.filter((r) => r.signal.includes('BUY'));
  const sells = results.filter((r) => r.signal.includes('SELL'));

  console.log('📊 Crypto Signal Scan');
  console.log('━━━━━━━━━━━━━━━━━━━━');

  if (buys.length) {
    console.log('\n🟢 BUY Signals:');
    buys.forEach((r) =>
      console.log(`  ${r.symbol.padEnd(12)} ${r.signal.padEnd(12)} Score:${r.score} RSI:${r.rsi} (${r.change24h > 0 ? '+' : ''}${r.change24h}%)`)
    );
  }

  if (sells.length) {
    console.log('\n🔴 SELL Signals:');
    sells.forEach((r) =>
      console.log(`  ${r.symbol.padEnd(12)} ${r.signal.padEnd(12)} Score:${r.score} RSI:${r.rsi} (${r.change24h > 0 ? '+' : ''}${r.change24h}%)`)
    );
  }

  const holds = results.filter((r) => r.signal === 'HOLD');
  console.log(`\n⏸ HOLD: ${holds.length} coins`);
  console.log(`\nTotal scanned: ${results.length}`);

  return results;
}

scan().catch(console.error);
