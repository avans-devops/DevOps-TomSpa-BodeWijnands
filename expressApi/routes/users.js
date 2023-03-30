const express = require('express');
const router = express.Router();
const dbo = require('../services/database');

router.get('/slow', function(req, res, next) {
  setTimeout(() => {
    res.send('Slowly respond with a resource');
  }, 3000);
});

router.route('/').get((req, res) => {
  dbo.getDb().then(db => {
    const users = db.collection('users');
    users.find({}).limit(50).toArray().then(r => {
        console.log(r);
        res.json(r)
      }
    ).catch(err => {
      console.log(err);
      res.status(400).send("Error fetching users!");
    });
    }
);
  })
  .post((req, res) => {
    console.log("doing post")
      dbo.getDb().then(db => {
         console.log("doing post")
          const users = db.collection('users');
          users.insertOne(req.body).then(r => {
              console.log('id', r.insertedId);
              res.status(204).send();
          }).catch(err => {
              console.log(err);
              res.status(400).send("Error inserting user!");
          });
      });
  });
module.exports = router; 