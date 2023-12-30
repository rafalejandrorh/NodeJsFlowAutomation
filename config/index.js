const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    env: process.env.NODE_ENV !== 'production',
    isProd: process.env.NODE_ENV === 'production',
    port: process.env.LOCAL_PORT || 6000,
    telegram: {
        bot: {
            token: process.env.TOKEN_BOT_TELEGRAM,
            allowBots: false,
            replySettingsDefault: {
                protect_content: true,
                disable_notification: false,
            }
        }
    },
    apiKey: process.env.API_KEY,
    secretKeyJwt: process.env.SECRET_KEY_JWT || 'WORKFLOW_AUTOMATION_123*2023',
    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD
    },
    postgresql: {
        host: process.env.POSTGRES_DB_USER,
        port: process.env.POSTGRES_DB_PORT,
        database: process.env.POSTGRES_DB_NAME,
        user: process.env.POSTGRES_DB_USER,
        password: process.env.POSTGRES_DB_PASSWORD,
        url: process.env.POSTGRES_DB_URL
    },
    mysql: {
        url: process.env.MYSQL_DB_URL
    },
    SDC: {
        mysql: {
            qa: {
                url: process.env.MYSQL_DB_URL_SDC
            }
        },
        TDP: {
            API: {
                DEV: {
                    url: process.env.TDP_API_LEGACY_DEV_URL,
                    OAuth2: {
                        clientId: process.env.TDP_API_LEGACY_DEV_CLIENT_ID,
                        scope: process.env.TDP_API_LEGACY_DEV_SCOPE,
                        username: process.env.TDP_API_LEGACY_DEV_USERNAME,
                        password: process.env.TDP_API_LEGACY_DEV_PASSWORD
                    }
                },
                QA: {
                    url: process.env.TDP_API_LEGACY_QA_URL,
                    OAuth2: {
                        clientId: process.env.TDP_API_LEGACY_QA_CLIENT_ID,
                        scope: process.env.TDP_API_LEGACY_QA_SCOPE,
                        username: process.env.TDP_API_LEGACY_QA_USERNAME,
                        password: process.env.TDP_API_LEGACY_QA_PASSWORD
                    }
                },
                PROD: {
                    url: process.env.TDP_API_LEGACY_PROD_URL,
                    OAuth2: {
                        clientId: process.env.TDP_API_LEGACY_PROD_CLIENT_ID,
                        scope: process.env.TDP_API_LEGACY_PROD_SCOPE,
                        username: process.env.TDP_API_LEGACY_PROD_USERNAME,
                        password: process.env.TDP_API_LEGACY_PROD_PASSWORD
                    }
                }
            }
        }
    },
    smtpGmail: {
        host: process.env.MAIL_HOST || 'smtp.gmail.com',
        port: process.env.MAIL_PORT || 465,
        user: process.env.MAIL_USER || 'prueba@gmail.com',
        pass: process.env.MAIL_PASSWORD || '123456789'
    }
};