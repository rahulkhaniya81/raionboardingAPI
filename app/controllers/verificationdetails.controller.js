const VerificationDetails = require("../models/verificationdetails.model.js");

// Create and Save a new verificationdetails
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a verificationdetails
  const verificationdetails = new VerificationDetails({
    PatientID : req.body.PatientID,
    Selfie : req.body.Selfie,
    FrontSide : req.body.FrontSide,
    BackSide : req.body.BackSide
  });

  // Save verificationdetails in the database
  VerificationDetails.create(verificationdetails, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the verificationdetails."
      });
    else res.send(data);
  });
};

// Retrieve all verificationdetails from the database.
exports.findAll = (req, res) => {
  VerificationDetails.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving verificationdetails."
      });
    else res.send(data);
  });
};

// Find a single verificationdetails with a PatientID
exports.findOne = (req, res) => {
  VerificationDetails.findById(req.params.VerificationDetailsID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found verificationdetails with id ${req.params.VerificationDetailsID}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving verificationdetails with id " + req.params.VerificationDetailsID
        });
      }
    } else res.send(data);
  });
};

// Update a verificationdetails identified by the PatientID in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  VerificationDetails.updateById(
    req.params.VerificationDetailsID,
    new VerificationDetails(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found verificationdetails with id ${req.params.VerificationDetailsID}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating verificationdetails with id " + req.params.VerificationDetailsID
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a verificationdetails with the specified VerificationDetailsID in the request
exports.delete = (req, res) => {
  VerificationDetails.remove(req.params.VerificationDetailsID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found verificationdetails with id ${req.params.VerificationDetailsID}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete verificationdetails with id " + req.params.VerificationDetailsID
        });
      }
    } else res.send({ message: `verificationdetails was deleted successfully!` });
  });
};

// Delete all verificationdetails from the database.
exports.deleteAll = (req, res) => {
  VerificationDetails.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all verificationdetails."
      });
    else res.send({ message: `All verificationdetails were deleted successfully!` });
  });
};
