-- VERSION 0.1.0

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
  "firstName" text NOT NULL,
  "lastName" text NOT NULL,
  "postcode" text NOT NULL,
  "city" text NOT NULL,
  "address" text NOT NULL
);

CREATE TABLE IF NOT EXISTS "orders" (
  "id" SERIAL PRIMARY KEY,
  "customerId" integer NOT NULL,
  "status" "Status" NOT NULL,
  "createdAt" timestamp(6) NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE IF NOT EXISTS "order_items" (
  "id" SERIAL PRIMARY KEY,
  "orderId" integer NOT NULL,
  "kiteId" UUID NOT NULL,
  "materialId" UUID NOT NULL,
  "quantity" integer NOT NULL
);

CREATE TABLE IF NOT EXISTS "kites" (
  "id" UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
  "name" text NOT NULL,
  "imageUrl" text,
  "dimensions" text NOT NULL,
  "materials" text NOT NULL,
  "wind" text NOT NULL,
  "isBeginner" boolean NOT NULL,
  "details" text,
  "price" integer NOT NULL
);

CREATE TABLE IF NOT EXISTS "materials" (
  "id" UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
  "name" text NOT NULL,
  "imageUrl" text,
  "category" "Category" NOT NULL,
  "diameter" integer,
  "availableLength" integer[],
  "details" text,
  "price" integer NOT NULL
);

ALTER TABLE "orders" ADD FOREIGN KEY ("customerId") REFERENCES "customers" ("id");

ALTER TABLE "order_items" ADD FOREIGN KEY ("kiteId") REFERENCES "kites" ("id");

ALTER TABLE "order_items" ADD FOREIGN KEY ("materialId") REFERENCES "materials" ("id");

ALTER TABLE "order_items" ADD FOREIGN KEY ("orderId") REFERENCES "orders" ("id");
