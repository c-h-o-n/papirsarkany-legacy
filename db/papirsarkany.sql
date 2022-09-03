  CREATE TYPE "status" AS ENUM (
    'Pending',
    'Canceled',
    'Fullfilled'
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
    "status" status NOT NULL,
    "created_at" timestamp(6) without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS "order_items" (
    "id" SERIAL PRIMARY KEY,
    "kite_id" integer NOT NULL,
    "material_id" integer NOT NULL,
    "order_id" integer NOT NULL,
    "quantity" integer NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "kites" (
    "id" SERIAL PRIMARY KEY,
    "name" text NOT NULL,
    "image_url" text NOT NULL,
    "dimensions" text NOT NULL,
    "materials" text NOT NULL,
    "wind" text NOT NULL,
    "isBeginner" boolean NOT NULL,
    "details" text NOT NULL,
    "price" integer NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "materials" (
    "id" SERIAL PRIMARY KEY,
    "name" text NOT NULL,
    "diameter" integer NOT NULL,
    "length" integer NOT NULL,
    "tensile_strength" text NOT NULL
  );

  ALTER TABLE "orders" ADD FOREIGN KEY ("customer_id") REFERENCES "customers" ("id");

  ALTER TABLE "order_items" ADD FOREIGN KEY ("kite_id") REFERENCES "kites" ("id");

  ALTER TABLE "order_items" ADD FOREIGN KEY ("material_id") REFERENCES "materials" ("id");

  ALTER TABLE "order_items" ADD FOREIGN KEY ("order_id") REFERENCES "orders" ("id");
