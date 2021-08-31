import './StyledCards.css';

import React from 'react';

const StyledCards = (props) => {
	// destructure props for the attributes that will be used
	const { add, cardInfo, thumbnail } = props;

	const handleAdd = (e) => {
		e.preventDefault();
		// add to user collection
		// add({cardInfo, thumbnail})
	};

	return (
		<div className='styled-card'>
			<img src={thumbnail} alt={cardInfo} />
			<h3>{cardInfo.name}</h3>
			{add && <button onClick={(e) => handleAdd(e)}>Add</button>}
		</div>
	);
};

export default StyledCards;
