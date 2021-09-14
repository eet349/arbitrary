import axios from 'axios';
import React, { useState, useEffect } from 'react';
import convert from 'xml-js';

import StyledCards from './StyledCards/StyledCards';

import './StyledCards/StyledCardContainer.css';

const SearchResults = (props) => {
	const [additionalInfo, setAdditionalInfo] = useState({});
	const [links, setLinks] = useState({});

	useEffect(() => {
		fetchAdditionalInfo();
	}, [props.searchResults]);

	const fetchAdditionalInfo = () => {
		// make the call, and add it to the list
		let promiseArray = props.searchResults.map((result) => {
			return axios.get(
				`https://api.geekdo.com/xmlapi2/thing?id=${result._attributes.id}`
			);
		});
		Promise.all(promiseArray).then((values) => {
			let convertedValues = {};
			let convertedLinks = {};
			values.forEach((value) => {
				let convertedRes = convert.xml2js(value.data, {
					compact: true,
					spaces: 4,
				});

				let tempAdditionalInfo = convertedRes.items.item;
				convertedValues = {
					...convertedValues,
					[convertedRes.items.item._attributes.id]: tempAdditionalInfo,
				};
				// convert links to convertedLinks
				let tempLinks = tempAdditionalInfo.link.map((link) => {
					return { type: link._attributes.type, value: link._attributes.value };
				});
				convertedLinks = {
					...convertedLinks,
					[convertedRes.items.item._attributes.id]: tempLinks,
				};
				setAdditionalInfo(convertedValues);
				setLinks(convertedLinks);
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
						link: `https://boardgamegeek.com/boardgame/${result?._attributes?.id}`,
					}}
					additionalInfo={additionalInfo[result?._attributes?.id]}
					links={links[result?._attributes?.id]}
					setUserCollection={props.setUserCollection}
				/>
			);
		});
	};

	return (
		<div className='styled-card-container'>
			{additionalInfo && renderResultsList()}
		</div>
	);
};

export default SearchResults;
