# Komodo

[Publicación + explicación](https://80bits.blog/index.php/2020/05/25/komodo-backend-en-nodejs-para-bot-de-telegram-y-algo-mas/)

Implementación de bot para telegram.

### **Como ejecutar en local:**

```bash
$ nodemon --config dev.config.json
```

Ejemplo de archivo dev.config.json:

```json
{
"env": {
"TELEGRAM_URL_BOT": "",
"MONGO_CS": "",
"MONGO_USER": "",
"MONGO_PASSWORD": "",
"MONGO_DBNAME": "",
"MONGO_COLLECTION": "",
"FIXED_TOKENS": "abc,1abc",
"F_USE_MONGO": "false",
"TG_UPDATE": "update123"
}
}
```

### **Como ejecutar en producción:**

```bash
$ pm2 start ecosystem.config.js --env production
```

### **Variabales de entorno:**

| Nombre           | Descripción                                                  |
| ---------------- | ------------------------------------------------------------ |
| NODE_ENV         | Entorno de ejecución, puede ser *development* o *production* |
| TELEGRAM_URL_BOT | La url del bot proporcionada por BotFather                   |
| MONGO_CS         | La connexion de mongodb. Ejemplo: *mongodb://localhost:27017* |
| MONGO_USER       | Usuario para la conexión de mongodb                          |
| MONGO_PASSWORD   | Contraseña de usuario para mongodb                           |
| MONGO_DBNAME     | nombre de la base de datos en mongodb                        |
| MONGO_COLLECTION | nombre de la colección mongodb                               |
| FIXED_TOKENS     | tokens fijos en caso de no usar la conexión a la base de datos. |
| F_USE_MONGO      | Puede tener los valores: *true* para que se use la conexión mongodb, o *false* para que se usen los tokens fijos |
| TG_UPDATE        | path donde llegaran las actualizaciones de telegram, este debe ser secreto |

### **Agregar webhook de telegram:**

[API](https://core.telegram.org/bots/api#setwebhook)

```http
{server}/telegrambot/TG_UPDATE
```

### **Enviar un mensaje a un usuario telegram:**

```http
{server}/telegrambot/sendMessage/:chatId
```

### **Gitlab WebHooks**

```http
{server}/gitlab/webhooks/:chatId
```

