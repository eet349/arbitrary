import './StyledCards.css';

import React from 'react';
import { axiosWithAuth } from '../../utils/axiosWithAuth';

const StyledCards = (props) => {
	// destructure props for the attributes that will be used
	const {
		add,
		remove,
		cardInfo,
		additionalInfo,
		thumbnail,
		links,
		setUserCollection,
	} = props;

	const handleAdd = (e) => {
		e.preventDefault();

		let patchObj = {
			name: cardInfo.name,
			type: additionalInfo?._attributes.type,
			link: `https://boardgamegeek.com/boardgame/${cardInfo.id}`,
			description: additionalInfo?.description._text,
			image: additionalInfo?.image._text,
			thumbnail: additionalInfo?.thumbnail?._text,
			minplayers: parseInt(additionalInfo?.minplayers?._attributes.value),
			maxplayers: parseInt(additionalInfo?.maxplayers?._attributes.value),
			maxplaytime: parseInt(additionalInfo?.maxplaytime?._attributes.value),
			playingtime: parseInt(additionalInfo?.playingtime?._attributes.value),
			minage: parseInt(additionalInfo?.minage?._attributes.value),
			yearpublished: parseInt(additionalInfo?.yearpublished?._attributes.value),
			tags: links,
		};
		axiosWithAuth()
			.patch(`/usercollection/collection/add`, patchObj)
			.then((res) => {
				setUserCollection(res.data.collectables);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleRemove = (e) => {
		e.preventDefault();
		axiosWithAuth()
			.delete(`/usercollection/collection/${additionalInfo?.collectableid}`)
			.then((res) => {
				setUserCollection(res.data.collectables);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className='styled-card'>
			<div className='card-thumbnail-container'>
				{thumbnail || additionalInfo?.thumbnail?._text ? (
					<img
						className='thumbnail'
						src={thumbnail || additionalInfo?.thumbnail?._text}
						alt={cardInfo?.name}
					/>
				) : (
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
							d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
						/>
					</svg>
				)}
			</div>
			<div className='card-info-container'>
				<a
					href={cardInfo?.link}
					className='card-name-link'
					target='_blank'
					rel='noopener noreferrer'
				>
					{cardInfo?.name}
					<span className='yearpublished'>
						(
						{additionalInfo?.yearpublished?._attributes?.value ||
							additionalInfo?.yearpublished}
						)
					</span>
				</a>
			</div>
			{!add && !remove && <div className='no-button'></div>}
			{add && (
				<button className='green-bg' onClick={(e) => handleAdd(e)}>
					Add
				</button>
			)}
			{remove && (
				<button className='red-bg' onClick={(e) => handleRemove(e)}>
					Remove
				</button>
			)}
		</div>
	);
};

export default StyledCards;
