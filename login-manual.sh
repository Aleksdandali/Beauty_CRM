#!/bin/bash

# 🔐 РУЧНОЙ ВХОД В SUPABASE (без браузера)
# Выполни: bash login-manual.sh

set -e

export PATH="$HOME/bin:$PATH"

echo "🔐 ВХОД В SUPABASE (ручной режим)"
echo "=================================="
echo ""
echo "📋 ИНСТРУКЦИЯ:"
echo ""
echo "1. Открой в браузере: https://supabase.com/dashboard/account/tokens"
echo "2. Войди через GitHub (если еще не вошел)"
echo "3. Нажми 'Generate new token'"
echo "4. Название: beauty-crm-cli"
echo "5. Скопируй сгенерированный токен"
echo ""
read -p "Нажми Enter когда будешь готов..."
echo ""
read -sp "Вставь Access Token: " ACCESS_TOKEN
echo ""

# Сохранить токен
mkdir -p ~/.supabase
echo "$ACCESS_TOKEN" > ~/.supabase/access-token

echo "✅ Access Token сохранен!"
echo ""

# Проверить вход
echo "🔍 Проверяю подключение..."
supabase projects list

echo ""
echo "✅ Вход успешен! Токен работает!"
echo ""
echo "🚀 Теперь запусти основной скрипт:"
echo "   bash finish-setup.sh"
