import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import Login from './components/Login';
import GetUserInfo from './components/UserInfo';
import ProtectedRoute from './components/ProtectedRoute';
// import Search from './components/Search';
// import SearchResults from './components/SearchResults';
import RegisterUser from './components/RegisterUser';
import './App.css';
import NavBar from './components/NavBar';
import GetRandomGame from './components/GetRandomGame/GetRandomGame';
import UserCollection from './components/UserCollection/UserCollection';
import { axiosWithAuth } from './utils/axiosWithAuth';
import AddGame from './components/AddGame/AddGame';
// git commit --amend
function App() {
	const [hotResponse, setHotResponse] = useState([]);
	const [searchResults, setSearchResults] = useState([]);
	const [userData, setUserData] = useState({});
	const [userCollection, setUserCollection] = useState([]);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	useEffect(() => {
		if (localStorage.getItem('token')) {
			setIsLoggedIn(true);
		} else {
			setIsLoggedIn(false);
		}
		axiosWithAuth()
			.get(`/usercollection/collection`)
			.then((res) => {
				setUserCollection(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<div className='App'>
			{isLoggedIn && (
				<>
					<NavBar />
					<AddGame
						isModalOpen={isModalOpen}
						setIsModalOpen={setIsModalOpen}
						searchResults={searchResults}
						setSearchResults={setSearchResults}
					/>
				</>
			)}
			<Route exact path='/'>
				<Login
					setHotResponse={setHotResponse}
					setUserData={setUserData}
					setIsLoggedIn={setIsLoggedIn}
				/>
			</Route>
			<ProtectedRoute path='/register'>
				<RegisterUser />
			</ProtectedRoute>
			<ProtectedRoute path='/home'>
				<GetUserInfo hotResponse={hotResponse} userData={userData} />
			</ProtectedRoute>
			<ProtectedRoute path='/collection'>
				<UserCollection
					userData={userData}
					userCollection={userCollection}
					setUserCollection={setUserCollection}
				/>
			</ProtectedRoute>
			<ProtectedRoute path='/random'>
				<GetRandomGame userData={userData} userCollection={userCollection} />
			</ProtectedRoute>
		</div>
	);
}

export default App;
