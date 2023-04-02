require("dotenv").config();
const { MongoClient } = require('mongodb');

async function connectToDatabase() {
    const client = new MongoClient(process.env.MONGO_URL, { useUnifiedTopology: true });

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

module.exports = connectToDatabase;
