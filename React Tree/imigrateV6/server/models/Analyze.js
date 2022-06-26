const mongoose = require("mongoose");

const AnalyzeSchema = new mongoose.Schema({
    cfPlatform: { type: String, required: true },
    organisation: { type: String },
    space: { type: String },
    cfAPIKeys: { type: String },
    application: { type: String },
    services: { type: String },
    database: { type: String },
    techStack: { type: String },
    sourceCodeRepo: { type: String },
    dropletsCount: { type: String },
    dropletsCapacity: { type: String },
    targetPlatform: { type: String },
    projectId: { type: String },
    resourceGroup: { type: String }
});

const AnalyzeModel = mongoose.model("analyzes", AnalyzeSchema);
module.exports = AnalyzeModel;


/*
{
    "cfPlatform": "Vmware",
    "organisation": "Yes",
    "space": "Yes",
    "cfAPIKeys": "Yes",
    "application": "Yes",
    "services": "Yes",
    "database": "Yes",
    "techStack": "Yes",
    "sourceCodeRepo": "Yes",
    "dropletsCount": "Yes",
    "dropletsCapacity": "Yes",
    "targetPlatform": "GKE",
    "projectId": "Yes",
    "resourceGroup": "Yes"
}
*/
