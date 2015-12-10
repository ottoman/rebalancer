'use strict';

import React from 'react';
import SplitButton from 'react-bootstrap/lib/SplitButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import ModelActions from '../../stores/model.actions';

module.exports = React.createClass({

  handleChangeModel: function(model) {
    ModelActions.SELECT_MODEL.fire(model.id);
  },

  render: function() {
    return (
      <SplitButton bsStyle="default" title={this.props.selectedModel.name}>
        {
          this.props.models.map((item, i) => {
            return <MenuItem
              onClick={this.handleChangeModel.bind(this, item)}
              key={i}
              eventKey="1">
              {item.name}
            </MenuItem>;
          })
        }
      </SplitButton>
    );
  }

});
