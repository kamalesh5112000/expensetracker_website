const Expense = require('../model/expense');
exports.getExpense= (req, res, next) => {
    Expense.findAll()
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
    
    Expense.create({
        amount:amount,
        description:description,
        catecgory:catecgory

    }).then(result=>{
        res.json(result)
        console.log('Created Product');
    }).catch(err=>console.log(err));
  }

  exports.expensedelete=(req,res,next)=>{
    const userid=req.params.ID;
    console.log(userid)
    
    Expense.findByPk(userid)
    .then(exp=>{
        return exp.destroy();
    }).then(result=>{
        res.json(result)
        console.log('Expense Deleted')
        

    })
    .catch(err=>{
        console.log(err)
    });
  }