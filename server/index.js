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
// Uses Env variable if available, otherwise falls back to your string
const dbUrl = process.env.MONGO_URL || "mongodb+srv://Shibam849:s123456@cluster0.tveqczp.mongodb.net/eventDB?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(dbUrl)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Event routes (existing)
const pr = require("./routes/event");
app.use("/event", pr);

// Admin routes (existing)
const ar = require("./routes/adminr");
app.use("/admin", ar);

// Dashboard routes (newly added)
const dr = require("./routes/dashboardr");
app.use("/dashboard", dr);

// User routes (newly added)
const ur = require("./routes/userr");
app.use("/user", ur); 

app.use('/details', require('./routes/detailsr'));

// FIX: Listen on the environment port provided by the host
const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});