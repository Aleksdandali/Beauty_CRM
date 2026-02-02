# 🎯 ПРОСТАЯ НАСТРОЙКА (Пошагово, БЕЗ скриптов)

## ШАГ 1: ПОЛУЧИТЬ ACCESS TOKEN

1. Открой в браузере: **https://supabase.com/dashboard/account/tokens**
2. Войди через GitHub (если нужно)
3. Нажми **"Generate new token"**
4. Название: `beauty-crm-cli`
5. **СКОПИРУЙ ТОКЕН!** (покажется только раз)

---

## ШАГ 2: СОХРАНИТЬ ТОКЕН

Выполни в терминале (замени `YOUR_TOKEN` на свой):

```bash
mkdir -p ~/.supabase
echo "YOUR_TOKEN" > ~/.supabase/access-token
```

**Пример:**
```bash
mkdir -p ~/.supabase
echo "sbp_1234567890abcdef..." > ~/.supabase/access-token
```

---

## ШАГ 3: ПРОВЕРИТЬ ВХОД

```bash
export PATH="$HOME/bin:$PATH"
~/bin/supabase projects list
```

Должен показать список проектов (или пустой список, если их нет) ✅

---

## ШАГ 4: СОЗДАТЬ ПРОЕКТ (если нет)

### ВАРИАНТ А: Через веб (проще!)

1. Открой: **https://supabase.com/dashboard**
2. Нажми **"New Project"**
3. **Name:** `beauty-crm`
4. **Database Password:** придумай сложный (СОХРАНИ!)
5. **Region:** Europe (Frankfurt)
6. **Plan:** Free
7. Жди ~2 минуты

**СКОПИРУЙ Project Reference ID** из URL:
```
https://supabase.com/dashboard/project/ТВОЙ_ID
                                        ^^^^^^^^
                                        вот это!
```

---

## ШАГ 5: ПОДКЛЮЧИТЬ ПРОЕКТ

Замени `ТВОЙ_ID` на свой Project Reference ID:

```bash
cd /Users/oleksandr/beauty-crm
export PATH="$HOME/bin:$PATH"
~/bin/supabase link --project-ref ТВОЙ_ID
```

Введи Database Password когда попросит.

---

## ШАГ 6: ПРИМЕНИТЬ МИГРАЦИИ

```bash
~/bin/supabase db push
```

Должно показать: "Finished supabase db push" ✅

---

## ШАГ 7: ЗАГРУЗИТЬ ТЕСТОВЫЕ ДАННЫЕ

```bash
~/bin/supabase db execute < supabase/seed.sql
```

---

## ШАГ 8: ПОЛУЧИТЬ API КЛЮЧИ

```bash
~/bin/supabase projects api-keys --project-ref ТВОЙ_ID
```

**СКОПИРУЙ:**
- `anon key: eyJhbGc...` ← вот эту длинную строку

---

## ШАГ 9: СОЗДАТЬ .env.local

Замени `ТВОЙ_ID` и `ТВОЙ_ANON_KEY`:

```bash
cat > .env.local << 'EOF'
NEXT_PUBLIC_SUPABASE_URL=https://ТВОЙ_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=ТВОЙ_ANON_KEY
EOF
```

**Пример:**
```bash
cat > .env.local << 'EOF'
NEXT_PUBLIC_SUPABASE_URL=https://abc123.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
EOF
```

---

## ШАГ 10: СГЕНЕРИРОВАТЬ TYPESCRIPT ТИПЫ

```bash
~/bin/supabase gen types typescript --linked > types/database.ts
```

---

## ШАГ 11: ВКЛЮЧИТЬ MIDDLEWARE

Открой файл `middleware.ts` и найди строку:

```typescript
// ТИМЧАСОВО: Дозволяємо всі роути без перевірки
return NextResponse.next()
```

**Закомментируй её:**
```typescript
// return NextResponse.next()
```

**Раскомментируй блок ниже** (убери `/*` и `*/`)

---

## ШАГ 12: ЗАПУСТИТЬ СЕРВЕР

```bash
npm run dev
```

Открой: **http://localhost:3000**

---

## ШАГ 13: ЗАРЕГИСТРИРОВАТЬСЯ

1. Откроет `/login` → нажми "Зареєструватися"
2. Заполни форму:
   - Email: любой
   - Пароль: минимум 6 символов
   - Название салона: `Мій салон`
3. Нажми "Зареєструватися"

---

## ШАГ 14: ПОДТВЕРДИТЬ EMAIL

1. Проверь почту
2. Нажми на ссылку из письма Supabase
3. Email подтвержден! ✅

---

## ШАГ 15: ВОЙТИ И ПРОВЕРИТЬ

1. Вернись на http://localhost:3000/login
2. Введи email + пароль
3. Должен открыться Dashboard! 🎉
4. Перейди в "Клієнти" → должны быть тестовые клиенты
5. Создай нового клиента → должен сохраниться!

---

## 🎉 ГОТОВО!

Теперь у тебя работает:
- ✅ База данных (10 таблиц)
- ✅ Аутентификация
- ✅ CRUD для клиентов
- ✅ Тестовые данные

---

## 🆘 ПРОБЛЕМЫ?

### "command not found: supabase"
```bash
export PATH="$HOME/bin:$PATH"
echo 'export PATH="$HOME/bin:$PATH"' >> ~/.zshrc
```

### "Failed to link project"
- Проверь правильность Project ID
- Проверь Database Password
- Попробуй снова

### .env.local не работает
- Проверь что файл в корне проекта
- Перезапусти сервер: `npm run dev`

---

## 📞 ПОМОЩЬ

Если застрял - скажи на каком шаге! Помогу! 🚀
