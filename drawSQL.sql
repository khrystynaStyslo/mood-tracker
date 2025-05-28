CREATE TABLE "Users"(
    "id" BIGINT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" DATE NOT NULL,
    "updated_at" DATE NOT NULL,
    "theme" VARCHAR(255) CHECK
        ("theme" IN('')) NOT NULL,
        "oauth_provider" TEXT NULL,
        "last_login" DATE NOT NULL,
        "timezone" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);
ALTER TABLE
    "Users" ADD PRIMARY KEY("id");
ALTER TABLE
    "Users" ADD CONSTRAINT "users_email_unique" UNIQUE("email");
CREATE TABLE "Mood"(
    "id" BIGINT NOT NULL,
    "user_id" BIGINT NOT NULL,
    "mood" VARCHAR(255) CHECK
        ("mood" IN('')) NOT NULL,
        "note" VARCHAR(255) NOT NULL,
        "level" INTEGER NOT NULL,
        "created_at" DATE NOT NULL,
        "updated_at" DATE NOT NULL,
        "ai_sentiment" TEXT NOT NULL,
        "ai_keywords" JSON NOT NULL,
        "ai_recommendation" TEXT NOT NULL,
        "timezone" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
        "type" VARCHAR(255)
    CHECK
        ("type" IN('')) NOT NULL,
        "deleted_at" DATE NOT NULL,
        "last_ai_update" DATE NOT NULL
);
ALTER TABLE
    "Mood" ADD PRIMARY KEY("id");
CREATE TABLE "Tags"(
    "id" BIGINT NOT NULL,
    "name" TEXT NOT NULL,
    "user_id" BIGINT NOT NULL,
    "color" TEXT NOT NULL,
    "created_at" DATE NOT NULL
);
ALTER TABLE
    "Tags" ADD PRIMARY KEY("id");
CREATE TABLE "Mood entries_tags"(
    "id" BIGINT NOT NULL,
    "mood_entry_id" BIGINT NOT NULL,
    "tag_id" BIGINT NOT NULL
);
ALTER TABLE
    "Mood entries_tags" ADD PRIMARY KEY("id");
ALTER TABLE
    "Mood entries_tags" ADD CONSTRAINT "mood entries_tags_tag_id_foreign" FOREIGN KEY("tag_id") REFERENCES "Mood"("id");
ALTER TABLE
    "Mood" ADD CONSTRAINT "mood_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "Users"("id");
ALTER TABLE
    "Mood entries_tags" ADD CONSTRAINT "mood entries_tags_mood_entry_id_foreign" FOREIGN KEY("mood_entry_id") REFERENCES "Mood"("id");
ALTER TABLE
    "Tags" ADD CONSTRAINT "tags_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "Users"("id");