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

const url = "mongodb+srv://gunbros:12345@cluster0.rx8rtmt.mongodb.net/afme?retryWrites=true&w=majority";
mongoose.connect(url);

// Login : Get Users Details
app.get("/getUsers", (_req, res) => {
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
    const user = LoginModel.findOne({ username, password }).lean();
    if (!user) {
        return res.json({ status: "error", error: "Invalid Username/Password" });
    } else {
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

app.get("/getMigrates", (_req, res) => {
    MigrationModel.find({}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    }).sort({ createdDate: -1 });
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
app.get("/getConfigs", (_req, res) => {
    ConfigModel.find({}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

// praValue => Project/Resource/Application
// Configuration ProjectExits/:env/:praValue : Check Configuration Project Details Exists/Not
app.get("/projectExists/:envirn/:praValue", (req, res) => {
    let envirn = req.params.envirn;
    let environment = { environment: req.params.envirn };

    let praVal = ""
    if (envirn === "Google Kubernetes Engine (GKE)" || envirn === "Kf" || envirn === "AWS EKS (AWS K8s)") {
        praVal = { projectId: req.params.praValue };
    } else if (envirn === "Azure Kubernetes Service (Azure k8s)") {
        praVal = { resourceGroup: req.params.praValue };
    } else if (envirn === "Open Shift") {
        praVal = { application: req.params.praValue };
    }

    const data = Object.assign(environment, praVal);
    ConfigModel.find(data, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

// ConfigurationSearch/:env : Get Configuration Environment Details
app.get("/getConfigSearch/:envirn", (req, res) => {
    // const data = ;
    console.log(req.params.envirn);
    ConfigModel.find({ environment: req.params.envirn }, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

// ConfigurationSearch/:project : Get Configuration Project Details
app.get("/getProjectSearch/:project/:envirn", (req, res) => {
    // const data = ;
    console.log(req.params.project, req.params.envirn);
    ConfigModel.find({ projectId: req.params.project, environment: req.params.envirn }, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

// ConfigurationSearch/:resource : Get Configuration Resource Details
app.get("/getResourceSearch/:resource/:envirn", (req, res) => {
    console.log(req.params.resource, req.params.envirn);
    ConfigModel.find({ resourceGroup: req.params.resource, environment: req.params.envirn }, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

// ConfigurationSearch/:resource : Get Configuration Resource Details
app.get("/getApplicationSearch/:app/:envirn", (req, res) => {
    console.log(req.params.app, req.params.envirn);
    ConfigModel.find({ application: req.params.app, environment: req.params.envirn }, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

// praValue => Project/Resource/Application
// ConfigurationSearch/:Cluster & Namespace : Get Configuration Cluster & Namespace Details
app.get("/getClusterSearch/:cluster/:praValue/:envirn", (req, res) => {
    let envirn = req.params.envirn;
    let environment = { environment: req.params.envirn };

    let praVal = ""
    if (envirn === "Google Kubernetes Engine (GKE)" || envirn === "Kf" || envirn === "AWS EKS (AWS K8s)") {
        praVal = { projectId: req.params.praValue };
    } else if (envirn === "Azure Kubernetes Service (Azure k8s)") {
        praVal = { resourceGroup: req.params.praValue };
    } else if (envirn === "Open Shift") {
        praVal = { application: req.params.praValue };
    }

    let cluster = { cluster: req.params.cluster };

    const data = Object.assign(environment, praVal, cluster);
    ConfigModel.find(data, (err, result) => {
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
        console.log("Configuration Created", confi);
    } catch (err) {
        res.json(err);
    }
});


app.listen(3001, () => {
    console.log("Server Runs Perfectly");
});

/*
    // app.get("/*", function (req, res) {
    //     res.sendFile(path.join(__dirname, "index.html"));
    // });
*/