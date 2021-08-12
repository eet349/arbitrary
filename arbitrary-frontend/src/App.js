import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import Login from './components/Login';
import GetUserInfo from './components/UserInfo';
import ProtectedRoute from './components/ProtectedRoute';
import Search from './components/Search';
import SearchResults from './components/SearchResults';
import './App.css';

function App() {
	const [hotResponse, setHotResponse] = useState([]);
	const [searchResults, setSearchResults] = useState([]);
	const [userData, setUserData] = useState({});

	return (
		<div className='App'>
			<Search setSearchResults={setSearchResults} />
			<SearchResults
				searchResults={searchResults}
				setSearchResults={setSearchResults}
			/>
			<Route exact path='/'>
				<Login setHotResponse={setHotResponse} setUserData={setUserData} />
			</Route>
			<ProtectedRoute exact path='/userinfo'>
				<GetUserInfo hotResponse={hotResponse} userData={userData} />
			</ProtectedRoute>
		</div>
	);
}

export default App;
