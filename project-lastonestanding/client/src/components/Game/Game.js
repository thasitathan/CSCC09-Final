import 'aframe';
import React, { Component } from 'react';

import Enemy from '../Enemy/Enemy.js';
import Bullet from '../Bullet/Bullet.js';
import './Game.css'

import bg from '../../images/bg.jpg';

class Game extends Component {

  constructor() {
    super();
    this.state = {
      unspawnedEnemies: [
        { location: "-3 4 -2", width: 5, height: 20 }, { location: "-1.6 4 -2.75", width: 18, height: 36 },
        { location: "0 4 -3", width: 5, height: 36 }, { location: "1.6 4 -2.75", width: 5, height: 36 },
        { location: "3 4 -2", width: 5, height: 36 }, { location: "-4 2 -2", width: 5, height: 20 },
        { location: "-3 2 -3", width: 18, height: 36 }, { location: "-1.6 2 -3.75", width: 5, height: 20 },
        { location: "0 2 -4", width: 5, height: 20 }, { location: "1.6 2 -3.75", width: 5, height: 20 },
        { location: "3 2 -3", width: 5, height: 36 }, { location: "4 2 -2" }, { location: "-4 0 -2", width: 5, height: 20 },
        { location: "-3 0 -3", width: 5, height: 20 }, { location: "-1.6 0 -3.75", width: 18, height: 36 },
        { location: "0 0 -4", width: 5, height: 36 }, { location: "1.6 0 -3.75", width: 18, height: 36 },
        { location: "3 0 -3" }, { location: "4 0 -2", width: 18, height: 36 }, { location: "-3 -2 -2", width: 18, height: 36 },
        { location: "-1.6 -2 -2.75", width: 5, height: 36 }, { location: "0 -2 -3", width: 5, height: 36 },
        { location: "1.6 -2 -2.75", width: 18, height: 36 }, { location: "3 -2 -2", width: 5, height: 36 }
      ],
      enemies: [],
      enemiesAdded: false,
      enemySpeed: 2500,
      points: 0,
      wave: 0,
      bullets: [{ location: "0 1 -1" }],
    };
    this.addEnemy = this.addEnemy.bind(this);
  }

  componentDidMount() {
    let ascene = document.getElementById('ascene');
    ascene.addEventListener('mousedown', function (e) {
      // adds a bullet object on each click event
      let cur = document.getElementById('acursor');
      // pulls the direction of the click using raycaster
      let direction = (cur.components.raycaster.raycaster.ray.direction.x * 10) +
        " " + ((cur.components.raycaster.raycaster.ray.direction.y * 10) + 2.4) +
        " " + (cur.components.raycaster.raycaster.ray.direction.z * 10);
      this.addBullet(direction);
    }.bind(this));
  }

  componentDidUpdate() {
    if (this.props.visibility === "visible") {

      // Reset everything
      if (this.props.restartGame) {

        // Move all enemies back to unspawnedEnemies
        for (var i = 0; i < this.state.enemies.length; i++) {
          this.state.unspawnedEnemies.push(this.state.enemies[i]);
          this.state.enemies.splice(i, 1);
          i--;
        }

        // Reset enemy speed and score
        this.setState({
          enemies: this.state.enemies,
          unspawnedEnemies: this.state.unspawnedEnemies,
          enemySpeed: 3000,
          points: 0,
          wave: 0
        });

        this.props.restarted();

        // Update only when new enemies are added
      } else if (this.state.enemiesAdded) {

        // Get all enemies
        var enemies = document.querySelectorAll('.enemySphere');
        enemies.forEach(function (enemy) {

          // Add Click event on killing enemy
          enemy.addEventListener('mousedown', function (e) {
            this.setState({
              points: this.state.points + 1
            });
            if ((this.state.points / 10) >= Math.pow(2, this.state.wave)) {
              this.setState({
                wave: this.state.wave + 1
              });
            }
            this.removeEnemy(e.target.id);
          }.bind(this));

          // Add animation complete when enemy hits player
          enemy.addEventListener('animationcomplete', function (e) {
            document.querySelector('a-scene').exitVR();
            this.props.openEndGameModal(this.state.points);
          }.bind(this));

        }.bind(this));

        this.setState({
          enemiesAdded: false,
          enemySpeed: this.state.enemySpeed - 10
        });

        // Add enemy when all enemy are killed
      } else if (this.state.enemies.length === 0) {
        this.addEnemy();
      }
    }
  }

  addEnemy() {
    // adds an enemy object to the enemies array which is then rendered into
    // an enemy object on screen
    var i;
    var randomI;
    var e;
    for (i = 0; i <= this.state.wave; i++) {
      randomI = Math.floor(Math.random() * this.state.unspawnedEnemies.length);
      e = this.state.unspawnedEnemies.splice(randomI, 1);
      this.state.enemies.push(e[0]);
    }
    this.setState({
      enemies: this.state.enemies,
      unspawnedEnemies: this.state.unspawnedEnemies,
      enemiesAdded: true
    });
  }

  removeEnemy(index) {
    // removes an enemy object from the enemies array and adds it back to
    // unspawnedEnemies array which removes it from the screen when page renders
    const e = this.state.enemies.splice(index, 1);
    this.state.unspawnedEnemies.push(e[0]);
    this.setState({
      enemies: this.state.enemies,
      unspawnedEnemies: this.state.unspawnedEnemies
    });
  }

  addBullet(dir) {
    // adds a bullet object to bullet array which is then rendered to screen
    // dir is the direction bullet will travel
    this.state.bullets.push({ location: dir });
    this.setState({
      enemies: this.state.enemies,
      unspawnedEnemies: this.state.unspawnedEnemies
    });
  }

  render() {
    return (
      <div className="gameMain" style={{ visibility: this.props.visibility }}>
        <a-scene id="ascene">
          <a-assets>
            <img id="bg" src={bg} alt="bg"></img>
          </a-assets>

          <a-camera id="cam">
            <a-cursor id="acursor"
              position="0 0 -1"
              color="red">
            </a-cursor>
          </a-camera>
          {this.state.enemies.map((enemy, i) => {
            return (
              <Enemy key={i} location={enemy.location} value={i} speed={this.state.enemySpeed} width={enemy.width} height={enemy.height}></Enemy>
            )
          })}

          {this.state.bullets.map((bullet, i) => {
            return (
              <Bullet class="bullet" dynamic-body key={i} location={bullet.location} value={i} speed={this.state.enemySpeed}></Bullet>
            )
          })}

          <a-sky id="asky" src="#bg"></a-sky>
        </a-scene>

        <div className="overLay">
          <h1 className="points">Score: {this.state.points}</h1>
        </div>
      </div>
    );
  }
}
export default Game;
