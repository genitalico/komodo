module.exports = {
    apps: [{
        name: "komodo",
        script: "./bin/komodo",
        instances: "max",
        env: {
            NODE_ENV: "development",
            "F_USE_MONGO": "false",
            "FIXED_TOKENS": "abc,xyz",
            "TELEGRAM_URL_BOT": ""
        },
        env_production: {
            NODE_ENV: "production",
            "TELEGRAM_URL_BOT": "",
            "MONGO_CS": "",
            "MONGO_USER": "",
            "MONGO_PASSWORD": "",
            "MONGO_DBNAME": "",
            "MONGO_COLLECTION": "",
            "FIXED_TOKENS": "abc,1abc",
            "F_USE_MONGO": "true"
        }
    }]
}