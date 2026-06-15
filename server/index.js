require("dotenv").config();

const exp = require("express");
const app = exp();

app.use(exp.static("public"));

const cors = require("cors");
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const expressFileupload = require("express-fileupload");
app.use(expressFileupload());

const mongoose = require("mongoose");

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
  });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Event routes
const pr = require("./routes/event");
app.use("/event", pr);

// Admin routes
const ar = require("./routes/adminr");
app.use("/admin", ar);

// Dashboard routes
const dr = require("./routes/dashboardr");
app.use("/dashboard", dr);

// User routes
const ur = require("./routes/userr");
app.use("/user", ur);

app.use("/details", require("./routes/detailsr"));

// Start Server
const PORT = process.env.PORT || 2000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});