import React from 'react';
import { Route } from 'react-router-dom';

import ListIngredient from './routes/list-ingredient';

const IngredientPage = ({ match }) => (
  <div>
    <Route path={`${match.url}/list`} component={ListIngredient}/>
  </div>
)

export default IngredientPage;