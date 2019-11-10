import React, { Component } from "react";
import { connect } from "react-redux";
import { guessWord } from "./actions";

export class UnconnectedInput extends Component {
	// constructor(props) {
	// 	super(props);
	// 	this.onSubmitClick.bind(this);
	// }
	// onSubmitClick = (e) => {
	// 	this.props.guessWord();
	// };

	render() {
		const contents = this.props.success
		 ? null
		 : (
		 	<form className="form-inline" >
		 	 <input
		 	 	data-test="input-box"
		 	 	className="mb-2 mx-sm-3"
		 	 	type="text"
		 	 	placeholder="enter guess" />
		 	 <button
		 	 	data-test="submit-button"
		 	 	onClick={() => {this.props.guessWord()}}
		 	 	className="btn btn-primary mb-2"
		 	 	type="submit">
		 	 	submit
		 	 </button>
		 	</form>

		 )
		return (
			<div data-test="component-input">
				{ contents }
				<button />
			</div>
			)

	}
};

const mapStateToProps = ({ success }) => {
	return { success };
};

export default connect(mapStateToProps, { guessWord })(UnconnectedInput);