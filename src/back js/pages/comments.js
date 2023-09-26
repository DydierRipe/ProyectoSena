const express = require("express");
const router = express.Router();
const database = require("../libraries/connect.js");

// POST route to add a comment
router.post("/", (req, res) => {
    const { name, comment } = req.body;
    const query = "INSERT INTO comments (name, comment) VALUES (?, ?)";

    database.query(query, [name, comment], (err, result) => {
        if (err) {
            console.error("Error inserting into the database:", err);
            res.status(500).send("Error inserting into the database");
            return;
        }
        res.json({ message: "Comment added successfully" });
    });
});

module.exports = router;