import React, { useState } from 'react';
import axios from 'axios';
import convert from 'xml-js';
import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const Login = (props) => {
	const [credentials, setCredentials] = useState({
		username: '',
		password: '',
	});
	const history = useHistory();

	const login = (e) => {
		e.preventDefault();
		axios
			.post(
				'http://localhost:2019/login',
				`grant_type=password&username=${credentials.username}&password=${credentials.password}`,
				{
					headers: {
						// btoa is converting our client id/client secret into base64
						Authorization: `Basic ${btoa('lambda-client:lambda-secret')}`,
						'Content-Type': 'application/x-www-form-urlencoded',
					},
				}
			)
			.then((res) => {
				// console.log(res.data);
				localStorage.setItem('token', res.data.access_token);
				axios
					.get('https://api.geekdo.com/xmlapi2/hot?type=boardgame')
					.then((res) => {
						let convertedRes = convert.xml2json(res.data, {
							compact: true,
							spaces: 4,
						});

						props.setHotResponse(JSON.parse(convertedRes).items.item);
					});
				axiosWithAuth()
					.get('/users/getuserinfo')
					.then((res) => {
						props.setUserData(res.data);
					})
					.catch((err) => {
						debugger;
					});
				history.push('/home');
			})
			.catch((err) => {
				debugger;
			});
	};

	const handleChange = (e) =>
		setCredentials({
			...credentials,
			[e.target.name]: e.target.value,
		});

	return (
		<>
			<h2> Please login.</h2>
			<form onSubmit={login}>
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
				<br />
				<button>Log in</button>
				<p>
					Don't have an account?
					<a href='/register' onClick={() => props.setShowLogin(false)}>
						Register
					</a>
				</p>
			</form>
		</>
	);
};

export default Login;
