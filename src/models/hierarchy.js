'use strict';

import d3 from 'd3';
import Node from './node';

var colors = [
  '#5da4da', // blue
  '#f4d876', // yellow
  '#da5dad', // pink
  '#da965d', // orange
  '#5ddac8', // teal
  '#9c5dda' // purlpe
];

var colorScale = d3.scale.ordinal()
  .range(colors);

var walkHierarchy = function(node, options, holdings, total) {
  options = options || {};

  let newNode = new Node(node, options.parent, options);

  let childStart = newNode.start;

  newNode.children = (node.children || []).map((child, index, arr) => {

    let adjustedColor = null;
    if (newNode.level === 0) {
      adjustedColor = colorScale(index);
    } else {
      let posInLevel = (index) / arr.length;
      adjustedColor = d3.rgb(newNode.color).brighter(posInLevel);
    }

    // Calculate actual MV and the Drift
    let holding = holdings.filter((h) => h.symbol === child.id)[0];
    let amount = 0, drift = 0, actual = 0;
    if (holding) {
      amount = holding.amount;
    } else {
      amount = holdings
        .filter(function(h) { return h.type === child.id; })
        .reduce((initial, h) => initial + h.amount, 0);
    }
    actual = (amount / total);
    drift = actual - child.target;

    let c = walkHierarchy(child, {
      parent: newNode,
      level: newNode.level + 1,
      index: index,
      start: childStart,
      end: childStart + child.target,
      color: adjustedColor,
      actual: actual,
      drift: drift,
      driftStart: childStart + child.target,
      driftEnd: childStart + child.target - Math.abs(drift)
    }, holdings, total);
    childStart += child.target;

    newNode.descendants = newNode.descendants.concat(c.descendants);
    return c;
  });
  // descendants include all nodes below this one.
  newNode.descendants = newNode.descendants.concat(newNode.children);

  // update and return
  return newNode;
};


var Hierarchy = function(model, holdings, total) {
  return walkHierarchy(model, {}, holdings, total);
};

module.exports = Hierarchy;