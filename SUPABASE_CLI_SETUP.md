# 🚀 ПОДКЛЮЧЕНИЕ SUPABASE ЧЕРЕЗ CLI

## Преимущества CLI:
- ✅ Быстрая настройка (5 минут)
- ✅ Автоматическое применение миграций
- ✅ Генерация TypeScript типов
- ✅ Локальная разработка (опционально)
- ✅ Version control для БД

---

## ШАГ 1: УСТАНОВИТЬ SUPABASE CLI (2 минуты)

### На macOS (через Homebrew):
```bash
brew install supabase/tap/supabase
```

### Проверить установку:
```bash
supabase --version
```

Должно показать версию (например: `1.123.4`)

---

## ШАГ 2: ВОЙТИ В SUPABASE (1 минута)

```bash
supabase login
```

**Что произойдет:**
1. Откроется браузер
2. Войди через GitHub (или email)
3. Разреши доступ для CLI
4. Вернись в терминал → увидишь: "Logged in" ✅

---

## ШАГ 3: ИНИЦИАЛИЗИРОВАТЬ ПРОЕКТ (1 минута)

```bash
cd /Users/oleksandr/beauty-crm
supabase init
```

**Что создастся:**
```
supabase/
  ├── config.toml          # Конфигурация
  ├── seed.sql             # Уже есть! ✅
  └── migrations/          # Папка для миграций (пустая)
```

---

## ШАГ 4А: СОЗДАТЬ НОВЫЙ ПРОЕКТ (если еще нет)

### Создать проект в облаке:
```bash
supabase projects create beauty-crm --org-id <your-org-id> --db-password <strong-password> --region eu-central-1
```

**Если не знаешь org-id:**
```bash
supabase orgs list
```

**ИЛИ создай через веб:**
1. Открой https://supabase.com/dashboard
2. New Project → "beauty-crm"
3. Выбери Free plan + регион Europe
4. Запомни Database Password!

---

## ШАГ 4Б: ПОДКЛЮЧИТЬСЯ К СУЩЕСТВУЮЩЕМУ ПРОЕКТУ

### Если уже создал проект в веб-интерфейсе:

1. **Получить Project Reference ID:**
   - Открой https://supabase.com/dashboard
   - Открой свой проект "beauty-crm"
   - В URL будет: `https://supabase.com/dashboard/project/ТВОЙ_PROJECT_ID`
   - Скопируй `ТВОЙ_PROJECT_ID` (например: `xyzabc123`)

2. **Подключиться:**
```bash
supabase link --project-ref ТВОЙ_PROJECT_ID
```

Введи Database Password (который создавал при регистрации)

Увидишь: "Linked project" ✅

---

## ШАГ 5: ПЕРЕМЕСТИТЬ SCHEMA В МИГРАЦИИ (2 минуты)

### Создать миграцию из schema.sql:
```bash
# Переименовать существующий schema.sql в миграцию
mv supabase/schema.sql supabase/migrations/20260202000000_initial_schema.sql
```

### Проверить что файл на месте:
```bash
ls -la supabase/migrations/
```

Должен быть: `20260202000000_initial_schema.sql` ✅

---

## ШАГ 6: ПРИМЕНИТЬ МИГРАЦИИ (1 минута)

### Push в облако:
```bash
supabase db push
```

**Что произойдет:**
1. CLI прочитает `supabase/migrations/20260202000000_initial_schema.sql`
2. Применит все изменения к БД
3. Создаст таблицы, RLS политики, триггеры
4. Увидишь: "Finished supabase db push" ✅

### Применить seed данные:
```bash
supabase db reset
```

**ИЛИ вручную через psql:**
```bash
supabase db execute < supabase/seed.sql
```

---

## ШАГ 7: ПОЛУЧИТЬ API КЛЮЧИ (1 минута)

```bash
supabase projects api-keys --project-ref ТВОЙ_PROJECT_ID
```

**Скопируй:**
- `anon key` - публичный ключ
- `service_role key` - приватный (не используем пока)

**ИЛИ смотри в веб:**
Settings → API → Copy keys

---

## ШАГ 8: НАСТРОИТЬ .env.local (1 минута)

### Создать .env.local:
```bash
cat > .env.local << 'EOF'
NEXT_PUBLIC_SUPABASE_URL=https://ТВОЙ_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=твой_anon_key_здесь
EOF
```

**ЗАМЕНИ:**
- `ТВОЙ_PROJECT_ID` → твой project reference id
- `твой_anon_key_здесь` → anon key из шага 7

### Пример:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xyzabc123.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## ШАГ 9: СГЕНЕРИРОВАТЬ TYPESCRIPT ТИПЫ (1 минута)

```bash
supabase gen types typescript --linked > types/database.ts
```

**Что произойдет:**
- CLI подключится к БД
- Прочитает схему
- Сгенерирует TypeScript типы
- Обновит файл `types/database.ts` ✅

### Проверить:
```bash
head -n 20 types/database.ts
```

Должны быть типы для таблиц!

---

## ШАГ 10: ВКЛЮЧИТЬ MIDDLEWARE (1 минута)

### Открыть middleware.ts:
```bash
code middleware.ts
```

### Раскомментировать блок аутентификации:
Найди строку:
```typescript
// ТИМЧАСОВО: Дозволяємо всі роути без перевірки
return NextResponse.next()
```

**Закомментируй её** и **раскомментируй** код ниже:
```typescript
/* УВІМКНІТЬ ПІСЛЯ ПІДКЛЮЧЕННЯ SUPABASE:
  const supabase = createClient(...
*/
```

Должно стать:
```typescript
const supabase = createClient(request)
// ... rest of auth logic
```

---

## ШАГ 11: ПЕРЕЗАПУСТИТЬ СЕРВЕР (1 минута)

```bash
# Остановить (Ctrl+C)
npm run dev
```

Открой http://localhost:3000

Должен перенаправить на `/login` ✅

---

## ШАГ 12: ТЕСТОВАЯ РЕГИСТРАЦИЯ (2 минуты)

### Зарегистрироваться:
1. Открой http://localhost:3000/register
2. Заполни форму:
   - Email: `test@example.com`
   - Пароль: минимум 6 символов
   - Название салона: `Тестовий салон`
   - ПІБ: `Іван Петренко`
   - Адрес: `Київ, вул. Хрещатик 1`
3. Нажми "Зареєструватися"

### Подтвердить email:
1. Проверь почту
2. Нажми на ссылку подтверждения
3. Вернись на сайт → Login

### Войти:
1. http://localhost:3000/login
2. Введи email + пароль
3. Попадешь в Dashboard! 🎉

---

## ШАГ 13: ПРОВЕРИТЬ ЧТО РАБОТАЕТ (1 минута)

### В приложении:
1. Перейди в "Клієнти"
2. Должны быть тестовые клиенты из seed.sql
3. Создай нового клиента
4. Проверь что сохранился ✅

### В Supabase:
```bash
# Посмотреть клиентов через CLI
supabase db query "SELECT name, phone FROM clients LIMIT 5;"
```

ИЛИ через веб:
https://supabase.com/dashboard → Table Editor → clients

---

## 🎉 ГОТОВО! SUPABASE ПОДКЛЮЧЕН ЧЕРЕЗ CLI!

Теперь у тебя:
- ✅ БД в облаке работает
- ✅ Миграции в Git (version control)
- ✅ TypeScript типы сгенерированы
- ✅ Можно регистрироваться/входить
- ✅ Клиенты сохраняются в Supabase

---

## 🔥 БОНУС: ЛОКАЛЬНАЯ РАЗРАБОТКА (Опционально)

### Если хочешь работать с локальной БД:

```bash
# Запустить Supabase локально (Docker)
supabase start
```

**Что запустится:**
- PostgreSQL (БД)
- PostgREST (API)
- GoTrue (Auth)
- Inbucket (Email)
- Studio (веб-интерфейс)

Локальный Studio: http://localhost:54323

### Преимущества:
- Не тратишь облачные лимиты
- Быстрее работает
- Можно тестировать оффлайн

### Применить миграции локально:
```bash
supabase db reset
```

---

## 🛠️ ПОЛЕЗНЫЕ КОМАНДЫ CLI

```bash
# Статус проекта
supabase status

# Список проектов
supabase projects list

# Создать новую миграцию
supabase migration new add_new_table

# Посмотреть логи
supabase functions logs

# Остановить локальный Supabase
supabase stop

# Обновить типы после изменений в БД
supabase gen types typescript --linked > types/database.ts

# Выполнить SQL запрос
supabase db query "SELECT * FROM clients LIMIT 5;"
```

---

## 🆘 ВОЗМОЖНЫЕ ПРОБЛЕМЫ

### Проблема 1: "command not found: supabase"
**Решение:**
```bash
brew install supabase/tap/supabase
# Или если уже установлен:
brew upgrade supabase
```

### Проблема 2: "Failed to link project"
**Решение:**
1. Проверь что project-ref правильный
2. Проверь Database Password
3. Попробуй снова: `supabase link --project-ref XXX`

### Проблема 3: "Migration failed"
**Решение:**
1. Посмотри ошибку внимательно
2. Проверь синтаксис SQL в миграции
3. Попробуй применить вручную через веб SQL Editor

### Проблема 4: Docker не запускается (для локальной разработки)
**Решение:**
1. Установи Docker Desktop: https://www.docker.com/products/docker-desktop
2. Запусти Docker Desktop
3. Попробуй `supabase start` снова

---

## 📚 ДОКУМЕНТАЦИЯ

- Supabase CLI: https://supabase.com/docs/guides/cli
- Миграции: https://supabase.com/docs/guides/cli/local-development
- Типы: https://supabase.com/docs/guides/api/generating-types

---

## 🎯 СЛЕДУЮЩИЙ ЭТАП

После успешного подключения Supabase:

**ЭТАП 2: CRUD для Appointments** 🚀
- Server Actions
- AppointmentDialog
- Календарь с реальными данными

Готов продолжать? 💪
