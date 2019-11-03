import checkPropTypes from "check-prop-types";
import { createStore, applyMiddleware } from "redux";

import rootReducer from "../src/reducers";
import { middlewares } from "../src/configureStore";

/**
*function factory to create dummy store for testing connected components
*Globals: rootReducers, middlewares
*@function storeFactory
*@param {object} initialState - initial state of store
*@returns {Store} - redux store
*/
export const storeFactory = (initialState) => {
	const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore)
	return createStoreWithMiddleware(rootReducer, initialState);
	

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