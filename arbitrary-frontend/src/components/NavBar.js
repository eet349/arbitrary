import React from 'react';

const NavBar = () => {
	const navLinkArray = ['home', 'collection', 'register', 'random'];
	const renderNavLinks = () => {
		return navLinkArray.map((link) => {
			return (
				<li className='navlink' key={link}>
					<a href={`/${link}`}>{link.toUpperCase()}</a>
				</li>
			);
		});
	};

	return (
		<div>
			<nav>
				<ul className='navlink-container'>{renderNavLinks()}</ul>
			</nav>
		</div>
	);
};

export default NavBar;
