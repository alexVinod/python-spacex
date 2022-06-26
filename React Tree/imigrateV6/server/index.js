const express = require("express");
const app = express();
const mongoose = require("mongoose");
const LoginModel = require("./models/Login");
const MigrationModel = require("./models/Migration");
const ConfigModel = require("./models/Configuration");
const AnalyzeModel = require("./models/Analyze");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "OKJNJKDNNWNWLWLNCKJCNKJNKCJKNJKNWJKNKJNWKNCNKWNCKJNJCQOWUWUIWWZLKXXXNVINODKINGWNN";

const cors = require("cors");
app.use(express.json());

app.use(cors());

app.use(express.static(__dirname));

// app.get("/*", function (req, res) {
//     res.sendFile(path.join(__dirname, "index.html"));
// });

const url = "mongodb+srv://gunbros:12345@cluster0.rx8rtmt.mongodb.net/afme?retryWrites=true&w=majority";
mongoose.connect(url);

// Login : Get Users Details
app.get("/getUsers", (req, res) => {
    LoginModel.find({}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

app.post("/auth/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await LoginModel.findOne({ username, password }).lean();
    if (!user) {
        return res.json({ status: "error", error: "Invalid Username/Password" });
    } else {
        // const token = jwt.sign({
        //     id: user._id,
        //     username: user.username
        // }, JWT_SECRET);

        res.json({ status: "ok" });
    }
});

app.post("/createUser", async (req, res) => {
    try {
        const user = req.body;
        const newUser = new LoginModel(user);
        await newUser.save();

        res.json(user);
        console.log("Created");
    } catch (err) {
        res.json(err);
    }
});

app.post("/createAnalyze", async (req, res) => {
    try {
        const analyzeData = req.body;
        const newAnalyze = new AnalyzeModel(analyzeData);
        await newAnalyze.save();

        res.json(analyzeData);
        console.log("Created Analyze");
    } catch (err) {
        res.json(err);
    }
});

// Migration : Get Migration Details

app.get("/getMigrates", (req, res) => {
    MigrationModel.find({}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

app.post("/createMigrates", async (req, res) => {
    try {
        const migrate = req.body;
        const newMigrate = new MigrationModel(migrate);
        await newMigrate.save();

        res.json(migrate);
        console.log("Migration Created");
    } catch (err) {
        res.json(err);
    }
});

// Configuration : Get Configuration Details
app.get("/getConfigs", (req, res) => {
    ConfigModel.find({}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

app.post("/createConfigs", async (req, res) => {
    try {
        const confi = req.body;
        const newConfi = new ConfigModel(confi);
        await newConfi.save();

        res.json(confi);
        console.log("Configuration Created");
    } catch (err) {
        res.json(err);
    }
});

app.listen(3001, () => {
    console.log("Server Runs Perfectly");
});