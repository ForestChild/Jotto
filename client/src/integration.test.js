import { storeFactory } from "../test/testUtils";
import { guessWord } from "./actions";
import { UnconnectedApp } from "./App";
import { SecretWordDisplay } from "./SecretWordDisplay";
import { shallow } from "enzyme";
import React from "react";


describe("guessWord action dispatcher", () => {
	const secretWord = "party";
	const unsuccessfulGuess = "train";
	describe("no words guessed", () => {
		let store;
		const initialState = { secretWord };
		beforeEach(() => {
			store = storeFactory(initialState);
		});
		test("updates state correctly for unsuccessful guess", () => {
			store.dispatch(guessWord(unsuccessfulGuess));
			const newState = store.getState();
			const expectedState = {
				...initialState,
				success: false,
				hasGivenUp: false,
				guessedWords: [{
					guessedWord: unsuccessfulGuess,
					letterMatchCount: 3
				}]
			};
			expect(newState).toEqual(expectedState); 
		});
		test("updates state correctly for successful guess", () => {
			store.dispatch(guessWord(secretWord));
			const newState = store.getState();
			const expectedState = {
				...initialState,
				success: true,
				guessedWords: [{
					guessedWord: secretWord,
					letterMatchCount: 5
				}],
				hasGivenUp: false
			};
			expect(newState).toEqual(expectedState);
		});
	});
	describe("some words guessed", () => {
		const guessedWords = [ { guessedWord: "agile", letterMatchCount: 1 } ]
		const initialState = { guessedWords, secretWord };
		let store;
		beforeEach(() => {
			store = storeFactory(initialState);
		})
		test("updates state correctly for unsuccessful guess", () => {
			store.dispatch(guessWord(unsuccessfulGuess));
			const newState = store.getState();
			const expectedState = {
				hasGivenUp: false,
				secretWord,
				success: false,
				guessedWords: [
					...guessedWords, 
					{ guessedWord: unsuccessfulGuess, letterMatchCount: 3 } 
					]
			}
			expect(newState).toEqual(expectedState);
		});
		test("updates state correctly for successful guess", () => {
			store.dispatch(guessWord(secretWord));
			const newState = store.getState();
			const expectedState = {
				secretWord,
				hasGivenUp: false,
				success: true,
				guessedWords: [
					...guessedWords,
					{ guessedWord: secretWord, letterMatchCount: 5 }
				]
			}
			expect(newState).toEqual(expectedState);
		});
	});
});

describe("SecretWordDisplay", () => {
	test("secretWord prop matches secretWord from the store", () => {
		const props = {
			secretWord: "train",
			success: true,
			guessedWords: [{guessedWord: "train", letterMatchCount: 3}]
		};
		const wrapper = shallow(<UnconnectedApp {...props} />);
		expect(wrapper.find(SecretWordDisplay).props().secretWord).toEqual(props.secretWord);
	});
});

