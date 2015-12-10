'use strict';

import React from 'react';

module.exports = React.createClass({

  render: function() {
    let {id, bgColor, stripeColor, stripeOpacity} = this.props;
    return (
      <pattern id={id || 'pattern'}
        width="33" height="66"
        viewBox="0 0 5 10"
        patternUnits="userSpaceOnUse"
      >
        {/* create diagonal stripes */}
        <rect width="110%" x="-5%" y="-5%" height="110%" fill={bgColor} />
        <line x1="-2" y1="1" x2="7" y2="10" stroke={stripeColor} strokeOpacity={stripeOpacity} strokeWidth="2"/>
        <line x1="-2" y1="6" x2="7" y2="15" stroke={stripeColor} strokeOpacity={stripeOpacity} strokeWidth="2"/>
        <line x1="-2" y1="-4" x2="7" y2="5" stroke={stripeColor} strokeOpacity={stripeOpacity} strokeWidth="2"/>
      </pattern>
     );
  }

});
