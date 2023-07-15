const { response } = require('express');
const User = require('../model/user');
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');
const { use } = require('../routes/userRoutes');

function generateAccessToken(id,nam){
    return jwt.sign({ userId:id,name: nam},'secretkey')

}

async function emailValidate(email,password){
    let emailflag=false;
    let passwordflag=false;
    let userobj=false;
    await User.findAll({where: {email}}).then(user=>{
        
        if(user.length>0){
            emailflag=user[0].email
            passwordflag = user[0].password
            userobj=user
            
        }

    })
    return [emailflag,passwordflag,userobj]

}

exports.addUser=async (req,res,next)=>{
    
    const nam = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    
    const [emailflag,passwordflag]=await emailValidate(email,password)
    console.log(emailflag,passwordflag)
    if(emailflag){
        res.status(202).json({message:"Email Already Exists"})
        //res.status(202).json("Email Exists")
    }else{
        const saltrounds=10;
        bcrypt.hash(password,saltrounds,async(err,hash)=>{
            console.log(err)
            await User.create({
                name:nam,
                email:email,
                password:hash
        
            })
            res.status(203).json({message:'User Created Successfully'})

        })

    }
    

    // const saltrounds=10;
    // bcrypt.hash(password,saltrounds,async(err,hash)=>{
    //     console.log(err)
    //     await User.create({
    //         name:nam,
    //         email:email,
    //         password:hash
    
    //     })
    //     res.status(201).json({message:'User Created Successfully'})

    // })

    
    
    // User.create({
    //     name:nam,
    //     email:email,
    //     password:password

    // }).then(result=>{
    //     res.json(result)
    //     console.log('Created Product');
    // }).catch(err=>console.log(err));
}

exports.loginUser=async (req,res,next)=>{
    const email = req.body.email;
    const password = req.body.password;
    const [emailflag,passwordflag,userobj]=await emailValidate(email,password)
    console.log(emailflag,passwordflag)
    if(emailflag){
        bcrypt.compare(password,passwordflag,(err,response)=>{
            if(!err){
                if(response){
                    res.status(203).json({message:"Successfully Logged In",token:generateAccessToken(userobj[0].id,userobj[0].name)})
                }else{
                    res.status(201).json({message:"Password Incorrect"})
    
                }
            }else{
                console.log(err)
            }

        })
    }else{
        res.status(202).json({message:"Email Doesn't Exists"})

    }

}


exports.getUsers = (req, res, next) => {
    User.findAll()
    .then(users=>{
      res.json(users)
      //res.json({data:'Hello From Kamalesh'})
    }).catch(err=>{
      console.log(err)
    });
};