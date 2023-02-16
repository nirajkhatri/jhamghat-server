const {
  NODE_ENV,
  PROD_MONGO_URL,
  DEV_MONGO_URL,
  DEV_ACCESS_TOKEN_SECRET,
  PROD_ACCESS_TOKEN_SECRET,
  DEV_REFRESH_TOKEN_SECRET,
  PROD_REFRESH_TOKEN_SECRET,
} = process.env;

const IS_PROD_ENVIRONMENT = NODE_ENV === "PROD" ?? false;

const MONGO_URL = IS_PROD_ENVIRONMENT ? PROD_MONGO_URL : DEV_MONGO_URL;

const ALLOWED_ORIGINS = IS_PROD_ENVIRONMENT
  ? { origin: "https://jhamghatkhajaghar.com", credentials: true }
  : { origin: "http://localhost:5173", credentials: true };

const ACCESS_TOKEN_SECRET = IS_PROD_ENVIRONMENT
  ? PROD_ACCESS_TOKEN_SECRET
  : DEV_ACCESS_TOKEN_SECRET;

const REFRESH_TOKEN_SECRET = IS_PROD_ENVIRONMENT
  ? PROD_REFRESH_TOKEN_SECRET
  : DEV_REFRESH_TOKEN_SECRET;

module.exports = {
  MONGO_URL,
  ALLOWED_ORIGINS,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  IS_PROD_ENVIRONMENT,
};
