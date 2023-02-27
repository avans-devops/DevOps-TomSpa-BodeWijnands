/* eslint-disable no-undef */
const { MongoClient } = require("mongodb");

// Connection URI
const uri = process.env.MONGO_URL;
console.log("url is: ", uri)
const client = new MongoClient(uri, {

    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4
});

let dbConnection;

module.exports = {

    client: client,

    getDb: async function () {

        if (!dbConnection) {

            await client.connect();

            dbConnection = client.db(process.env.DB_NAME);
        }

        return dbConnection;
    }
};