let express = require('express');
const publisher = require('../service/publisher')
let router = express.Router();

router.post('/', async function(req, res, next) {
  console.log("###############\n" + req.body)
  const message = req.body.msg;
  console.log(message)

  try {
      await publisher(message)

      console.log(`Message "${message}" sent`);
      res.send(`Message "${message}" sent`);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
});

module.exports = router;
