import React from 'react';
import PropTypes from 'prop-types';
import {renderToString} from 'react-dom/server';

function Html({assets, children}) {
  return (
    <html>
      <head/>
      <body>
        <div
          id="root"
          dangerouslySetInnerHTML={{__html: renderToString(children)}}
        />
        <script src={assets.client.js}/>
      </body>
    </html>
  );
}

Html.propTypes = {
  assets: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

export default Html;
