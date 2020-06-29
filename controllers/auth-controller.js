var crypto = require('crypto');
// var Cryptr = require('cryptr');
// cryptr = new Cryptr('10');
 
var connection = require('./../config');
module.exports.authenticate=function(req,res){
    var username=req.body.username;
    var password=req.body.password;
    var encrypwd = crypto.createHash('md5').update(req.body.password).digest('hex');

    connection.query('SELECT * FROM user WHERE username = ?',[username], function (error, results, fields) {
      console.log(username);
      if (error) {
          res.json({
            status:false,
            message:'there are some error with query'
            })
      }else{
        console.log(password);
       
        if(results.length >0){

          storedpwd = results[0].password;
          console.log(storedpwd);
            if(encrypwd==storedpwd){
                res.json({
                    status:true,
                    message:'successfully authenticated'
                })
            }else{
                res.json({
                  status:false,
                  message:"Username and password does not match"
                 });
            }
          
        }
        else{
          res.json({
              status:false,    
            message:"Username does not exits"
          });
        }
      }
    });
}