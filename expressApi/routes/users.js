const express = require('express');
const router = express.Router();
const { db } = require("../services/database");

router.get('/', async function(req, res) {
    let users = await db.collection('users').find().toArray();
    res.json(users);
});

router.post('/', function(req, res){
    db.collection('users').insertOne(req.body)
        .then((user) => res.status(201).json({ "id": user.insertedId }))
        .catch(err => res.status(500).json(err));
})

router.get('/slow', function(req, res) {
    setTimeout(() => {
        res.send('Slowly respond with a resource');
    }, 3000);
});

module.exports = router;