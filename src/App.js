import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Slider from 'material-ui/Slider'; 

import Button from './Button.jsx'
import SongList from './SongList.jsx'

class App extends Component {

  constructor() {
    super();
    this.state = {
      numItems: 0,  // init to zero
      data: [
        // {
        //   artist: 'adele',
        //   track: 'hello',
        //   url: 'https://open.spotify.com/track/2rb5MvYT7ZIxbKW5hfcHx8',
        //   img: 'https://i.scdn.co/image/cbf7b701bcecc01f9be17f6ff54dd7fdffcef269',
        // }
      ],
      buttonStates: [true, false, false, false, false],
    };
    this.getGlobal = this.getGlobal.bind(this);
    this.getUS = this.getUS.bind(this);
    this.getJapan = this.getJapan.bind(this);
    this.getArgentina = this.getArgentina.bind(this);
    this.handler = this.handler.bind(this);
    this.buttonStateHandler = this.buttonStateHandler.bind(this);
  }

  buttonStateHandler(index) {
    let buttonStates = [false, false, false, false, false];
    buttonStates[index] = true;
    this.setState({ buttonStates })
  }

  handler(value) {
    console.log(`value: ${value}`);
    this.setState({
      numItems: value
    })
  }

  getGlobal() {
    axios.get('/spotGlobal')
    .then((response) => {
      // console.log('*****************');
      // console.log(response.data);
      this.setState({data: response.data});
    })
    .catch((error) => {
      // console.log('ERROR: ');
      // console.log(error);
    });
  }

  getSongs() {
    axios.get('spot').then((props) => {
      const country = (props.country) ? props.country : null;
      axios.get('spotify.com/country', params: {
        country: country
      });
    });
  }

  getJapan() {
    axios.get('/spotJapan')
    .then((response) => {
      // console.log('*****************');
      // console.log(response.data);
      this.setState({data: response.data});
    })
    .catch((error) => {
      // console.log('ERROR: ');
      // console.log(error);
    });
  }

  getArgentina() {
    axios.get('/spotArgentina')
    .then((response) => {
      // console.log('*****************');
      // console.log(response.data);
      this.setState({data: response.data});
    })
    .catch((error) => {
      // console.log('ERROR: ');
      // console.log(error);
    });
  }

  getUS() {
    axios.get('/spotUS')
    .then((response) => {
      // console.log('*****************');
      // console.log(response.data);
      console.log('setting state...')
      this.setState({data: response.data});
    })
    .catch((error) => {
      // console.log('ERROR: ');
      // console.log(error);
    });
  }

  /**
   * componentDidMount() - this code is executed when the component
   * is first added to the screen
   * 
   */
  componentDidMount() {
    this.getGlobal()
    this.setState({numItems: 10});
  }

  /**
   * Render() - presents the App to the screen
   * 
   */
  render() {
    let global = this.renderButton('Global', 0, this.getGlobal, this.buttonStateHandler, this.state.buttonStates[0], 0);
    
    let unitedstates = this.renderButton('  US  ', 1, this.getUS, this.buttonStateHandler, this.state.buttonStates[1], 1);
    
    let japan = this.renderButton('Japan', 2, this.getJapan, this.buttonStateHandler, this.state.buttonStates[2], 2);
    
    let argentina = this.renderButton('Argentina', 3, this.getArgentina, this.buttonStateHandler, this.state.buttonStates[3], 3);
    
    return (
      <div className="App">
        <h1> SPOTIFY TOP SONGS </h1>
        <br/>
        {global}
        {unitedstates}
        {japan}
        {argentina}
        <MuiThemeProvider>
          <div style={{width: '50%', margin: '0 auto'}}>
            <Slider
              defaultValue={01}
              step={1}
              max={20}
              {...this.state}
              onChange={(event, value) => this.handler(value)}
            />
          </div>
        </MuiThemeProvider>
        <SongList nodes={this.state.data} numItems={this.state.numItems} />
      </div>
    );
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
    return <Button key={key} text={text} action={action} stateAction={stateAction} isActive={isActive} index={index} />
  }
}

export default App;
