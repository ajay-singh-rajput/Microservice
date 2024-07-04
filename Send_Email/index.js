const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const { sendEmail } = require('./services/postmark');
dotenv.config('.env');



const app = express();

app.use(morgan('tiny'));
app.use(cors({credentials:true, origin:true,}));



app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.post('/',async(req, res)=>{
    try {
        const {sender, recipient, subject, body}= req.body;
        await sendEmail(sender, recipient, subject, body, req.user);
        res.json({message:"mail send successfully", success:true})
    } catch (error) {
        res.json({message:"Unable to send", success:false})
        
    }

});

app.all('*',(req, res)=>{
    res.json({message:`${req.url} Not Found'`})
})

const PORT = process.env.PORT || 8082;

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
  });
