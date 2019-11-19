import React from "react";
import PropTypes from "prop-types";
import { GuessCounter } from "./GuessCounter";

const GuessedWords = (props) => {
	let contents;

	if(props.guessedWords.length === 0 ) {
		contents = (
			<span data-test="guess-instructions">
			Try to guess the secret word!
			</span>
		)
	} else {
		const guessedWordsRows = props.guessedWords.map((word, index) => (
			<tr data-test="guessed-word" key={index}>
				<td>{index +1}</td>
				<td>{word.guessedWord}</td>
				<td>{word.letterMatchCount}</td>
			</tr>
		))
		contents = (
			<div className="tableContainer" data-test="guessed-words">
				<h3 id="guessedWords">Guessed Words</h3>
				<table className="table table-bordered table-striped mb-0">
					<thead className="thead-light">
						<tr><th>Guess #</th><th>Guess</th><th>Matching Letters</th></tr>
					</thead>
					<tbody>
						{ guessedWordsRows }
					</tbody>
				</table>
			</div>
		)
	}
	return (
		<div data-test="component-guessed-words" >
			{contents}
			<GuessCounter guessedWords={props.guessedWords} />
		</div>
	);
};

GuessedWords.propTypes = {
	guessedWords: PropTypes.arrayOf(
		PropTypes.shape({
			guessedWord: PropTypes.string.isRequired,
			letterMatchCount: PropTypes.number.isRequired
		})
	).isRequired
};

export default GuessedWords;