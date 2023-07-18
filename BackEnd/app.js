const express= require('express');
const cors = require('cors');


const bodyParser=require('body-parser');
const sequelize=require('./database/database');

const user = require('./model/user');
const expense=require('./model/expense');
const order=require('./model/orders');

const app = express();

const userRoutes=require('./routes/userRoutes');
const expenseRoute=require('./routes/expenseroute');
const purchaseRoute=require('./routes/purchaseroute');
const featureRoute=require('./routes/premiumFeatureroute');

app.use(bodyParser.json({ extended: false }));
app.use(cors());

app.use(userRoutes);
app.use(expenseRoute);
app.use(purchaseRoute);
app.use(featureRoute);

user.hasMany(expense);
expense.belongsTo(user)

user.hasMany(order);
order.belongsTo(user)

sequelize.sync().then(result=>{
    //console.log(result);
    app.listen(5000);
}).catch(err=>console.log(err));