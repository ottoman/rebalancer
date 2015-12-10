'use strict';

import React from 'react';
import d3 from 'd3';
import Arc from './Arc.jsx';

// Given a depth and percentage, this function will calculate
// a list of scaling multipliers that - when applied to a list
// levels - gradually shrink or grow and sum up to the total.
let distributeRadius = (depth = 2, sizeFactor = 0.625) => {
  // create an empty array with a size of depth
  var arr = Array.apply(null, {length: depth});

  // Calculate sizeFactor ^ level for each level and
  // sum these together.
  var factor = arr.reduce(
    (initial, value, index) =>
      initial + Math.pow(sizeFactor, index), 0
  );
  // This gives us a scaling factor that can be used to
  // resize any radius based on it level.
  return arr.map((value, i) =>
    (1 / factor) * Math.pow(sizeFactor, i)
  );
};

module.exports = React.createClass({

  name: 'RadialTreepMap',

  propTypes: {
   hierarchy: React.PropTypes.object.isRequired
  },

  getDefaultProps: () => {
    return {
      shrinkEachLevelBy: 0.625,
      width: 200,
      height: 200,
      shiftSelectedArcBy: 12
    };
  },

  calcRadiuses: function(hierarchy) {
    // find the node with the highest level in order to find out the depth of the tree.
    let depth = Math.max.apply(Math, hierarchy.descendants.map((o) => o.level));
    // calculate the radius for each level in the hierarchy
    let totalRadius = (Math.min(this.props.width, this.props.height) -40) / 2;
    // divide the total Radius into a list of level radius that shrink
    // proportionally when further away from the center. This way the
    // donuts in the radial chart will get smaller and smaller in a deep
    // hierarchy.
    let distribution = distributeRadius(depth, this.props.shrinkEachLevelBy)
      .map((d) => d * totalRadius);
    let sum = (d, initial) => initial + d;
    let radiuses = distribution.map((d, i) => {
      return {
        from: distribution.slice(0, i).reduce(sum, 0),
        to: distribution.slice(0, i+1).reduce(sum, 0)
      };
    });
    return radiuses;
  },

  transformSelectedArc: function(node) {
    let transform;
    if (node === this.props.selectedNode) {
      let angle = (Math.PI * 2) * ((node.end + node.start) / 2);
      let distance = this.props.shiftSelectedArcBy;
      let x = Math.round( distance * Math.sin(angle));
      let y = Math.round( -distance * Math.cos(angle));
      transform = {transform: `translate(${ x } , ${ y })`};
    }
    return transform;
  },

  renderDrift(radiuses, node, index) {
    let transformSelection = this.transformSelectedArc(node);
    let arc, color;
    color = node.drift > 0? 'rgba(0, 255, 0, 0.4)' : 'rgba(255, 0, 0, 0.4)';

    if (Math.abs(node.drift) > 0.005) {
      arc = <Arc
        innerRadius={radiuses[node.level-1].from}
        outerRadius={radiuses[node.level-1].to}
        className="arc"
        node={node}
        start={node.driftStart}
        end={node.driftEnd}
        index={index}
        color={color}
      ></Arc>;
    }
    return (
      <g key={index} strokeWidth="1" {...transformSelection}>
        {arc}
        {
          // recursively render each ndoe in the Hierarchy as an <arc/>
          node.children.map(this.renderDrift.bind(this, radiuses))
        }
      </g>
    );
  },

  renderArc: function(radiuses, node, index) {
    let transformSelection = this.transformSelectedArc(node);
    return (
      <g key={index} stroke="#fff" strokeWidth="1" {...transformSelection}>
        <Arc
          innerRadius={radiuses[node.level-1].from}
          outerRadius={radiuses[node.level-1].to}
          className="arc"
          node={node}
          start={node.start}
          end={node.end}
          index={index}
          color={node.color}
        ></Arc>
        {
          // recursively render each ndoe in the Hierarchy as an <arc/>
          node.children.map(this.renderArc.bind(this, radiuses))
        }
      </g>
    );
  },

  render: function() {
    let radiuses = this.calcRadiuses(this.props.hierarchy);
    let {width, height} = this.props;
    let transform = `translate(${ width / 2 } , ${ height / 2 })`;
    return (
      <svg viewBox="0 0 400 400" style={{
        width: '100%',
        display: 'block'
      }} width={width} height={height}>

        <g transform={transform} opacity={this.props.showDrifts? '.4' : '1'}>
          { this.props.hierarchy.children.map(this.renderArc.bind(this, radiuses)) }
        </g>
        <g transform={transform}>
          {
            this.props.showDrifts?
            this.props.hierarchy.children.map(this.renderDrift.bind(this, radiuses)) : null
          }
        </g>

      </svg>
    );
  }

});
