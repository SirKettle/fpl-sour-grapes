import { reduce, pick } from 'ramda';

import FPL from './components/Routes/FPL';
import League from './components/Routes/League';
import ComingSoon from './components/Routes/ComingSoon';

export const ROUTES = {
  ROOT: { name: '__root__', path: '/', component: FPL, label: 'Home', inNav: true },
  LEAGUE: { name: 'league', path: '/league', component: League, label: 'League', inNav: true },
  RESULTS: { name: 'results', path: '/results', component: ComingSoon, label: 'Results', inNav: true }
};

const composeLink = route => pick(['name', 'label'], route);
const composeRouteDefinition = route => pick(['name', 'path'], route);

export const components = reduce((acc, route) => ({
  ...acc,
  [route.name]: route.component
}), {}, Object.values(ROUTES));

const routes = Object.values(ROUTES)
  .map(composeRouteDefinition);

export const navItemLinks = Object.values(ROUTES)
  .filter(route => route.inNav === true)
  .map(composeLink);

export default routes;
