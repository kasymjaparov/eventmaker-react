import { Route, Redirect } from 'react-router-dom'
import Main from '../pages/Main/Main.jsx'
import { Switch } from 'react-router'
import React from 'react'
import AddEvent from '../pages/AddEvent/AddEvent.js'
import Event from '../pages/Event/Event'
import EventType from '../pages/EventType/EventType'
import UserEvents from '../components/UserEvents/UserEvents'
import GetUserInfo from '../pages/GetUserInfo/GetUserInfo'

export default function PrivateRoute() {
	const privateRoutes = [
		{ path: '/', component: Main },
		{ path: '/page/:page', component: Main },
		{ path: '/events/type/:eventType', component: EventType },
		{ path: '/events/type/:eventType/page/:page', component: EventType },
		{ path: '/events/type/:eventType/:id', component: Event },
		{ path: '/lk/add/', component: AddEvent },
		{ path: '/lk/events/page/:page', component: AddEvent },
		{ path: '/events/getUserInfo/:userId', component: GetUserInfo },
		{ path: '/events/getUserInfo/:userId/page/:page', component: GetUserInfo },
		{ path: '/events/:id', component: Event },
		{ path: '/lk/userInfo/', component: AddEvent }
	]
	return (
		<Switch>
			{privateRoutes.map((item) => (
				<Route key={item.path} path={item.path} component={item.component} exact={true} />
			))}
			<Redirect to='/lk/add/' />
		</Switch>
	)
}
