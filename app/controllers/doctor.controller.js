const Doctor = require("../models/doctor.model.js");

// Create and Save a new doctor
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a doctor
  const doctor = new Doctor({
    DoctorName : req.body.DoctorName,
    Age : req.body.Age,
    Gender : req.body.Gender,
    EmailID : req.body.EmailID,
    ContactNumber : req.body.ContactNumber,
    TypeOfQualification : req.body.TypeOfQualification
  });

  // Save doctor in the database
  Doctor.create(doctor, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the doctor."
      });
    else res.send(data);
  });
};

// Retrieve all doctor from the database.
exports.findAll = (req, res) => {
  Doctor.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving doctor."
      });
    else res.send(data);
  });
};

// Find a single doctor with a PatientID
exports.findOne = (req, res) => {
  Doctor.findById(req.params.DoctorID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found doctor with id ${req.params.DoctorID}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving doctor with id " + req.params.DoctorID
        });
      }
    } else res.send(data);
  });
};

// Update a doctor identified by the PatientID in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Doctor.updateById(
    req.params.DoctorID,
    new Doctor(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found doctor with id ${req.params.DoctorID}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating doctor with id " + req.params.DoctorID
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a doctor with the specified DoctorID in the request
exports.delete = (req, res) => {
  Doctor.remove(req.params.DoctorID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found doctor with id ${req.params.DoctorID}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete doctor with id " + req.params.DoctorID
        });
      }
    } else res.send({ message: `doctor was deleted successfully!` });
  });
};

// Delete all doctor from the database.
exports.deleteAll = (req, res) => {
  Doctor.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all doctor."
      });
    else res.send({ message: `All doctor were deleted successfully!` });
  });
};
