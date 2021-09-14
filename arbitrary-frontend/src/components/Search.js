import axios from 'axios';
import React, { useState } from 'react';
import convert from 'xml-js';

const Search = (props) => {
	const [searchQueryText, setSearchQueryText] = useState('');

	const searchSubmit = (e) => {
		e.preventDefault();
		axios
			.get(
				`https://www.boardgamegeek.com/xmlapi2/search?query=${searchQueryText}&type=boardgame,boardgameexpansion&pagesize=10`
			)
			.then((res) => {
				let convertedRes = convert.xml2json(res.data, {
					compact: true,
					spaces: 4,
				});
				let convertedSearchResults = JSON.parse(convertedRes).items.item;
				let dedupedSearchResults = [];
				let dedupedDict = {};

				if (convertedSearchResults) {
					// for each convSR
					// if id is not in dict
					// add the res to dedupSR and id to dict
					// else dont add.
					convertedSearchResults.forEach((result) => {
						if (!dedupedDict[result?._attributes?.id]) {
							dedupedSearchResults.push(result);
							dedupedDict[result._attributes.id] = true;
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
			<form onSubmit={searchSubmit} className='search-form'>
				<input
					className='searchbar'
					type='text'
					value={searchQueryText}
					onChange={handleChange}
					autoFocus
				/>
				<button className='search-btn'>
					<span className='icon'>Search</span>
					<div className='search-icon-container'>
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
					</div>
				</button>
			</form>
		</div>
	);
};

export default Search;
