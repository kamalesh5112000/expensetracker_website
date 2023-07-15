const express = require('express');
const userauthenticate=require('../middleware/auth');

const expenseController = require('../controllers/expenseController');

const router = express.Router();

router.get('/expense',userauthenticate.authenticate,expenseController.getExpense);
router.post('/expense',userauthenticate.authenticate,expenseController.addExpense);
router.delete('/expense/:ID',userauthenticate.authenticate,expenseController.expensedelete);

module.exports = router;