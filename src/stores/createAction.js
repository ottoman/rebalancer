'use strict';

import Action from './action';

let Actions = {};

let createAction = function(callbacks) {
  Object.keys(callbacks).forEach((actionType) => {
    let cb = callbacks[actionType];
    // keep a global list of action types so we can check
    // for name conflicts and throw errors
    if (Actions[actionType]) {
      throw new Error('actionType: ' + actionType + ' already exists');
    }
    Actions[actionType] = true;
    // finally, return an action object
    callbacks[actionType] = new Action(actionType, cb);
  });
  return callbacks;
};


module.exports = createAction;
