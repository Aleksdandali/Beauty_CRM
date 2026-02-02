#!/bin/bash

# 🚀 Скрипт установки и настройки Supabase CLI
# Запускай: bash setup-supabase.sh

set -e  # Остановиться при ошибке

echo "🚀 УСТАНОВКА SUPABASE CLI"
echo "========================"
echo ""

# ШАГ 1: Установить CLI
echo "📦 Шаг 1/5: Установка Supabase CLI..."
if ! command -v supabase &> /dev/null; then
    echo "CLI не найден, устанавливаю через npm..."
    npm install -g supabase
    echo "✅ Supabase CLI установлен!"
else
    echo "✅ Supabase CLI уже установлен!"
    supabase --version
fi
echo ""

# ШАГ 2: Войти в Supabase
echo "🔐 Шаг 2/5: Вход в Supabase..."
echo "Сейчас откроется браузер. Войди через GitHub и разреши доступ."
read -p "Нажми Enter чтобы продолжить..."
supabase login
echo "✅ Вход выполнен!"
echo ""

# ШАГ 3: Инициализировать проект
echo "📁 Шаг 3/5: Инициализация проекта..."
if [ ! -f "supabase/config.toml" ]; then
    supabase init
    echo "✅ Проект инициализирован!"
else
    echo "✅ Проект уже инициализирован!"
fi
echo ""

# ШАГ 4: Переместить schema в миграции
echo "📝 Шаг 4/5: Создание миграции..."
if [ -f "supabase/schema.sql" ]; then
    MIGRATION_FILE="supabase/migrations/$(date +%Y%m%d%H%M%S)_initial_schema.sql"
    mv supabase/schema.sql "$MIGRATION_FILE"
    echo "✅ Миграция создана: $MIGRATION_FILE"
else
    echo "⚠️  schema.sql не найден (возможно уже перемещен)"
fi
echo ""

# ШАГ 5: Подключиться к проекту
echo "🔗 Шаг 5/5: Подключение к проекту..."
echo ""
echo "У тебя уже есть проект на Supabase?"
echo "1) Да, подключиться к существующему"
echo "2) Нет, создать новый"
read -p "Выбери (1 или 2): " choice

if [ "$choice" == "1" ]; then
    echo ""
    echo "📋 Открой https://supabase.com/dashboard"
    echo "Найди свой проект и скопируй Project Reference ID из URL"
    echo "(Например: xyzabc123)"
    echo ""
    read -p "Введи Project Reference ID: " project_ref
    
    echo ""
    read -sp "Введи Database Password: " db_password
    echo ""
    
    supabase link --project-ref "$project_ref" --password "$db_password"
    
    echo "✅ Подключено к проекту: $project_ref"
    
    # Применить миграции
    echo ""
    echo "📤 Применяю миграции к БД..."
    supabase db push
    echo "✅ Миграции применены!"
    
    # Применить seed данные
    echo ""
    echo "🌱 Применяю тестовые данные..."
    if [ -f "supabase/seed.sql" ]; then
        supabase db execute < supabase/seed.sql
        echo "✅ Тестовые данные загружены!"
    fi
    
    PROJECT_REF="$project_ref"
    
elif [ "$choice" == "2" ]; then
    echo ""
    echo "📋 Сначала узнаем твой Organization ID..."
    supabase orgs list
    
    echo ""
    read -p "Введи Organization ID: " org_id
    read -p "Придумай Database Password (минимум 12 символов): " db_password
    
    echo ""
    echo "🚀 Создаю проект beauty-crm..."
    PROJECT_INFO=$(supabase projects create beauty-crm \
        --org-id "$org_id" \
        --db-password "$db_password" \
        --region eu-central-1 \
        --plan free)
    
    echo "$PROJECT_INFO"
    
    PROJECT_REF=$(echo "$PROJECT_INFO" | grep -oP 'Project ID: \K\w+' || echo "")
    
    if [ -z "$PROJECT_REF" ]; then
        echo ""
        read -p "Введи Project Reference ID вручную: " PROJECT_REF
    fi
    
    echo "✅ Проект создан: $PROJECT_REF"
    echo "⏳ Подожди ~2 минуты пока проект инициализируется..."
    sleep 120
    
    # Подключиться
    supabase link --project-ref "$PROJECT_REF"
    
    # Применить миграции
    echo ""
    echo "📤 Применяю миграции..."
    supabase db push
    
    # Применить seed
    echo ""
    echo "🌱 Применяю тестовые данные..."
    if [ -f "supabase/seed.sql" ]; then
        supabase db execute < supabase/seed.sql
    fi
    
else
    echo "❌ Неверный выбор!"
    exit 1
fi

# ШАГ 6: Получить API ключи
echo ""
echo "🔑 Получаю API ключи..."
KEYS=$(supabase projects api-keys --project-ref "$PROJECT_REF")
echo "$KEYS"

ANON_KEY=$(echo "$KEYS" | grep -oP 'anon key:\s+\K.+' || echo "")

# ШАГ 7: Создать .env.local
echo ""
echo "📝 Создаю .env.local..."
cat > .env.local << EOF
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://${PROJECT_REF}.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=${ANON_KEY}
EOF

echo "✅ .env.local создан!"

# ШАГ 8: Сгенерировать TypeScript типы
echo ""
echo "📘 Генерирую TypeScript типы..."
supabase gen types typescript --linked > types/database.ts
echo "✅ Типы обновлены!"

# ГОТОВО!
echo ""
echo "🎉 ВСЁ ГОТОВО!"
echo "==============="
echo ""
echo "✅ Supabase CLI установлен"
echo "✅ Проект подключен: $PROJECT_REF"
echo "✅ Миграции применены"
echo "✅ Тестовые данные загружены"
echo "✅ .env.local настроен"
echo "✅ TypeScript типы сгенерированы"
echo ""
echo "🚀 Следующие шаги:"
echo "1. Раскомментируй код в middleware.ts"
echo "2. Перезапусти сервер: npm run dev"
echo "3. Открой http://localhost:3000"
echo "4. Зарегистрируйся и проверь что работает!"
echo ""
echo "📚 Документация: SUPABASE_CLI_SETUP.md"
