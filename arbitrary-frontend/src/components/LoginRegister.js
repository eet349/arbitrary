import React, { useState } from 'react';
import Login from './Login';
import CreateNewUser from './CreateNewUser'

const LoginRegister = (props) => {
    const [showLogin, setShowLogin] = useState(true)
	return (
		<>  {showLogin ? 
            <Login history={props.history} showLogin={showLogin} setShowLogin={setShowLogin} />
            :<CreateNewUser history={props.history} showLogin={showLogin} setShowLogin={setShowLogin} />}
		</>
	);
};

export default LoginRegister;
