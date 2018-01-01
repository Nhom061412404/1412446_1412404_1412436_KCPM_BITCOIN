import React from 'react';
import { Route } from 'react-router-dom';

import ListCategory from './routes/list-category/';
import AddCategory from './routes/add-category';

const CategoryPage = ({ match }) => (
  <div>
    <Route path={`${match.url}/list`} component={ListCategory}/>
    <Route path={`${match.url}/add`} component={AddCategory}/>
  </div>
)

export default CategoryPage;