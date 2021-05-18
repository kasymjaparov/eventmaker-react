import React from 'react'
import './Auth.css'
import Header from '../../components/Header/Header.jsx'
import Footer from '../../components/Footer/Footer.jsx'
import Container from '../../components/Container.jsx'
import Login from '../../components/Login/Login.js'
import Registration from '../../components/Registration/Registration.js'
import { NavLink, Route, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'

export default function Auth() {
	React.useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	return (
		<div className='auth'>
			<Header />
			<Container>
				<h1 className='auth_title'>Приветствуем!</h1>
				<div className='auth_nav'>
					<NavLink to='/auth' activeClassName='auth_nav_link-active' className='auth_nav_link' exact>
						Вход
					</NavLink>
					<NavLink to='/auth/registr' activeClassName='auth_nav_link-active' className='auth_nav_link' exact>
						Регистрация
					</NavLink>
				</div>
				<Route path='/auth' component={Login} exact />
				<Route path='/auth/registr' component={Registration} exact />
			</Container>
			<Footer />
		</div>
	)
}
