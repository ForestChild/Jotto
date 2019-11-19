import React, { Component } from 'react';
import './App.css';
import { connect } from "react-redux";


import GuessedWords from "./GuessedWords";
import Congrats from "./Congrats";
import Input from "./Input";
import { getSecretWord } from "./actions";
import { SecretWordDisplay } from "./SecretWordDisplay";

export class UnconnectedApp extends Component {

  componentDidMount() {
    this.props.getSecretWord();
  }

  render() {
    const { success, guessedWords, secretWord, hasGivenUp } = this.props;
    return (
      <div className="container">
       <h1>Jotto</h1>
       <Congrats success={success} />
       <Input />
       <GuessedWords guessedWords={guessedWords} />
       <SecretWordDisplay success={success} hasGivenUp={hasGivenUp} secretWord={secretWord} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { success, guessedWords, secretWord, hasGivenUp } = state;
  return { success, guessedWords, secretWord, hasGivenUp };
}
export default connect(mapStateToProps, {getSecretWord})(UnconnectedApp);
