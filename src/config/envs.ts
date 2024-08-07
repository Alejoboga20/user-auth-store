import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
	MONGO_URL: get('MONGO_URL').required().asString(),
	MONGO_DB_NAME: get('MONGO_DB_NAME').required().asString(),
	PORT: get('PORT').required().asPortNumber(),
	JWT_SEED: get('JWT_SEED').required().asString(),
	MAILER_SERVICE: get('MAILER_SERVICE').required().asString(),
	MAILER_EMAIL: get('MAILER_EMAIL').required().asString(),
	MAILER_SECRET_KEY: get('MAILER_SECRET_KEY').required().asString(),
	WEBSERVICE_URL: get('WEBSERVICE_URL').required().asString(),
};
