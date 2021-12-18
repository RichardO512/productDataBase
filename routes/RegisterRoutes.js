const {res} = require("express");
const express = require("express");
const router = express.Router();


router.get("/", (req, res) =>{
    res.render("index");//view the file index.hbs
});
router.get("/register", (req, res) =>{
    res.render("registration");
    // the register are the exports.rgister
    // i created from AuthAccount and the  registration 
    // are the hbs or the code inside of it
});
router.get("/list", (req, res) =>{
    res.render("list");//we getting the user response
    // i routing the list hbs and 
    // rendering it 
});
router.get("/update", (req, res) =>{
    res.render("update");//we getting the user response
});
router.get ('/song', (req, res) => {
    res.render('song'); //view the filename list.hbs
});
module.exports = router;