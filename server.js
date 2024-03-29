const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();
const cors = require("cors");
const path = require("path");

const app = express();

// Connect Database
connectDB();

// Init Middleware (allows us to accept req.body data in routes)
app.use(express.json({ extended: false }));
app.use(cors());

// Define Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/actions", require("./routes/actions"));
app.use("/api/carbon-interface", require("./routes/carbon-interface"));
app.use("/api/google-maps", require("./routes/google-maps"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
