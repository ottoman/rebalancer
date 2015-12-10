'use strict';

import createAction from './createAction';

module.exports = createAction({

  SELECT_MODEL: function(id) {
    this.dispatch({
      id: id
    });
  },

  SELECT_NODE: function(node) {
    this.dispatch({
      node: node
    });
  },

  CHANGE_TARGET: function(step) {
    this.dispatch({
      step: step
    });
  }

});
