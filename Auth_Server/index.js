const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const passport = require("passport");
const cookieSession = require("cookie-session");
const morgan = require('morgan')
require('./services/passport');

dotenv.config('.env');

const app = express();
mongoose.connect(process.env.MONGO_URI);

app.use(morgan('tiny'));

app.use(
	cookieSession({
		name: process.env.COOKIE_NAME,
		keys: [process.env.COOKIE_KEY],
		maxAge: 24 * 60 * 60 * 100,
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({credentials:true, origin:true,}));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/auth',authRoutes);

app.all('*',(req, res)=>{
    res.json({message:`${req.url} Url Not Found'`})
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Auth Server is running on port ${PORT}`);
  });
