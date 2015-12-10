'use strict';

import createAction from './createAction';

module.exports = createAction({

  PORTFOLIO_ADD_POSITION: function(symbol) {
    this.dispatch({
      symbol: symbol
    });
  },

  PORTFOLIO_DELETE_POSITION: function(symbol) {
    this.dispatch({
      symbol: symbol
    });
  },

  PORTFOLIO_CHANGE_QUANTITY: function(symbol, quantity) {
    this.dispatch({
      symbol: symbol,
      quantity: quantity
    });
  }

});
