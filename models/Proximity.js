const mongoose = require("mongoose");

const ProximitySchema = new mongoose.Schema({
  asset_name: { type: mongoose.Schema.Types.ObjectId, ref: "asset" },
  landmark: {
    railway_station: { type: String },
    bus_station: { type: String },
    metro_station: { type: String },
    airport: { type: String },
    school_college: { type: String },
    hospital: { type: String },
    market: { type: String },
    temple: { type: String },
    hostel: { type: String },
  },
});
module.exports = Proximity = mongoose.model("proximity", ProximitySchema);
