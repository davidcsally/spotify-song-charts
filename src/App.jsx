
import axios from 'axios';
import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Slider from 'material-ui/Slider';
import Button from './Button';
import SongList from './SongList';
// import './App.css';

class App extends Component {
  /** App Constructor */
  constructor() {
    super();

    this.state = {
      numItems: 0, // init to zero
      data: [],
      buttonStates: [true, false, false, false, false],
    };

    // BIND all the functions
    this.getGlobal = this.getGlobal.bind(this);
    this.getUS = this.getUS.bind(this);
    this.getJapan = this.getJapan.bind(this);
    this.getArgentina = this.getArgentina.bind(this);
    this.sliderHandler = this.sliderHandler.bind(this);
    this.buttonStateHandler = this.buttonStateHandler.bind(this);
  }

  /**
   * componentDidMount() - this code is executed when the component
   * is first added to the screen
   * 
   */
  componentWillMount() {
    this.getGlobal();
    this.setState({ numItems: 10 });
  }

  getGlobal() {
    axios.get('/spotGlobal')
      .then((response) => {
        this.setState({ data: response.data });
      })
      .catch((error) => {
        console.log('ERROR: ');
        console.log(error);
      });
  }

  getJapan() {
    axios.get('/spotJapan')
      .then((response) => {
        this.setState({ data: response.data });
      })
      .catch((error) => {
        console.log('ERROR: ');
        console.log(error);
      });
  }

  getArgentina() {
    axios.get('/spotArgentina')
      .then((response) => {
        this.setState({ data: response.data });
      })
      .catch((error) => {
        console.log('ERROR: ');
        console.log(error);
      });
  }

  getUS() {
    axios.get('/spotUS')
      .then((response) => {
        this.setState({ data: response.data });
      })
      .catch((error) => {
        console.log('ERROR: ');
        console.log(error);
      });
  }

  /** Manage slider values */
  sliderHandler(value) {
    console.log(`value: ${value}`);
    this.setState({
      numItems: value,
    });
  }

  /** Manage button states, and which buttons are active */
  buttonStateHandler(index) {
    const buttonStates = [false, false, false, false, false];
    buttonStates[index] = true;
    this.setState({ buttonStates });
  }

  /**
  * renderButton() - Generate a button
  * @param {string} text 
  * @param {int} key 
  * @param {function} action 
  * @param {function} stateAction 
  * @param {bool} isActive 
  * @param {int} index 
  */
  renderButton(text, key, action, stateAction, isActive, index) {
    return (<Button
      key={key}
      text={text}
      action={action}
      stateAction={stateAction}
      isActive={isActive}
      index={index}
    />);
  }
  /**
   * Render() - presents the App to the screen
   * 
   */
  render() {
    const global = this.renderButton('Global', 0, this.getGlobal, this.buttonStateHandler, this.state.buttonStates[0], 0);

    const unitedstates = this.renderButton('  US  ', 1, this.getUS, this.buttonStateHandler, this.state.buttonStates[1], 1);

    const japan = this.renderButton('Japan', 2, this.getJapan, this.buttonStateHandler, this.state.buttonStates[2], 2);

    const argentina = this.renderButton('Argentina', 3, this.getArgentina, this.buttonStateHandler, this.state.buttonStates[3], 3);

    return (
      <div className="App">
        <h1> SPOTIFY TOP SONGS </h1>
        <br />
        {global}
        {unitedstates}
        {japan}
        {argentina}
        <MuiThemeProvider>
          <div style={{ width: '50%', margin: '0 auto' }}>
            <Slider
              defaultValue={10}
              step={1}
              max={20}
              {...this.state}
              onChange={(event, value) => this.sliderHandler(value)}
            />
          </div>
        </MuiThemeProvider>
        <SongList nodes={this.state.data} numItems={this.state.numItems} />
      </div>
    );
  }
}

export default App;
