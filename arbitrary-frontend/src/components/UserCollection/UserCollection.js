import React, { useEffect } from 'react';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import StyledCards from '../StyledCards/StyledCards';

const UserCollection = (props) => {
	const { userCollection, setUserCollection } = props;
	useEffect(() => {
		axiosWithAuth()
			.get(`/usercollection/collection`)
			.then((res) => {
				setUserCollection(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	const renderCollection = () => {
		return userCollection.length === 0 ? (
			<h2>Add games to your collection.</h2>
		) : (
			userCollection.map((collectable) => {
				// console.log('collectable: ', collectable);
				return (
					<StyledCards
						key={collectable?._attributes?.id}
						remove
						cardInfo={{
							name: collectable?.name,
							link: collectable?.link,
						}}
						additionalInfo={{
							thumbnail: {
								_text: collectable?.thumbnail,
							},
							collectableid: collectable?.collectableid,
							yearpublished: collectable?.yearpublished,
						}}
						thumbnail={collectable?.thumbnail}
						links={collectable?.tags}
						setUserCollection={setUserCollection}
					/>
				);
			})
		);
	};
	return (
		<div className='center-container'>
			<h1>User Collection</h1>
			<div className='styled-card-container'>{renderCollection()}</div>
		</div>
	);
};

export default UserCollection;
