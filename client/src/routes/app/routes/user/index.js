import React from 'react';
import { Route } from 'react-router-dom';

import ListUser from './routes/list-user';

const UserPage = ({ match }) => (
    <div>
        <Route path={`${match.url}/list`} component={ListUser}/>
    </div>
)

export default UserPage;