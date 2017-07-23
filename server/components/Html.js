import React from 'react';
import PropTypes from 'prop-types';
import {renderToString} from 'react-dom/server';

function Html({assets, state, children}) {
  const childrenString = renderToString(children);
  const stateString = `window.__PRELOADED_STATE__=${JSON.stringify(state)};`;
  return (
    <html>
      <head>
        <link rel="stylesheet" href={assets.client.css}/>
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{__html: childrenString}}/>
        <script dangerouslySetInnerHTML={{__html: stateString}}/>
        <script src={assets.vendor.js}/>
        <script src={assets.client.js}/>
      </body>
    </html>
  );
}

Html.propTypes = {
  assets: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

export default Html;
