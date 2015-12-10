'use strict';

import React from 'react';
import classNames from 'classNames';
import Arc from '../shared/Arc.jsx';
import Panel from 'react-bootstrap/lib/Panel';
import SplitButton from 'react-bootstrap/lib/SplitButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import ModelActions from '../../stores/model.actions';
import StripedPattern from '../shared/stripedPattern.jsx';

module.exports = React.createClass({

  handleAdjustTarget: function(step) {
    ModelActions.CHANGE_TARGET.fire(step);
  },

  renderTargetDonut: function() {
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
          <text className="arc-target" textAnchor="middle" dy="10">{Math.round(node.data.target * 100) + '%'}</text>
        </g>
      </svg>
    );
  },

  render: function() {
    let node = this.props.selectedNode;
    return (
      <div>
        <Panel header={'Target'}>
          <div className="flex" style={{justifyContent: 'center'}}>
            <OverlayTrigger
              placement='right'
              overlay={<Tooltip><strong>Decrease this Tareget by 1%</strong></Tooltip>}
            >
              <button className="btn-adjust-pct" type="button" onClick={this.handleAdjustTarget.bind(this, -0.01)}>
                <span className="btn-adjust-pct--icon glyphicon glyphicon-minus" aria-hidden="true"></span>
              </button>
            </OverlayTrigger>

            {this.renderTargetDonut()}

            <OverlayTrigger
              placement='right'
              overlay={<Tooltip><strong>Increase this Tareget by 1%</strong></Tooltip>}
            >
              <button className="btn-adjust-pct" type="button" onClick={this.handleAdjustTarget.bind(this, 0.01)}>
                <span className="btn-adjust-pct--icon glyphicon glyphicon-plus" aria-hidden="true"></span>
              </button>
            </OverlayTrigger>

          </div>
        </Panel>

          {/*
            <defs>
              <StripedPattern id="striped-pattern" bgColor="coral" stripeColor="white" stripeOpacity="35%" />
            </defs>
            <rect x="0" y="0" width="50" height="100" fill="url(#striped-pattern)"></rect>
          */}

      </div>
    );
  },

});
