"""Market data service - fetches real-time prices via yfinance."""

import logging
from dataclasses import dataclass

logger = logging.getLogger(__name__)

# Tracked assets grouped by sector
ASSETS: dict[str, dict[str, str]] = {
    # === Broad Market Indices ===
    "sp500":   {"symbol": "^GSPC",   "name": "S&P 500",                "emoji": "📈", "sector": "Индексы"},
    "nasdaq":  {"symbol": "^IXIC",   "name": "NASDAQ",                 "emoji": "💻", "sector": "Индексы"},
    "sox":     {"symbol": "^SOX",    "name": "Полупроводники (SOX)",   "emoji": "🔬", "sector": "Индексы"},
    # === Commodities ===
    "gold":    {"symbol": "GC=F",    "name": "Золото",                 "emoji": "🥇", "sector": "Сырьё"},
    "silver":  {"symbol": "SI=F",    "name": "Серебро",                "emoji": "🥈", "sector": "Сырьё"},
    "copper":  {"symbol": "HG=F",    "name": "Медь",                   "emoji": "🟤", "sector": "Сырьё"},
    "oil":     {"symbol": "BZ=F",    "name": "Нефть Brent",            "emoji": "🛢️", "sector": "Сырьё"},
    # === Sector ETFs ===
    "remx":    {"symbol": "REMX",    "name": "Редкоземельные (REMX)",  "emoji": "🪨", "sector": "ETF"},
    "ura":     {"symbol": "URA",     "name": "Уран (URA ETF)",         "emoji": "⚛️", "sector": "ETF"},
    "smh":     {"symbol": "SMH",     "name": "Полупроводники (SMH)",   "emoji": "🖥️", "sector": "ETF"},
    "qtum":    {"symbol": "QTUM",    "name": "Квантовые технологии",   "emoji": "🔭", "sector": "ETF"},
    "vnq":     {"symbol": "VNQ",     "name": "Недвижимость США (VNQ)", "emoji": "🏠", "sector": "ETF"},
    "arkk":    {"symbol": "ARKK",    "name": "ARK Innovation",         "emoji": "🚀", "sector": "ETF"},
    # === Key Stocks ===
    "nvda":    {"symbol": "NVDA",    "name": "NVIDIA",                 "emoji": "🟢", "sector": "Акции"},
    "kspi":    {"symbol": "KSPI",    "name": "Kaspi Bank (KZ)",        "emoji": "🇰🇿", "sector": "Акции"},
    # === FX ===
    "usdkzt":  {"symbol": "KZT=X",   "name": "USD/KZT",                "emoji": "💵", "sector": "Валюта"},
}


@dataclass
class AssetQuote:
    key: str
    name: str
    emoji: str
    symbol: str
    sector: str
    price: float
    change_pct: float


def fetch_market_data() -> dict[str, "AssetQuote | None"]:
    """Fetch market data for all tracked assets via yfinance."""
    import yfinance as yf

    symbols = [info["symbol"] for info in ASSETS.values()]

    try:
        # Batch download: last 5 days to ensure we have prev close even after weekends
        data = yf.download(
            symbols,
            period="5d",
            interval="1d",
            auto_adjust=True,
            progress=False,
        )
        close = data["Close"]
    except Exception as e:
        logger.error("Failed to download market data: %s", e)
        return {key: None for key in ASSETS}

    results: dict[str, "AssetQuote | None"] = {}
    symbol_to_key = {info["symbol"]: key for key, info in ASSETS.items()}

    for symbol, key in symbol_to_key.items():
        info = ASSETS[key]
        try:
            series = close[symbol].dropna()
            if len(series) < 2:
                logger.warning("Not enough data for %s", symbol)
                results[key] = None
                continue

            price = float(series.iloc[-1])
            prev_close = float(series.iloc[-2])
            change_pct = ((price - prev_close) / prev_close * 100) if prev_close else 0.0

            results[key] = AssetQuote(
                key=key,
                name=info["name"],
                emoji=info["emoji"],
                symbol=symbol,
                sector=info["sector"],
                price=price,
                change_pct=change_pct,
            )
        except Exception as e:
            logger.warning("Failed to parse %s: %s", symbol, e)
            results[key] = None

    return results


def format_market_table(quotes: dict[str, "AssetQuote | None"]) -> str:
    """Format quotes as plain-text table grouped by sector for Claude prompt."""
    sectors: dict[str, list[str]] = {}

    for key, quote in quotes.items():
        info = ASSETS[key]
        sector = info["sector"]

        if quote is None:
            line = f"  {info['emoji']} {info['name']}: недоступно"
        else:
            if key in ("sp500", "nasdaq", "sox"):
                price_str = f"{quote.price:,.1f}"
            elif key == "usdkzt":
                price_str = f"{quote.price:.1f} ₸"
            elif key in ("gold", "silver", "copper", "oil"):
                price_str = f"${quote.price:.2f}"
            else:
                price_str = f"${quote.price:.2f}"

            sign = "+" if quote.change_pct >= 0 else ""
            arrow = "↑" if quote.change_pct > 0.05 else ("↓" if quote.change_pct < -0.05 else "→")
            line = (
                f"  {quote.emoji} {quote.name}: {price_str} "
                f"{arrow} {sign}{quote.change_pct:.2f}%"
            )

        sectors.setdefault(sector, []).append(line)

    lines: list[str] = []
    for sector, items in sectors.items():
        lines.append(f"[{sector}]")
        lines.extend(items)
        lines.append("")

    return "\n".join(lines).strip()
