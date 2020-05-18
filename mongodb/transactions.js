
exports.Db = function (db, mdb) {

    this.FindByQuery = async (query) => {
        try {

            var result = await db.collection(mdb.collection).find(query).toArray();

            return result;

        }
        catch (ex) {

        }
    }
}
