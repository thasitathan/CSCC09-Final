import React, { Component } from 'react';

import UserModal from './components/UserModal/UserModal';
import EndGameModal from './components/EndGameModal/EndGameModal';
import Game from './components/Game/Game';

import { Provider } from 'react-redux';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';

import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      userModalvisible : false,
      endGameModalvisible : false,
      name : '',
      points : 0,
      home : "visible",
      game : "hidden",
      restartGame : false
    };
  }

  openUserModal() {
    this.setState({
        userModalvisible : true
    });
  }

  closeUserModal() {
    this.setState({
      userModalvisible : false
    });
  }

  openEndGameModal(points) {
    this.setState({
      endGameModalvisible : true,
      points : points
    });
  }

  closeEndGameModal() {
    this.setState({
      endGameModalvisible : false
    });
  }

  saveName(newName) {
    this.setState({
      name : ' ' + newName
    });
  }

  play() {
    this.setState({
      home : "hidden",
      game : "visible",
      restartGame : true
    });
  }

  restarted() {
    this.setState({
      restartGame : false
    });
  }

  home() {
    this.setState({
      home : "visible",
      game : "hidden"
    });
  }

  render() {
    return (
      <Provider store = {store}>
        <Game
          visibility = {this.state.game}
          openEndGameModal = {this.openEndGameModal.bind(this)}
          restartGame = {this.state.restartGame}
          restarted = {this.restarted.bind(this)}
        ></Game>
        <div style = {{visibility: this.state.home}} className="App">
          <h1>Last One Standing</h1>
          <h3> Welcome! {this.state.name} </h3>
          <Button
            color = 'dark'
            size = "lg"
            stype = {{marginBottom: '2rem'}}
            onClick = {() => this.openUserModal()}
          >Change Name</Button>

          <Button
            color = 'dark' 
            size = "lg"
            stype = {{marginBottom: '2rem'}}
            onClick = {() => this.play()}
          >Let's Play!</Button>

          <UserModal
            visible = {this.state.userModalvisible}
            closeModal = {this.closeUserModal.bind(this)}
            saveName = {this.saveName.bind(this)}/>

          <EndGameModal
            visible = {this.state.endGameModalvisible}
            closeModal = {this.closeEndGameModal.bind(this)}
            name = {this.state.name}
            points = {this.state.points}
            home = {this.home.bind(this)}
            play = {this.play.bind(this)}/>
        </div>
      </Provider>
    );
  }
}

export default App;
