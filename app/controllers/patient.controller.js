const Patient = require("../models/patient.model.js");

// Create and Save a new patient
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a patient
  const patient = new Patient({
    EmailID : req.body.EmailID,
    PatientName : req.body.PatientName,
    Age : req.body.Age,
    Gender : req.body.Gender,
    Citizenship : req.body.Citizenship,
    CurrentLoc : req.body.CurrentLoc,
    ContactNumber : req.body.ContactNumber,
    Weight : req.body.Weight,
    NameOfGuardian : req.body.NameOfGuardian,
    Symptoms : req.body.Symptoms,
    Temperature : req.body.Temperature,
    Reports : req.body.Reports
  });

  // Save patient in the database
  Patient.create(patient, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the patient."
      });
    else res.send(data);
  });
};

// Retrieve all patient from the database.
exports.findAll = (req, res) => {
  Patient.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving patient."
      });
    else res.send(data);
  });
};

// Find a single patient with a PatientID
exports.findOne = (req, res) => {
  Patient.findById(req.params.PatientID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found patient with id ${req.params.PatientID}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving patient with id " + req.params.PatientID
        });
      }
    } else res.send(data);
  });
};

// Update a patient identified by the PatientID in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Patient.updateById(
    req.params.PatientID,
    new Patient(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found patient with id ${req.params.PatientID}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating patient with id " + req.params.PatientID
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a patient with the specified PatientID in the request
exports.delete = (req, res) => {
  Patient.remove(req.params.PatientID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found patient with id ${req.params.PatientID}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete patient with id " + req.params.PatientID
        });
      }
    } else res.send({ message: `patient was deleted successfully!` });
  });
};

// Delete all patient from the database.
exports.deleteAll = (req, res) => {
  Patient.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all patient."
      });
    else res.send({ message: `All patient were deleted successfully!` });
  });
};
