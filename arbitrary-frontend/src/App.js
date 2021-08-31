import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import Login from './components/Login';
import GetUserInfo from './components/UserInfo';
import ProtectedRoute from './components/ProtectedRoute';
import Search from './components/Search';
import SearchResults from './components/SearchResults';
import RegisterUser from './components/RegisterUser';
import './App.css';
import NavBar from './components/NavBar';
import GetRandomGame from './components/GetRandomGame/GetRandomGame';
import UserCollection from './components/UserCollection/UserCollection';
// git commit --amend
function App() {
	const [hotResponse, setHotResponse] = useState([]);
	const [searchResults, setSearchResults] = useState([]);
	const [userData, setUserData] = useState({});

	return (
		<div className='App'>
			<NavBar />
			<Search setSearchResults={setSearchResults} />
			<SearchResults
				searchResults={searchResults}
				setSearchResults={setSearchResults}
			/>
			<Route exact path='/'>
				<Login setHotResponse={setHotResponse} setUserData={setUserData} />
			</Route>
			<ProtectedRoute path='/register'>
				<RegisterUser />
			</ProtectedRoute>
			<ProtectedRoute path='/home'>
				<GetUserInfo hotResponse={hotResponse} userData={userData} />
			</ProtectedRoute>
			<ProtectedRoute path='/collection'>
				<UserCollection userData={userData} />
			</ProtectedRoute>
			<ProtectedRoute path='/random'>
				<GetRandomGame userData={userData} />
			</ProtectedRoute>
		</div>
	);
}

export default App;
