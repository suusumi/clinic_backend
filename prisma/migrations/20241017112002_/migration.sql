-- CreateEnum
CREATE TYPE "SpecFilial" AS ENUM ('KIM20', 'PlPavBortsov1', 'Kozlovskaya45A', 'KIM18A');

-- CreateTable
CREATE TABLE "Contacts" (
    "id" SERIAL NOT NULL,
    "first_tel" TEXT,
    "second_tel" TEXT,
    "mail" TEXT,
    "street" TEXT,
    "city" TEXT NOT NULL DEFAULT 'Волгоград',
    "vk_link" TEXT,
    "tg_link" TEXT,
    "wa_link" TEXT,
    "email_link" TEXT,

    CONSTRAINT "Contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Infographics" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Infographics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Documents" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT DEFAULT 'doc',
    "file_name" TEXT,

    CONSTRAINT "Documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Banners" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "text_content" TEXT NOT NULL,
    "banner_type" TEXT,
    "img_path" TEXT,

    CONSTRAINT "Banners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Administrators" (
    "id" SERIAL NOT NULL,
    "login" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "full_name" VARCHAR(255),

    CONSTRAINT "Administrators_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Services" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" INTEGER NOT NULL,
    "sub_category_id" INTEGER NOT NULL,

    CONSTRAINT "Services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Аллергология и иммунология',

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubCategories" (
    "id" SERIAL NOT NULL,
    "category_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Прием',

    CONSTRAINT "SubCategories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Specialists" (
    "id" SERIAL NOT NULL,
    "photo_path" TEXT,
    "name" TEXT NOT NULL,
    "post" TEXT,
    "speciality" TEXT,
    "degree" TEXT,
    "filial" "SpecFilial" DEFAULT 'PlPavBortsov1',

    CONSTRAINT "Specialists_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Administrators_login_key" ON "Administrators"("login");

-- AddForeignKey
ALTER TABLE "Services" ADD CONSTRAINT "Services_sub_category_id_fkey" FOREIGN KEY ("sub_category_id") REFERENCES "SubCategories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubCategories" ADD CONSTRAINT "SubCategories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
