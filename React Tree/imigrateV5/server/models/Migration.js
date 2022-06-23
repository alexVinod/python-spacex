const mongoose = require("mongoose");

const MigrationSchema = new mongoose.Schema({
    source: { type: String, required: true },
    target: { type: String, required: true },
    status: { type: String },
    createdDate: { type: String, default: Date.now() }
});

const MigrationModel = mongoose.model("migrations", MigrationSchema);
module.exports = MigrationModel;

/**
 {
    "source": "Pivotal",
    "target": "GKE",
    "status": "Success"
}
 */