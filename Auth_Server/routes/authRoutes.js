const express = require('express');
const passport = require('passport');
const userModel = require('../models/userModel');
const { logout, failedToLogin, getUserDetails, insertReceivedMail, insertSendMail, changeFav, changeFolder } = require('../controllers/authControler');

const router = express.Router();

router.get('/login/success',getUserDetails);

router.get("/login/failed", failedToLogin);

router.get('/google',passport.authenticate('google',{scope:['profile','email']}));

router.get('/google/callback',passport.authenticate('google',{failureRedirect:'/login/failed'}), async(req, res)=>{
    res.redirect(process.env.CLIENT_URL);
});

router.get("/logout",logout );

// Route to insert received mail
router.post('/user/:userId/mail/received',insertReceivedMail);

// Route to insert sent mail
router.post('/user/:userId/mail/sent',insertSendMail);

// Route to change isFav of a mail item
router.put('/user/:userId/mail/:mailId/isFav',changeFav)

router.put('/user/:userId/mail/:mailId/folder',changeFolder)

module.exports = router;