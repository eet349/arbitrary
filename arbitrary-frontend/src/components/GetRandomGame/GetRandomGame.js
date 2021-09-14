import './GetRandomGame.css';
import React, { useEffect, useState } from 'react';
import StyledCards from '../StyledCards/StyledCards';
import '../StyledCards/StyledCardContainer.css';

const GetRandomGame = (props) => {
	const { userCollection } = props;
	const [randomChosen, setRandomChosen] = useState({});
	const [filteredGames, setFilteredGames] = useState(userCollection);
	useEffect(() => {
		setFilteredGames(userCollection);
	}, [userCollection]);

	const renderGames = () => {
		return filteredGames.map((game) => {
			return (
				<StyledCards
					key={game.collectableid}
					cardInfo={{
						name: game.name,
						id: game.collectableid,
						link: game.link,
					}}
					thumbnail={game.thumbnail}
					additionalInfo={{ yearpublished: game.yearpublished }}
				/>
			);
		});
	};
	const getRandomInt = (max) => {
		return Math.floor(Math.random() * max);
	};

	const handleRandomClick = () => {
		let randomIndex = getRandomInt(filteredGames.length);

		setRandomChosen(filteredGames[randomIndex]);
	};

	const handlePlayerChange = (e) => {
		e.preventDefault();
		let selectedNumPlayersInt = parseInt(e.target.value);
		let newFilteredGames;

		newFilteredGames = userCollection.filter((game) => {
			let minPlayersInt = game.minplayers;
			let maxPlayersInt = game.maxplayers;
			return (
				minPlayersInt <= selectedNumPlayersInt &&
				selectedNumPlayersInt <= maxPlayersInt
			);
		});
		setFilteredGames(newFilteredGames);
	};

	const generatePlayerOptions = () => {
		let playerOptionArray = [
			'1',
			'2',
			'3',
			'4',
			'5',
			'6',
			'7',
			'8',
			'9',
			'10+',
		];

		return playerOptionArray.map((option) => {
			return (
				<option value={option} key={option}>
					{option}
				</option>
			);
		});
	};

	return (
		<div>
			<h1>Pick a Random Game</h1>
			<select
				name='numplayers'
				className='dropdown'
				onChange={(e) => handlePlayerChange(e)}
			>
				<option value=''>Players</option>
				{generatePlayerOptions()}
			</select>
			<div className='styled-card-container'>{renderGames()}</div>
			<button onClick={handleRandomClick}>Random</button>
			{JSON.stringify(randomChosen) !== JSON.stringify({}) && (
				<div>
					<StyledCards
						key={randomChosen?.collectableid}
						cardInfo={{
							name: randomChosen.name,
							id: randomChosen?.collectableid,
							link: randomChosen.link,
						}}
						thumbnail={randomChosen.thumbnail}
						additionalInfo={{ yearpublished: randomChosen.yearpublished }}
					/>
				</div>
			)}
		</div>
	);
};

export default GetRandomGame;
