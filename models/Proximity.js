const mongoose = require("mongoose");

const ProximitySchema = new mongoose.Schema({
  asset_name: { type: mongoose.Schema.Types.ObjectId, ref: "asset" },
  landmark: {
    railway_station: { type: String, default: null },
    bus_station: { type: String, default: null },
    metro_station: { type: String, default: null },
    airport: { type: String, default: null },
    school_college: { type: String, default: null },
    hospital: { type: String, default: null },
    market: { type: String, default: null },
    temple: { type: String, default: null },
    hostel: { type: String, default: null },
  },
});
module.exports = Proximity = mongoose.model("proximity", ProximitySchema);
