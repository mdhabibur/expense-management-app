import React, { useEffect, useState } from 'react'
import {Form,Input,message} from 'antd'
import { Link,useNavigate } from 'react-router-dom'

import axios from 'axios'
import Spinner from '../components/Spinner'

const Login = () => {


    const navigate = useNavigate();
    const [Loading,setLoading] = useState(false)

    useEffect( () => {
        if(localStorage.getItem('user')){
            navigate('/');
        }
    }, [navigate]);



    const submitHandler = async (values) => {

        try{
            setLoading(true)
            const {data} =  await axios.post('/users/login', values)
            ///api/v1 in localhost that is not needed , it gives error if we add it before /users/login 
            message.success('login successful')
            setLoading(false)
            localStorage.setItem('user',JSON.stringify({...data.user, password:""}))

            const {name,email,password} =  {...data.user}

            console.log(name + " " +  email + " " + password)

            navigate('/')

        }catch(error){
            setLoading(false)
            message.error('something went wrong')

        }

       
    }


  return (
    
    <>
    <div className='login-page'>

        {Loading && <Spinner /> }

        <Form 
        name='basic'
        layout='vertical'
        onFinish={submitHandler}
        >
            <h1>LOGIN PAGE</h1>

            <Form.Item
            label="Email" name="email">
                <Input type='email' />
            </Form.Item>

            <Form.Item
            label="Password" name="password">
                <Input type='password' />
            </Form.Item>

            <div>

                <p>Not an user ?
                click here to <Link to='/register'>Register</Link> </p>

                <button className='btn btn-primary'>Login</button>

            </div>

        </Form>

    </div>
    </>

  )
}

export default Login