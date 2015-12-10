'use strict';

import createStore from './createStore';
import instrumentJSON from 'json!../json/instruments';

//
// private data
//
let map;

//
// init(), resets store to its default state
//
let init = function() {
  // create an object map using instrument symbol as key
  map = instrumentJSON.reduce((obj, item) => {
    obj[item.id] = {
      desc: item.desc,
      type: item.type,
      price: item.price
    };
    return obj;
  }, {});
};
init();

//
// create the store api i.e. all the getters
//
let instrumentStore = createStore({

  init: () => init(),

  getAll: () => map

});

module.exports = instrumentStore;
