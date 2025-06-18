var express = require('express');
var router = express.Router();
var db = require('../db');

var CURRENT_BUYER_ID = 2;

router.get('/items', async (req, res) => {
    const [rows] = await db.query(`
        SELECT l.listing_id, b.title, u.username AS seller_name, l.seller_id
        FROM Listings l
        JOIN Books b ON l.book_id = b.book_id
        JOIN Users u ON l.seller_id = u.user_id
        `);
        res.json(rows);
});

router.get('/messages', async (req, res) => {
    const [rows] = await db.query(`
        SELECT m.message_text, m.sent_at, b.title, u.name AS buyer_name
        FROM Messages m
        JOIN Listings l ON m.listing_id = l.listing_id
        JOIN Books b ON l.book_id = b.book_id
        JOIN Users u ON m.sender_id = u.user_id
        WHERE m.receiver_id = ?
        ORDER BY m.sent_at DESC
        `, [CURRENT_BUYER_ID]);
        res.json(rows);
});

router.post('/messages', async (req, res) => {
    const { listingID, sellerID, message } = req.body;
    await db.query(`
        INSERT INTO Messages (sender_id, receiver_id, listing_id, message_text, sent_at)
        VALUES (?, ?, ?, ?, NOW())
        `, [CURRENT_BUYER_ID, sellerID, listingID, message]);
        res.status(201).json({ message: 'message sent!' });
});

module.exports = router;