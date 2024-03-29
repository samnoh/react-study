// https://reactjs-kr.firebaseapp.com/docs/lifting-state-up.html
import React from 'react';

function BoilingVerdict(props) {
	if (props.celsius >= 100) {
		return <p>The water would boil.</p>;
	}
	return <p>The water would not boil.</p>;
}

class TemperatureInput extends React.Component {
	constructor(props) {
		super(props);
	}
    
	handleChange(e) {
		this.props.onTemperatureChange(e.target.value);
	}
    
	render() {
		const temperature = this.props.temperature;
		const scale = this.props.scale;
		const scaleNames = {
			c: 'Celsius',
			f: 'Fahrenheit',
		};
        
		return ( // <fieldset> is rectangle field that you can put texts inside
			<fieldset>
				<legend>Enter temperature in {scaleNames[scale]}:</legend>
				<input
					value={temperature}
					onChange={(e) => this.handleChange(e)} />
				<BoilingVerdict
					celsius={parseFloat(temperature)} />
			</fieldset>
		);
	}
}
function toCelsius(fahrenheit) {
	return (fahrenheit - 32) * 5 / 9;
}
  
function toFahrenheit(celsius) {
	return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
	const input = parseFloat(temperature);
	if (Number.isNaN(input)) {
		return '';
	}
	const output = convert(input);
	const rounded = Math.round(output * 1000) / 1000;
    
	return rounded.toString();
}

class Calculator extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			scale: 'c',
			temperature: '',
		};
		this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
		this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
	}
    
	handleCelsiusChange(temperature) {
		this.setState({
			scale: 'c', 
			temperature: temperature,
		});
	}

	handleFahrenheitChange(temperature) {
		this.setState({
			scale: 'f', 
			temperature: temperature,
		});
	}

	render() {
		const scale = this.state.scale;
		const temperature = this.state.temperature;
		const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
		const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

		return (
			<div>
				<TemperatureInput scale='c' temperature={celsius} onTemperatureChange={this.handleCelsiusChange}/>
				<TemperatureInput scale='f' temperature={fahrenheit} onTemperatureChange={this.handleFahrenheitChange} />
			</div>
		);
	}
}

export default Calculator;