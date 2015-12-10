'use strict';

import React from 'react';
import listenToStores from '../shared/listenToStores';
import Panel from 'react-bootstrap/lib/Panel';
import EditPosition from './EditPosition';
import AddPosition from './AddPosition';
import PortfolioStore from '../../stores/portfolio.store';
import InstrumentStore from '../../stores/instrument.store';


let PortfolioEditor = React.createClass({

  render: function() {
    return (
      <div>
        <Panel>
          <h1>Holdings</h1>
          <AddPosition
            positions={this.props.selectedPortfolio.positions}
          />
          <ul className="list-group">
            { this.props.selectedPortfolio.positions.map((position) => {
              let desc = this.props.instruments[position.symbol].desc;
              return <EditPosition
                position={position}
                desc={desc}
                ref={position.symbol}
                key={position.symbol}
              />
            }) }
          </ul>
        </Panel>
      </div>

    );
  }

});


PortfolioEditor = listenToStores(PortfolioEditor, [PortfolioStore, InstrumentStore], () => {
  return {
    instruments: InstrumentStore.getAll(),
    portfolios: PortfolioStore.getAll(),
    selectedPortfolio: PortfolioStore.getSelected()
  };
});

module.exports = PortfolioEditor;