const sql = require("./db.js");

// constructor
const Patient = function(patient) {
  this.EmailID = patient.EmailID;
  this.PatientName = patient.PatientName;
  this.Age = patient.Age;
  this.Gender = patient.Gender;
  this.Citizenship = patient.Citizenship;
  this.CurrentLoc = patient.CurrentLoc;
  this.ContactNumber = patient.ContactNumber;
  this.Weight = patient.Weight;
  this.NameOfGuardian = patient.NameOfGuardian;
  this.Symptoms = patient.Symptoms;
  this.Temperature = patient.Temperature;
  this.Reports = patient.Reports;
  
};

Patient.create = (newPatient, result) => {
  sql.query("INSERT INTO patient SET ?", newPatient, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created patient: ", { PatientID: res.insertId, ...newPatient });
    result(null, { PatientID: res.insertId, ...newPatient });
  });
};

Patient.findById = (PatientID, result) => {
  sql.query(`SELECT * FROM patient WHERE PatientID = ${PatientID}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found patient: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Patient with the PatientID
    result({ kind: "not_found" }, null);
  });
};

Patient.getAll = result => {
  sql.query("SELECT * FROM patient", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("patient: ", res);
    result(null, res);
  });
};

Patient.updateById = (PatientID, patient, result) => {
  sql.query(
    "UPDATE patient SET EmailID = ?, PatientName = ?,Citizenship = ?, Age = ?, Gender = ?, CurrentLoc = ?,ContactNumber = ?, Weight = ? ,NameOfGuardian = ?, Symptoms = ?, Temperature = ?, Reports = ?  WHERE PatientID = ?",
    [patient.EmailID, patient.PatientName, patient.Citizenship, patient.Age, patient.Gender, patient.CurrentLoc, patient.ContactNumber, patient.Weight, patient.NameOfGuardian, patient.Symptoms,patient.Temperature, patient.Reports, PatientID],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Patient with the PatientID
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated patient: ", { PatientID: PatientID, ...patient });
      result(null, { PatientID: PatientID, ...patient });
    }
  );
};

Patient.remove = (PatientID, result) => {
  sql.query("DELETE FROM patient WHERE PatientID = ?", PatientID, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Patient with the PatientID
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted patient with PatientID: ", PatientID);
    result(null, res);
  });
};

Patient.removeAll = result => {
  sql.query("DELETE FROM patient", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} patient`);
    result(null, res);
  });
};

module.exports = Patient;
