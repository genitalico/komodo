let express = require('express');
let router = express.Router();
let telegramCommands = require('../transactions/telegramBot/commands');

let commands = ['/code'];

router.post('/update', (req, res, next) => {

    try {
        let body = req.body;
        let text = body.message.text;

        let command = commands.findIndex((x) => x == text);

        if (command != -1) {

            //code
            if (command == 0) {
                
                let chatId = body.message.chat.id;

                telegramCommands.Code(chatId);
            }

        }


        //--------------------------------------------------------------------------------------------
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