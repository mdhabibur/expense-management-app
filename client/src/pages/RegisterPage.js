/*
for form component we used this ant website:
https://ant.design/docs/react/introduce


*/

import { Form, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";

const RegisterPage = () => {
	const navigate = useNavigate();
	const [Loading, setLoading] = useState(false);

	useEffect(() => {
		if (localStorage.getItem("user")) {
			navigate("/");
		}
	}, [navigate]);

	const submitHandler = async (values) => {
		try {
			setLoading(true);
			await axios.post("/users/register", values);
			message.success("Registration successful");
			setLoading(false);
			navigate("/login");
		} catch (error) {
			setLoading(false);
			message.error("registration failed!");
		}
	};

	return (
		<>
			<div className="register-page">
				{Loading && <Spinner />}

				<Form name="basic" layout="vertical" onFinish={submitHandler}>
					<h1>REGISTER PAGE</h1>

					<Form.Item label="Name" name="name">
						<Input />
					</Form.Item>

					<Form.Item label="Email" name="email">
						<Input type="email" />
					</Form.Item>

					<Form.Item label="Password" name="password">
						<Input type="password" />
					</Form.Item>

					<div>
						<p>
							Already registered? click here to <Link to="/login">login</Link>{" "}
						</p>

						<button className="btn btn-primary">Register</button>
					</div>
				</Form>
			</div>
		</>
	);
};

export default RegisterPage;
