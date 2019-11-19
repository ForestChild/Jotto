import React from "react";
import PropTypes from "prop-types";

export const GuessCounter = (props) => {

	if(props.guessedWords && props.guessedWords.length>0){
		return (<div data-test="test-div" className="guessCounterDisplay">Number of guesses: {props.guessedWords.length}</div>);
	} else {
		return null
	}
};

GuessCounter.propTypes = {
	guessedWords: PropTypes.arrayOf(
		PropTypes.shape({
			guessedWord: PropTypes.string.isRequired,
			letterMatchCount: PropTypes.number.isRequired
		})
	)
};
