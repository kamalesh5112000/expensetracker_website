const Expense = require('../model/expense');
const { use } = require('../routes/userRoutes');
const jwt = require('jsonwebtoken');

exports.getExpense= (req, res, next) => {
    //console.log(req.headers.authorization)
    
    console.log("From the Expences",req.user.email)
    Expense.findAll({where: {userId:req.user.id}})
    .then(exp=>{
      res.json(exp)
      // res.render('shop/product-list', {
      //   prods: products,
      //   pageTitle: 'All Products',
      //   path: '/products'
      // });
    }).catch(err=>{
      console.log(err)
    });
  };

  exports.addExpense=(req,res,next)=>{
    console.log(req.body)
    const amount = req.body.amount;
    const description = req.body.description;
    const catecgory = req.body.catecgory;
    console.log(amount,description,catecgory);
    console.log(req.user.id)
    
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

  exports.expensedelete=(req,res,next)=>{
    const expid=req.params.ID;
    console.log(expid)
    
    Expense.destroy({where: {id:expid,userId:req.user.id}})
    .then(result=>{
        res.json(result)
        console.log('Expense Deleted')
        

    })
    .catch(err=>{
        console.log(err)
    });
  }