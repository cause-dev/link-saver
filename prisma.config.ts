import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrate: {                          // was "migrations"
    async adapter() {
      const { PrismaPg } = await import("@prisma/adapter-pg");
      const { default: dotenv } = await import("dotenv");
      dotenv.config();

      return new PrismaPg({
        connectionString: process.env.DATABASE_URL!,
      });
    },
  },
});