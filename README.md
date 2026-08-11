# NestJS Pokédex Service 🐼

A high-performance backend microservice designed to index, search, and manage Pokémon data using **NestJS** and **MongoDB**. It showcases optimal handling of data migrations via dynamic seeding and custom pipes.

## 🚀 Key Features
* **NoSQL Database Integration:** Seamless connection to MongoDB using **Mongoose** for data modeling.
* **Automated Seeding System:** Dedicated endpoint `/api/v1/seed` that fetches data from external APIs and populates the database dynamically.
* **Custom Pipes:** Implemented custom validation pipes (like `ParseMongoIdPipe`) to ensure high API resilience.
* **Pagination & Filtering:** Optimised search endpoints with custom Query DTOs to deliver fast responses.

## 🛠️ Tech Stack
* **Framework:** NestJS
* **Database:** MongoDB / Mongoose
* **Tools:** Docker Compose, Yarn, Nest CLI

## 📦 Installation
1. Clone the repo and configure your `.env` file based on `.env.template`.
2. Start the Mongo database instance:
   ```bash
   docker-compose up -d
   ```
3. Install the dependencies and run the server:
   ```bash
   yarn install
   yarn start:dev
   ```
4. Hydrate your database by calling the seed endpoint: `GET http://localhost:3000/api/v1/seed`
