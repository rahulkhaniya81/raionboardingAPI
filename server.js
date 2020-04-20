const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to RobonomicsAI On-Boarding Platform." });
});

require("./app/routes/patient.routes.js")(app);
require("./app/routes/doctor.routes.js")(app);
require("./app/routes/appointment.routes.js")(app);
require("./app/routes/verificationdetails.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
