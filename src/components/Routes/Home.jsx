import React from 'react';
import { connect } from 'react-redux';
import { routeNodeSelector } from 'redux-router5';
import Layout from '../Layout/Layout';
// import Columns from '../Columns/Columns';
// import Blog from '../Blog/Blog';
import Content from '../Content/Content';
import * as site from '../../constants/site';
import GameFrame from '../GameFrame/GameFrame';
import IFrame from '../IFrame/IFrame';

const columnsCopy = [`
## ${site.strap}
${site.description}

---

### Sky fighters
_Shoot'em up - a space game using Phaser JS_
`, `
---

### Choosy Movie
_A cheesy title for a handy movie/actor search tool_

[choosymovie.tv](http://choosymovie.tv/)
`, `
---

### Make Mars great again
_A modified version of the classic breakout game using Phaser_
`];

function Home() {
  return (
    <Layout>
      <Content markdown={columnsCopy[0]} />
      {/* <Blog
        loadingContent={'### What have I been up to...?'}
        preContent={'### This is what I’ve been up to'}
      /> */}
      <GameFrame
        width={800}
        height={500}
        src="http://skyfighter.willthirkettle.co.uk/"
        name="Sky fighter!"
      />
      <Content markdown={columnsCopy[1]} />
      <IFrame
        width={375}
        height={610}
        src="http://choosymovie.tv/"
        name="Search for movies based on your mood..."
        scrollable
      />
      <Content markdown={columnsCopy[2]} />
      <GameFrame
        width={640}
        height={380}
        src="http://breakout.willthirkettle.co.uk/"
        name="Make Mars great again!"
      />
    </Layout>
  );
}

export default connect(() => routeNodeSelector(''))(Home);
