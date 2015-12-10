'use strict';

var Node = function(node, parent, options) {
  this.data = node;
  this.parent = parent || null;
  this.level = options.level || 0;
  this.index = options.index || 0;
  this.children = [];
  this.descendants = [];
  this.color = options.color || null;
  this.start = Math.max(0, options.start || 0);
  this.end = Math.min(1, options.end || 0);
  this.drift = options.drift;
  this.driftStart = options.driftStart;
  this.driftEnd = options.driftEnd;
  this.actual = options.actual;
};

let walkDown = function(fn, node) {
  node.children.forEach((child) => {
    fn(child);
    walkDown(fn, child);
  });
};

Node.prototype.adjustTarget = function(step) {
  let siblings = this.parent.children.filter((c) => c !== this);
  let previousTarget = this.data.target;
  let newTarget = Math.min(
      Math.max(0.01, this.data.target + step),
      this.parent.data.target
  );

  // change target of this node
  let adjustedTarget = newTarget - previousTarget;

  // prorate the change in target across all siblings of this node
  let adjusted = 0;
  siblings.forEach((node) => {
    let adjustAmount = -adjustedTarget / siblings.length;
    if (node.data.target + adjustAmount < 0.01) {
      adjustAmount = 0.01 - node.data.target;
    }
    adjusted += adjustAmount;
    let adjustModifier = (adjustAmount / node.data.target) + 1;
    node.setTarget(adjustModifier);
  });

  this.setTarget( ((-adjusted) / previousTarget) + 1 );
};

Node.prototype.setTarget = function(adjustBy) {
  // adjust target by a percentage modifier
  this.data.target *= adjustBy;

  // adjust target for each descendant
  walkDown((child) => {
      child.setTarget(adjustBy);
  }, this);

  // update start & end values for all siblings and descendants
  walkDown((child) => {
    child.start = child.parent.children
      .slice(0, child.index) // all nodes before this one
      .reduce((initial, n) => initial + n.data.target, child.parent.start); //
    child.end = child.start + child.data.target;
  }, this.parent);

};


module.exports = Node;