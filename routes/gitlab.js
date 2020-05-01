let express = require('express');
let router = express.Router();
let whTransaction = require('../transactions/gitlab/webHooksTransaction');
let telegramBotMessages = require('../transactions/telegramBot/messages');

router.post('/webhooks/:chatId', (req, res, next) => {

    let bodyReq = req.body;
    let kindof = req.header('X-Gitlab-Event');
    let body = "";
    

    if (kindof == "Push Hook") {
        
        body = whTransaction.PushEvent(bodyReq);
        let chatId = req.params.chatId;
        let header = 'GitLab: ' + req.body.object_kind;

        let modelBot = {
            chatId,
            header,
            body
        };

        telegramBotMessages.SendMessageWithHeader(modelBot);
    }

    res.contentType('application/json');
    res.status(200);
    res.json();
    res.end();

});

module.exports = router;

