import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default class Comidas extends Component {
  render() {
    return (
      <div>
        <Header pageTitle="Foods" showSearch />
        <h1>Comidas</h1>
        <Footer />
      </div>
    );
  }
}
