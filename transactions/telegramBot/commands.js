let telegramBotMessages = require('./messages');

exports.Code = function (chatId) {

    let modelBot = {
        chatId,
        header : 'Telegram ID',
        body: chatId
    };

    telegramBotMessages.SendMessageWithHeader(modelBot);
}