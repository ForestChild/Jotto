import React from "react";
import PropTypes from "prop-types";

export const SecretWordDisplay = ({success, hasGivenUp, secretWord}) => {
	if(success || hasGivenUp ){
	return (<div data-test="secret-word-display-div">
		Secret Word: {secretWord}
	</div>)
	} else {
	return null
	}
};

SecretWordDisplay.propTypes = {
	success: PropTypes.bool.isRequired,
	hasGivenUp: PropTypes.bool.isRequired,
	secretWord: PropTypes.string
}

SecretWordDisplay.defaultProps = {
	success: false,
	hasGivenUp: false,
	secretWord: ""
}