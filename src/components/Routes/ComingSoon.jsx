import React from 'react';
import { connect } from 'react-redux';
import { routeNodeSelector } from 'redux-router5';
import Layout from '../Layout/Layout';
import Content from '../Content/Content';

const introCopy = `
### Coming soon...
`;

function Canvas() {
  return (
    <Layout>
      <Content markdown={introCopy} />
    </Layout>
  );
}

export default connect(() => routeNodeSelector(''))(Canvas);
