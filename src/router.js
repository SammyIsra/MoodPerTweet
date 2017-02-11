import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './components/App';
import Home from './components/Home';
import TweetDetails from './components/TweetDetails';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="tweet/:id" component={TweetDetails} />
    </Route>
);
