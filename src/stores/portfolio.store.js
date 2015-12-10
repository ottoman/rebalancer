'use strict';

import createStore from './createStore';
import portfolioActions from './portfolio.actions';
import jsonPortfolios from 'json!../json/portfolios.json';

//
// private data
//
let selected;

//
// init(), resets store to its default state
//
let init = function() {
  selected = jsonPortfolios[0];
};
init();

//
// create the store api i.e. all the getters
//
let portfolioStore = createStore({

  getAll: () => jsonPortfolios,

  getSelected: () => selected,

  symbolExists: (symbol) => {
    let bySymbol = (p) => p.symbol.toLowerCase() === symbol.toLowerCase();
    return selected.positions.filter(bySymbol)[0] !== undefined;
  }

});

//
// register the dispatcher callback for muttating store state
//
portfolioStore.register({

  [portfolioActions.PORTFOLIO_ADD_POSITION]: (action) => {
    let newPosition = {symbol: action.symbol, qty: 0};
    selected.positions = [newPosition].concat(selected.positions);
  },

  [portfolioActions.PORTFOLIO_DELETE_POSITION]: (action) => {
    selected.positions = selected.positions.filter((p) => p.symbol !== action.symbol);
  },

  [portfolioActions.PORTFOLIO_CHANGE_QUANTITY]: (action) => {
    let position = selected.positions.filter((p) => p.symbol === action.symbol)[0];
    position.qty = action.quantity;
  }

});


module.exports = portfolioStore;


