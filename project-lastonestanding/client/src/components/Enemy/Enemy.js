import "aframe";
import React, { Component } from "react";

class Enemy extends Component {
  render() {
    const animation =
      "property: scale; dur: " +
      this.props.speed +
      "; easing: easeInSine; to: 6 6 6";

    return (
      <a-entity
        geometry="primitive: sphere; radius: 0.5; segmentsWidth: {this.props.width}; segmentsHeight: {this.props.height};"
        material="color: #404040; shader: standard; roughness: 1;"
        position={this.props.location}
        animation__scale={animation}
        id={this.props.value}
        class="enemySphere"
      ></a-entity>
    );
  }
}

export default Enemy;
