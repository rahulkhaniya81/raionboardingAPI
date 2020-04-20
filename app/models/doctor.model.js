const sql = require("./db.js");

// constructor
const Doctor = function(doctor) {
  this.DoctorName = doctor.DoctorName;
  this.EmailID = doctor.EmailID;
  this.Age = doctor.Age;
  this.Gender = doctor.Gender;
  this.ContactNumber = doctor.ContactNumber;
  this.TypeOfQualification = doctor.TypeOfQualification;
  
};

Doctor.create = (newDoctor, result) => {
  sql.query("INSERT INTO doctor SET ?", newDoctor, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created doctor: ", { DoctorID: res.insertId, ...newDoctor });
    result(null, { DoctorID: res.insertId, ...newDoctor });
  });
};

Doctor.findById = (DoctorID, result) => {
  sql.query(`SELECT * FROM doctor WHERE DoctorID = ${DoctorID}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found doctor: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Doctor with the DoctorID
    result({ kind: "not_found" }, null);
  });
};

Doctor.getAll = result => {
  sql.query("SELECT * FROM doctor", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("doctor: ", res);
    result(null, res);
  });
};

Doctor.updateById = (DoctorID, doctor, result) => {
  sql.query(
    "UPDATE doctor SET DoctorName = ?, Age = ?, Gender = ?, EmailID = ?, ContactNumber = ?, TypeOfQualification = ?  WHERE DoctorID = ?",
    [doctor.DoctorName, doctor.Age, doctor.Gender, doctor.EmailID, doctor.ContactNumber, doctor.TypeOfQualification, DoctorID],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Doctor with the DoctorID
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated doctor: ", { DoctorID: DoctorID, ...doctor });
      result(null, { DoctorID: DoctorID, ...doctor });
    }
  );
};

Doctor.remove = (DoctorID, result) => {
  sql.query("DELETE FROM doctor WHERE DoctorID = ?", DoctorID, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Doctor with the DoctorID
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted doctor with DoctorID: ", DoctorID);
    result(null, res);
  });
};

Doctor.removeAll = result => {
  sql.query("DELETE FROM doctor", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} doctor`);
    result(null, res);
  });
};

module.exports = Doctor;
