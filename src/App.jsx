import axios from 'axios';
import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Slider from 'material-ui/Slider';
import Button from './Button';
import SongList from './SongList/SongList';
import './index.css';

const Buttons = {
  Global: 'Global',
  Japan: 'Japan',
  Argentina: 'Argentina',
  US: '  US  ',
};

const Routes = {
  global: '/songs/global',
  japan: '/songs/japan',
  argentina: '/songs/argentina',
  us: '/songs/us',
};

/**
* renderButton() - Generate a button
*/
const renderButton = (title, apiFunc, stateAction, isActive, index, route) => (
  <Button
    title={title}
    apiFunc={apiFunc}
    stateAction={stateAction}
    isActive={isActive}
    index={index}
    route={route}
  />
);

class App extends Component {
  /** App Constructor */
  constructor() {
    super();

    this.state = {
      numItems: 10,
      data: [],
      buttonStates: [true, false, false, false, false],
    };
    this.fetchAPI(Routes.global);
  }

  fetchAPI = (route) => {
    axios.get(route)
      .then(res => this.setState({ data: res.data }))
      .catch(err => console.log('ERROR: ', err));
  }

  /** Manage slider values */
  sliderHandler = (value) => {
    this.setState({
      numItems: value,
    });
  }

  /** Manage button states, and which buttons are active */
  buttonStateHandler = (index) => {
    const buttonStates = [false, false, false, false, false];
    buttonStates[index] = true;
    this.setState({ buttonStates });
  }

  render() {
    const global = renderButton(Buttons.Global, this.fetchAPI, this.buttonStateHandler, this.state.buttonStates[0], 0, Routes.global);
    const unitedstates = renderButton(Buttons.US, this.fetchAPI, this.buttonStateHandler, this.state.buttonStates[1], 1, Routes.us);
    const japan = renderButton(Buttons.Japan, this.fetchAPI, this.buttonStateHandler, this.state.buttonStates[2], 2, Routes.japan);
    const argentina = renderButton(Buttons.Argentina, this.fetchAPI, this.buttonStateHandler, this.state.buttonStates[3], 3, Routes.argentina);

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
