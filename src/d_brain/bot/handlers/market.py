"""Market digest command handler - /market."""

import asyncio
import logging

from aiogram import Router
from aiogram.filters import Command
from aiogram.types import Message

from d_brain.bot.formatters import format_process_report
from d_brain.config import get_settings
from d_brain.services.market import fetch_market_data, format_market_table
from d_brain.services.processor import ClaudeProcessor

router = Router(name="market")
logger = logging.getLogger(__name__)


@router.message(Command("market"))
async def cmd_market(message: Message) -> None:
    """Handle /market command - generate morning market digest."""
    user_id = message.from_user.id if message.from_user else "unknown"
    logger.info("Market digest triggered by user %s", user_id)

    status_msg = await message.answer("📡 Собираю данные рынков...")

    # Fetch price data in a thread (blocking I/O)
    quotes = await asyncio.to_thread(fetch_market_data)
    market_table = format_market_table(quotes)

    await status_msg.edit_text("🤖 Анализирую тренды...")

    settings = get_settings()
    processor = ClaudeProcessor(settings.vault_path, settings.todoist_api_key)

    async def run_with_progress() -> dict:
        task = asyncio.create_task(
            asyncio.to_thread(processor.generate_market_digest, market_table)
        )
        elapsed = 0
        while not task.done():
            await asyncio.sleep(30)
            elapsed += 30
            if not task.done():
                try:
                    await status_msg.edit_text(
                        f"🤖 Анализирую тренды... ({elapsed // 60}m {elapsed % 60}s)"
                    )
                except Exception:
                    pass
        return await task

    report = await run_with_progress()
    formatted = format_process_report(report)
    try:
        await status_msg.edit_text(formatted)
    except Exception:
        await status_msg.edit_text(formatted, parse_mode=None)
