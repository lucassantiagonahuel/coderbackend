import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT,
  mongoUrl: process.env.MONGO_URL,
  clientIdGithub: process.env.CLIENT_ID_GITHUB,
  clientSecretGithub: process.env.CLIENT_SECRET_GITHUB,
  callbackUrlGithub: process.env.CALLBACK_URL_GITHUB,
  privateKeyJwt: process.env.PRIVATE_KEY_JWT
};
