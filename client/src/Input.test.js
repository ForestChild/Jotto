import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr, storeFactory } from "../test/testUtils";
import Input, { UnconnectedInput } from "./Input";


/**
*factory function to create shallow wrapper for Input component
*@function setup
*@param {object} initialState - initial state for this setup
*@returns {shallowWrapper}
*/
const setup = (initialState={}) => {
	const store = storeFactory(initialState);
	const wrapper = shallow(<Input store={store} />).dive().dive();
	return wrapper;
}

describe("render", () => {
	describe("word has not been guessed", () => {
		let wrapper;
		beforeEach(() => {
			const initialState = { success: false };
			wrapper = setup(initialState);
		})
		test("renders component without error", () => {
			const component = findByTestAttr(wrapper, "component-input");
			expect(component.length).toBe(1);
		});
		test("renders input box", () => {
			const inputBox = findByTestAttr(wrapper, "input-box");
			expect(inputBox.length).toBe(1);
		});
		test("renders submit button", () => {
			const submitButton = findByTestAttr(wrapper, "submit-button");
			expect(submitButton.length).toBe(1);
		});
		test("does not render give up button if there are 0 guesses", () => {
			const initialState = { success: false, guessedWords: []};
			const wrapper = setup(initialState);
			const giveUpButton = findByTestAttr(wrapper, "give-up-button");
			expect(giveUpButton.length).toBe(0);
		});
		test("renders give up button if there is more than 1 guess", () => {
			const initialState = { success: false, guessedWords: [{guessedWord: "train", letterMatchCount: 3}]};
			const wrapper = setup(initialState);
			const giveUpButton = findByTestAttr(wrapper, "give-up-button");
			expect(giveUpButton.length).toBe(1);
		});
	});

	describe("secret word has been guessed correctly", () => {
		let wrapper;
		beforeEach(() => {
			const initialState = { success: true };
			wrapper = setup(initialState);
		})
		test("renders component without error", () => {
			const component = findByTestAttr(wrapper, "component-input");
			expect(component.length).toBe(1);
		});
		test("renders new word button", () => {
			const newWordButton = findByTestAttr(wrapper, "new-word-button");
			expect(newWordButton.length).toBe(1);
		});
		test("does not render input box", () => {
			const inputBox = findByTestAttr(wrapper, "input-box");
			expect(inputBox.length).toBe(0);
		});
		test("does not render submit button", () => {
			const submitButton = findByTestAttr(wrapper, "submit-button");
			expect(submitButton.length).toBe(0);
		});
		test("does not render give up button", () => {
			const giveUpButton = findByTestAttr(wrapper, "give-up-button");
			expect(giveUpButton.length).toBe(0);
		});
	});
});
describe("redux props", () => {
	test("has success piece of state as a prop", () => {
		const success = true;
		const wrapper = setup({ success });
		const successProp = wrapper.instance().props.success;
		expect(successProp).toBe(success);
	});
	test("guessWord action creator is a function prop", () => {
		const wrapper = setup();
		const guessWordProp = wrapper.instance().props.guessWord;
		expect(guessWordProp).toBeInstanceOf(Function);
	});
	test("has guessedWords piece of state as a prop", () => {
		const guessedWords = [{ guessedWord: "train", letterMatchCount: 3}];
		const wrapper = setup({guessedWords});
		const guessedWordsProp = wrapper.instance().props.guessedWords;
		expect(guessedWordsProp).toBe(guessedWords);
	})
	test("has hasGivenUp piece of state as a prop", () => {
		const hasGivenUp = false;
		const wrapper = setup({ hasGivenUp });
		const hasGivenUpProp = wrapper.instance().props.hasGivenUp;
		expect(hasGivenUpProp).toBe(hasGivenUp);
	});
});

describe("guessWord action creator tests", () => {
	let guessWordMock;
	let wrapper;
	const guessedWord = "train";
	beforeEach(() => {
		//create mock action creator and construct mock prop object
		guessWordMock = jest.fn();

		//create shallow wrapper
		wrapper = shallow(<UnconnectedInput guessWord={guessWordMock} />);

		//add value to input box
		wrapper.setState({ currentGuess: guessedWord })
		//find submit button by test attribute and simulate click
		const submitButton = findByTestAttr(wrapper, "submit-button");
		submitButton.simulate("click", { preventDefault() {}});
	});

	test("guessWord is called correctly", () => {
		const guessWordMockCallCount = guessWordMock.mock.calls.length;
		expect(guessWordMockCallCount).toBe(1);
	});

	test("guessWord receives input value as argument(guessedWord)", () => {
		const guessWordArg = guessWordMock.mock.calls[0][0];
		expect(guessWordArg).toBe(guessedWord);
	});

	test("Input box is set to empty after entering a guess", () => {
		expect(wrapper.state("currentGuess")).toBe("");
	});
});

describe("giveUp action creator tests", () => {
	test("giveUp is called correctly", () => {
		const giveUpMock = jest.fn();
		const guessedWords = [{guessedWord: "train", letterMatchCount: 3}];
		const wrapper = shallow(<UnconnectedInput giveUp={giveUpMock} guessedWords={guessedWords} />);
		const giveUpButton = findByTestAttr(wrapper, "give-up-button");
		giveUpButton.simulate("click", { preventDefault() {}});
		const giveUpCallCount = giveUpMock.mock.calls.length;
		expect(giveUpCallCount).toBe(1);
	});
	
});

describe("getSecretWord action creator tests", () => {
	test("new word button calls getSecretWord and giveUp correctly", () => {
		const getSecretWordMock = jest.fn();
		const success = true;
		const wrapper = shallow(<UnconnectedInput getSecretWord={getSecretWordMock} success={success} />);
		const newWordButton = findByTestAttr(wrapper, "new-word-button");
		newWordButton.simulate("click", { preventDefault() {}});
		const getSecretWordMockCallCount = getSecretWordMock.mock.calls.length;
		expect(getSecretWordMockCallCount).toBe(1);
	});
});
