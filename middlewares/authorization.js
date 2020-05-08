const settings = require('../appsettings');

exports.authorization = function (app, opts) {

    return function Invoke(req, res, next) {

        if (req.path == "/") {
            next();
            return;
        }

        let authorization = 'abc';

        //for others methods
        if (req.headers['authorization'] == authorization) {
            next();
            return;
        }
        
        //for gitlab webhooks
        if (req.headers['X-Gitlab-Token'] == authorization) {
            next();
            return;
        }


        res.contentType('application/json');
        res.status(401);
        res.json();
        res.end();
        return;

    }
}
