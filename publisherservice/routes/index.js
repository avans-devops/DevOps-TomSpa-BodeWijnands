let express = require('express')
const publisher = require('../services/publisher')
let router = express.Router()
let { connectToDatabase }  = require('../services/database')
let db;

router.post('/', async function(req, res) {
  const message = req.body

  try {
    await publisher(message);
    if (!db) db = await connectToDatabase()
    await db.collection('publishermsgs').insertOne(message)

    res.send(`Message "${JSON.stringify(message)}" sent`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

router.get('/', async function(req, res) {
  if (!db) { db = await connectToDatabase() }
  let msgs = await db.collection('publishermsgs').find().toArray();
  res.json( msgs);
});

module.exports = router;
