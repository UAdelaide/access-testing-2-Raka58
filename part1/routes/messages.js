var express = require('express');
var router = express.Router();
var db = require('../db');

var CURRENT_BUYER_ID = 2;
var CURRENT_SELLER_ID = 3;

router.get('/items', async (req, res) => {
    const [rows] = await db.query(`
        SELECT l.listing_id, b.title, u.name AS seller_name
        FROM 
        `)
});