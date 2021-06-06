import React from 'react';
import './Navigation.scss';

class Navigation extends React.PureComponent {
	constructor() {
		super();
		this.state = {
			showMenu: false,
			name:     ""
		}
		this.inputRef = React.createRef();
	}

	// return the value of the search box when user input 
	handleSearch = () => {
		let name = this.inputRef.current.value;
		const pokemon_store = JSON.parse(localStorage.getItem('pokemon'));
		// if (name) {
		// 	this.setState({
		// 		name: name
		// 	}, () => this.props.getPokeName(this.state.name));
		// 	this.inputRef.current.value = '';
		// }
		if (!name)
			this.props.getPokeName(pokemon_store);
		else {
			const poke = pokemon_store.map(pokemon => pokemon.name.search(`${name}`) > -1 ? pokemon : null).filter(pokemon => pokemon !== null);
			this.props.getPokeName(poke);
		}
	}

	// show the menu when user click 
	handleClick = () => {
		this.setState({
			showMenu: !this.state.showMenu
		})
	}

	// show random pokemon when user click 
	handleRandom = () => {
		this.setState({
			showMenu: !this.state.showMenu
		}, () => this.props.getRandomPoke());
		this.props.getPokeName();
	}

	// show the list of pokemon when user click 
	handleList = () => {
		this.setState({
			showMenu: !this.state.showMenu
		}, () => this.props.showList());
		this.props.getPokeName();
	}

	// change the state of the menu when user click 
	isShow = () => this.state.showMenu ? 'menu__list show-menu' : 'menu__list';

	render() {
		return (
			<nav className="menu">
				<ul className={this.isShow()}>
		    	<span className="close-btn" onClick={this.handleClick}><i className="far fa-window-close"></i></span>
		      <div className="link-container">
			      <p>MENU</p>
			      <li className="menu__group" onClick={this.handleRandom}>
			      	<a href="#0" className="menu__link">Random Pokemon</a>
			      </li>
			      <li className="menu__group" onClick={this.handleList}>
			      	<a href="#0" className="menu__link">Pokemon</a>
			      </li>
			      <li className="menu__group"><a href="#0" className="menu__link">Option #3</a></li>
		      </div>
		    </ul>
				<div className="menu-container">
					<span className="burger" onClick={this.handleClick}><i className="fas fa-bars"></i></span>
			    <div className="logo">
						<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/261948/pokeball.png" />
					</div>
			    <div className="search-container">
					  <input type="text" placeholder="Search..." ref={this.inputRef} onChange={this.handleSearch} />
					  <div className="search"></div>
					</div>
				</div>
		  </nav>
		)
	}
}

export default Navigation;