require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const model = require("./models/student.js")
const methodOverride = require("method-override");
const studentRoutes = require("./routes/studentRoutes.js")

const app = express();
const PORT = 3000;

const DB_URL = process.env.MONGO_URL;
const connectDB = async () => {
    try{
        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected");
    } catch(err) {
        console.log(err.message);
    }
}
connectDB();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static("public"));

app.use("/", studentRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

