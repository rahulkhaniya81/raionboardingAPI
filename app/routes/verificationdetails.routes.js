module.exports = app => {
    const verificationdetails = require("../controllers/verificationdetails.controller.js");
  
    // Create a new verificationdetails
    app.post("/verificationdetails", verificationdetails.create);
  
    // Retrieve all verificationdetails
    app.get("/verificationdetails", verificationdetails.findAll);
  
    // Retrieve a single verificationdetails with PatientID
    app.get("/verificationdetails/:VerificationDetailsID", verificationdetails.findOne);
  
    // Update a verificationdetails with PatientID
    app.put("/verificationdetails/:VerificationDetailsID", verificationdetails.update);
  
    // Delete a verificationdetails with PatientID
    app.delete("/verificationdetails/:VerificationDetailsID", verificationdetails.delete);
  
    // Create a new verificationdetails
    app.delete("/verificationdetails", verificationdetails.deleteAll);
  };
  