/**
*@method getLetterMatchCount
*@param{string} guessedWord - guessed word.
*@param{string} secretWord - secret word.
*@returns{number} - Number of letters matched between guessed word and secret word
*/

export function getLetterMatchCount(guessedWord, secretWord) {
	const secretWordSet = new Set(secretWord.split(''));
	const guessedWordSet = new Set(guessedWord.split(''));
	return [...secretWordSet].filter(letter => guessedWordSet.has(letter)).length;

}