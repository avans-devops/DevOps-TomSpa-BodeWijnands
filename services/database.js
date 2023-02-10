const { MongoClient } = require('mongodb')
const uri = process.env.MONGO_URL

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4
})
const db = client.db(process.env.DB_NAME)

module.exports = {
  db,
  client
}
