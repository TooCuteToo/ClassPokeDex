import React from 'react';
import {Tutorial, Apokemon, Poke, Preload} from './export';
import './PokeList.scss';
import axios from 'axios';

class PokeList extends React.Component {
	constructor() {
		super();
		// Trang thai cua app 
		// So luong poke can show va mang chua du lieu cua poke
		this.state = {
			showApokemon:	false,
			tutorial: 	  true,
			startAmount:  1,
			endAmount: 	  50,
			pokemon: 		  [],
			apokemon:		  [],
			poke_type: {
				bug: 			'#C6D16E',
				dragon: 	'#A27DFA',
				electric: '#FAE078',
				fire: 		'#F5AC78',
				fairy: 		'#F4BDC9',
				flying: 	'#C6B7F5',
				fighting: '#D67873',
				grass: 		'#A7DB8D',
				ground: 	'#EBD69D',
				normal: 	'#C6C6A7',
				poison: 	'#C183C1',	
				psychic: 	'#FA92B2',
				rock: 		'#D1C17D',
				water: 		'#9DB7F5'
			}
		}
	}

	// This function is save poke list to local storage 
	savePokemon(pokemon) {
		return localStorage.setItem('pokemon', JSON.stringify(pokemon));
	}

	// Get the poke from local storage and put it to array 
	setUpPokemon(pokemon_store) {
		const pokemon = [];
		for (let i = this.state.startAmount - 1; i < this.state.endAmount; i++)
			pokemon.push(pokemon_store[i]);
		return pokemon;
	}

	// Ham fetch single pokemon tu api 
	async fetchPokemon(id) {
		// Fetch api de lay du lieu cua 1 pokemon theo id
		const pokeApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
		// Cap nhat du lieu sang Json
		const {data} = pokeApi;
		const pokemonInfo = {
			id : data.id,
			name : data.name,
			type : data.types.map(type => type.type.name),
			stats : data.stats.map(stat => ({
				name: stat.stat.name, 
				base_stat: stat.base_stat
			}))
		};
		return pokemonInfo;
	}

	// Ham async tra ve promise
	// Ham fetch danh sach pokemon tu api va save vao local storage 
	async getPokemon() {
		const poke_store = [];
		// So luong pokemon can fetch (do id bat dau tu 1)
		for (let i = 1; i <= 200; i++) {
			// Doi den khi poke duoc tra ve
			const pokemon = await this.fetchPokemon(i);
			// Push vao trong mang chua
			poke_store.push(pokemon);
			if (poke_store.length >= 50)
				this.setState({pokemon: this.setUpPokemon(poke_store)});
			// Tra ve promise mang pokemon
			this.savePokemon(poke_store);
		}
	}

	// Khi component dc render xong thi thuc hien fetch data
	componentDidMount() {
		// Kiem tra xem co local ko neu ko thi fetch data
		if (!localStorage.getItem('pokemon'))
			this.getPokemon();
		// Neu local da ton tai thi lay du lieu tu local
		else {
			const pokemon_store = JSON.parse(localStorage.getItem('pokemon'));
			this.setState({pokemon: this.setUpPokemon(pokemon_store)});
		}
	}

	// When props is updated, it will run to render jsx
	componentDidUpdate(prevProps) {
		const pokemon_store = JSON.parse(localStorage.getItem('pokemon'));
	  // Typical usage (don't forget to compare props):
	  // Dieu kien dung cua update 
	  // Tranh de bi infinite loops
	  if (this.props.endAmount !== prevProps.endAmount) {
	    this.setState({
	    	startAmount: this.props.startAmount,
	    	endAmount: 	 this.props.endAmount,
	    	showApokemon: false
	    }, () => this.setState({pokemon: this.setUpPokemon(pokemon_store)}));
	  } 
	  // when prop is updated it will change showApokemon state 
	  if (this.props.showApokemon !== prevProps.showApokemon)
	  	this.setState({
	  		showApokemon: false,
	  		apokemon: []
	  	});
	  if (this.props.name !== prevProps.name) {
	  	this.setState({
	  		showApokemon: false,
	  		pokemon: this.props.name
	  	}, () => {
	  		if (this.state.pokemon.length > 50)
	  			this.setState({pokemon: this.setUpPokemon(pokemon_store)});
	  	});
	  } 
	  if (this.props.randomPoke !== prevProps.randomPoke)
	  	this.setState({
	  		showApokemon: true,
	  		apokemon: pokemon_store[this.props.randomPoke]
	  	});
	}

	// Kiem tra trang thai tutorial va tra ve className
	isActive = () => this.state.tutorial ? "poke-container transparentBG" : "poke-container";

	// check to know when to show a pokemon 
	isApokemon = () => !this.state.showApokemon ? "" : "apoke-container";

	// close the tutorial when click close btn 
	handleChildUnmount = () => {
		// Set tutorial de unmount component
		this.setState({
			tutorial: false
		})
	}

	// get color of the pokemon and show it 
	getColor(poke) {
		const typeKey = Object.keys(this.state.poke_type);
		const type = typeKey.find(type => poke.type.indexOf(type) >= 0);
		const color = this.state.poke_type[type]; 
		return color;
	}

	// get color of a single pokemon and show it
	getColorApokemon(poke) {
		const typeKey = Object.keys(this.state.poke_type);
		const type = typeKey.filter(type => poke.type.indexOf(type) >= 0);
		const color = type.map(type => this.state.poke_type[type]);
		return color;
	}

	// show the pokemon list 
	showPokemon(pokemon) {
		return (
			<div className={this.isActive()}>
				{pokemon.map(poke => <Poke key={poke.id} poke={poke}
				color={this.getColor(poke)}/>)}
			</div>
		) 
	}

	// show a single pokemon 
	showApokemon(apokemon) {
		return apokemon ? <Apokemon key={apokemon.id} poke={apokemon}
		color={this.getColorApokemon(apokemon)} showPokeByType={this.showPokeByType}
		/> : null
	}

	// show pokemon by type when user click to the type button 
	showPokeByType = (type) => {
		let pokemon = JSON.parse(localStorage.getItem('pokemon'));
		pokemon = pokemon.filter(pokemon => pokemon.type.includes(type));
		this.setState({
			showApokemon: false,
			pokemon: 		  pokemon
		});
	}

	render() {
		const {pokemon, apokemon} = this.state;
		if (pokemon.length >= 0) {
			return (
				<div className={this.isApokemon()}>
					{this.state.tutorial ? <Tutorial closeMe={this.handleChildUnmount}/> : null}
					{this.state.showApokemon ? this.showApokemon(apokemon) : this.showPokemon(pokemon)}
				</div>
			)
		} else
			return <Preload />
	}
}

export default PokeList;