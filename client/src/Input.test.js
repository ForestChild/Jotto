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
	});
	describe("word has been guessed", () => {
		let wrapper;
		beforeEach(() => {
			const initialState = { success: true };
			wrapper = setup(initialState);
		})
		test("renders component without error", () => {
			const component = findByTestAttr(wrapper, "component-input");
			expect(component.length).toBe(1);
		});
		test("does not render input box", () => {
			const inputBox = findByTestAttr(wrapper, "input-box");
			expect(inputBox.length).toBe(0);
		});
		test("does not render submit button", () => {
			const submitButton = findByTestAttr(wrapper, "submit-button");
			expect(submitButton.length).toBe(0);
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
});

describe("guessWord action creator tests", () => {
	let guessWordMock;
	let wrapper;
	const guessedWord = "train";
	beforeEach(() => {
		//create mock action creator and construct mock prop object
		guessWordMock = jest.fn();
		//const props = { guessWord: guessWordMock };

		//create shallow wrapper
		wrapper = shallow(<UnconnectedInput guessWord={guessWordMock} />);

		//add value to input box
		wrapper.setState({ currentGuess: guessedWord })
		//find submit button by test attribute and simulate click
		const submitButton = findByTestAttr(wrapper, "submit-button");
		submitButton.simulate("click", { preventDefault() {}});
	});

	test("guessWord is called correctly", () => {
		//wrapper.instance().onSubmitClick();
		const guessWordMockCallCount = guessWordMock.mock.calls.length;
		expect(guessWordMockCallCount).toBe(1);
	});

	test("guessWord receives input value as argument(guessedWord)", () => {
		const guessWordArg = guessWordMock.mock.calls[0][0];
		console.log(guessWordMock.mock);
		expect(guessWordArg).toBe(guessedWord);
	});
});