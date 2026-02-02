# BeautyCRM - Інструкції для розробки

## 📋 Стандарти коду

### TypeScript
- Використовуємо **строгий режим** TypeScript
- Всі типи мають бути явно вказані
- Використовуємо типи з `types/database.ts` для роботи з БД
- Немає `any` типів без явного обгрунтування

### Компоненти
- **Server Components** за замовчуванням
- **Client Components** тільки коли потрібна інтерактивність (позначаємо `'use client'`)
- Назви компонентів у PascalCase: `ClientCard.tsx`
- UI компоненти з Shadcn/ui в папці `components/ui/`

### Стилізація
- **Tailwind CSS** для всіх стилів
- Використовуємо функцію `cn()` для умовних класів
- Темна тема за замовчуванням (з можливістю перемикання)
- Акцентний колір: фіолетово-рожевий градієнт (`from-purple-600 to-pink-600`)

### База даних
- **Supabase** для всього: БД, авторизація, файли
- Всі запити через `lib/supabase.ts`
- **Row Level Security (RLS)** обов'язковий
- Кожна таблиця має `organization_id` для мультитенантності

### Файлова структура
```
app/
  ├── (auth)/
  │   ├── login/
  │   └── register/
  ├── dashboard/
  ├── calendar/
  ├── clients/
  ├── services/
  ├── inventory/
  └── settings/
components/
  ├── ui/          # Shadcn/ui компоненти
  └── [feature]/   # Бізнес-компоненти
lib/
  ├── supabase.ts  # Supabase клієнт
  └── utils.ts     # Утиліти
types/
  └── database.ts  # Типи БД
```

## 🔐 Авторизація

### Ролі користувачів
- **owner** - власник салону (повний доступ)
- **admin** - адміністратор (майже повний доступ)
- **master** - майстер (бачить тільки свої записи та клієнтів)
- **receptionist** - адміністратор (управління записами всіх майстрів)

### Перевірка доступу
```typescript
// Приклад перевірки ролі
const { data: profile } = await supabase
  .from('profiles')
  .select('role, organization_id')
  .eq('id', user.id)
  .single()

if (profile.role === 'master') {
  // Обмежити вибірку тільки своїми записами
}
```

## 🎨 Дизайн система

### Кольори
- **Primary:** Purple/Pink градієнт
- **Background:** Slate-900 (темна тема)
- **Card:** Slate-800/900
- **Border:** Slate-700
- **Text:** Slate-50 (primary), Slate-400 (secondary)

### Компоненти
- **Button:** Градієнт за замовчуванням, варіанти: outline, ghost, destructive
- **Card:** Тіні, rounded-lg, border
- **Input:** Border, rounded-md, focus:ring
- **Dialog:** Модальні вікна для форм

### Іконки
- **Lucide Icons** для всіх іконок
- Розмір: 16px (xs), 20px (sm), 24px (default)

## 📱 Респонсивність

### Брейкпоінти Tailwind
- **sm:** 640px (мобільні ландшафт)
- **md:** 768px (планшети)
- **lg:** 1024px (ноутбуки)
- **xl:** 1280px (десктопи)

### Мобільна адаптація
- Пріоритет: **mobile-first**
- Навігація: бургер-меню на мобільних
- Таблиці: горизонтальний скрол або картки
- Календар: вертикальний список на мобільних

## 🔄 Робота з даними

### Fetching
- **Server Components:** прямі запити до Supabase
- **Client Components:** `use('client')` + useState/useEffect
- Кешування: Next.js автоматичний кеш + revalidate

### Мутації
- Форми з Server Actions або Client-side fetch
- Оптимістичні оновлення UI де доречно
- Toast-сповіщення після успіху/помилки

### Приклад запиту з RLS
```typescript
// Автоматично фільтрується по organization_id завдяки RLS
const { data: clients } = await supabase
  .from('clients')
  .select('*')
  .order('full_name')
```

## 🧪 Тестування

### Unit Tests (TODO)
- Jest + React Testing Library
- Тести для бізнес-логіки та утиліт

### E2E Tests (TODO)
- Playwright для критичних флоу
- Авторизація, створення запису, оплата

## 🚀 Деплой

### Vercel
- `git push` → автодеплой
- Preview для кожної PR
- Environment variables в Vercel Dashboard

### Environment Variables
```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

## 📝 Код-стайл

### Форматування
- **Prettier** для автоформатування
- **ESLint** для лінтингу
- 2 пробіли для відступів

### Іменування
- **Компоненти:** PascalCase
- **Функції:** camelCase
- **Константи:** UPPER_SNAKE_CASE
- **Файли:** kebab-case або PascalCase для компонентів

### Коментарі
- Українською мовою
- JSDoc для публічних функцій
- TODO коментарі з тегом автора

## 🔒 Безпека

### Supabase RLS
- **ОБОВ'ЯЗКОВО** для всіх таблиць
- Перевіряємо `auth.uid()` в політиках
- Тестуємо доступ різних ролей

### Валідація
- Серверна валідація обов'язкова
- Клієнтська для UX
- Zod для схем валідації (TODO)

## 📊 Моніторинг

### Логування
- `console.error()` для помилок
- Sentry для продакшн (TODO)

### Аналітика
- Vercel Analytics (включено)
- Custom events для важливих дій (TODO)

## 🎯 Roadmap

### Фаза 1 (Зараз)
- ✅ База даних та типи
- ✅ Авторизація
- ✅ Базовий UI
- ⏳ CRUD для всіх сутностей

### Фаза 2
- [ ] Календар з drag-and-drop
- [ ] Завантаження фото формул
- [ ] Push-сповіщення

### Фаза 3
- [ ] Звіти та аналітика
- [ ] Інтеграція з касами
- [ ] Telegram-бот для клієнтів

---

**Питання?** Пишіть в issues або документацію Supabase/Next.js
