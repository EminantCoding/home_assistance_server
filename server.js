const express = require("express");
const ConnectDB = require("./config/db");
const app = express();

//Connect Database
ConnectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("Api Running successfully - teehee"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/asset", require("./routes/api/asset"));
app.use("/api/tenantAgreement", require("./routes/api/tenantAgreement"));
app.use("/api/document", require("./routes/api/document"));
app.use("/api/property-tax", require("./routes/api/propertyTax"));
app.use("/api/proximity", require("./routes/api/proximity"));
app.use("/api/notification", require("./routes/api/notification"));
app.use("/api/reminder", require("./routes/api/reminder"));
app.use("/api/emergency-contact", require("./routes/api/emergencyContact"));
app.use("/api/transaction", require("./routes/api/transaction"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on Port ${PORT}`));
