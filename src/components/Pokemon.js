import React from 'react';
import {PokeList, SelectList, Navigation} from './export';

class Pokemon extends React.Component {
	constructor() {
		super();
		this.state = {
			showApokemon:	false,
			startAmount:  1,
			endAmount: 	  50,
			randomPoke:   null,
			showList: 		true,
			pokemon:			[]
		}
	}

	// Lay gia tri pokemon can render tu SelectList
	getPokeAmount = (startAmount, endAmount) => {
		this.setState({
			showApokemon:	false,
			startAmount:  startAmount,
			endAmount: 	  endAmount
		});
	}

	getPokeName = (pokemon) => {
		this.setState({
			showApokemon:	false,
			showList: true,
			pokemon: pokemon
		});
	}

	getRandomPoke = () => {
		this.setState({
			showApokemon:	true,
			showList: false,
			randomPoke: Math.round(Math.random() * 200)
		});
	}

	showPokeList = () =>{
		this.setState({
			showApokemon:	false,
			showList: true
		});
	}

  render() {
    return (
    	<div>
    		<Navigation getPokeName={this.getPokeName} getRandomPoke={this.getRandomPoke} showList={this.showPokeList}/>
    		<main>
	     		<h1>PokeDex</h1>
	     		{this.state.showList ? <SelectList getPokeAmount={this.getPokeAmount} /> : null}
	     		<PokeList showApokemon={this.state.showApokemon}
	     		name={this.state.pokemon} startAmount={this.state.startAmount}
	     		endAmount={this.state.endAmount} randomPoke={this.state.randomPoke}/>
	     	</main>
     	</div>
    )
  }
}

export default Pokemon;
