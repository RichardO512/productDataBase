// module,exports
const express = require("express");
const router = express.Router();
const regController = require("../controllers/AuthAccount");


router.post("/login",regController.login);
router.post("/register",regController.register);
router.get("/update/:name",regController.update);
// new Addition
router.post("/update_user", regController.update_user);
router.get("/delete_user/:name", regController.delete_user);
// the "/update_user" are from the update.hbs 
// form action+"Auth/update_user and the
// update_user is from th AuthAccount Controller"
// need to use exports i dont why

//route for food table
router.post('/song', regController.song);
router.get('/delete_song/:id', regController.delete_song);
router.get('/update/:id', regController.update_form);
router.post('/update_song', regController.update_song);

module.exports = router;
