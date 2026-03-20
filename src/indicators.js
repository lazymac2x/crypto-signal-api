const ti = require('technicalindicators');

function calculate(candles) {
  const closes = candles.map((c) => c.close);
  const highs = candles.map((c) => c.high);
  const lows = candles.map((c) => c.low);
  const volumes = candles.map((c) => c.volume);

  // RSI (14)
  const rsiValues = ti.RSI.calculate({ values: closes, period: 14 });
  const rsi = rsiValues.length ? rsiValues[rsiValues.length - 1] : null;

  // MACD (12, 26, 9)
  const macdValues = ti.MACD.calculate({
    values: closes,
    fastPeriod: 12,
    slowPeriod: 26,
    signalPeriod: 9,
    SimpleMAOscillator: false,
    SimpleMASignal: false,
  });
  const macd = macdValues.length ? macdValues[macdValues.length - 1] : null;

  // EMA 9, 21, 50
  const ema9 = ti.EMA.calculate({ values: closes, period: 9 });
  const ema21 = ti.EMA.calculate({ values: closes, period: 21 });
  const ema50 = ti.EMA.calculate({ values: closes, period: 50 });

  // Bollinger Bands (20, 2)
  const bbValues = ti.BollingerBands.calculate({
    values: closes,
    period: 20,
    stdDev: 2,
  });
  const bb = bbValues.length ? bbValues[bbValues.length - 1] : null;

  // Stochastic RSI
  const stochRsiValues = ti.StochasticRSI.calculate({
    values: closes,
    rsiPeriod: 14,
    stochasticPeriod: 14,
    kPeriod: 3,
    dPeriod: 3,
  });
  const stochRsi = stochRsiValues.length
    ? stochRsiValues[stochRsiValues.length - 1]
    : null;

  // ATR (14)
  const atrValues = ti.ATR.calculate({
    high: highs,
    low: lows,
    close: closes,
    period: 14,
  });
  const atr = atrValues.length ? atrValues[atrValues.length - 1] : null;

  // Volume SMA (20)
  const volSma = ti.SMA.calculate({ values: volumes, period: 20 });
  const avgVolume = volSma.length ? volSma[volSma.length - 1] : null;
  const currentVolume = volumes[volumes.length - 1];

  return {
    price: closes[closes.length - 1],
    rsi: rsi ? round(rsi) : null,
    macd: macd
      ? {
          MACD: round(macd.MACD),
          signal: round(macd.signal),
          histogram: round(macd.histogram),
        }
      : null,
    ema: {
      ema9: ema9.length ? round(ema9[ema9.length - 1]) : null,
      ema21: ema21.length ? round(ema21[ema21.length - 1]) : null,
      ema50: ema50.length ? round(ema50[ema50.length - 1]) : null,
    },
    bollingerBands: bb
      ? { upper: round(bb.upper), middle: round(bb.middle), lower: round(bb.lower) }
      : null,
    stochRsi: stochRsi
      ? { k: round(stochRsi.k), d: round(stochRsi.d) }
      : null,
    atr: atr ? round(atr) : null,
    volume: {
      current: round(currentVolume),
      average: avgVolume ? round(avgVolume) : null,
      ratio: avgVolume ? round(currentVolume / avgVolume) : null,
    },
  };
}

function round(v) {
  return Math.round(v * 100) / 100;
}

module.exports = { calculate };
