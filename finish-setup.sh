#!/bin/bash

# 🎯 ФИНАЛЬНАЯ НАСТРОЙКА SUPABASE
# Выполни: bash finish-setup.sh

set -e

echo "🎯 ФИНАЛЬНАЯ НАСТРОЙКА SUPABASE"
echo "================================"
echo ""

# Добавить путь к CLI
export PATH="$HOME/bin:$PATH"

# ШАГ 1: Вход в Supabase
echo "🔐 Шаг 1/4: Вход в Supabase..."
echo "Сейчас откроется браузер. Войди через GitHub."
read -p "Нажми Enter чтобы продолжить..."
supabase login
echo "✅ Вход выполнен!"
echo ""

# ШАГ 2: Подключение к проекту
echo "🔗 Шаг 2/4: Подключение к проекту..."
echo ""
echo "У тебя уже есть проект на Supabase?"
echo "1) Да, подключиться к существующему"
echo "2) Нет, создать новый через веб"
read -p "Выбери (1 или 2): " choice

if [ "$choice" == "1" ]; then
    echo ""
    echo "📋 Открой https://supabase.com/dashboard"
    echo "Найди свой проект и скопируй Project Reference ID из URL"
    echo ""
    read -p "Введи Project Reference ID: " project_ref
    
    echo ""
    read -sp "Введи Database Password: " db_password
    echo ""
    
    supabase link --project-ref "$project_ref" --password "$db_password"
    echo "✅ Подключено!"
    
    PROJECT_REF="$project_ref"
    
elif [ "$choice" == "2" ]; then
    echo ""
    echo "📖 СОЗДАЙ ПРОЕКТ ВРУЧНУЮ:"
    echo "1. Открой https://supabase.com/dashboard"
    echo "2. Нажми 'New Project'"
    echo "3. Название: beauty-crm"
    echo "4. Database Password: придумай сложный (сохрани!)"
    echo "5. Region: Europe (Frankfurt)"
    echo "6. Plan: Free"
    echo "7. Подожди ~2 минуты пока создастся"
    echo ""
    read -p "Нажми Enter когда проект создан..."
    
    echo ""
    read -p "Введи Project Reference ID (из URL): " project_ref
    read -sp "Введи Database Password: " db_password
    echo ""
    
    supabase link --project-ref "$project_ref" --password "$db_password"
    echo "✅ Подключено!"
    
    PROJECT_REF="$project_ref"
else
    echo "❌ Неверный выбор!"
    exit 1
fi

# ШАГ 3: Применить миграции и seed
echo ""
echo "📤 Шаг 3/4: Применяю миграции..."
supabase db push
echo "✅ Миграции применены!"

echo ""
echo "🌱 Применяю тестовые данные..."
supabase db execute < supabase/seed.sql
echo "✅ Seed данные загружены!"

# ШАГ 4: Получить ключи и создать .env.local
echo ""
echo "🔑 Шаг 4/4: Получаю API ключи..."
KEYS=$(supabase projects api-keys --project-ref "$PROJECT_REF")
ANON_KEY=$(echo "$KEYS" | grep "anon key:" | awk '{print $3}')

echo ""
echo "📝 Создаю .env.local..."
cat > .env.local << EOF
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://${PROJECT_REF}.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=${ANON_KEY}
EOF

echo "✅ .env.local создан!"

# Сгенерировать типы
echo ""
echo "📘 Генерирую TypeScript типы..."
supabase gen types typescript --linked > types/database.ts
echo "✅ Типы обновлены!"

# ГОТОВО!
echo ""
echo "🎉🎉🎉 ВСЁ ГОТОВО! 🎉🎉🎉"
echo "========================"
echo ""
echo "✅ Supabase CLI установлен ($HOME/bin/supabase)"
echo "✅ Проект подключен: $PROJECT_REF"
echo "✅ База данных создана (10 таблиц)"
echo "✅ Тестовые данные загружены"
echo "✅ .env.local настроен"
echo "✅ TypeScript типы сгенерированы"
echo ""
echo "🚀 СЛЕДУЮЩИЕ ШАГИ:"
echo ""
echo "1. Раскомментируй аутентификацию в middleware.ts"
echo "2. Перезапусти сервер:"
echo "   npm run dev"
echo ""
echo "3. Открой http://localhost:3000"
echo "4. Зарегистрируйся (любой email)"
echo "5. Подтверди email (проверь почту)"
echo "6. Войди и проверь клиентов!"
echo ""
echo "🎊 Поздравляю! BeautyCRM готов к работе!"
