import React, { useEffect, useState } from 'react';
import { axiosWithAuth } from './axiosWithAuth';
import { useHistory } from 'react-router-dom';

const GetUserInfo = (props) => {
	const [userData, setUserData] = useState({});
	const history = useHistory();

	const logout = () => {
		localStorage.clear('token');
		history.push('/');
	};
	useEffect(() => {
		axiosWithAuth()
			.get('/users/getuserinfo')
			.then((res) => {
				setUserData(res.data);
			})
			.catch((err) => {
				// debugger;
				console.log('error: ', err);
			});
	}, []);

	const displayHot = () => {
		console.log('hotresponse: ', props.hotResponse);
		if (props.hotResponse) {
			console.log('hotresponse: ', props.hotResponse);
			return props.hotResponse.map((item) => {
				return (
					<div key={item._attributes.id}>{item.name._attributes.value}</div>
				);
			});
		}
	};

	return (
		<>
			<div>
				{userData && <h1> Hi, {userData?.username}! </h1>}
				<h3> {userData?.primaryemail} </h3>
				<br />
				<p>Welcome back!</p>
			</div>
			<br />
			<div className='logout'>
				<button type='button' onClick={logout}>
					{' '}
					Logout{' '}
				</button>
				{props.hotResponse && displayHot()}
			</div>
		</>
	);
};

export default GetUserInfo;
