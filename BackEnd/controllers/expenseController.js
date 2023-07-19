const Expense = require('../model/expense');
const { use } = require('../routes/userRoutes');
const jwt = require('jsonwebtoken');
const User = require('../model/user');


exports.getExpense= (req, res, next) => {
    const userdata=req.user.isPremium
    console.log("From the Expences",req.user.email)
    Expense.findAll({where: {userId:req.user.id}})
    .then(data=>{
        
        
      res.json({data,userdata})

    }).catch(err=>{
      console.log(err)
    });
  };

  exports.addExpense=async (req,res,next)=>{

    const amount = req.body.amount;
    const description = req.body.description;
    const catecgory = req.body.catecgory;
    console.log(amount,description,catecgory);
    console.log(req.user.id)
    let updateduser=await User.findAll({
        where:{id:req.user.id},
        attributes:['totalcost']

    })
    console.log(updateduser[0].totalcost)
    await User.findByPk(req.user.id).then(user=>{
        user.totalcost=Number(updateduser[0].totalcost)+Number(amount)
        return user.save()
    })
    
    
    
    Expense.create({
        amount:amount,
        description:description,
        catecgory:catecgory,
        userId:req.user.id

    }).then(result=>{
        res.json(result)
        console.log('Created Product');
    }).catch(err=>console.log(err));
  }

  exports.expensedelete=async(req,res,next)=>{
    const expid=req.params.ID;
    console.log(expid)
    let expamount=0;
    
    await Expense.findByPk(expid)
    .then(result=>{
        res.json(result)
        console.log(result.amount)
        expamount=result.amount

        return result.destroy();
        console.log('Expense Deleted')
        

    }).catch(err=>console.log(err));
    let updateduser=await User.findAll({
        where:{id:req.user.id},
        attributes:['totalcost']

    })
    console.log(updateduser[0].totalcost)
    await User.findByPk(req.user.id).then(user=>{
        user.totalcost=Number(updateduser[0].totalcost)-Number(expamount)
        return user.save()
    })

  }