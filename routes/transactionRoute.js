const express = require('express');
const { addTransaction, getAllTransactions,editTransaction,deleteTransaction } = require('../controllers/transactionCntrl');

const router = express.Router();

//routes
router.post('/add-transaction', addTransaction)

//edit record
router.post('/edit-transaction', editTransaction)

//delete record
router.post('/delete-transaction', deleteTransaction)


router.post('/get-transaction', getAllTransactions)

module.exports = router