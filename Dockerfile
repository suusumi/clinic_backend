# Используем официальный образ Node.js
FROM node:alpine

# Создаем рабочий каталог в контейнере
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы проекта
COPY . .

ENV DATABASE_URL postgres://postgres:ert123ert@postgres:5432/clinic_server_db

COPY migrate.sh .
RUN chmod +x ./migrate.sh
# Запускаем приложение
CMD ["/app/migrate.sh"]