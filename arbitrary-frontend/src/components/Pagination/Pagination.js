import React, { useState, useEffect } from 'react';
import SearchResults from '../SearchResults';
import './Pagination.css';

let currentPage = 1;
let showRight;
let showLeft;
const Pagination = (props) => {
	// grab all the results from search results
	// divide them up
	const { searchResults } = props;
	const MAX_RESULTS_PER_PAGE = 9;

	const [limitedSearchResults, setLimitedSearchResults] = useState([]);
	const [numPages, setNumPages] = useState();
	let left = 0;
	let right = left + MAX_RESULTS_PER_PAGE;
	useEffect(() => {
		setLimitedSearchResults(searchResults.slice(left, right));
		setNumPages(Math.ceil(searchResults.length / MAX_RESULTS_PER_PAGE));
		showLeft = 1;
		showRight = showLeft + 5;
		return () => {
			currentPage = 1;
		};
	}, [searchResults]);
	const renderPages = () => {
		let returnButtonArray = [];
		// if (numPages > 10) {
		// }
		for (let i = 1; i <= numPages; i++) {
			let isShown = i > showLeft && i < showRight;
			if (i === 1 || isShown || i === numPages) {
				returnButtonArray.push(
					<button
						onClick={() => handleSetCurrentPage(i)}
						key={i}
						className='pagination-button'
					>
						{i}
					</button>
				);
			}
		}
		return returnButtonArray;
	};
	const handleNextPage = () => {
		if (currentPage < numPages) {
			currentPage += 1;
			showLeft += 1;
			showRight += 1;
			if (MAX_RESULTS_PER_PAGE * currentPage - 1 > searchResults.length) {
				right = searchResults.length;
				left = right - (right % MAX_RESULTS_PER_PAGE) - 1;
				setLimitedSearchResults(searchResults.slice(left, right));
			} else {
				right = MAX_RESULTS_PER_PAGE * currentPage;
				left = right - MAX_RESULTS_PER_PAGE;
				setLimitedSearchResults(searchResults.slice(left, right));
			}
		}
	};

	const handlePreviousPage = () => {
		if (currentPage !== 1) {
			currentPage -= 1;
			right = MAX_RESULTS_PER_PAGE * currentPage;
			left = right - 9;
			showLeft -= 1;
			showRight -= 1;
			setLimitedSearchResults(searchResults.slice(left, right));
		}
	};

	const handleSetCurrentPage = (newPage) => {
		currentPage = newPage;
		let isLastPage =
			MAX_RESULTS_PER_PAGE * currentPage - 1 > searchResults.length;

		right = isLastPage
			? searchResults.length
			: MAX_RESULTS_PER_PAGE * currentPage;
		left = isLastPage
			? right - (right % MAX_RESULTS_PER_PAGE) - 1
			: right - MAX_RESULTS_PER_PAGE;
		setLimitedSearchResults(searchResults.slice(left, right));
	};

	return (
		<>
			<SearchResults searchResults={limitedSearchResults} />
			<div className='pagination-container'>
				{searchResults.length > MAX_RESULTS_PER_PAGE && (
					<>
						<button className='pagination-button' onClick={handlePreviousPage}>
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
									d='M15 19l-7-7 7-7'
								/>
							</svg>
						</button>
						{renderPages()}
						<button className='pagination-button' onClick={handleNextPage}>
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
									d='M9 5l7 7-7 7'
								/>
							</svg>
						</button>
					</>
				)}
			</div>
		</>
	);
};

export default Pagination;
