let express = require('express');
let router = express.Router();
let telegramBotMessages = require('../transactions/telegramBot/messages');

router.post('/sendMessage/:chatId', (req, res, next) => {

    try {
        let body = req.body;
        let chatId = req.params.chatId;

        let modelBot = {
            chatId,
            header: body.header,
            body:body.body
        };

        telegramBotMessages.SendMessageWithHeader(modelBot);

        res.contentType('application/json');
        res.status(200);
        res.json();
        res.end();
    }
    catch (ex) {
        res.contentType('application/json');
        res.status(500);
        res.json();
        res.end();
    }

});

module.exports = router;