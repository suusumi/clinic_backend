#!/bin/sh
while ! nc -z postgres 5432; do
  echo "Waiting for PostgreSQL to start..."
  sleep 1
done

echo "PostgreSQL is up and running. Running Prisma migrations..."


# npx prisma generate
npx prisma migrate dev
npm start prod
