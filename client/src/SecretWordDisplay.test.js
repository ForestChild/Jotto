import { shallow } from "enzyme";
import React from "react";
import { SecretWordDisplay } from "./SecretWordDisplay";
import { findByTestAttr } from "../test/testUtils";


const setup = (props={}) => {
	const wrapper = shallow(<SecretWordDisplay {...props} />);
	return wrapper;
};
// test("renders without error", () => {
// 	const wrapper = setup();
// 	const SecretWordDisplayDiv = findByTestAttr(wrapper, "secret-word-display-div");
// 	expect(SecretWordDisplayDiv.length).toBe(1);
// });

describe("render tests", () => {
	test("renders when success=true", () => {
		const wrapper = setup({success: true});
		const secretWordDisplayDiv = findByTestAttr(wrapper, "secret-word-display-div");
		expect(secretWordDisplayDiv.length).toBe(1);
	});

	test("renders when hasGivenUp=true", () => {
		const wrapper = setup({hasGivenUp: true});
		const secretWordDisplayDiv = findByTestAttr(wrapper, "secret-word-display-div");
		expect(secretWordDisplayDiv.length).toBe(1);
	});

	test("does not render if both success and giveUp are false", () => {
		const props = {giveUp: false, success: false};
		const wrapper = setup({...props});
		const secretWordDisplayDiv = findByTestAttr(wrapper, "secret-word-display-div");
		//console.log(wrapper.debug());
		expect(secretWordDisplayDiv.length).toBe(0);
	});
});

test("receives secretWord as a prop", () => {
	
});
