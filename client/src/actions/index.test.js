import moxios from "moxios";
import { storeFactory } from "../../test/testUtils";
import { getSecretWord } from "./";

describe("getSecretWord action creator", () => {
	beforeEach(() => {
		moxios.install();
	})
	afterEach(() => {
		moxios.uninstall();
	});
	test("adds response word to state", () => {
		const store = storeFactory();
		const secretWord = "party";
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 200,
				response: secretWord
			});
		});
		return store.dispatch(getSecretWord()).then(() => {
		const newState = store.getState();
		expect(newState.secretWord).toBe(secretWord);
		});
	});
	test("sets guessed words to []", () => {
		const initialState = {guessedWords: [{guessedWord: "train", letterMatchCount: 3}]};
		const store = storeFactory(initialState);
		const secretWord = "party";
		//in this test we are not concerned with the moxios request, but we must reply with a reponse.
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 200,
				response: secretWord
			});
		});
		return store.dispatch(getSecretWord()).then(() => {
			const newState = store.getState();
			expect(newState.guessedWords).toEqual([]);
		});
	});
});