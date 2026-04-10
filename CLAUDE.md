# Agent Second Brain — сервер DigitalOcean

## Сервер
- Ubuntu 24.04, DigitalOcean VPS
- Пользователь: myuser
- Папка проекта: ~/agent-second-brain
- Запуск Claude: claude-server (алиас на Mac)

## Проект: d-brain-bot (Telegram-бот)
Два режима работы в одном сервисе:

### 1. Личный ассистент
- Принимает текстовые и голосовые сообщения
- Распознавание голоса через Deepgram
- Задачи через Todoist
- Сохраняет записи в vault/ (markdown файлы)

### 2. Ежедневный рыночный дайджест
- Автоматически присылает сводку каждый день
- Мониторинг: NVIDIA, Kaspi Bank, USD/KZT
- Логика в src/d_brain/services/market.py

## Структура кода
- src/d_brain/bot/ — логика Telegram-бота
- src/d_brain/services/ — сервисы (market, transcription, storage, session)
- vault/ — хранилище записей пользователя
- docs/ — документация проекта

## Управление сервисом
- Статус: systemctl status d-brain-bot
- Рестарт: systemctl restart d-brain-bot
- Логи: journalctl -u d-brain-bot -f

## Правила
- Перед изменением кода — проверять статус сервиса
- После изменений — перезапускать и смотреть логи
- Не трогать systemd-конфиг без необходимости
