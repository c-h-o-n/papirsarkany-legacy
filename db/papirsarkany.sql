CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE "Status" AS ENUM (
  'Pending',
  'Canceled',
  'Fullfilled'
);

CREATE TYPE "Category" AS ENUM (
  'Zsinórtartók',
  'Pálcák, rudak',
  'Karboncsövek',
  'Trevira zsinórok'
);

CREATE TABLE IF NOT EXISTS "customers" (
  "id" SERIAL PRIMARY KEY,
  "first_name" text NOT NULL,
  "last_name" text NOT NULL,
  "zip_code" text NOT NULL,
  "city" text NOT NULL,
  "address" text NOT NULL
);

CREATE TABLE IF NOT EXISTS "orders" (
  "id" SERIAL PRIMARY KEY,
  "customer_id" integer NOT NULL,
  "status" "Status" NOT NULL,
  "created_at" timestamp(6) NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE IF NOT EXISTS "order_items" (
  "id" SERIAL PRIMARY KEY,
  "order_id" integer NOT NULL,
  "kite_id" UUID NOT NULL,
  "material_id" UUID NOT NULL,
  "quantity" integer NOT NULL
);

CREATE TABLE IF NOT EXISTS "kites" (
  "id" UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
  "name" text NOT NULL,
  "image_url" text,
  "dimensions" text NOT NULL,
  "materials" text NOT NULL,
  "wind" text NOT NULL,
  "is_beginner" boolean NOT NULL,
  "details" text,
  "price" integer NOT NULL
);

CREATE TABLE IF NOT EXISTS "materials" (
  "id" UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
  "name" text NOT NULL,
  "image_url" text,
  "category" "Category" NOT NULL,
  "diameter" integer,
  "available_length" integer[],
  "details" text,
  "price" integer NOT NULL
);

ALTER TABLE "orders" ADD FOREIGN KEY ("customer_id") REFERENCES "customers" ("id");

ALTER TABLE "order_items" ADD FOREIGN KEY ("kite_id") REFERENCES "kites" ("id");

ALTER TABLE "order_items" ADD FOREIGN KEY ("material_id") REFERENCES "materials" ("id");

ALTER TABLE "order_items" ADD FOREIGN KEY ("order_id") REFERENCES "orders" ("id");
