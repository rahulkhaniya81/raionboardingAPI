const Appointment = require("../models/appointment.model.js");

// Create and Save a new appointment
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a appointment
  const appointment = new Appointment({
    AppointmentLink : req.body.AppointmentLink,
    AppointmentTime : req.body.AppointmentTime,
    PatientID : req.body.PatientID,
    DoctorID : req.body.DoctorID,
  });

  // Save appointment in the database
  Appointment.create(appointment, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the appointment."
      });
    else res.send(data);
  });
};

// Retrieve all appointment from the database.
exports.findAll = (req, res) => {
  Appointment.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving appointment."
      });
    else res.send(data);
  });
};

// Find a single appointment with a PatientID
exports.findOne = (req, res) => {
  Appointment.findById(req.params.AppointmentID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found appointment with id ${req.params.AppointmentID}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving appointment with id " + req.params.AppointmentID
        });
      }
    } else res.send(data);
  });
};

// Update a appointment identified by the PatientID in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Appointment.updateById(
    req.params.AppointmentID,
    new Appointment(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found appointment with id ${req.params.AppointmentID}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating appointment with id " + req.params.AppointmentID
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a appointment with the specified AppointmentID in the request
exports.delete = (req, res) => {
  Appointment.remove(req.params.AppointmentID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found appointment with id ${req.params.AppointmentID}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete appointment with id " + req.params.AppointmentID
        });
      }
    } else res.send({ message: `appointment was deleted successfully!` });
  });
};

// Delete all appointment from the database.
exports.deleteAll = (req, res) => {
  Appointment.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all appointment."
      });
    else res.send({ message: `All appointment were deleted successfully!` });
  });
};
