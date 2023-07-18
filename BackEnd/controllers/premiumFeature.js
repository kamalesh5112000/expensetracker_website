const User = require('../model/user');
const Expense = require('../model/expense');
const sequelize = require('../database/database');

exports.getleaderBoard=async(req,res,next)=>{
    try{
        const leaderboarduser = await User.findAll({
            attributes:['id','name',[sequelize.fn('sum',sequelize.col('expenses.amount')),'total_cost']],
            include:[
                {
                    model:Expense,
                    attributes:[]
                }
            ],
            group:['user.id'],
            order:[['total_cost','DESC']]
        });
        
        
        res.json({leaderboard:leaderboarduser,userId:req.user.id});

    }catch(err){
        console.log(err)
    }
    
    
    // .then(user=>{
    //     user.forEach(user => {
            
    //         console.log(user.name,user.id)
    //         Expense.findAll({where: {userId:user.id}}).then(expense=>{
    //             console.log(expense[0].description,expense[0].amount)
    //             totalexpense=totalexpense+expense[0].amount

    //         })
    //         leaderboard.push({name:user.name,totale:totalexpense})
    //     }).then(()=>{
    //         console.log("Leader Board",leaderboard)
    //         res.json(leaderboard);
    //     })
    // })
    
}