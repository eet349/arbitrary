import React from 'react';
import Pagination from '../Pagination/Pagination';
import Search from '../Search';
import './AddGame.css';

const AddGame = (props) => {
	const { searchResults, setSearchResults, isModalOpen, setIsModalOpen } =
		props;
	return (
		<>
			{isModalOpen ? (
				<div className='modal'>
					<button
						className='modal-exit-button red-bg'
						onClick={() => setIsModalOpen(false)}
					>
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
								d='M6 18L18 6M6 6l12 12'
							/>
						</svg>
					</button>
					<Search setSearchResults={setSearchResults} />
					<Pagination searchResults={searchResults} />
				</div>
			) : (
				<div
					className='float'
					onClick={() => {
						setSearchResults([]);
						setIsModalOpen(true);
					}}
				>
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
							d='M12 6v6m0 0v6m0-6h6m-6 0H6'
						/>
					</svg>
				</div>
			)}
		</>
	);
};

export default AddGame;
