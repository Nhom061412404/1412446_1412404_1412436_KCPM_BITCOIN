import React from 'react';
import { Route } from 'react-router-dom';

import ListInventory from './routes/list-inventory';
import LogInventory from './routes/log-inventory';
import ListUnit from './routes/unit-inventory';

const InventoryPage = ({ match }) => (
    <div>
        <Route path={`${match.url}/list`} component={ListInventory}/>
        <Route path={`${match.url}/log`} component={LogInventory}/>
        <Route path={`${match.url}/unit`} component={ListUnit}/>
    </div>
)

export default InventoryPage;