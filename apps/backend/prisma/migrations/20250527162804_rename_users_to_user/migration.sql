-- CreateTable
CREATE TABLE "Mood" (
    "id" BIGSERIAL NOT NULL,
    "mood" VARCHAR(255) NOT NULL,
    "note" VARCHAR(255) NOT NULL,
    "level" INTEGER NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "deleted_at" TIMESTAMP,
    "user_id" BIGINT NOT NULL,

    CONSTRAINT "Mood_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" BIGSERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "deleted_at" TIMESTAMP,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_unique" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Mood" ADD CONSTRAINT "Mood_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
