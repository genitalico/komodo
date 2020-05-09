const settings = require('../appsettings');
const findByQuery = require('../mongodb/transactions').FindByQuery;

exports.authorization = function (app, opts) {

    return async function Invoke(req, res, next) {

        if (req.path == "/") {
            next();
            return;
        }

        let hauthorization = req.headers['authorization'] || req.headers['x-gitlab-token'];

        if (hauthorization == undefined) {
            res.contentType('application/json');
            res.status(401);
            res.json();
            res.end();
            return;
        }

        let query = {
            "type": 1,
            "token": hauthorization
        };

        let authorization = await findByQuery(req.db, query);

        if (authorization.length == 1) {
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
