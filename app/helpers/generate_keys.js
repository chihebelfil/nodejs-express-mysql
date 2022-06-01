const crypto = require('crypto');
const bcrypt = require('bcrypt');


const register = async function(req,res){    
    const secret = crypto.randomBytes(32).toString('hex')
    console.log('secret _ key ',secret)

    const saltRounds = 10;
    const encryptedPassword = await bcrypt.hash(secret, saltRounds)
   /*  let users={       
    "user_name":req.body.userName,       
    "email_address":req.body.email,       
    "password":encryptedPassword
    }        
    pool.query('INSERT INTO players SET ?',users, function (error, results, fields) {      
    if (error) {        
    res.send({          
    "code":400,          
    "failed":"error occurred",          
    "error" : error})      
    } else {        
    res.send({          
    "code":200,          
    "success":"user registered sucessfully"            
    });        
    }    
    });   */
    }