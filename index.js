//Global Variables
const mongoose = require('mongoose');
const db = process.env.MONGODB_URI || 'mongodb://localhost/classRoster'
const express = require("express");
let app = express()
const PORT = 8080;


//MIDDLEWARE 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Mongoose Connection
mongoose.connect(db, { useNewUrlParser: true }, (err) => { if (err) { throw err } console.log('mongoose connected') });

//Mongoose Schema for a student
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
            type: String,
            required: false,

        },
        email: {
            type: String,
            required: false
        }
    },
    major: {
        type: String,
        required: false,
    },
    // createdAt: Date.now

});
const Student = mongoose.model('student', studentSchema);

//******************************API ROUTES

//CREATE
app.post("/api/student/new", (req, res) => {
    const newStudent = req.body;
    const mikeJones = new Student(newStudent);
    console.log(mikeJones.name);
    mikeJones.save((error) => {
        const saveStatus = (error || "student was saved") ? "saved" : "error"
        console.log(saveStatus)
    });
    res.send(mikeJones.name + " was added.").status(200)


});
//READ
app.get("/api/students/", (req, res) => {

    Student.find((err, result) => { if (err) { throw err } console.log(result); res.json(result) });


});
app.get("/api/student/find/:id", (req, res) => {
    let studentId = req.params.id;
    Student.findById(studentId, (err, result) => { if (err) { throw err } console.log(result); res.json(result) });
});
//UPDATE 
app.put("/api/student/revise/:id/", (req, res) => {
    let studentId = req.params.id;
    mongoose.set('useFindAndModify', false);
    Student.findOneAndUpdate({ _id: studentId }, req.body, (err, result) => {
        if (err) { throw err }
        console.log(result);
        res.json(result)
    });

});
//DELETE
app.delete("/api/student/end/:id", (req, res) => {
    const studentId = req.params.id
    Student.deleteOne({ _id: studentId }, (err, result) => { if (err) { throw err } console.log(result);res.json(result)})
});
//Listen
app.listen(PORT, () => {
    console.log("Port is listening on http://localhost:" + PORT)
});