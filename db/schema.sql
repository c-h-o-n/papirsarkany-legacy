-- VERSION 0.2.1

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE "Status" AS ENUM (
  'Pending',
  'Canceled',
  'Fullfilled'
);

CREATE TYPE "Category" AS ENUM (
  'Egyzsinóros',
  'Anyag'
);

CREATE TYPE "ShippingMode" AS ENUM (
  'Személyes átvétel',
  'Postai szállítás'
);

CREATE TYPE "PaymentMode" AS ENUM (
  'Átvételkor készpénzel',
  'Előreutalással'
);

CREATE TABLE IF NOT EXISTS "customers" (
  "id" UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),

  "email" text NOT NULL UNIQUE,
  "firstName" text NOT NULL,
  "lastName" text NOT NULL,
  "phone" text NOT NULL,

  "shippingPostcode" text NOT NULL,
  "shippingCity" text NOT NULL,
  "shippingAddress" text NOT NULL,
  "shippingSubaddress" text NOT NULL,

  "billingPostcode" text NOT NULL,
  "billingCity" text NOT NULL,
  "billingAddress" text NOT NULL,
  "billingSubaddress" text NOT NULL
);

CREATE TABLE IF NOT EXISTS "products" (
  "id" UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
  "name" text NOT NULL,
  "imageUrl" text,
  "price" integer NOT NULL,
  "category" "Category" NOT NULL,
  "description" text
);

CREATE TABLE IF NOT EXISTS "orders" (
  "id" SERIAL PRIMARY KEY,
  "customerId" UUID,
  "status" "Status" NOT NULL,
  "shippingOption" "ShippingMode" NOT NULL,
  "paymentOption" "PaymentMode" NOT NULL,
  "comment" text,
  "createdAt" timestamp(6) NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE IF NOT EXISTS "order_items" (
  "id" SERIAL PRIMARY KEY,
  "orderId" integer NOT NULL,
  "productId" UUID,
  "quantity" integer NOT NULL
);

ALTER TABLE "orders" ADD FOREIGN KEY ("customerId") REFERENCES "customers" ("id") ON DELETE SET NULL;

ALTER TABLE "order_items" ADD FOREIGN KEY ("productId") REFERENCES "products" ("id") ON DELETE SET NULL;

ALTER TABLE "order_items" ADD FOREIGN KEY ("orderId") REFERENCES "orders" ("id") ON DELETE CASCADE;
