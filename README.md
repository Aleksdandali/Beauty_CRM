# 💅 BeautyCRM - CRM для салонів краси

Професійна SaaS CRM-система для управління салонами краси, nail-студіями та майстрами-фрілансерами.

## 🚀 Швидкий старт

### ⚡ ВАРІАНТ 1: Автоматична установка (Рекомендовано!)

**Один скрипт зробить ВСЕ за вас:**

```bash
cd /Users/oleksandr/beauty-crm
bash setup-supabase.sh
```

**Скрипт автоматично:**
- ✅ Встановить Supabase CLI
- ✅ Підключить до вашого аккаунту
- ✅ Створить/підключить проект
- ✅ Застосує міграції БД
- ✅ Завантажить тестові дані
- ✅ Створить .env.local
- ✅ Згенерує TypeScript типи

**Час:** 5-10 хвилин

📖 **Детальна інструкція:** [QUICK_START.md](./QUICK_START.md)

---

### 🛠️ ВАРІАНТ 2: Ручна установка

#### 1. Встановити залежності:
```bash
cd beauty-crm
npm install
```

#### 2. Встановити Supabase CLI:
```bash
brew install supabase/tap/supabase
```

#### 3. Налаштувати Supabase:
```bash
supabase login
supabase init
mv supabase/schema.sql supabase/migrations/$(date +%Y%m%d%H%M%S)_initial.sql
supabase link --project-ref YOUR_PROJECT_ID
supabase db push
supabase db execute < supabase/seed.sql
```

#### 4. Створити .env.local:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

#### 5. Запустити сервер:
```bash
npm run dev
```

Відкрийте [http://localhost:3000](http://localhost:3000)

## 📱 PWA (Progressive Web App)

Додаток можна встановити на iOS/Android як нативний додаток:

- **iOS:** Safari → Share → Add to Home Screen
- **Android:** Chrome → Menu → Install App

## 🏗️ Технології

- **Frontend:** Next.js 15 (App Router), TypeScript, Tailwind CSS
- **Backend/Database:** Supabase (PostgreSQL + Auth + Storage)
- **UI Components:** Shadcn/ui + Lucide Icons
- **Deploy:** Vercel (автоматичний деплой з GitHub)

## 📊 Структура БД

- `organizations` - салони/студії
- `profiles` - користувачі (owner, admin, master, receptionist)
- `clients` - клієнти салону
- `services` - послуги
- `appointments` - записи
- `formulas` - формули покриттів (ключова фіча!)
- `inventory` - склад матеріалів
- `payments` - оплати
- `client_preferences` - переваги клієнтів

## 🔐 Ролі користувачів

| Роль | Доступ |
|------|--------|
| **Owner** | Повний доступ до всього |
| **Admin** | Управління салоном (крім фінансів) |
| **Master** | Тільки свої записи та клієнти |
| **Receptionist** | Записи всіх майстрів, клієнти |

## 🎨 Дизайн

- **Тема:** Темна за замовчуванням (з перемикачем)
- **Акцент:** Фіолетово-рожевий градієнт
- **Шрифт:** Inter
- **Стиль:** Мінімалістичний, Linear/Vercel-like

## 📂 Структура проекту

```
beauty-crm/
├── app/              # Next.js App Router
│   ├── (auth)/      # Авторизація
│   ├── dashboard/   # Головна панель
│   ├── calendar/    # Календар записів
│   ├── clients/     # База клієнтів
│   ├── services/    # Управління послугами
│   ├── inventory/   # Склад
│   └── settings/    # Налаштування
├── components/      # React компоненти
│   └── ui/         # Shadcn/ui компоненти
├── lib/            # Утиліти та хелпери
├── types/          # TypeScript типи
├── supabase/       # SQL схеми та seed
└── public/         # Статичні файли + PWA

```

## 🔥 Ключові фічі

### ✅ Вже реалізовано:
- База даних з 10 таблицями
- Row Level Security (RLS) для мультитенантності
- Типи TypeScript для всіх таблиць
- Базовий UI (Dashboard, Login, Clients)
- PWA manifest для встановлення на телефон
- Seed-дані: демо-салон з 15 клієнтами

### 🚧 В розробці:
- [ ] Повна авторизація через Supabase Auth
- [ ] Календар з drag-and-drop
- [ ] CRUD для всіх сутностей
- [ ] Завантаження фото формул
- [ ] Push-сповіщення
- [ ] Звіти та аналітика

## 📝 Документація

Детальні інструкції для розробників: [INSTRUCTIONS.md](./INSTRUCTIONS.md)

## 🤝 Внесок

1. Fork проекту
2. Створіть feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit змін (`git commit -m 'Add some AmazingFeature'`)
4. Push в branch (`git push origin feature/AmazingFeature`)
5. Відкрийте Pull Request

## 📄 Ліцензія

MIT License - використовуйте вільно для своїх проектів!

## 💬 Підтримка

Питання? Створіть [Issue](https://github.com/yourusername/beauty-crm/issues) або напишіть на email

---

**Зроблено з 💜 для індустрії краси**
