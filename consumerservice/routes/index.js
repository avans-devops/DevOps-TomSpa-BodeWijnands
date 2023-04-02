let express = require('express')
const { msgConsumer } = require('../services/consumer.js')
let router = express.Router()
let { connectToDatabase }  = require('../services/database')
let db

router.get('/', async function(req, res) {
  if (!db) db = await connectToDatabase();
  let msgs = await db.collection('consumermsgs').find().toArray();
  res.json( msgs);
});

msgConsumer(async (msg) => {
  try {
    if (!db) db = await connectToDatabase();
    await db.collection('consumermsgs').insertOne(msg)

    console.log(`Message "${JSON.stringify(msg)}" sent`);
  } catch (error) {
    console.error(error);
  }
})

module.exports = router;
