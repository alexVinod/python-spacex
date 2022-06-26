const mongoose = require("mongoose");

const today = new Date();
const formatToday = today.toDateString() + " " + today.getHours() + ":" + today.getMinutes();

const MigrationSchema = new mongoose.Schema({
    source: { type: String, required: true },
    target: { type: String, required: true },
    status: { type: String },
    health: { type: String },
    endpoint: { type: String },
    createdDate: { type: String, default: formatToday }
});

const MigrationModel = mongoose.model("migrations", MigrationSchema);
module.exports = MigrationModel;

/**
 {
    "source": "Pivotal",
    "target": "GKE",
    "status": "Success",
    "health": "Healthy",
    "endpoint": "8080"
}
 */