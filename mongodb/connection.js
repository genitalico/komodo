var mongodb = require("mongodb");
const settings = require("../appsettings");
var client = mongodb.MongoClient;
let dbTransactions = require('./transactions');

exports.connection = function (app, opts) {
    opts = {
        auth: {
            user: settings.MongoSettings.user,
            password: settings.MongoSettings.password,
        },
        useNewUrlParser: true,
        useUnifiedTopology: true
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
                req[property] = db;
                req['mdb'] = {
                    collection: 'collection1',
                    transactions: dbTransactions
                };
                req.mdb.transactions.Db(db, req.mdb);
                app.set("mongodb", db);
                next();
            })
            .catch(function (err) {
                connection = undefined;
                next(err);
            });
    };
};
