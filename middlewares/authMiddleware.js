// usually: "Authorization: "token: [token]"

exports.isAdmin = (req, res, next) => {
    if(!req.user.IsAdmin){
        return res.status(401).json({message: "You are not authorized for this process !"})
    }
    next();
};
