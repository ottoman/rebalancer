'use strict';

/*
  Higher order component that wraps another react component and
  renders it with a new state when the supplied stores publishes changes.
  Baseed on https://github.com/gaearon/flux-react-router-example/blob/master/scripts/utils/connectToStores.js
*/

import React from 'react';

module.exports = function listenToStores(Component, stores, getState) {

  const StoreConnection = React.createClass({

    getInitialState() {
      return getState(this.props);
    },

    componentDidMount() {
      stores.forEach(store =>
        store.on(this.onChange)
      );
    },

    componentWillUnmount() {
      stores.forEach(store =>
        store.off(this.onChange)
      );
    },

    onChange() {
      if (this.isMounted()) {
        this.setState(getState(this.props));
      }
    },

    render() {
      return <Component {...this.props} {...this.state} />;
    }
  });

  return StoreConnection;
};

