const mongoose = require("mongoose");

const MigrationSchema = new mongoose.Schema({
    source: { type: String, required: true },
    target: { type: String, required: true },
    status: { type: String },
    health: { type: String },
    endpoint: { type: String },
    createdDate: { type: String }
});

const MigrationModel = mongoose.model("migrations", MigrationSchema);
module.exports = MigrationModel;


// createdDate: { type: String, default: formatToday }
/**
 {
    "source": "Pivotal",
    "target": "GKE",
    "status": "Success",
    "health": "Healthy",
    "endpoint": "8080"
}

// const today = new Date();
// const formatToday = today.toDateString() + " " + today.getHours() + ":" + today.getMinutes();
 */
