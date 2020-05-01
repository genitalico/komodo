let request = require('request');
let settings = require('../../appsettings');

exports.SendMessageWithHeader = (model) => {

    let text = '*' + model.header + '*' + '\n' + model.body;

    let json = {
        'chat_id': model.chatId,
        'text': text,
        'parse_mode': 'Markdown'
    };

    request.post(settings.TelgramBotPath.sendMessages, {
        json
    },
        (error, response, body) => {

            if (!error && response.statusCode == 200) {
                return;
            }
        }
    );
}
