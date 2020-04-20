const sql = require("./db.js");

// constructor
const VerificationDetails = function(verificationdetails) {
  this.PatientID = verificationdetails.PatientID;
  this.Selfie = verificationdetails.Selfie;
  this.FrontSide = verificationdetails.FrontSide;
  this.BackSide = verificationdetails.BackSide;
};

VerificationDetails.create = (newVerificationDetails, result) => {
  sql.query("INSERT INTO verificationdetails SET ?", newVerificationDetails, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created verificationdetails: ", { VerificationDetailsID: res.insertId, ...newVerificationDetails });
    result(null, { VerificationDetailsID: res.insertId, ...newVerificationDetails });
  });
};

VerificationDetails.findById = (VerificationDetailsID, result) => {
  sql.query(`SELECT * FROM verificationdetails WHERE VerificationDetailsID = ${VerificationDetailsID}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found verificationdetails: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found VerificationDetails with the VerificationDetailsID
    result({ kind: "not_found" }, null);
  });
};

VerificationDetails.getAll = result => {
  sql.query("SELECT * FROM verificationdetails", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("verificationdetails: ", res);
    result(null, res);
  });
};

VerificationDetails.updateById = (VerificationDetailsID, verificationdetails, result) => {
  sql.query(
    "UPDATE verificationdetails SET PatientID = ?, Selfie = ?, FrontSide = ?, BackSide = ?  WHERE VerificationDetailsID = ?",
    [verificationdetails.PatientID, verificationdetails.Selfie, verificationdetails.FrontSide, verificationdetails.BackSide, VerificationDetailsID],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found VerificationDetails with the VerificationDetailsID
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated verificationdetails: ", { VerificationDetailsID: VerificationDetailsID, ...verificationdetails });
      result(null, { VerificationDetailsID: VerificationDetailsID, ...verificationdetails });
    }
  );
};

VerificationDetails.remove = (VerificationDetailsID, result) => {
  sql.query("DELETE FROM verificationdetails WHERE VerificationDetailsID = ?", VerificationDetailsID, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found VerificationDetails with the VerificationDetailsID
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted verificationdetails with VerificationDetailsID: ", VerificationDetailsID);
    result(null, res);
  });
};

VerificationDetails.removeAll = result => {
  sql.query("DELETE FROM verificationdetails", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} verificationdetails`);
    result(null, res);
  });
};

module.exports = VerificationDetails;
