import React from 'react'
import { Progress,Space  } from 'antd';

const Analytics = ({allTransactions}) => {

    //categories
    const categories = [
        'salary',
        'tip',
        'project',
        'food',
        'movie',
        'bills',
        'medical',
        'fee',
        'tax'

    ]


    //total transactions
    const totalTransactionsNumber = allTransactions.length
    const incomeTransactions = allTransactions.filter(transaction => transaction.type === 'income')
    const incomeTransactionNumber = incomeTransactions.length

    const expenseTransactions = allTransactions.filter(transaction => {
        return transaction.type === 'expense'
    })
    const expenseTransactionsNumber = expenseTransactions.length

    const percentageIncomeTransNum = (incomeTransactionNumber/totalTransactionsNumber)*100
    const percentageExpenseTransNum = (expenseTransactionsNumber/totalTransactionsNumber)*100

    //total turnovers
    const totalTurnover = allTransactions.reduce((total,transition) => {
        return total + transition.amount
    },
    0
    )

    const totalIncomeTurnover = allTransactions.filter(transaction => transaction.type === 'income').reduce( (total,transaction) => total + transaction.amount, 0)

    const totalExpenseTurnover = allTransactions.filter(transaction => transaction.type === 'expense').reduce( (acc,transaction) => acc + transaction.amount, 0)

    const totalIncomeTurnoverPercentage = (totalIncomeTurnover / totalTurnover) * 100
    const totalExpenseTurnoverPercentage = (totalExpenseTurnover / totalTurnover) * 100


  return (
    <>

    <div className='row m-3'>

        <div className='col-md-6'>
            <div className='card'>

                <div className='card-header'>
                    <h6>Total Transactions: {totalTransactionsNumber}</h6>

                </div>

                <div className='card-body'>
                    <h5 className='text-success'>Income: {incomeTransactionNumber} </h5>
                    <h5 className='text-danger'>Expense: {expenseTransactionsNumber} </h5>

                    <Space wrap>
                    <Progress type="circle" size={70} strokeColor={'green'} percent={percentageIncomeTransNum.toFixed(0)}
                    format={(percent) => `${percent}%`}
                     />
                    <Progress type="circle" size={70} strokeColor={'red'} percent={percentageExpenseTransNum.toFixed(0)} 
                    format={(percent) => `${percent}%`}
                    />
                    </Space>

                </div>


            </div>

        </div>



        <div className='col-md-6'>
            <div className='card'>

                <div className='card-header'>
                    <h6>Total Turnovers: {totalTurnover}</h6>

                </div>

                <div className='card-body'>
                    <h5 className='text-success'>Income: {totalIncomeTurnover} </h5>
                    <h5 className='text-danger'>Expense: {totalExpenseTurnover} </h5>

                    <Space wrap>
                    <Progress type="circle" size={70} strokeColor={'green'} percent={totalIncomeTurnoverPercentage.toFixed(0)}
                    format={(percent) => `${percent}%`}
                     />
                    <Progress type="circle" size={70} strokeColor={'red'} percent={totalExpenseTurnoverPercentage.toFixed(0)} 
                    format={(percent) => `${percent}%`}
                    />
                    </Space>

                </div>
            </div>
        </div>




    </div>


    <div className='row m-3'>
      <div className='col-md-6'>
      <h6>Category wise Income</h6>

   
       {
       categories.map(category => {

        const incomeAmount = allTransactions.filter( (transaction) => transaction.type === 'income' && category === transaction.category).reduce( (acc,incomeObj) => acc + incomeObj.amount, 0)

        return(
             incomeAmount > 0 && (
                <div className='card'>

                <div className='card-body'>
                    <h5 className='text-success'>{category} </h5>
                    <Progress percent={Math.round(((incomeAmount/totalIncomeTurnover)*100))}
                    format={(percent) => `${percent}%`}
                    />

                </div>
    
    
              </div>
            )
            

        )


       })

      }

      </div>

      <div className='col-md-6'>
      <h6>Category wise Expense</h6>

   
       {
       categories.map(category => {

        const expenseAmount = allTransactions.filter( (transaction) => transaction.type === 'expense' && category === transaction.category).reduce( (acc,expenseObj) => acc + expenseObj.amount, 0)

        return(
             expenseAmount > 0 && (
                <div className='card'>

                <div className='card-body'>
                    <h5 className='text-success'>{category} </h5>
                    <Progress percent={Math.round(((expenseAmount/totalExpenseTurnover)*100))}
                    format={(percent) => `${percent}%`}
                    />

                </div>
    
    
              </div>
            )
            

        )


       })

      }

      </div>










     </div>







    </>
  )
}

export default Analytics