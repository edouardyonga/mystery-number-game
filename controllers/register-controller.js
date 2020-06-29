var crypto = require('crypto');
// var Cryptr = require('cryptr');
var express=require("express");
var connection = require('./../config');
// cryptr = new Cryptr('10');
 
module.exports.register=function(req,res){
  var today = new Date();
  // var encryptedString = cryptr.encrypt(req.body.password);
  var encryptedString = crypto.createHash('md5').update(req.body.password).digest('hex');
    var users={
        "username":req.body.username,
        // "email":req.body.email,
        "password":encryptedString
        // "created_at":today,
        // "updated_at":today
    }
    connection.query('INSERT INTO user SET ?',users, function (error, results, fields) {
      if (error) {
        console.log(error);
        res.json({
            status:false,
            message:'there are some error with query',
        })
      }else{
        res.json({
            status:true,
            data:results,
            message:'user registered sucessfully'
        })
      }
    });
}