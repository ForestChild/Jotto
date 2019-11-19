import { shallow } from "enzyme";
import React from "react";
import { findByTestAttr } from "../test/testUtils";
import { GiveUpButton } from "./GiveUpButton";


const setup = (initialState={}) => {
	const wrapper = shallow(<GiveUpButton state={initialState} />);
	return wrapper;
};

test("renders when there is at least 1 guessed word", () => {
	const state = { guessedWords: [{ guessedWord: "train", letterMatchCount: 3}]}
	const wrapper = setup();

});