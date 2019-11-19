import { actionTypes } from "../actions";

export default (state=false, action) => {
	switch(action.type) {
		case actionTypes.GIVE_UP:
			return action.payload;
		default:
			return state;

	}
}