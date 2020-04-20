module.exports = app => {
    const appointment = require("../controllers/appointment.controller.js");
  
    // Create a new appointment
    app.post("/appointment", appointment.create);
  
    // Retrieve all appointment
    app.get("/appointment", appointment.findAll);
  
    // Retrieve a single appointment with AppointmentID
    app.get("/appointment/:AppointmentID", appointment.findOne);
  
    // Update a appointment with AppointmentID
    app.put("/appointment/:AppointmentID", appointment.update);
  
    // Delete a appointment with AppointmentID
    app.delete("/appointment/:AppointmentID", appointment.delete);
  
    // Create a new appointment
    app.delete("/appointment", appointment.deleteAll);
  };
  