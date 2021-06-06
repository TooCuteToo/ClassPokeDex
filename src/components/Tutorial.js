import React from 'react';
import './Tutorial.scss';

class Tutorial extends React.Component {
	constructor() {
		super();
		this.state = {
			slideIndex: 1,
			slideTotal: 3
		}
	}

	// run close function when click close btn
	handleCick = () => {
		this.props.closeMe();
	}

	// to change the current slider 
	handleSlider = (n) => {
		let {slideIndex} = this.state;
		const prevIndex = slideIndex;
		this.setState({
			slideIndex: this.state.slideIndex + n
		}, () => this.showSlider(prevIndex));
	}

	// show the current slider 
	showSlider(prevIndex) {
		let {slideIndex} = this.state;
		if (slideIndex < 1) 
			slideIndex = this.state.slideTotal;
		else if (slideIndex > this.state.slideTotal)
			slideIndex = 1;
		this.setState({
			slideIndex: slideIndex
		}, () => {
			const prevSlide = document.getElementById(`${prevIndex}`);
			const slider = document.getElementById(`${this.state.slideIndex}`);
			prevSlide.style.display = 'none';
			slider.style.display = 'block';
		})
	}

	render() {
		return (
			<div className='tutorial'>
				<span className="close-btn" onClick={this.handleCick}><i className="fas fa-window-close"></i></span>
			
				<div className="slider-container">
					<div className="slider" id="1" style={{display: 'block'}}>
						<h1>Welcome</h1>
						<p>
							Pokedex is a device is used for identifying  a pokemon. This website is
							a responsive, quick pokedex. It'll help you to identify all pokemon
							around the world.
						</p>
						<img src="https://miro.medium.com/max/800/1*cNYyujXNYHoxPTY6m85Wjw.png"/>
					</div>

					<div className="slider" id="2">
						<h1>Welcome</h1>
						<p>
							You can learn more about pokemon's type and it's appearence.
						</p>
						<img
						src="https://vignette.wikia.nocookie.net/pokemon/images/8/8c/PokemonTypes.png/revision/latest?cb=20170417193722"/>
					</div>

					<div className="slider" id="3">
						<h1>Welcome</h1>
						<p>
							Also you can learn about pokemon's detail stats
						</p>
						<img src="https://pokeassistant.com/assets/thumbs/pokeStats-0347e24ac4f46a48e4745daea2ecf73182eeebbc0746411b2f752329be238aed.png/"/>
					</div>
					
					<span className="next" onClick={() => this.handleSlider(1)}>
						<i className="fas fa-angle-right">
					</i></span>
					<span className="prev" onClick={() => this.handleSlider(-1)}>
						<i className="fas fa-angle-left">
					</i></span>
				</div>
			</div> 
		)
	}

}

export default Tutorial;