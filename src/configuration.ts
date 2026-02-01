import { config } from 'dotenv';
import { expand } from 'dotenv-expand';

expand(
  config({
    path: '.env.development',
  }),
);

const configuration = () => ({
  auth: {
    secret: process.env.SECRET_JWT_KEY,
  },
});
export default configuration;
