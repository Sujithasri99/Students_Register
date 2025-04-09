const express = require ("express");
const router = express.Router();
const model = require("../models/student.js");

//showing all data
router.get("/students", (req, res) => {
    model.find()
    .then((students) => {
        res.render("index", {students});
    })
    .catch(err => {
        console.log(err.message);
        res.status(500).send("Error retrieving students");
    })
});


//route to show the "Add student " form
router.get("/students/new", (req, res) => {
    res.render("addStudent")
})

//route to show single file by id
router.get("/students/:id", (req,res) => {
    const stuId = req.params.id;
    model.findById(stuId)
    .then((student) => {
        if(!student) return res.status(404).send("Student not found");
        res.render("showStudent", {student});
    })
    .catch(err => {
        console.log(err.message);
        res.status(500).send("Error retrieving student");
    });
});

 
//adding by id
router.post("/students", (req, res) => {
    const studentData = req.body;
    model.create(studentData)
    .then(() => {
        res.redirect("/students");
    })
    .catch(err => {
        console.log(err.message);
        res.status(500).send("Error adding student");
    })
})

//route to show edit form
router.get("/students/edit/:id", (req, res) => {
    const stuId = req.params.id;
    model.findById(stuId)
    .then((student) => {
        if (!student) return res.status(404).send("Student not found");
        res.render("editStudent", {student})
    })
    .catch(err => {
        console.log(err.message);
        res.status(500).send("Error retrieving student for edit");
    });
})

//updating by id
 router.put("/students/:id", (req, res) => {
    const stuId = req.params.id;
    const studentData = req.body;
    model.findByIdAndUpdate(stuId, studentData, {new: true})
    .then(() => {
        res.redirect("/students")
    })
    .catch(err => {
        console.log(err.message);
        res.status(500).send("Error updating student");
    })
 })

//deleting by id
 router.delete("/students/:id", (req, res) => {
    const stuId = req.params.id;
    model.findByIdAndDelete(stuId)
    .then(() => {
        res.redirect("/students")
    })
    .catch(err => {
        console.log(err.message);
        res.status(500).send("Error deleting student");
    });
 })


 module.exports = router;

