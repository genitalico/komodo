var mongodb = require("mongodb");
const settings = require("../appsettings");
var client = mongodb.MongoClient;

exports.connection = function (app, opts) {
    opts = {
        auth: {
            user: settings.MongoSettings.user,
            password: settings.MongoSettings.password,
        }
    };
    var property = opts.property || "db";

    var connection;

    return function MongoDb(req, res, next) {

        if (!connection) {
            connection = client.connect(settings.MongoSettings.connectionString, opts);
        }
        connection
            .then(function (client) {
                let db = client.db(settings.MongoSettings.dbName);
                db['collections']['collection1'] = settings.MongoSettings.collection;
                req[property] = db;
                app.set("mongodb", db);
                next();
            })
            .catch(function (err) {
                connection = undefined;
                next(err);
            });
    };
};
