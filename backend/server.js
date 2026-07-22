const path = require("path");
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend")));

// ===============================
// Database Connection
// ===============================

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.log("❌ Database Connection Failed");
        console.log(err);
        return;
    }

    console.log("✅ MySQL Connected Successfully");
});

// ===============================
// Home Route
// ===============================

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
});
// ========================================
// USER REGISTER API
// ========================================

app.post("/register", async (req, res) => {

    const { full_name, email, phone, password } = req.body;

    // Check if all fields are filled
    if (!full_name || !email || !phone || !password) {
        return res.status(400).json({
            success: false,
            message: "Please fill all fields."
        });
    }

    // Check if email already exists
    db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        async (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            if (result.length > 0) {
                return res.status(400).json({
                    success: false,
                    message: "Email already exists."
                });
            }

            // Encrypt password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert user
            db.query(
                "INSERT INTO users(full_name,email,phone,password) VALUES(?,?,?,?)",
                [full_name, email, phone, hashedPassword],
                (err, data) => {

                    if (err) {
                        return res.status(500).json(err);
                    }

                    res.json({
                        success: true,
                        message: "Registration Successful!"
                    });

                }
            );

        }
    );

});

// ===============================
// Start Server
// ===============================

// ========================================
// USER LOGIN API
// ========================================

app.post("/login", (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please enter email and password."
        });
    }

    db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        async (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            if (result.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "User not found."
                });
            }

            const user = result[0];

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid password."
                });
            }

            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1d"
                }
            );

            res.json({
                success: true,
                message: "Login Successful",
                token,
                user: {
                    id: user.id,
                    full_name: user.full_name,
                    email: user.email,
                    phone: user.phone
                }
            });

        }
    );

});

const PORT = process.env.PORT || 3000;
// ========================================
// ADMIN REGISTER API
// ========================================

app.post("/admin/register", async (req, res) => {

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: "Please fill all fields."
        });
    }

    db.query(
        "SELECT * FROM admins WHERE username = ?",
        [username],
        async (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            if (result.length > 0) {
                return res.status(400).json({
                    success: false,
                    message: "Admin already exists."
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            db.query(
                "INSERT INTO admins(username,password) VALUES(?,?)",
                [username, hashedPassword],
                (err) => {

                    if (err) {
                        return res.status(500).json(err);
                    }

                    res.json({
                        success: true,
                        message: "Admin registered successfully."
                    });

                }
            );

        }
    );

});

// ========================================
// ADMIN LOGIN API
// ========================================

console.log("✅ Admin login route loaded");

app.post("/admin/login", (req, res) => {

    const { username, password } = req.body;

    db.query(
        "SELECT * FROM admins WHERE username = ?",
        [username],
        async (err, result) => {

            if (err) return res.status(500).json(err);

            if (result.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Admin not found."
                });
            }

            const admin = result[0];

            const isMatch = await bcrypt.compare(password, admin.password);

            if (!isMatch) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid password."
                });
            }

            const token = jwt.sign(
                {
                    id: admin.id,
                    username: admin.username,
                    role: "admin"
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1d"
                }
            );

            res.json({
                success: true,
                message: "Admin Login Successful",
                token
            });

        }
    );

});

// ========================================
// ADD EVENT API
// ========================================

app.post("/events", (req, res) => {

    const {
        title,
        category,
        description,
        location,
        event_date,
        event_time,
        price,
        max_guests,
        image
    } = req.body;

    // Validation
    if (
        !title ||
        !category ||
        !description ||
        !location ||
        !event_date ||
        !event_time ||
        !price ||
        !max_guests
    ) {
        return res.status(400).json({
            success: false,
            message: "Please fill all required fields."
        });
    }

    const sql = `
        INSERT INTO events
        (title, category, description, location, event_date, event_time, price, max_guests, image)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            title,
            category,
            description,
            location,
            event_date,
            event_time,
            price,
            max_guests,
            image || null
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                success: true,
                message: "Event added successfully.",
                eventId: result.insertId
            });

        }
    );

});

// ========================================
// GET ALL EVENTS API
// ========================================

app.get("/events", (req, res) => {

    const sql = "SELECT * FROM events ORDER BY created_at DESC";

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            success: true,
            total: result.length,
            events: result
        });

    });

});

app.listen(PORT, () => {
    console.log(`🚀 Server Running on http://localhost:${PORT}`);
});