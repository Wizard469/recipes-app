import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default class Drinks extends Component {
  render() {
    return (
      <div>
        <Header pageTitle="Drinks" showSearch />
        <h1>Bebidas</h1>
        <Footer />
      </div>
    );
  }
}
