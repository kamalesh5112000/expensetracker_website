const User = require('../model/user');

exports.addUser=(req,res,next)=>{
    console.log(req.body)
    const nam = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    console.log(nam,email,password)
    
    User.create({
        name:nam,
        email:email,
        password:password

    }).then(result=>{
        res.json(result)
        console.log('Created Product');
    }).catch(err=>console.log(err));
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