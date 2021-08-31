import './StyledCardContainer.css';

import React from 'react';

const StyledCardContainer = (props) => {
	return <div className='styled-card-container'>{props.children}</div>;
};

export default StyledCardContainer;
