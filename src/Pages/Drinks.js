import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default class Drinks extends Component {
  render() {
    const { history } = this.props;

    return (
      <div>
        <Header pageTitle="Drinks" showSearch history={ history } />
        <h1>Bebidas</h1>
        <Footer />
      </div>
    );
  }
}

Drinks.propTypes = {
  history: PropTypes.shape({}).isRequired,
};
