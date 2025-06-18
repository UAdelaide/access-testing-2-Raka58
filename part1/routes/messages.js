var express = require('express');
var router = express.Router();
var db = require('../db');

var CURRENT_BUYER_ID = 2;
var CURRENT_SELLER_ID = 3;

router.get('/items', async (req, res) => {
    const [rows] = await db.query(`
        SELECT l.listing_id, b.title, u.username AS seller_name
        FROM Listings l
        JOIN Books b ON l.book_id = b.book_id
        JOIN Users u ON l.seller_id = u.user_id
        `);
        res.json(rows);
});

router.post('/messages', async (req, res) => {
    const { bookID, message } = req.body;
    await db.query(`

        `)
})

module.exports = router;