import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default class Comidas extends Component {
  render() {
    const { history } = this.props;

    return (
      <div>
        <Header pageTitle="Foods" showSearch history={ history } />
        <h1>Comidas</h1>
        <Footer />
      </div>
    );
  }
}

Comidas.propTypes = {
  history: PropTypes.shape({}).isRequired,
};
