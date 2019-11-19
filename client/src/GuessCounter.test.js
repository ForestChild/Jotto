import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, storeFactory, checkProps } from "../test/testUtils";
import { GuessCounter } from "./GuessCounter";

const setup = (initialProps={}) => {
	const wrapper = shallow(<GuessCounter {...initialProps} />);
	return wrapper;
}

test("Renders properly when there is a submitted guess", () => {
	const initialProps = { guessedWords: [{guessedWord: "train", letterMatchCount: 3}]};
	const wrapper = setup(initialProps);
	const displayDiv = findByTestAttr(wrapper, "test-div");
	expect(displayDiv.length).toBe(1);
});

test("renders nothing when there are no guesses", () => {
	const initialProps = { guessedWords: [] };
	const wrapper = setup({...initialProps});
	const displayDiv = findByTestAttr(wrapper, "test-div");
	expect(displayDiv.length).toBe(0);
});

test("does not throw warning with expected props", () => {
	const expectedProps = { guessedWords: [{ guessedWord: "train", letterMatchCount: 3 }]};
	checkProps(GuessCounter, expectedProps);
});