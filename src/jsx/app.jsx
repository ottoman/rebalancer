'use strict';

import React from 'react';
import listenToStores from './shared/listenToStores.jsx';
import ModelEditor from './model-editor/ModelEditor.jsx';
import PortfolioEditor from './portfolio-editor/PortfolioEditor';
import Drift from './drift/drift.jsx';
import ModelMenu from './model-editor/ModelMenu.jsx';
import ModelStore from '../stores/model.store';
import SelectedModelStore from '../stores/selectedModel.store';

let App = React.createClass({

  render: function() {
    return (
      <div className="container-fluid">

        <div className="symbol">
          <h1 className="symbol-header">
            Portfolio Rebalancer
          </h1>
          <small className="symbol-desc">
            Visualize Drift away from a Portfolio Model.
          </small>
        </div>

        <ModelMenu
          models={this.props.models}
          selectedModel={this.props.selectedModel}
        />

        <div className='row'>
          <div className="col-xs-12 col-lg-4">
            <ModelEditor />
          </div>
          <div className="col-xs-12 col-md-4">
            <Drift></Drift>
          </div>
          <div className="col-xs-12 col-md-4">
            <PortfolioEditor></PortfolioEditor>
          </div>
        </div>
      </div>
    );
  }
});

App = listenToStores(App, [ModelStore], () => {
  return {
    models: ModelStore.getAll(),
    selectedModel: SelectedModelStore.get()
  };
});

module.exports = App;