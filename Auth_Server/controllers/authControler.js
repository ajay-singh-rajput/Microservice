const userModel = require("../models/userModel");
const axios = require('axios')


exports.changeFolder = async (req, res) => {
    const { userId, mailId } = req.params;
    const { folder } = req.body;
  
    try {
      const user = await userModel.findById(userId);
  
      // Find the mail item by _id and update its folder
      const mailItem = user.allMail.id(mailId);
      if (!mailItem) {
        return res.status(404).json({ error: 'Mail item not found' });
      }
  
      mailItem.folder = folder;
      await user.save();
  
      res.json(mailItem);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  }

  exports.changeFav = async (req, res) => {
    const { userId, mailId } = req.params;
    // const { isFav } = req.body;
  
    try {
      const user = await userModel.findById(userId);
  
      // Find the mail item by _id and update its isFav
      const mailItem = user.allMail.id(mailId);
      if (!mailItem) {
        return res.status(404).json({ error: 'Mail item not found' });
      }
  
      mailItem.isFav = !mailItem.isFav;
      await user.save();
  
      res.json(mailItem);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };


  exports.insertSendMail = async (req, res) => {
    const { userId } = req.params;
    const { sender, receiver, subject, mailBody } = req.body;
  
    try {
        const {data} = await axios.post(`${process.env.SEND_MAIL_URL}`,{ sender, receiver, subject, mailBody });
        const response = await axios.post(`${process.env.COMU_URL}/insertMail/${userId}`, { sender, receiver, subject, mailBody });
  
      res.json({success:true});
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };


  exports.insertReceivedMail =  async (req, res) => {
    const { userId } = req.params;
    const { sender, receiver, subject, mailBody } = req.body;
  
    try {
      const user = await userModel.findById(userId);
  
      // Create new mail object
      const newMail = {
        sender,
        receiver,
        subject,
        mailBody,
        isFav: false,
        folder: 'None', // Default folder
        date: new Date().toISOString()
      };
  
      // Insert new mail into allMail array
      user.allMail.push(newMail);
      await user.save();
  
      res.json(newMail);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  }


  exports.getUserDetails = async(req,res)=>{
    
    try {
      
        if (req.user) {
           
            const user = await userModel.findById(req?.user?._id)
            // .populate({path:'sendMail', populate:{
            //     path:'sender'
            // }}).populate({path:'receiveMail', populate:{
            //     path:'sender'
            // }});
            
            res.status(200).json({
                error: false,
                message: "Successfully Loged In",
                user: user,
            });
        } else {
            
            res.status(403).json({ error: true, message: "Not Authorized" });
            
        }
        
    } catch (error) {
        
        console.log(error)
    }
}

exports.failedToLogin = (req, res) => {
	res.status(401).json({
		error: true,
		message: "Log in failure",
	});
}

exports.logout = (req, res) => {
	req.logout();
	res.redirect(process.env.CLIENT_URL);
}