import './App.css';
import { Component } from 'react';
import Header from "./Header/header";
import Content from './Content/content';

export default class App extends Component {
  render () {
    return (
      <div className="App">
        <Header />
        <Content />
        <div>
          
        </div>
      </div>
    );
  }
}

