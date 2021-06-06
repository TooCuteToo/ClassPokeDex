import React from 'react';
import './SelectList.scss';

class SelectList extends React.PureComponent {
	constructor() {
		super();
		this.state = {
			startAmount: 1,
			endAmount: 50
		}
	}

	// Click de cap nhat gia tri pokemon can render
	handleClick = (e) => {
		let startAmount = this.state.startAmount;
		let endAmount = this.state.endAmount;
		if (e.target.innerText === '1-50') {
			startAmount = 1;
			endAmount = 50;
		} else if (e.target.innerText === '51-100') {
			startAmount = 51;
			endAmount = 100;
		} else if (e.target.innerText === '101-150') {
			startAmount = 101;
			endAmount = 150;
		} else if (e.target.innerText === '151-200') {
			startAmount = 151;
			endAmount = 200;
		}
		console.log(endAmount);
		this.setState({
			startAmount: startAmount,
			endAmount:   endAmount
		}, () => this.props.getPokeAmount(this.state.startAmount, this.state.endAmount));
	}

	render() {
		return (
			<div className="container"> 
				<button className="skewBtn purple" onClick={(e) => this.handleClick(e)}>1-50</button>
				<button className="skewBtn blue" onClick={(e) => this.handleClick(e)}>51-100</button>
				<button className="skewBtn lorange" onClick={(e) => this.handleClick(e)}>101-150</button>
				<button className="skewBtn brick" onClick={(e) => this.handleClick(e)}>151-200</button>
			</div>
		)
	}
}

export default SelectList;