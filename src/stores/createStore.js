'use strict';

import events from 'events';
import Dispatcher from './dispatcher';
const CHANGE_EVENT = 'change';

let createStore = function(store = {}) {

  // attach on/off functions to the public store api
  let emitter = new events.EventEmitter();
  store.on = emitter.addListener.bind(emitter, CHANGE_EVENT);
  store.off = emitter.removeListener.bind(emitter, CHANGE_EVENT);
  // but the emit function is encapsulated within the store
  // so that views/components dont start triggering changes by
  // accident.

  store.register = (callbacks = {}) => {
    store.dispatchToken = Dispatcher.register(function(action = {}) {
      if (!action.actionType) {
        throw new Error('action.type was not supplied');
      }
      // invoke callback if it exists
      let cb = callbacks[action.actionType];
      if (cb) {
        // a callback exists, so call it passing the payload!
        cb.call(store, action, Dispatcher);
        // a callback was called so trigger a change event on this store!
        emitter.emit(CHANGE_EVENT);
      }
    });
  };

  return store;
};


module.exports = createStore;
