const BenefitsModel = require('../models/Benefits');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.addBenefits = function(req,res){
    BenefitsModel.create(req.body)
    .then(function(){
        return res.status(200).json({
            message : "Benefits Added Successfully"
        });
    })
    .catch(function(error){
        return res.status(400).json({
            message : error.message
        });
    })
}

exports.deleteBenefits = function(req,res){
    const benefitsID = req.query.id;
    BenefitsModel.destroy({where :{id : benefitsID}})
    .then(function(){
        return res.status(200).json({
            message : "Benefits is Deleted Successfully"
        });
    })
    .catch(function(error){
        
        return res.status(400).json({
            message : error.message
        });
    })
}

exports.updateBenefits = function(req,res){
    const benefitsObj = req.body ;
    const benefitsID = req.body.id;
    BenefitsModel.update(benefitsObj,{where :{id : benefitsID}})
    .then(function(){
        return res.status(200).json({
            message : "Benefits is Updated Successfully"
        });
    })
    .catch(function(error){
        return res.status(400).json({
            message : error.message
        });
    })
}

exports.searchForBenefits = function (req, res) {
    const searchTerm = req.body.searchTerm;
    if (!searchTerm.replace(/\s/g, '').length || !searchTerm.replace(/[@._-]/g, '').length) {
        return res.status(405).json('Methode Not Allowed');
    }

    BenefitsModel.findAll({
        attributes: ['Title', 'Description'],
        where: {
            [Op.or]:
            [
                Sequelize.where(Sequelize.col('Title'), {
                    [Op.like]: '%' + searchTerm + '%'
                }),
                Sequelize.where(Sequelize.col('Description'), {
                    [Op.like]: '%' + searchTerm + '%'
                })
            ]
        }
    })
    .then(function(Benefits){
        return res.status(200).json({
            message : "Benefits retrieved Successfully",
            data : Benefits 
        });
    })
    .catch(function(error){
        return res.status(400).json({
            message : error.message
        });
    })

}

exports.getAllBenefits = function(req,res){

        BenefitsModel.findAll()

        .then(function (Benefits) {
            return res.status(200).json({
                message: "All Data Retrieved Successfully",
                data : Benefits
            });
        })
        .catch(function (error) {
            return res.status(400).json({
                message: error.message
            });
        })
}