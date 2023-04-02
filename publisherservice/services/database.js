require("dotenv").config();
const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGO_URL, { useUnifiedTopology: true });
async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        return client.db(process.env.DB_NAME);
    } catch (err) {
        console.error("ERROR: " + err);
        await client.close();
        throw err;
    }
}

module.exports = {
    connectToDatabase: connectToDatabase,
    client: client
};
