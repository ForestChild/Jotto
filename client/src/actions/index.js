import axios from "axios";
import { getLetterMatchCount } from "../helpers";

export const actionTypes = {
	CORRECT_GUESS: "CORRECT_GUESS",
	GUESS_WORD: "GUESS_WORD",
	RESET_GUESSED_WORDS: "RESET_GUESSED_WORDS",
	GIVE_UP: "GIVE_UP",
	SET_SECRET_WORD: "SET_SECRET_WORD"
};

/**
*Returns redux thunk function that dispatches GUESS_WORD action
*and (conditionally) CORRECT_GUESS action
*@function guessWord
*@param {string} guessedWord - Guessed word
*@returns {function} - Redux thunk function
*/
export const guessWord = (guessedWord) => {
	return function(dispatch, getState) {
		const secretWord = getState().secretWord
		const letterMatchCount = getLetterMatchCount(guessedWord, secretWord);

		dispatch({
			type: actionTypes.GUESS_WORD,
			payload: { guessedWord, letterMatchCount }
		});

		if(guessedWord === secretWord) {
			dispatch({ type: actionTypes.CORRECT_GUESS });
		}
	};
};

export const getSecretWord = () => {
	return (dispatch) => {
		return axios.get("http://localhost:3030")
			.then(response => {
				dispatch({
					type: actionTypes.SET_SECRET_WORD,
					payload: response.data
				});
				//hasGivenUp is set to false because we only get a secret word if we are starting a new game
				dispatch({
					type:actionTypes.GIVE_UP,
					payload: false
				});
				//resets the table of guessed words
				dispatch({
					type: actionTypes.RESET_GUESSED_WORDS
				})
			});
	}
}

export const giveUp = (state=false) => {
	//state should either be true or false, toggles whether or not the user has forfeit
	return { 
		type: actionTypes.GIVE_UP,
		payload: state
		};
}