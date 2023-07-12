const Sequelize=require('sequelize');

const sequelize=new Sequelize('todo','root','Kamal@2000',{dialect:'mysql',host:'localhost'});
module.exports=sequelize;