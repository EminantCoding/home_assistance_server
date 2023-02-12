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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on Port ${PORT}`));
