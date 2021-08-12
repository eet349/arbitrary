import axios from 'axios';
import React, { useState, useEffect } from 'react';
import convert from 'xml-js';

const SearchResults = (props) => {
	const [gloomhavenTest, setGloomhavenTest] = useState({});

	useEffect(() => {
		// Just testing out what info we can get from the /thing api route. Using gloomhaven to test the data that comes back
		axios
			.get(`https://api.geekdo.com/xmlapi2/thing?id=174430&pagesize=10&page=1`)
			.then((res) => {
				let convertedRes = convert.xml2js(res.data, {
					compact: true,
					spaces: 4,
				});
				console.log('res gloomhaven: ', convertedRes.items.item);
				setGloomhavenTest(convertedRes.items.item);
			})
			.catch((err) => {
				debugger;
			});
	}, []);

	const renderResultsList = () => {
		return props.searchResults?.map((result) => {
			console.log('result: ', result);
			return (
				<li key={result._attributes.id}>{result.name._attributes.value}</li>
			);
		});
	};

	return (
		<div>
			<ul>{renderResultsList()}</ul>
		</div>
	);
};

export default SearchResults;
