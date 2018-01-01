import React from 'react';
import { Route } from 'react-router-dom';

import ListBanner from './routes/list-banner';

const BannerPage= ({ match }) => (
  <div>
    <Route path={`${match.url}/list`} component={ListBanner}/>
  </div>
)

export default BannerPage;