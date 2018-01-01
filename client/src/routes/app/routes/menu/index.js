import React from 'react';
import { Route } from 'react-router-dom';

import ListMenu from './routes/list-menu/';

const MenuPage = ({ match }) => (
  <div>
    <Route path={`${match.url}/list`} component={ListMenu}/>
  </div>
)

export default MenuPage;