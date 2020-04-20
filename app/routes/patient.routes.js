module.exports = app => {
  const patient = require("../controllers/patient.controller.js");

  // Create a new patient
  app.post("/patient", patient.create);

  // Retrieve all patient
  app.get("/patient", patient.findAll);

  // Retrieve a single patient with PatientID
  app.get("/patient/:PatientID", patient.findOne);

  // Update a patient with PatientID
  app.put("/patient/:PatientID", patient.update);

  // Delete a patient with PatientID
  app.delete("/patient/:PatientID", patient.delete);

  // Create a new patient
  app.delete("/patient", patient.deleteAll);
};
