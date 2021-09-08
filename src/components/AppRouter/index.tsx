import React, { useContext, ReactChild, ReactChildren } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";

import UserContext from '../../contexts/UserContext';
import Home from '../../pages/Home';
import Login from '../../pages/Login';

function AppRouter() {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={Home}></Route>
				<Route exact path="/login" component={Login}></Route>
			</Switch>
		</Router>
	)
}

export default AppRouter
