import React from 'react';
import { Route } from 'react-router-dom';

import ListProduct from './routes/list-product/';

const ProductPage= ({ match }) => (
  <div>
    <Route path={`${match.url}/list`} component={ListProduct}/>
  </div>
)

export default ProductPage;