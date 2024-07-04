const express = require('express');
const passport = require('passport');
const emailController = require('../controllers/emailController');

const router = express.Router();

// router.use(passport.authenticate( { session: true }));

router.get('/history', emailController.getEmailHistory);
router.post('/isFav/:id', emailController.isFav);

// Route to insert sent mail
router.post('/insertMail/:userId/',emailController.insertSendMail);

// 1. Search mail by ID, sender, or receiver
router.get('/mail/search',emailController.searchMail);

module.exports = router;
