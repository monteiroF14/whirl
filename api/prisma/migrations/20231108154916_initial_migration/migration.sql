-- CreateEnum
CREATE TYPE "Visibility" AS ENUM ('public', 'private');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('APPLICATION_USER', 'SUPER_ADMIN');

-- CreateEnum
CREATE TYPE "QuizGenre" AS ENUM ('geography', 'software', 'sport', 'movie', 'anime');

-- CreateEnum
CREATE TYPE "QuizOption" AS ENUM ('text');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,
    "image_url" TEXT NOT NULL DEFAULT 'https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg?size=626&ext=jpg&ga=GA1.1.1880011253.1699315200&semt=sph',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quiz" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "visibility" "Visibility" NOT NULL,
    "genre" "QuizGenre"[],
    "views" INTEGER NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Quiz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" SERIAL NOT NULL,
    "options" "QuizOption"[],
    "correct_option" INTEGER NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserFollowsQuizzes" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_UserFollowsQuizzes_AB_unique" ON "_UserFollowsQuizzes"("A", "B");

-- CreateIndex
CREATE INDEX "_UserFollowsQuizzes_B_index" ON "_UserFollowsQuizzes"("B");

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_id_fkey" FOREIGN KEY ("id") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFollowsQuizzes" ADD CONSTRAINT "_UserFollowsQuizzes_A_fkey" FOREIGN KEY ("A") REFERENCES "Quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFollowsQuizzes" ADD CONSTRAINT "_UserFollowsQuizzes_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
