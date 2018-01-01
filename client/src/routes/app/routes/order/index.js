import React from 'react';
import { Route } from 'react-router-dom';

import ListOrder from './routes/list-order';

const OrderPage = ({ match }) => (
    <div>
        <Route path={`${match.url}/list`} component={ListOrder}/>
    </div>
)

export default OrderPage;