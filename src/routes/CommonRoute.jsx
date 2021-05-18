import { Route, Redirect } from 'react-router-dom'
import Auth from '../pages/Auth/Auth.js'
import Main from '../pages/Main/Main.jsx'
import { Switch } from 'react-router'
import React from 'react'
import Verification from '../pages/Verification/Verification.js'
import Event from '../pages/Event/Event'
import GoogleAuth from '../pages/Google/GoogleAuth'
import EventType from '../pages/EventType/EventType'
import GetUserInfo from '../pages/GetUserInfo/GetUserInfo'

export default function CommonRoute() {
	const commonRoutes = [
		{ path: '/', component: Main },
		{ path: '/page/:page', component: Main },
		{ path: '/auth', component: Auth },
		{ path: '/auth/registr', component: Auth },
		{ path: '/events/type/:eventType', component: EventType },
		{ path: '/events/type/:eventType/page/:page', component: EventType },
		{ path: '/events/type/:eventType/:id', component: Event },
		{ path: '/events/:id', component: Event },
		{ path: '/events/getUserInfo/:userId', component: GetUserInfo },
		{ path: '/events/getUserInfo/:userId/page/:page', component: GetUserInfo },
		{ path: '/verification/:token', component: Verification },
		{ path: '/google/auth/:token', component: GoogleAuth }
	]
	return (
		<Switch>
			{commonRoutes.map((item) => (
				<Route key={item.path} path={item.path} component={item.component} exact={true} />
			))}
			<Redirect to='/auth' />
		</Switch>
	)
}
