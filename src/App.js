import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Slider from 'material-ui/Slider';
// import getMuiTheme from 'material-ui'

class Button extends React.Component {
  render() {
    return (
      <div className="btn btn-lg main" onClick={() => {this.props.action()}}>
        {this.props.text}
      </div>
    )
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
    // map through items
    console.log('mapping...')
    console.log(nodes);

    let listNode = [];
    console.log(nodes);

    for (let i = 0; i < numItems; i++) {
      console.log(`artist: ${nodes[i].artist}  track: ${nodes[i].track}`);
      listNode.push(<ListItem className="list-group" artist={nodes[i].artist} track={nodes[i].track} index={i} key={i} url={nodes[i].url} img={nodes[i].img} />);
    }
    
    return ( <ul className="list-group" style={{marginTop:'30px'}}>{listNode}</ul> );  

    // console.log(nodes);
    // let counter = 0;  
    // const listNode = nodes.map((item) => {
    //   // console.log(`artist: ${item.artist}  track: ${item.track}`);
    //   counter++;
    //   return (<ListItem className="list-group" artist={item.artist} track={item.track} index={counter} key={counter} />);
    // });

    // return (
    //   <ul className="list-group" style={{marginTop:'30px'}}>{listNode}</ul>
    // );
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
      //   {
      //   artist: 'adele',
      //   track: 'hello',
      //   url: 'https://open.spotify.com/track/2rb5MvYT7ZIxbKW5hfcHx8',
      //   img: 'https://i.scdn.co/image/cbf7b701bcecc01f9be17f6ff54dd7fdffcef269',
      // }
      ],
    };
    this.getGlobal = this.getGlobal.bind(this);
    this.getUS = this.getUS.bind(this);
    this.getJapan = this.getJapan.bind(this);
    this.getArgentina = this.getArgentina.bind(this);
    this.handler = this.handler.bind(this);
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
      console.log('*****************');
      console.log(response.data);
      this.setState({data: response.data});
    })
    .catch((error) => {
      console.log('ERROR: ');
      console.log(error);
    });
  }

  getJapan() {
    axios.get('/spotJapan')
    .then((response) => {
      console.log('*****************');
      console.log(response.data);
      this.setState({data: response.data});
    })
    .catch((error) => {
      console.log('ERROR: ');
      console.log(error);
    });
  }

  getArgentina() {
    axios.get('/spotArgentina')
    .then((response) => {
      console.log('*****************');
      console.log(response.data);
      this.setState({data: response.data});
    })
    .catch((error) => {
      console.log('ERROR: ');
      console.log(error);
    });
  }

  getUS() {
    axios.get('/spotUS')
    .then((response) => {
      console.log('*****************');
      console.log(response.data);
      this.setState({data: response.data});
    })
    .catch((error) => {
      console.log('ERROR: ');
      console.log(error);
    });
  }


  componentDidMount() {
    this.getGlobal();    
  }

  render() {
    let global = this.renderButton('Global', 0, this.getGlobal);
    let unitedstates = this.renderButton('  US  ', 1, this.getUS);
    let japan = this.renderButton('Japan', 2, this.getJapan);
    let argentina = this.renderButton('Argentina', 3, this.getArgentina);
    
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

  renderButton(text, key, action) {
    return <Button key={key} text={text} action={action}/>
  }
}

export default App;
