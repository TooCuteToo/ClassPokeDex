import React from 'react';
import './Poke.scss';

class Poke extends React.Component {
	constructor() {
		super();
		this.state = {
			show: false
		}
	} 

	showState = () => {
		this.setState({
			show: !this.state.show
		})
	}

	isActive = () => {
		return this.state.show ? "stats show" : "stats";
	}

	render(props) {
		const {id, name, type, stats} = this.props.poke;
		const backGround = {
			background: this.props.color
		}
		
		return (
			<div className="pokemon" onClick={this.showState} style={backGround}>
				<div className="img-container">
	          <img src={`https://pokeres.bastionbot.org/images/pokemon/${id}.png`}
	          alt={name.toUpperCase()}/>
	      </div>
	      <div className="info">
	        <span className="number">#{id.toString().padStart(3, '0')}</span>
	        <h3 className="name">{name.toUpperCase()}</h3>
	        <small className="type">Type: <span>{`${type}`.split(',').join(', ')}</span></small>
	      </div>
	      <div className={this.isActive()} onClick={this.showState}>
	      	<div className="stats-container-img">
	           <img src={`https://pokeres.bastionbot.org/images/pokemon/${id}.png`}
	          alt={name.toUpperCase()}/>
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

export default Poke;