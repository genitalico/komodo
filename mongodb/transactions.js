exports.FindByQuery = async (db, query) =>{
    try {

        var result = await db.collection(db.collections.collection1).find(query).toArray();

        return result;

    }
    catch (ex) {

    }
}