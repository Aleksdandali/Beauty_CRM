# ⚡ БЫСТРЫЙ СТАРТ - SUPABASE CLI

## 🎯 ВАРИАНТ 1: АВТОМАТИЧЕСКИЙ (Рекомендую!)

### Запусти один скрипт:

```bash
cd /Users/oleksandr/beauty-crm
bash setup-supabase.sh
```

**Скрипт сделает всё автоматически:**
1. ✅ Установит Supabase CLI
2. ✅ Войдет в аккаунт (откроет браузер)
3. ✅ Инициализирует проект
4. ✅ Подключит к Supabase (создаст новый или подключится к существующему)
5. ✅ Применит миграции (создаст таблицы)
6. ✅ Загрузит тестовые данные
7. ✅ Создаст .env.local
8. ✅ Сгенерирует TypeScript типы

**Время:** 5-10 минут (с паузами на ввод)

---

## 🛠️ ВАРИАНТ 2: ПОШАГОВЫЙ (вручную)

### Если скрипт не работает, выполняй команды по одной:

#### 1. Установить CLI:
```bash
brew install supabase/tap/supabase
```

Если ошибка прав доступа:
```bash
sudo chown -R $(whoami) /opt/homebrew
brew install supabase/tap/supabase
```

#### 2. Войти:
```bash
supabase login
```

#### 3. Инициализировать:
```bash
cd /Users/oleksandr/beauty-crm
supabase init
```

#### 4. Переместить schema:
```bash
mv supabase/schema.sql supabase/migrations/20260202000000_initial_schema.sql
```

#### 5a. Если НЕТ проекта - создать:
```bash
# Узнать org-id:
supabase orgs list

# Создать проект:
supabase projects create beauty-crm \
  --org-id ТВОЙ_ORG_ID \
  --db-password СЛОЖНЫЙ_ПАРОЛЬ \
  --region eu-central-1 \
  --plan free
```

#### 5b. Если ЕСТЬ проект - подключиться:
```bash
supabase link --project-ref ТВОЙ_PROJECT_ID
```

#### 6. Применить миграции:
```bash
supabase db push
```

#### 7. Загрузить тестовые данные:
```bash
supabase db execute < supabase/seed.sql
```

#### 8. Получить API ключи:
```bash
supabase projects api-keys --project-ref ТВОЙ_PROJECT_ID
```

#### 9. Создать .env.local:
```bash
cat > .env.local << 'EOF'
NEXT_PUBLIC_SUPABASE_URL=https://ТВОЙ_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=твой_anon_key
EOF
```

#### 10. Сгенерировать типы:
```bash
supabase gen types typescript --linked > types/database.ts
```

---

## 🎉 ПОСЛЕ УСПЕШНОЙ УСТАНОВКИ:

### 1. Раскомментировать middleware:
Открой `middleware.ts` и раскомментируй блок аутентификации.

### 2. Перезапустить сервер:
```bash
npm run dev
```

### 3. Открыть приложение:
http://localhost:3000

### 4. Зарегистрироваться:
- Email: любой
- Пароль: минимум 6 символов
- Заполни форму

### 5. Подтвердить email:
Проверь почту → нажми на ссылку

### 6. Войти и проверить:
- Должен быть Dashboard
- Клиенты из seed.sql
- Создай нового клиента → должен сохраниться!

---

## 🆘 ВОЗМОЖНЫЕ ПРОБЛЕМЫ

### Homebrew требует sudo:
```bash
sudo chown -R $(whoami) /opt/homebrew
```

### "command not found: supabase":
```bash
brew reinstall supabase/tap/supabase
# Или установить бинарник напрямую:
brew install supabase/tap/supabase --HEAD
```

### "Failed to link project":
- Проверь project-ref (должен быть правильный ID)
- Проверь Database Password
- Попробуй через веб: https://supabase.com/dashboard

### Миграция не применилась:
```bash
# Посмотреть ошибки:
supabase db push --debug

# Или применить вручную через веб SQL Editor
```

---

## 📞 ПОМОЩЬ

Если застрял - скажи на каком шаге! Я помогу! 🚀

---

## 📚 ПОЛНАЯ ДОКУМЕНТАЦИЯ

- Подробная инструкция: `SUPABASE_CLI_SETUP.md`
- План разработки: `DEVELOPMENT_PLAN.md`
- Roadmap функций: `FEATURES_ROADMAP.md`
