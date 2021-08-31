import React, { useState } from 'react';
import axios from 'axios';

const initialFormState = {
	username: '',
	password: '',
	primaryemail: '',
};

const RegisterUser = () => {
	const [formState, setFormState] = useState(initialFormState);

	const handleChange = (e) => {
		const { name, value } = e.target;

		setFormState({ ...formState, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post('http://localhost:2019/createnewuser', formState)
			.then((res) => {
				console.log('res: ', res);
			})
			.catch((err) => {
				console.log('err register: ', err);
			});
	};

	return (
		<div>
			<h2>Register</h2>
			<form onSubmit={handleSubmit}>
				<label>
					Username
					<input
						name='username'
						value={formState.username}
						onChange={handleChange}
					/>
				</label>
				<label>
					Email
					<input
						name='primaryemail'
						type='email'
						value={formState.email}
						onChange={handleChange}
					/>
				</label>
				<label>
					Password
					<input
						name='password'
						type='password'
						value={formState.password}
						onChange={handleChange}
					/>
				</label>
				<button type='submit'>Register</button>
			</form>
		</div>
	);
};

export default RegisterUser;
