import axios from 'axios';
import React, { useState } from 'react';
import convert from 'xml-js';

const Search = (props) => {
	const [searchQueryText, setSearchQueryText] = useState('');
	const searchSubmit = (e) => {
		e.preventDefault();
		// `https://api.geekdo.com/xmlapi2/search?query=${searchQueryText}`
		axios
			.get(
				`https://api.geekdo.com/xmlapi2/search?query=${searchQueryText}&type=boardgame,boardgameexpansion&pagesize=10&page=1`
			)
			.then((res) => {
				let convertedRes = convert.xml2json(res.data, {
					compact: true,
					spaces: 4,
				});
				let convertedSearchResults = JSON.parse(convertedRes).items.item;
				let dedupedSearchResults = [];
				let dedupeDict = {};

				if (convertedSearchResults) {
					// for each convSR
					// if id is not in dict
					// add the res to dedupSR and id to dict
					// else dont add.
					convertedSearchResults.forEach((result) => {
						if (!dedupeDict[result._attributes.id]) {
							dedupedSearchResults.push(result);
							dedupeDict[result._attributes.id] = true;
						}
					});
				}
				props.setSearchResults(dedupedSearchResults);
			});
	};
	const handleChange = (e) => {
		setSearchQueryText(e.target.value);
	};
	return (
		<div>
			<form onSubmit={searchSubmit}>
				<input type='text' value={searchQueryText} onChange={handleChange} />
				<button>
					<span className='icon'>
						Search
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-6 w-6'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
							/>
						</svg>
					</span>
				</button>
			</form>
		</div>
	);
};

export default Search;