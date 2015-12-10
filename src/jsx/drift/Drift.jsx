'use strict';

import React from 'react';
import listenToStores from '../shared/listenToStores';
import Panel from 'react-bootstrap/lib/Panel';
import Arc from '../shared/Arc.jsx';
import RadialTreepMap from '../shared/RadialTreeMap.jsx';
import SelectedModelStore from '../../stores/selectedModel.store';


let Drift = React.createClass({

  renderDrift: function() {
    let node = this.props.selectedNode;
    return (
      <svg width="80" height="80">
        <g transform="translate(40, 40)">
          <Arc
            innerRadius={26}
            outerRadius={40}
            start={0}
            end={1}
            color='#ddd'
          ></Arc>
          <Arc
            innerRadius={26}
            outerRadius={40}
            className="arc-node"
            start={node.start}
            end={node.end}
            color={node.color}
          ></Arc>
          <text className="arc-target" textAnchor="middle" dy="10">{Math.round(node.actual * 100) + '%'}</text>
        </g>
      </svg>
    );
  },

  render: function() {
    let {selectedNode} = this.props;
    return (
      <div>
        <Panel>
          <h1>Drift</h1>

          <RadialTreepMap
            width="400"
            height="400"
            hierarchy={this.props.hierarchy}
            selectedNode={this.props.selectedNode}
            showDrifts={true}
          ></RadialTreepMap>


        <Panel header={'Actual Market Value'}>
          <div className="flex" style={{justifyContent: 'center'}}>
            {this.renderDrift()}
          </div>
        </Panel>

        </Panel>
      </div>

    );
  }
});

Drift = listenToStores(Drift, [SelectedModelStore], () => {
  return {
    hierarchy: SelectedModelStore.getHierarchy(),
    selectedNode: SelectedModelStore.getSelectedNode()
  };
});

module.exports = Drift;