const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    env: process.env.NODE_ENV,
    isProd: process.env.NODE_ENV === 'production' ? true : false,
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
        host: process.env.POSTGRES_DB_HOST,
        port: process.env.POSTGRES_DB_PORT,
        database: process.env.POSTGRES_DB_NAME,
        user: process.env.POSTGRES_DB_USER,
        password: process.env.POSTGRES_DB_PASSWORD,
        url: `postgres://${process.env.POSTGRES_DB_USER}:${process.env.POSTGRES_DB_PASSWORD}@${process.env.POSTGRES_DB_HOST}:${process.env.POSTGRES_DB_PORT}/${process.env.POSTGRES_DB_NAME}`
    },
    mysql: {
        url: `mysql://${process.env.MYSQL_DB_USER}:${process.env.MYSQL_DB_PASSWORD}@${process.env.MYSQL_DB_HOST}:${process.env.MYSQL_DB_PORT}/${process.env.MYSQL_DB_NAME}`
    },
    SDC: {
        mysql: {
            qa: {
                url: process.env.MYSQL_DB_URL_SDC_QA
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
    smtp: {
        gmail: {
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
        }
    },
    API: {
        V1: {
            endpoint: process.env.API_ENDPOINT_V1
        }
    },
    paypal: {
        paypalFee: 5.4,
        paypalFeeAdditional: 0.30
    },
    dollar: {
        pricesAllowed: {
            codes: [
                'VMO',
                'VES',
                'VBIN',
                'VEPAY'
            ]
        }
    },
    gitGuardian: {
        url: process.env.GIT_GUARDIAN_URL,
        token: process.env.GIT_GUARDIAN_TOKEN,
        pathHealth: '/health'
    },
    exchangeVcoud: {
        url: process.env.EXCHANGE_VCOUD_URL,
        pathCoins: '/coins'
    }
};