import './GetRandomGame.css';
import { fakeGames } from '../../utils/FakeGames';
import React, { useState } from 'react';
import StyledCards from '../StyledCards/StyledCards';
import '../StyledCards/StyledCardContainer.css';

const GetRandomGame = () => {
	const [randomChosen, setRandomChosen] = useState({});
	const [filteredGames, setFilteredGames] = useState(fakeGames);

	const renderGames = () => {
		return filteredGames.map((game) => {
			return (
				<StyledCards
					key={game._attributes.id}
					cardInfo={{ name: game.name, id: game._attributes.id }}
					thumbnail={game.thumbnail._text}
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

		newFilteredGames = fakeGames.filter((game) => {
			let minPlayersInt = parseInt(game.minplayers);
			let maxPlayersInt = parseInt(game.maxplayers);
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
			<h2>Get Random Game</h2>
			<select name='numplayers' onChange={(e) => handlePlayerChange(e)}>
				<option value=''>Players</option>
				{generatePlayerOptions()}
			</select>
			<div className='styled-card-container'>{renderGames()}</div>
			<button onClick={handleRandomClick}>Random</button>
			{randomChosen && (
				<StyledCards
					key={randomChosen?._attributes?.id}
					cardInfo={{
						name: randomChosen.name,
						id: randomChosen?._attributes?.id,
					}}
					thumbnail={randomChosen.thumbnail?._text}
				/>
			)}
		</div>
	);
};

export default GetRandomGame;
