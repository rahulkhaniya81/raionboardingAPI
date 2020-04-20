module.exports = app => {
    const doctor = require("../controllers/doctor.controller.js");
  
    // Create a new doctor
    app.post("/doctor", doctor.create);
  
    // Retrieve all doctor
    app.get("/doctor", doctor.findAll);
  
    // Retrieve a single doctor with PatientID
    app.get("/doctor/:DoctorID", doctor.findOne);
  
    // Update a doctor with PatientID
    app.put("/doctor/:DoctorID", doctor.update);
  
    // Delete a doctor with PatientID
    app.delete("/doctor/:DoctorID", doctor.delete);
  
    // Create a new doctor
    app.delete("/doctor", doctor.deleteAll);
  };
  