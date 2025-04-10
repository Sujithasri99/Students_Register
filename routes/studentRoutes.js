const express = require ("express");
const router = express.Router();
const model = require("../models/student.js");
const userModel = require("../models/user.js");
const bcrypt = require("bcrypt");

// Show register form
router.get("/register", (req, res) => {
    res.render("register");
});

//register user and password
router.post("/register", async(req, res) => {
    const {username, password} = req.body;
    try {
        const newUser = new userModel({username, password});
        await newUser.save();
        res.redirect("/login")
        
    } catch(err) {
        console.log(err.message);
        res.status(500).send("Error registering user");
    }
})

// Show login form
router.get("/login", (req, res) => {
    console.log("Redirected to login");
    res.render("login"); // Make sure you have a login.ejs in views folder
});

//login register
router.post("/login", async (req, res) => {
    const {username, password} = req.body;
    try{
        const user = await userModel.findOne({username});
        if(!user){
            console.log("User Not Exist");
            return res.redirect("/login");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(isMatch) {
            return res.redirect("/students");
        } else {
            return res.redirect("/login");
        }
    } catch (err) {
        console.log("Login Error:", err.message);
        return res.status(500).send("Login Error");
    }
    
});

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

//logout
router.get("/logout", (req, res) => {
    res.render("login");
})

 module.exports = router;

