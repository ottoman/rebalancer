
require('./theme/flatly/bootswatch.less');
require('./styles.css');

import React from 'react';
import App from './jsx/app';

React.render(
  React.createElement(App, null),
  document.getElementById('container')
);

