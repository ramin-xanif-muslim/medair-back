# MedAir Backend

Данный проект был разработан в учебных целях для освоения новых технологий и улучшения практических навыков.

Проект построен на NestJS фреймворке с использованием GraphQL для API, Prisma в качестве ORM для работы с PostgreSQL базой данных.
В проекте реализована интеграция с Telegram ботом для коммуникации с пользователями, система отправки email-уведомлений через React Email.

## 🚀 Технологии

-   NestJS
-   GraphQL (Apollo Server)
-   Prisma ORM
-   Telegram Bot API
-   React Email
-   i18n

## 📋 Предварительные требования

-   Node.js (рекомендуется последняя LTS версия)
-   PostgreSQL

## 🛠 Установка

```bash
# Установка зависимостей
npm install

# Настройка переменных окружения
cp .env.example .env

# Применение миграций базы данных
npm run db:push

# Запуск сидов базы данных
npm run db:seed
```

## 🏃‍♂️ Запуск

```bash
# Разработка
npm run start:dev

# Продакшн
npm run build
npm run start:prod
```

## 📝 Доступные скрипты

-   `npm run build` - сборка проекта
-   `npm run start:dev` - запуск в режиме разработки
-   `npm run start:prod` - запуск в продакшн режиме
-   `npm run db:push` - применение миграций Prisma
-   `npm run db:studio` - запуск Prisma Studio
-   `npm run test` - запуск тестов
-   `npm run lint` - проверка кода линтером
-   `npm run format` - форматирование кода

## 🔐 Переменные окружения

Создайте файл `.env` в корне проекта со следующими переменными:

```env
# База данных
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"

# Telegram
TELEGRAM_BOT_TOKEN=your_bot_token
```

## 📚 Документация

-   [NestJS Documentation](https://docs.nestjs.com/)
-   [Prisma Documentation](https://www.prisma.io/docs/)
-   [Apollo Server Documentation](https://www.apollographql.com/docs/apollo-server/)

## 📄 Лицензия

UNLICENSED
