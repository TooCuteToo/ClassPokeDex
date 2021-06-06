import React from 'react';
import './Preload.scss';

class Preload extends React.Component {
	constructor() {
		super();
		this.state = {
			isLoading: true
		}
	}

	timer = setTimeout(() => {
			this.setState({
				isLoading: false
			})
	}, 5000);

	render() {
		return (
			<div className="loader-container">
				<div className="loader">Loading...</div>
			</div>
		)
	}
}

export default Preload;