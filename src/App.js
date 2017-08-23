import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Slider from 'material-ui/Slider';
// import getMuiTheme from 'material-ui'

class Button extends React.Component {

  // constructor() {
  //   super();
  //   this.state = {
  //     active: false,
  //     bgColor: '#55A96C',
  //   }
  //   this.buttonHandler = this.buttonHandler.bind(this);
  // }

  // buttonHandler() {
  //   if (this.state.active === false) this.setState({ active: true, bgColor: '#178736' });
  //   else this.setState({ active: false, bgColor: '#55A96C' });
  // }

  render() {

    if (this.props.isActive) {
      console.log('active')
      return (
        <div className="btn btn-lg main-active"
        onClick={() => {
          this.props.action()
          this.props.stateAction(this.props.index)
        }}
        >
          {this.props.text}
        </div>
      )    
    }

    else {
      console.log('in active')      
      return (
        <div className="btn btn-lg main"
        onClick={() => {
          this.props.action()
          this.props.stateAction(this.props.index)
        }}
        >
          {this.props.text}
        </div>
      )    
    }
  }
}

// Each listItem
const ListItem = ({artist, track, url, img, index}) => {
  return (
    <li className="list-group-item">
      <span>{index+1}</span>
      <a href={url}>
        <img src={img} alt="thumbnail" />
      </a>
      <span>{track}  -</span> <strong>{artist}</strong>
    </li>
  );
}

const TodoList = ({nodes, numItems}) => {
  if (nodes.length > 0) {
    // console.log('mapping...')
    let listNode = [];

    for (let i = 0; i < numItems; i++) {
      // console.log(`artist: ${nodes[i].artist}  track: ${nodes[i].track}`);
      listNode.push(<ListItem className="list-group" artist={nodes[i].artist} track={nodes[i].track} index={i} key={i} url={nodes[i].url} img={nodes[i].img} />);
    }
    
    return ( <ul className="list-group" style={{marginTop:'30px'}}>{listNode}</ul> );  
  }

  else {
    return (<ul className="list-group" style={{marginTop:'30px'}}></ul>)
  }
}

class App extends Component {

  constructor() {
    super();
    this.state = {
      numItems: 10,
      selectedRegion: 'global',
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
    console.log(`#buttonStateHandler:  ${index}`)
    let buttonStates = [false, false, false, false, false];
    buttonStates[index] = true;
    console.log(`states: ${buttonStates}`)
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
      this.setState({data: response.data});
    })
    .catch((error) => {
      // console.log('ERROR: ');
      // console.log(error);
    });
  }


  componentDidMount() {
    this.getGlobal();    
  }

  render() {
    let global = this.renderButton('Global', 0, this.getGlobal, this.buttonStateHandler, this.state.buttonStates[0], 0);
    
    let unitedstates = this.renderButton('  US  ', 1, this.getUS, this.buttonStateHandler, this.state.buttonStates[1], 1);
    
    let japan = this.renderButton('Japan', 2, this.getJapan, this.buttonStateHandler, this.state.buttonStates[2], 2);
    
    let argentina = this.renderButton('Argentina', 3, this.getArgentina, this.buttonStateHandler, this.state.buttonStates[3], 3);
    
    return (
      <div className="App">
        <h1> SPOTIFY TOP SONGS </h1>
        {global}
        {unitedstates}
        {japan}
        {argentina}
        <MuiThemeProvider>
          <div style={{width: '50%', margin: '0 auto'}}>
            <Slider
              defaultValue={10}
              step={1}
              max={20}
              {...this.state}
              onChange={(event, value) => this.handler(value)}
            />
          </div>
        </MuiThemeProvider>

        <TodoList
          nodes={this.state.data} numItems={this.state.numItems}
        />

      </div>
    );
  }

  renderButton(text, key, action, stateAction, isActive, index) {
    return <Button key={key} text={text} action={action} stateAction={stateAction} isActive={isActive} index={index} />
  }
}

export default App;
