import React from 'react';
import { Route } from 'react-router-dom';

import CashBook from './routes/cash-book';
import CashLog from './routes/cash-log';

const CashBookPage = ({ match }) => (
    <div>
        <Route path={`${match.url}/list`} component={CashBook}/>
        <Route path={`${match.url}/log`} component={CashLog}/>
    </div>
)

export default CashBookPage;