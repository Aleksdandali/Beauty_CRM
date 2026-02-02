#!/bin/bash

# 🚀 Скрипт деплоя BeautyCRM

echo "🚀 ДЕПЛОЙ BeautyCRM"
echo "==================="
echo ""

# 1. Инициализировать Git
if [ ! -d .git ]; then
    echo "📦 Инициализирую Git..."
    git init
    git add .
    git commit -m "Initial commit: BeautyCRM v1.0"
    echo "✅ Git готов!"
else
    echo "✅ Git уже инициализирован"
fi

echo ""
echo "📋 СЛЕДУЮЩИЕ ШАГИ:"
echo ""
echo "1. Создай репозиторий на GitHub:"
echo "   https://github.com/new"
echo "   Название: beauty-crm"
echo ""
echo "2. Выполни команды:"
echo "   git remote add origin https://github.com/ТВО_ИМЯ/beauty-crm.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "3. Открой Vercel:"
echo "   https://vercel.com/new"
echo "   Нажми 'Import Git Repository'"
echo "   Выбери 'beauty-crm'"
echo "   Нажми 'Deploy'"
echo ""
echo "✅ Через 3 минуты домен готов!"
