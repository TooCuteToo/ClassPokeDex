import React from 'react';
import './Apokemon.scss';

class Apokemon extends React.Component {
	handleClick = (e) => {
		const type = e.target.innerText.toLowerCase();
		this.props.showPokeByType(type);
	}

	// render a pokemon from a list or search or random 
	render() {
		const {id, name, type, stats} = this.props.poke;
		type.sort();
		return (
			<div className="apokemon">
				<div className="img-container">
	      	<img src={`https://pokeres.bastionbot.org/images/pokemon/${id}.png`}
	        alt={name.toUpperCase()}/>
	      </div>
	      <div className="info-container">
	      	<div className="info">
		        <h3 className="name">
		        	{name.toUpperCase()} <span className="number">#{id.toString().padStart(3, '0')}</span>
		        </h3>
		        {this.props.color.map((color, index) => {
		        	return (
		        		<small className="type" style={{background: `${color}`}} onClick={(e) => this.handleClick(e)}>
		        			<span className="type-name">{`${type[index]}`.toUpperCase().split(',')}</span>
		        		</small>
		        	)
		        })}
	      	</div>
      		<div className="stats-info">
	      		{stats.map(stat => <p><strong>{stat.name.toUpperCase()}</strong> 
	      			: {stat.base_stat}</p>)}
      		</div>
	      </div>
	    </div>
		)
	}
}

export default Apokemon;