import { combineReducers } from "redux";
import success from "./successReducer";
import guessedWords from "./guessedWordsReducer";
import secretWord from "./secretWordReducer";
import hasGivenUp from "./giveUpReducer";

export default combineReducers({
	success,
	guessedWords,
	secretWord,
	hasGivenUp
});
