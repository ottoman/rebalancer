'use strict';

import Dispatcher from './dispatcher';

let Action = function (actionType, cb) {
  this.actionType = actionType;
  this.fire = cb.bind(this);
};

Action.prototype.toString = function() {
  return this.actionType;
};

Action.prototype.dispatch = function(params) {
  params.actionType = this.actionType;
  Dispatcher.dispatch(params);
};


module.exports = Action;
