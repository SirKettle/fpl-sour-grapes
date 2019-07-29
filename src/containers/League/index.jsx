import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { loadDetails } from '../../domains/fpl/actions';
import * as fplSelectors from '../../domains/fpl/selectors';
import Content from '../../components/Content/Content';
import typography from '../../css/typography.css';
import loadingStates from '../../constants/loadingStates';
import styles from './index.css';

const getKey = (a, b) => `key${a}${b}`;

const mapStateToProps = (state) => {
  return {
    league: fplSelectors.leagueSelector(state),
    standings: fplSelectors.decoratedStandingsSelector(state),
    loadingState: fplSelectors.detailsLoadingSelector(state)
  };
};

const mapDispatchToProps = dispatch => ({
  loadFplDetails: (leagueId) => { loadDetails(dispatch, leagueId); }
});

class LeagueContainer extends Component {

  static defaultProps = {
    league: {},
    standings: [],
    loadingContent: null,
    preContent: null
  }

  componentWillMount() {
    // this.props.loadFplDetails(34695);
    this.props.loadFplDetails();
  }

  render() {
    const { standings, loadingState,
      league, loadingContent, preContent } = this.props;

    if (loadingState !== loadingStates.COMPLETE) {
      if (loadingContent) {
        return (<Content markdown={loadingContent} />);
      }
      return (<div>Loading data from FPL...</div>);
    }

    return (
      <div>
        { preContent ? (<Content markdown={preContent} />) : null }
        <h2 className={classnames(typography.ben, styles.withMargins)}>
          {league.name}
        </h2>
        <hr />
        <h2 className={classnames(typography.ben, styles.withMargins)}>
          Standings
        </h2>
        <hr />
        <h3 className={classnames(typography.beau, styles.withMargins)}>The Official table</h3>
        <p>ahem, Fake news!</p>
        <table className={styles.table}>
          <thead>
            <tr>
              <th />
              <th />
              <th>Pl</th>
              <th>W</th>
              <th>L</th>
              <th>D</th>
              <th>F</th>
              <th>A</th>
              <th>Pts</th>
            </tr>
          </thead>
          <tbody>
            {
              standings.map((p, i) => (<tr key={getKey('official', i)}>
                <td>{i + 1}</td>
                <td>{p.extras.teamName}</td>
                <td>{p.matches_played}</td>
                <td>{p.matches_won}</td>
                <td>{p.matches_lost}</td>
                <td>{p.matches_drawn}</td>
                <td>{p.points_for}</td>
                <td>{p.points_against}</td>
                <td>{p.total}</td>
              </tr>))
            }
          </tbody>
        </table>

        <hr />

        <h3 className={classnames(typography.beau, styles.withMargins)}>
          The people’s championship table</h3>
        <p>The true table, points that should have been won but probably weren’t.
          Based on a highly sophisticated, non-biased and uncontroversial algorithm</p>
        <table className={styles.table}>
          <thead>
            <tr>
              <th />
              <th />
              <th>Pl</th>
              <th>W</th>
              <th>L</th>
              <th>D</th>
              <th>F</th>
              <th>A</th>
              <th>Pts</th>
            </tr>
          </thead>
          <tbody>
            {
              standings
                .sort((a, b) => {
                  return a.extras.totalProbPoints < b.extras.totalProbPoints ? 1 : -1;
                })
                .map((p, i) => (<tr key={getKey('peoples', i)}>
                  <td>{i + 1}</td>
                  <td>{p.extras.teamName}</td>
                  <td>{p.matches_played}</td>
                  <td>{p.extras.totalProbWin}</td>
                  <td>{p.extras.totalProbLose}</td>
                  <td>{p.extras.totalProbDraw}</td>
                  <td>{p.points_for}</td>
                  <td>{p.points_against}</td>
                  <td>{p.extras.totalProbPoints}</td>
                </tr>))
            }
          </tbody>
        </table>
        <hr />


        <h3 className={classnames(typography.beau, styles.withMargins)}>
          The lucky feckers table</h3>
        <p>🍀 Just how lucky have the managers been? 🍀</p>
        <p>The “Points Swing” column shows the difference between the most probable
        amount of points and the actual points of the player</p>
        <table className={styles.table}>
          <thead>
            <tr>
              <th />
              <th />
              <th />
              <th>Played</th>
              <th>Average Luck p/w 🍀</th>
              <th>Points Swing</th>
            </tr>
          </thead>
          <tbody>
            {
              standings
                .sort((a, b) => {
                  return a.total - a.extras.totalProbPoints < b.total - b.extras.totalProbPoints
                    ? 1 : -1;
                })
                .map((p, i) => (<tr key={getKey('lucky', i)}>
                  <td>{i + 1}</td>
                  <td>{p.extras.name}</td>
                  <td>{p.extras.teamName}</td>
                  <td>{p.matches_played}</td>
                  <td>{Math.round(p.extras.totalAltLuckScore / p.matches_played)}</td>
                  <td>{p.total - p.extras.totalProbPoints} {p.total - p.extras.totalProbPoints > 0 ? '🍀' : '🍇'}</td>
                </tr>))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

LeagueContainer.propTypes = {
  loadFplDetails: PropTypes.func.isRequired,
  loadingContent: PropTypes.string,
  preContent: PropTypes.string,
  /* eslint react/forbid-prop-types: 0 */
  league: PropTypes.object,
  loadingState: PropTypes.string.isRequired,
  standings: PropTypes.arrayOf(PropTypes.object)
};

export default connect(mapStateToProps, mapDispatchToProps)(LeagueContainer);
