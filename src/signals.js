function generate(indicators) {
  const scores = [];

  // RSI
  if (indicators.rsi !== null) {
    if (indicators.rsi < 30) scores.push({ name: 'RSI', score: 2, reason: `RSI oversold (${indicators.rsi})` });
    else if (indicators.rsi < 40) scores.push({ name: 'RSI', score: 1, reason: `RSI low (${indicators.rsi})` });
    else if (indicators.rsi > 70) scores.push({ name: 'RSI', score: -2, reason: `RSI overbought (${indicators.rsi})` });
    else if (indicators.rsi > 60) scores.push({ name: 'RSI', score: -1, reason: `RSI high (${indicators.rsi})` });
    else scores.push({ name: 'RSI', score: 0, reason: `RSI neutral (${indicators.rsi})` });
  }

  // MACD
  if (indicators.macd) {
    const { histogram } = indicators.macd;
    if (histogram > 0) scores.push({ name: 'MACD', score: 1, reason: `MACD bullish (hist: ${histogram})` });
    else scores.push({ name: 'MACD', score: -1, reason: `MACD bearish (hist: ${histogram})` });
  }

  // EMA trend
  const { ema9, ema21, ema50 } = indicators.ema;
  if (ema9 && ema21 && ema50) {
    if (ema9 > ema21 && ema21 > ema50) scores.push({ name: 'EMA', score: 2, reason: 'EMA aligned bullish (9>21>50)' });
    else if (ema9 < ema21 && ema21 < ema50) scores.push({ name: 'EMA', score: -2, reason: 'EMA aligned bearish (9<21<50)' });
    else scores.push({ name: 'EMA', score: 0, reason: 'EMA mixed' });
  }

  // Bollinger Bands
  if (indicators.bollingerBands) {
    const { upper, lower } = indicators.bollingerBands;
    const price = indicators.price;
    if (price <= lower) scores.push({ name: 'BB', score: 2, reason: 'Price at lower Bollinger Band' });
    else if (price >= upper) scores.push({ name: 'BB', score: -2, reason: 'Price at upper Bollinger Band' });
    else scores.push({ name: 'BB', score: 0, reason: 'Price within Bollinger Bands' });
  }

  // Stochastic RSI
  if (indicators.stochRsi) {
    const { k, d } = indicators.stochRsi;
    if (k < 20 && d < 20) scores.push({ name: 'StochRSI', score: 2, reason: `StochRSI oversold (K:${k} D:${d})` });
    else if (k > 80 && d > 80) scores.push({ name: 'StochRSI', score: -2, reason: `StochRSI overbought (K:${k} D:${d})` });
    else scores.push({ name: 'StochRSI', score: 0, reason: `StochRSI neutral (K:${k} D:${d})` });
  }

  // Volume confirmation
  if (indicators.volume.ratio !== null) {
    if (indicators.volume.ratio > 1.5) scores.push({ name: 'Volume', score: 1, reason: `High volume (${indicators.volume.ratio}x avg)` });
    else if (indicators.volume.ratio < 0.5) scores.push({ name: 'Volume', score: -1, reason: `Low volume (${indicators.volume.ratio}x avg)` });
    else scores.push({ name: 'Volume', score: 0, reason: `Normal volume (${indicators.volume.ratio}x avg)` });
  }

  // Aggregate
  const totalScore = scores.reduce((sum, s) => sum + s.score, 0);
  const maxPossible = scores.length * 2;
  const confidence = maxPossible > 0 ? Math.round(Math.abs(totalScore) / maxPossible * 100) : 0;

  let action, strength;
  if (totalScore >= 4) { action = 'STRONG_BUY'; strength = 'strong'; }
  else if (totalScore >= 2) { action = 'BUY'; strength = 'moderate'; }
  else if (totalScore <= -4) { action = 'STRONG_SELL'; strength = 'strong'; }
  else if (totalScore <= -2) { action = 'SELL'; strength = 'moderate'; }
  else { action = 'HOLD'; strength = 'weak'; }

  return {
    action,
    strength,
    confidence,
    score: totalScore,
    maxScore: maxPossible,
    details: scores,
  };
}

module.exports = { generate };
