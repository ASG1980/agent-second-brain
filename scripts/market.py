#!/usr/bin/env python
"""Morning market digest script - fetches data, runs Claude analysis, sends to Telegram."""

import asyncio
import logging
import sys
from pathlib import Path

# Add project root to path
sys.path.insert(0, str(Path(__file__).parent.parent / "src"))

from aiogram import Bot
from aiogram.client.default import DefaultBotProperties
from aiogram.enums import ParseMode

from d_brain.config import get_settings
from d_brain.services.market import fetch_market_data, format_market_table
from d_brain.services.processor import ClaudeProcessor

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)


async def main() -> None:
    """Fetch market data, generate digest and send to Telegram."""
    settings = get_settings()

    logger.info("Fetching market data...")
    quotes = fetch_market_data()
    market_table = format_market_table(quotes)
    logger.info("Market data fetched:\n%s", market_table)

    logger.info("Generating market digest with Claude...")
    processor = ClaudeProcessor(settings.vault_path, settings.todoist_api_key)
    result = processor.generate_market_digest(market_table)

    if "error" in result:
        report = f"❌ <b>Ошибка рыночной аналитики:</b>\n{result['error']}"
        logger.error("Market digest failed: %s", result["error"])
    else:
        report = result.get("report", "No output")
        logger.info("Market digest generated successfully")

    # Send to Telegram
    bot = Bot(
        token=settings.telegram_bot_token,
        default=DefaultBotProperties(parse_mode=ParseMode.HTML),
    )
    try:
        user_id = settings.allowed_user_ids[0] if settings.allowed_user_ids else None
        if not user_id:
            logger.error("No allowed user IDs configured")
            return

        try:
            await bot.send_message(chat_id=user_id, text=report)
        except Exception:
            await bot.send_message(chat_id=user_id, text=report, parse_mode=None)

        logger.info("Market digest sent to user %s", user_id)
    finally:
        await bot.session.close()


if __name__ == "__main__":
    asyncio.run(main())
