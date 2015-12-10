'use strict';

import React from 'react';
import PortfolioActions from '../../stores/portfolio.actions';

module.exports = React.createClass({

  handleDeletePosition: function(symbol) {
    PortfolioActions.PORTFOLIO_DELETE_POSITION.fire(symbol);
  },

  handleChangeQuantity: function(symbol, event) {
    PortfolioActions.PORTFOLIO_CHANGE_QUANTITY.fire(symbol, event.target.value);
  },

  render: function() {
    let {position, desc} = this.props;
    return (
      <li className="list-group-item">
        <button
          style={{color: '#ddd'}}
          type="button"
          className="btn btn-lg close"
          aria-label="Close"
          onClick={this.handleDeletePosition.bind(this, position.symbol)}
        >
          <span aria-hidden="true">&times;</span>
        </button>

        <form className="form">
          <div className="form-group">

              <h3 style={{margin_: '0'}}>{position.symbol}
              <small>&nbsp; {desc}</small>
              </h3>

            <input
              className="form-control"
              type="text"
              placeholder="..."
              value={position.qty}
              onChange={this.handleChangeQuantity.bind(this, position.symbol)}
            />
          </div>
        </form>
      </li>
    );
  }

});
