const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gradeAvg: {
        type: String
    },
    isPassing: {
        type: Boolean
    },
    contacts: {
        phone: {
            type: Number,
            required: false,

        },
        email: {
            type: String,
            required: false
        }
    },
    major: {
        type: String,
        required: true,
    },
    // createdAt: Date.now

});
// const db = process.env.MONGODB_URI || 'mongodb://localhost/mongoSpaceNews'

const student = mongoose.model('student', studentSchema);

newStudent.save((error)=> {
  var saveStatus = (error || "student was saved")?"saved":"error"
  console.log(saveStatus)
});

module.exports = student;