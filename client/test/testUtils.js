import checkPropTypes from "check-prop-types";
import { createStore } from "redux";

import rootReducer from "../src/reducers";

/**
*function factory to create dummy store for testing connected components
*Globals: rootReducers
*@function storeFactory
*@param {object} initialState - initial state of store
*@returns {Store} - redux store
*/
export const storeFactory = (initialState) => {
	return createStore(rootReducer, initialState);
}

/**
*Return node(s) with the given data-test attribute
*@param {ShalloWrapper} wrapper - Enzyme shallow wrapper
*@param {string} val - Value of data-test attribute for search
*@returns {ShalloWrapper}
*/

export const findByTestAttr = (wrapper, val) => {
	return wrapper.find(`[data-test="${val}"]`)
}

export const checkProps = (component, conformingProps) => {
	const propError = checkPropTypes(
		component.propTypes,
		conformingProps,
		'prop',
		component.name
	 )
	expect(propError).toBeUndefined();
}