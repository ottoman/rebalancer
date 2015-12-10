'use strict';

import createStore from './createStore';
import jsonModels from 'json!../json/models.json';

//
// create the store api i.e. all the getters
//
let modelStore = createStore({

  getAll: () => jsonModels

});


module.exports = modelStore;
