const mongoose = require("mongoose");

const ConfigSchema = new mongoose.Schema({
    environment: { type: String, required: true },
    projectId: { type: String },
    resourceGroup: { type: String },
    application: { type: String },
    region: { type: String },
    cluster: { type: String },
    nameSpace: { type: String },
    serviceKey: { type: String },
    targetJson: { type: String },
    endpoint: { type: String },
    orgName: { type: String },
    space: { type: String },
    username: { type: String },
    password: { type: String }
});

const ConfigModel = mongoose.model("configurations", ConfigSchema);
module.exports = ConfigModel;


/*
{
    "environment": "Kf"
    "projectId": "A",
    "resourceGroup": "A",
    "application": "Todo App",
    "region": "US-Region",
    "cluster": "Cluster",
    "nameSpace": "NameSpace-1",
    "serviceKey": "Key",
    "endpoint": "URI",
    "orgName": "My ORG",
    "space": "dev",
    "username": "vinod",
    "password": "12345"
}

*/