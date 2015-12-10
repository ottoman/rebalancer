'use strict';

import React from 'react';
import listenToStores from '../shared/listenToStores.jsx';
import Panel from 'react-bootstrap/lib/Panel';
import SelectedNode from './SelectedNode.jsx';
import RadialTreepMap from '../shared/RadialTreeMap.jsx';
import SelectedModelStore from '../../stores/selectedModel.store';

let ModelEditor = React.createClass({

  renderSelected: function() {
    if (this.props.selectedNode) {
      return <SelectedNode {...this.props} />;
    }
  },

  render: function() {
    return (
      <div>
        <Panel>
          <h1>Model</h1>

          <RadialTreepMap
            width="400"
            height="400"
            hierarchy={this.props.hierarchy}
            selectedNode={this.props.selectedNode}
          ></RadialTreepMap>

          { this.renderSelected() }

        </Panel>
      </div>
    );
  }

});


ModelEditor = listenToStores(ModelEditor, [SelectedModelStore], () => {
  return {
    selectedModel: SelectedModelStore.get(),
    hierarchy: SelectedModelStore.getHierarchy(),
    selectedNode: SelectedModelStore.getSelectedNode()
  };
});

module.exports = ModelEditor;