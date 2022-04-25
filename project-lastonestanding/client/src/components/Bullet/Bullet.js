import 'aframe';
import React, { Component } from 'react';

class Bullet extends Component {
  render() {
    const ani_pos = "property: position; dur: 300; easing: easeInSine; to: " + this.props.location + ";";
    const ani_scale = "property: scale; dur: 300; easing: easeOutSine; to: 0.0 0.0 0.0;";

    return (
      <a-entity
        geometry="primitive: sphere; radius: 0.5;"
        material="color: red; shader: standard; roughness: 1;"
        position="0 1 0"
        scale="0.2 0.2 0.2"
        animation__position={ani_pos}
        animation__scale={ani_scale}
        id={this.props.value}
        class="bullet">
      </a-entity>
    );
  }
}

export default Bullet;
