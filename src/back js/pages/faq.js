const express = require("express");
const router = express.Router();
const database = require("../libraries/connect.js");

// GET route to fetch FAQs
router.get("/", (req, res) => {
    const query = "SELECT * FROM faq";

    database.query(query, (err, results) => {
        if (err) {
            console.error("Error querying the database:", err);
            res.status(500).send("Error querying the database");
            return;
        }
        res.json(results);
    });
});

module.exports = router;