const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const axios = require('axios')
const keys = require('../config/keys');
const User = require('../models/userModel');
// const { sendEmail } = require('./postmark');

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      
      const mailData = {
        sender:process.env.COMPANY_MAIL_ID,
        receiver:'',
        subject:'New login found',
        mailBody:'here is new login found...'
    };
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        // await sendEmail(keys.companyEmail, existingUser.email, "Login Found", '<h1>Alert : New Login Found</h1>');
        try {
        mailData.receiver = existingUser.email
          const {data} = await axios.post(`${process.env.SEND_MAIL_URL}`,mailData);
          const response = await axios.post(`${process.env.COMU_URL}/insertMail/${existingUser._id}`, mailData);
      } catch (error) {
          
      }
        return done(null, existingUser);
      } 
      const newUser = new User({ googleId: profile.id, name: profile.displayName, email: profile.emails[0].value });
      await newUser.save();
      try {
        mailData.subject = 'Welcome'
        mailData.mailBody = 'Welcome to world of mail....'
        mailData.receiver = newUser.email
        const {data} = await axios.post(`${process.env.SEND_MAIL_URL}`,mailData);
        const response = await axios.post(`${process.env.COMU_URL}/insertMail/${newUser._id}`, mailData);
    } catch (error) {
        
    }
      
      done(null, newUser);

    }
  )
);



passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});
