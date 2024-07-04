// emailController.js

const axios = require('axios');
const Postmark = require('../services/postmark.js');
const communicationModel = require('../models/communicationModel.js');
const userModel = require('../models/userModel.js');
const { getSocket } = require('../config/socket.js'); 

exports.getEmailHistory = async (req, res) => {
    res.json({ user: ['user'] });
};

exports.isFav = async (req, res) => {
    try {
        const mail = await communicationModel.findById(req.params.id);
        if (!mail) {
            res.status(404).json({ message: 'Mail not found' });
            return;
        }
        mail.isFav = !mail.isFav;
        await mail.save();
        res.json({ user: mail });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.searchMail = async (req, res) => {
    try {
        const { id, sender, receiver } = req.query;
        let query = {};

        if (id) {
            query._id = id;
        }
        if (sender) {
            query.sender = sender;
        }
        if (receiver) {
            query.receiver = receiver;
        }

        const mails = await communicationModel.find(query);
        res.json(mails);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.insertSendMail = async (req, res) => {
    const { userId } = req.params;
    const { sender, receiver, subject, mailBody } = req.body;

    try {
        const newMail = await communicationModel.create({
            sender,
            receiver,
            subject,
            mailBody,
        });

        const user = await userModel.findOne({email:sender})
        const receiverUser = await userModel.findOne({email:receiver})
        

        const formattedMail = {
            _id: newMail._id,
            sender,
            receiver,
            subject,
            mailBody,
            isFav: false,
            date: new Date().toISOString()
        };

        if (receiverUser) {
            receiverUser.allMail.push(formattedMail);
            await receiverUser.save();
        }
        if (user) {
            
            user.allMail.push(formattedMail);
            await user.save();
        }

        // Emit Socket.IO event to notify receiver
        const io = getSocket();
        io.to(receiver).emit('newMailReceived', formattedMail);

        res.status(201).json(formattedMail);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};
