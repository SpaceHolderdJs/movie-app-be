import * as dotenv from 'dotenv';

dotenv.config();

const { env } = process;

interface ENVInterface {
  DB_NAME: string;
  DB_USER_NAME: string;
  DB_PASSWORD: string;
  CLOUDINARY_API_SECRET: string;
  CLOUDINARY_API_KEY: string;
  CLOUDINARY_CLOUD_NAME: string;
}

export const ENV: ENVInterface = {
  DB_NAME: env.DB_NAME,
  DB_USER_NAME: env.DB_USER_NAME,
  DB_PASSWORD: env.DB_PASSWORD,
  CLOUDINARY_API_SECRET: env.CLOUDINARY_API_SECRET,
  CLOUDINARY_API_KEY: env.CLOUDINARY_API_KEY,
  CLOUDINARY_CLOUD_NAME: env.CLOUDINARY_CLOUD_NAME,
};
