import React, { Component } from "react";
import { connect } from "react-redux";
import { guessWord, giveUp, getSecretWord } from "./actions";

export class UnconnectedInput extends Component {
	constructor(props) {
		super(props);
		this.state = { currentGuess: "" };
		this.onSubmitClick = this.onSubmitClick.bind(this);
		this.onGiveUpClick = this.onGiveUpClick.bind(this);
		this.onGetNewWordClick = this.onGetNewWordClick.bind(this);
	}

	onSubmitClick = (e) => {
		e.preventDefault();
		const guessedWord = this.state.currentGuess;

		if(guessedWord && guessedWord.length > 0) {
		this.props.guessWord(guessedWord);
		this.setState({ currentGuess: "" });
		}
	};

	onGiveUpClick = (e) => {
		e.preventDefault();
		this.props.giveUp(true);
	}

	onGetNewWordClick = (e) => {
		e.preventDefault();
		this.props.getSecretWord();
	}

	render() {
		const giveUpButton = (this.props.guessedWords && this.props.guessedWords.length > 0) ? 
		 	 	<button
		 	 		data-test="give-up-button"
		 	 		onClick={(e) => this.onGiveUpClick(e)}
		 	 		className="btn btn-danger mb-2 giveUpButton">
		 	 		give up
		 	 	</button> : (null);

		const newWordButton = 
			<button
				data-test="new-word-button"
				onClick={(e) => this.onGetNewWordClick(e)}
				className="btn btn-danger mb-2 newWordButton">
				new word
			</button>

		const contents = (this.props.success || this.props.hasGivenUp)
		 ? newWordButton
		 : (
		 	
		 	<form className="form-inline" >
		 	<div className="formInputLayoutControl">
		 	 <input
		 	 	data-test="input-box"
		 	 	className="mb-2 mx-sm-3 form-control"
		 	 	type="text"
		 	 	value={this.state.currentGuess}
		 	 	onChange={(e) => this.setState({currentGuess: e.target.value})}
		 	 	placeholder="enter guess" />
		 	 	
		 	 <button
		 	 	data-test="submit-button"
		 	 	onClick={(e) => this.onSubmitClick(e)}
		 	 	className="btn btn-primary mb-2 submitButton"
		 	 	type="submit">
		 	 	submit
		 	 </button>
		 	 {giveUpButton}
		 	 </div>
		 	</form>

		 )
		return (
			<div data-test="component-input" className="formControlGroup">
				{ contents }
			</div>
			)

	}
};

const mapStateToProps = (state) => {
	const { success, guessedWords, hasGivenUp } = state;
	return { success, guessedWords, hasGivenUp };
};

export default connect(mapStateToProps, { guessWord, giveUp, getSecretWord })(UnconnectedInput);