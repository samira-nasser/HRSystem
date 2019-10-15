const messageModel = require('../models/messages');

exports.getAllMessages = function(req,res){
    let authorID = req.query.userID ;
    messageModel.find({where : authorID})
    .then(function(messages){
        return res.status(200).json({
            message : "All Messages retrieved Successfully" ,
            data : messages
        });
    })
    .catch(function(error){
        return res.status(400).json({
            message : error.message
        });
    })
}

