import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
expand(config({ path: '.env.development' }));

import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: process.env['DATABASE_URL'],
  },
});
