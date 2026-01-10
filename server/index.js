const exp = require("express");
const app = exp();

app.use(exp.static("public"));
app.use("/event_img", exp.static("public/event_img"));


const cors = require("cors");
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const expressFileupload = require("express-fileupload");
app.use(expressFileupload());

const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://Shibam849:s123456@cluster0.tveqczp.mongodb.net/eventDB?retryWrites=true&w=majority&appName=Cluster0");



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
app.use("/user", ur); // Using /user as the base path for user-related actions

app.use('/details', require('./routes/detailsr'));

app.listen(2000, () => {
    console.log("Server started on port 2000");
});
