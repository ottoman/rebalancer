'use strict';

import React from 'react';
import classNames from 'classNames';
import PortfolioStore from '../../stores/portfolio.store';
import PortfolioActions from '../../stores/portfolio.actions';


module.exports = React.createClass({

  getInitialState: function() {
    return {
      symbolToAdd: ''
    };
  },

  handleClickAdd: function(event) {
    event.preventDefault();
    PortfolioActions.PORTFOLIO_ADD_POSITION.fire(this.state.symbolToAdd);
    this.setState({symbolToAdd: ''});
  },

  symbolExists: function() {
    return PortfolioStore.symbolExists(this.state.symbolToAdd);
  },

  handleChangeSymbol: function(event) {
    let symbolToAdd = event.target.value;
    this.setState({
      symbolToAdd: symbolToAdd
    });
  },

  render: function() {
    let symbolToAdd = this.state.symbolToAdd;
    let canAdd = symbolToAdd !== null && !this.symbolExists(symbolToAdd);
    let isBlank = symbolToAdd === '';

    let formGroupClasses = classNames({
      'form-group': true,
      'has-error': !canAdd,
      'has-feedback': !canAdd
    });

    let btnClasses = classNames({
      'btn': true,
      'btn-success': canAdd,
      'btn-danger': !canAdd,
      'disabled': !canAdd || isBlank
    });

    return (
      <form className="form" onSubmit={this.handleClickAdd}>
      <div className={formGroupClasses}>
        <label htmlFor="add-pos-symbol">Add a new Symbol</label>
        <div className="input-group">
          <input
            type="text"
            autoComplete="off"
            className="form-control"
            id="add-pos-symbol"
            ref="add-pos-symbol"
            placeholder="e.g. AAPL"
            value={this.state.symbolToAdd}
            onChange={this.handleChangeSymbol}
          />
          <span className="input-group-btn">
            <button className={btnClasses} type="submit">Add New</button>
          </span>
        </div>
        </div>
      </form>
    );
  }

});
