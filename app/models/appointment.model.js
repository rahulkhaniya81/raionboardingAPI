const sql = require("./db.js");

// constructor
const Appointment = function(appointment) {
  this.AppointmentLink = appointment.AppointmentLink;
  this.AppointmentTime = appointment.AppointmentTime;
  this.PatientID = appointment.PatientID;
  this.DoctorID = appointment.DoctorID;
};

Appointment.create = (newAppointment, result) => {
  sql.query("INSERT INTO appointment SET ?", newAppointment, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created appointment: ", { AppointmentID: res.insertId, ...newAppointment });
    result(null, { AppointmentID: res.insertId, ...newAppointment });
  });
};

Appointment.findById = (AppointmentID, result) => {
  sql.query(`SELECT * FROM appointment WHERE AppointmentID = ${AppointmentID}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found appointment: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Appointment with the AppointmentID
    result({ kind: "not_found" }, null);
  });
};

Appointment.getAll = result => {
  sql.query("SELECT * FROM appointment", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("appointment: ", res);
    result(null, res);
  });
};

Appointment.updateById = (AppointmentID, appointment, result) => {
  sql.query(
    "UPDATE appointment SET AppointmentLink = ?, AppointmentTime = ?, PatientID = ?, DoctorID = ?  WHERE AppointmentID = ?",
    [appointment.AppointmentLink, appointment.AppointmentTime, appointment.PatientID, appointment.DoctorID, AppointmentID],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Appointment with the AppointmentID
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated appointment: ", { AppointmentID: AppointmentID, ...appointment });
      result(null, { AppointmentID: AppointmentID, ...appointment });
    }
  );
};

Appointment.remove = (AppointmentID, result) => {
  sql.query("DELETE FROM appointment WHERE AppointmentID = ?", AppointmentID, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Appointment with the AppointmentID
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted appointment with AppointmentID: ", AppointmentID);
    result(null, res);
  });
};

Appointment.removeAll = result => {
  sql.query("DELETE FROM appointment", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} appointment`);
    result(null, res);
  });
};

module.exports = Appointment;
