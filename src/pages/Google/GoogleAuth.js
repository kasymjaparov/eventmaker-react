import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { googleAuth } from '../../store/actions/auth'
import { NavLink } from 'react-router-dom'

const GoogleAuth = () => {
	const { token } = useParams()
	const dispatch = useDispatch()
	const success = useSelector((s) => s.auth.googleLogin.success)
	const failed = useSelector((s) => s.auth.googleLogin.failed)
	useEffect(() => {
		dispatch(googleAuth(token))
	}, [])

	return (
		<div>
			{localStorage.getItem('google') ? (
				<div>Вы успешно авторизовались через гугл</div>
			) : (
				<div>Ошибка авторизации через Гугл</div>
			)}
			<NavLink to={'/'}>Домой</NavLink>
		</div>
	)
}

export default GoogleAuth
