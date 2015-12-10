'use strict';

import React from 'react';
import d3 from 'd3';
import ModelActions from '../../stores/model.actions';


module.exports = React.createClass({

  handleClick: function() {
    ModelActions.SELECT_NODE.fire(this.props.node);
  },

  render: function() {
    let {color, start, end, index, innerRadius, outerRadius} = this.props;
    // radian helper functions
    let boundRadians = (deg) =>
      Math.max(0, Math.min(2 * Math.PI, deg));
    let scaleToRadians = d3.scale.linear()
        .range([0, 2 * Math.PI]);
    // create svg path data using the d3 helper function for creating an arc.
    let arc = d3.svg.arc()
      .startAngle(boundRadians(scaleToRadians(start)))
      .endAngle(boundRadians(scaleToRadians(end)))
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);
    return (
      <g>
        <path
          className={this.props.className}
          key={index}
          fill={color}
          d={arc()}
          onClick={this.handleClick}
        >
        </path>
      </g>
    );
  }

});
