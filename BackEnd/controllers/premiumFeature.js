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
    
    
    
    
}