import React, { useEffect, useState } from "react";
import Layout from "../components/layouts/Layout";
import Modal from "antd/es/modal/Modal";
import { Form, Input, Select, Table, message,DatePicker, } from "antd";
import {UnorderedListOutlined,AreaChartOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons'
import axios from 'axios'
import Spinner from "../components/Spinner";
import moment from 'moment';
import Analytics from "../components/Analytics";


const {RangePicker} = DatePicker;

const HomePage = () => {
	const [showModal, setShowModal] = useState(false);
  const [loading,setLoading] = useState(false)
  const [allTransactions, setAllTransactions] = useState([])


  const [frequency,setFrequency] = useState('7')
  const [selectedDate,setSelectedDate] = useState([])
  const [type,setType] = useState('all')

  const [viewData,setViewData] = useState('table')
  const [editable,setEditable] = useState(null)



  //show all transactions in table
  const columns = [
    {
      title:'Date',
      dataIndex:'date',
      render: (text,record) => (
      <span> 
      {moment(text).format('YYYY-MM-DD')}
      </span>
      )
      //formatting date in proper date format
    },
    {
      title:'Amount',
      dataIndex: 'amount'
    },
    {
      title:'Type',
      dataIndex: 'type'
    },
    {
      title:'Category',
      dataIndex: 'category'
    },
    {
      title:'Reference',
      dataIndex: 'reference'
    },
    {
      title:'Actions',
      render: (text,record) => 
      <div>
        <EditOutlined onClick={() => {
          setEditable(record)
          console.log(record)
          setShowModal(true)
        }
        } />
        <DeleteOutlined className="mx-1" onClick={() => {deleteHandler(record)} } />
      </div>


 
    }


  ]




  useEffect(()=>{

      //get all transactions
  const getAllTransactions = async () => {
    try{
      setLoading(true)
      const user = JSON.parse(localStorage.getItem('user'))
      const res = await axios.post('/transactions/get-transaction', {
        userid:user._id,
        frequency,
        selectedDate,
        type
      })
      setLoading(false)
      setAllTransactions(res.data)
      console.log(res.data)


    }catch(error){
      console.log(error)
      message.error('data can not be fetched!')

    }
  }

    getAllTransactions()
  },[frequency,selectedDate,type])


  const deleteHandler = async (record) => {
    try{
      setLoading(true)
      await axios.post('/transactions/delete-transaction', {transactionId: record._id})
      setLoading(false)
      message.success('record deleted')

    }catch(error){
      setLoading(false)
      message.error('unable to delete')
    }

  }




  //transaction form handling
	const handleSubmit = async (values) => {

    try{
      const user = JSON.parse(localStorage.getItem('user'))
      setLoading(true)

      if(editable){
        await axios.post('/transactions/edit-transaction', {
          updatedData: {
            ...values,
            userid:user._id
          },
         transactionId: editable._id 
        
        });

        setLoading(false)
        message.success('Transaction was edited successfully')

      }else{
        await axios.post('/transactions/add-transaction', {...values,userid:user._id})
        setLoading(false)
        message.success('Transaction added successfully')

      }

      setEditable(null)
      setShowModal(false)

    }catch(error){
      setLoading(false)
      message.error('failed to add transaction')

    }
    

    

  };
	const handleTypeSelectChange = (value) => {};
  const handleCategorySelectChange = (value) => {};

	return (
		<>
			<Layout>
        {loading && <Spinner /> }

				<div className="filters">

					<div>
            <h6>Select Frequency</h6>

            <Select value={frequency} onChange={(values) => setFrequency(values)}>

              <Select.Option value='7'>LAST 1 Week</Select.Option>
              <Select.Option value='30'>LAST 1 Month</Select.Option>
              <Select.Option value='365'>LAST 1 Year</Select.Option>
              <Select.Option value='custom'>Custom</Select.Option>

            </Select>

            {frequency === 'custom' && (
              <RangePicker value={selectedDate} 
              onChange={(values) => setSelectedDate(values)}
              />


            )}

          </div>


          <div>
            <h6>Select Type</h6>

            <Select value={type} onChange={(values) => setType(values)}>

              <Select.Option value='all'>All</Select.Option>
              <Select.Option value='income'>Income</Select.Option>
              <Select.Option value='expense'>Expense</Select.Option>


            </Select>


          </div>

          <div className="mx-2 switch-icons">

          <UnorderedListOutlined className = {`mx-2 list-chart ${viewData === 'table' ? 'active-icon' : 'inactive-icon' }` }  onClick={() => {setViewData('table')}}/>

          <AreaChartOutlined className={`mx-2 list-chart ${viewData === 'analytics' ? 'active-icon' : 'inactive-icon'}` } onClick={()=>{setViewData('analytics')}}/>

          </div>



					<div>
						<button
							className="btn btn-primary"
							onClick={() => setShowModal(true)}
						>
							Add New
						</button>
					</div>
				</div>





				<div className="content">

          {viewData === 'table' ? <Table columns={columns} dataSource={allTransactions} /> :
          <Analytics allTransactions={allTransactions} /> 
          }
          

        </div>


				<Modal
					title={ editable ? 'edit transaction' : 'add transaction'}
					open={showModal}
					onCancel={() => setShowModal(false)}
					footer={false}
				>
					<Form layout="vertical" initialValues = {editable} onFinish={handleSubmit}>
						<Form.Item label="Amount" name="amount">
							<Input type="text" />
						</Form.Item>

						<Form.Item label="type" name="type">
							<Select
								onChange={handleTypeSelectChange}
								options={[
									{ value: "income", label: "Income" },
									{ value: "expense", label: "Expense" },
								]}
							/>
						</Form.Item>

						<Form.Item label="Category" name="category">
							<Select
								onChange={handleCategorySelectChange}
								options={[
									{ value: "salary", label: "salary" },
									{ value: "tip", label: "tip" },
									{ value: "project", label: "project" },
									{ value: "food", label: "food" },
									{ value: "movie", label: "movie" },
									{ value: "bills", label: "bills" },
									{ value: "medical", label: "medical" },
									{ value: "fee", label: "fee" },
									{ value: "tax", label: "tax" },
								]}
							/>
						</Form.Item>

            <Form.Item label="Date" name="date">
							<Input type="date" />
						</Form.Item>

            <Form.Item label="Reference" name="reference">
							<Input type="text" />
						</Form.Item>

            <Form.Item label="Description" name="description">
							<Input type="text" />
						</Form.Item>

            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-primary">SAVE</button>
            </div>




					</Form>
				</Modal>



			</Layout>
		</>
	);
};

export default HomePage;
