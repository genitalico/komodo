let UrlTelegramBot = process.env.TELEGRAM_URL_BOT;
exports.UrlTelegramBot = UrlTelegramBot;
exports.TelgramBotPath = {
    sendMessages: UrlTelegramBot + '/sendMessage'
}