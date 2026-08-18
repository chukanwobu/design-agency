require("dotenv").config();

const express = require("express");
const cors = require("cors");
const session = require("express-session");

const { DatabaseSync } = require("node:sqlite");

const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 4000;


// ------------------------------------
// MIDDLEWARE
// ------------------------------------

app.use(cors());

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,

    resave: false,

    saveUninitialized: false,

    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 1000 * 60 * 60 * 8,
    },
  })
);


// ------------------------------------
// DATABASE SETUP
// ------------------------------------

const dataFolder = path.join(__dirname, "data");

if (!fs.existsSync(dataFolder)) {
  fs.mkdirSync(dataFolder);
}

const databasePath = path.join(
  dataFolder,
  "studio.db"
);

const db = new DatabaseSync(databasePath);


// Create inquiries table
db.exec(`
  CREATE TABLE IF NOT EXISTS inquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    project_type TEXT NOT NULL,
    budget TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`);

console.log("Database connected.");


// ------------------------------------
// ADMIN AUTHENTICATION MIDDLEWARE
// ------------------------------------

function requireAdmin(req, res, next) {
  if (!req.session.admin) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized.",
    });
  }

  next();
}


// ------------------------------------
// TEST ROUTE
// ------------------------------------

app.get("/", (req, res) => {
  res.send("Studio backend is running.");
});


// ------------------------------------
// ADMIN LOGIN
// ------------------------------------

app.post("/api/admin/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required.",
    });
  }

  if (
    email !== process.env.ADMIN_EMAIL ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password.",
    });
  }

  req.session.admin = true;

  res.status(200).json({
    success: true,
    message: "Login successful.",
  });
});


// ------------------------------------
// CHECK ADMIN SESSION
// ------------------------------------

app.get("/api/admin/session", (req, res) => {
  res.status(200).json({
    authenticated: req.session.admin === true,
  });
});


// ------------------------------------
// ADMIN LOGOUT
// ------------------------------------

app.post("/api/admin/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.error("Logout error:", error);

      return res.status(500).json({
        success: false,
        message: "Could not log out.",
      });
    }

    res.clearCookie("connect.sid");

    res.status(200).json({
      success: true,
      message: "Logged out successfully.",
    });
  });
});


// ------------------------------------
// CREATE INQUIRY
// ------------------------------------

app.post("/api/inquiries", (req, res) => {
  const {
    name,
    email,
    company,
    projectType,
    budget,
    message,
  } = req.body;


  // --------------------------------
  // REQUIRED FIELD VALIDATION
  // --------------------------------

  if (
    !name ||
    !email ||
    !projectType ||
    !budget ||
    !message
  ) {
    return res.status(400).json({
      success: false,
      message: "Please fill out all required fields.",
    });
  }


  // --------------------------------
  // EMAIL VALIDATION
  // --------------------------------

  const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Please enter a valid email address.",
    });
  }


  // --------------------------------
  // PROJECT TYPE VALIDATION
  // --------------------------------

  const allowedProjectTypes = [
    "web-design",
    "web-development",
    "ecommerce",
    "redesign",
    "other",
  ];

  if (!allowedProjectTypes.includes(projectType)) {
    return res.status(400).json({
      success: false,
      message: "Please select a valid project type.",
    });
  }


  // --------------------------------
  // BUDGET VALIDATION
  // --------------------------------

  const allowedBudgets = [
    "under-1000",
    "1000-2500",
    "2500-5000",
    "5000-plus",
  ];

  if (!allowedBudgets.includes(budget)) {
    return res.status(400).json({
      success: false,
      message: "Please select a valid budget.",
    });
  }


  // --------------------------------
  // SAVE TO DATABASE
  // --------------------------------

  try {
    const insertInquiry = db.prepare(`
      INSERT INTO inquiries (
        name,
        email,
        company,
        project_type,
        budget,
        message
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    const result = insertInquiry.run(
      name.trim(),
      email.trim().toLowerCase(),
      company?.trim() || null,
      projectType,
      budget,
      message.trim()
    );

    console.log(
      `New inquiry saved. ID: ${result.lastInsertRowid}`
    );

    res.status(201).json({
      success: true,
      message: "Inquiry received successfully.",
      inquiryId: Number(result.lastInsertRowid),
    });

  } catch (error) {
    console.error(
      "Database error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Something went wrong while saving your inquiry.",
    });
  }
});


// ------------------------------------
// GET ALL INQUIRIES
// PROTECTED ADMIN ROUTE
// ------------------------------------

app.get("/api/inquiries", requireAdmin, (req, res) => {
  try {
    const getInquiries = db.prepare(`
      SELECT
        id,
        name,
        email,
        company,
        project_type,
        budget,
        message,
        status,
        created_at
      FROM inquiries
      ORDER BY created_at DESC
    `);

    const inquiries = getInquiries.all();

    res.status(200).json({
      success: true,
      inquiries,
    });

  } catch (error) {
    console.error(
      "Error retrieving inquiries:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Could not retrieve inquiries.",
    });
  }
});

// ------------------------------------
// UPDATE INQUIRY STATUS
// ------------------------------------

app.patch(
  "/api/inquiries/:id/status",
  requireAdmin,
  (req, res) => {
    const inquiryId = Number(req.params.id);
    const { status } = req.body;

    const allowedStatuses = [
      "new",
      "contacted",
      "meeting-scheduled",
      "proposal-sent",
      "client",
    ];

    if (!Number.isInteger(inquiryId) || inquiryId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid inquiry ID.",
      });
    }

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status.",
      });
    }

    try {
      const updateStatus = db.prepare(`
        UPDATE inquiries
        SET status = ?
        WHERE id = ?
      `);

      const result = updateStatus.run(
        status,
        inquiryId
      );

      if (result.changes === 0) {
        return res.status(404).json({
          success: false,
          message: "Inquiry not found.",
        });
      }

      res.status(200).json({
        success: true,
        message: "Status updated successfully.",
      });

    } catch (error) {
      console.error(
        "Error updating inquiry status:",
        error
      );

      res.status(500).json({
        success: false,
        message: "Could not update status.",
      });
    }
  }
);


// ------------------------------------
// START SERVER
// ------------------------------------

app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});