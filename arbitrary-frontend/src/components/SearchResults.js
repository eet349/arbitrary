import axios from 'axios';
import React, { useState, useEffect } from 'react';
import convert from 'xml-js';

import StyledCards from './StyledCards/StyledCards';

import './StyledCards/StyledCardContainer.css';

const SearchResults = (props) => {
	const [resultThumbnails, setResultThumbnails] = useState({});

	useEffect(() => {
		fetchThumbnails();
	}, [props.searchResults]);

	const fetchThumbnails = () => {
		// make the call, and add it to the list
		let promiseArray = props.searchResults.map((result) => {
			return axios.get(
				`https://api.geekdo.com/xmlapi2/thing?id=${result._attributes.id}`
			);
		});
		Promise.all(promiseArray).then((values) => {
			let convertedValues = {};

			values.forEach((value) => {
				let convertedRes = convert.xml2js(value.data, {
					compact: true,
					spaces: 4,
				});
				console.log('convertedRes: ', convertedRes);
				convertedValues = {
					...convertedValues,
					[convertedRes.items.item._attributes.id]:
						convertedRes.items.item.thumbnail?._text,
				};
				setResultThumbnails(convertedValues);
			});
		});
	};

	const renderResultsList = () => {
		return props.searchResults.map((result) => {
			return (
				<StyledCards
					add // Adds an add button when rendering the card
					key={result?._attributes?.id}
					cardInfo={{
						name: result?.name?._attributes?.value,
						id: result?._attributes?.id,
					}}
					thumbnail={resultThumbnails[result?._attributes?.id]}
				/>
			);
		});
	};

	return (
		<div className='styled-card-container'>
			{resultThumbnails && renderResultsList()}
		</div>
	);
};

export default SearchResults;
