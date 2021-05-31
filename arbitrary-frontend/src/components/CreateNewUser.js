import React, { useState } from 'react';
import axios from 'axios';
import logo from '../assets/logo.png';

const CreateNewUser = (props) => {
	const [credentials, setCredentials] = useState({
		username: '',
		password: '',
        primaryemail: ''
	});

	const createNewUser = (e) => {
		e.preventDefault();
		axios
			.post(
				'http://localhost:2019/createnewuser',
			credentials
			)
			.then((res) => {
				// console.log(res.data);
				localStorage.setItem('token', res.data.access_token);
				props.history.push('/userinfo');
			});
	};

	const handleChange = (e) =>
		setCredentials({
			...credentials,
			[e.target.name]: e.target.value,
		});

	return (
		<>
			<img src={logo} alt='' />
			<h2> Please register.</h2>
			<form onSubmit={createNewUser}>
				<label>
					Username:
					<input
						type='text'
						name='username'
						value={credentials.username}
						onChange={handleChange}
					/>
				</label>
				<label>
					Password:
					<input
						type='password'
						name='password'
						value={credentials.password}
						onChange={handleChange}
					/>
				</label>
                <label>
					Email:
					<input
						type='email'
						name='primaryemail'
						value={credentials.primaryemail}
						onChange={handleChange}
					/>
				</label>
				<br />
				<button>Register</button>
                <p>Already have an account? 
					<a href='#' onClick={() => props.setShowLogin(true)}>Log in</a>
				</p>

			</form>
		</>
	);
};

export default CreateNewUser;
