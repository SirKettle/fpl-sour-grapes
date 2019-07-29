import React from 'react';
import { connect } from 'react-redux';
import { routeNodeSelector } from 'redux-router5';
import Layout from '../Layout/Layout';
import LeagueContainer from '../../containers/League';

function Canvas() {
  return (
    <Layout>
      <LeagueContainer />
    </Layout>
  );
}

export default connect(() => routeNodeSelector(''))(Canvas);
