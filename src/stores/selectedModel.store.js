'use strict';

import createStore from './createStore';
import ModelStore from './model.store';
import Hierarchy from '../models/hierarchy';
import modelActions from './model.actions';
import InstrumentStore from './instrument.store';
import PortfolioStore from './portfolio.store';


//
// private data
//
let selected, hierarchy, selectedNode;

let createHierarchy = () => {
  // calculate market value
  let holdings = PortfolioStore.getSelected().positions.map((p) => {
    let instrument = InstrumentStore.getAll()[p.symbol];
    return {
      symbol: p.symbol,
      type: instrument.type,
      amount: p.qty * instrument.price
    };
  });
  // total MV
  let total = holdings.reduce((initial, item) => initial + item.amount, 0);

  return new Hierarchy(selected, holdings, total);
};


//
// init(), resets store to its default state
//
let init = function() {
  selected = ModelStore.getAll()[0]; // select the first model in list
  hierarchy = createHierarchy();
  selectedNode = hierarchy.children[0];
};
init();

let findNodeWithData = function findNodeWithData(children, data) {
  for (var i = 0; i < children.length; i++) {
    let child = children[i];
    if (child.data === data) {
      return child;
    } else {
      let result = findNodeWithData(child.children, data);
      if (result) {
        return result;
      }
    }
  }
};


//
// create the store api i.e. all the getters
//
let selectedModelStore = createStore({

    get: () => selected,

    getHierarchy: () => hierarchy,

    getSelectedNode: () => selectedNode

});

//
// register the dispatcher callback for muttating store state
//
selectedModelStore.register({

    [modelActions.SELECT_MODEL]: (action) => {
      selected = ModelStore.getAll().filter((o) => o.id === action.id)[0];
      hierarchy = createHierarchy();
      selectedNode = hierarchy.children[0];
    },

    [modelActions.SELECT_NODE]: (action) => {
      selectedNode = action.node;
    },

    [modelActions.CHANGE_TARGET]: (action) => {
      let selectedData = selectedNode.data;
      selectedNode.adjustTarget(action.step);
      hierarchy = createHierarchy();
      selectedNode = findNodeWithData(hierarchy.children, selectedData);
    }

});


module.exports = selectedModelStore;
