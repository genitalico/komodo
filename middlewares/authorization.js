const settings = require('../appsettings');

exports.authorization = function (app, opts) {

    return async function Invoke(req, res, next) {

        if (req.path == "/") {
            next();
            return;
        }

        //update telegram
        let pathUpdate = "/telegrambot/" + settings.TGupdate;
        if (req.path == pathUpdate) {
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

        let authorization = false;

        if (settings.Flags.useMongo)
            authorization = await authFromMongodb(hauthorization, req.mdb);
        else
            authorization = authFromString(hauthorization);

        if (authorization) {
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

function authFromMongodb(hauthorization, mdb) {

    return new Promise(async (resolve, reject) => {

        let query = {
            "type": 1,
            "token": hauthorization
        };

        let authorization = await mdb.transactions.FindByQuery(query);

        if (authorization.length == 1)
            resolve(true);
        else
            resolve(false);

        return;
    });

}

function authFromString(hauthorization) {

    let tokens = settings.FixedTokens.split(',');

    for (let i = 0; i < tokens.length; i++) {
        if (tokens[i] == hauthorization)
            return true;
    }

    return false;

}
