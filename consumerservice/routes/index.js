let express = require('express')
const { msgConsumer } = require('../service/consumer.js')
let router = express.Router()
let dbConnection = require('../service/database')
let db

router.get('/', async function(req, res, next) {
  if (!db) { db = await dbConnection() }
  let msgs = await db.collection(process.env.DB_NAME).find().toArray();
  res.json( msgs);
});

msgConsumer(async (msg) => {
  try {
    if (!db) { db = await dbConnection() }
    await db.collection(process.env.DB_NAME).insertOne(msg)

    console.log(`Message "${JSON.stringify(msg)}" sent`);
  } catch (error) {
    console.error(error);
  }
})

module.exports = router;
