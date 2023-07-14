const express= require('express');
const cors = require('cors');


const bodyParser=require('body-parser');
const sequelize=require('./database/database');

const user = require('./model/user');

const app = express();

const userRoutes=require('./routes/userRoutes');
const expenseRoute=require('./routes/expenseroute');

app.use(bodyParser.json({ extended: false }));
app.use(cors());

app.use(userRoutes);
app.use(expenseRoute);

sequelize.sync().then(result=>{
    //console.log(result);
    app.listen(5000);
}).catch(err=>console.log(err));