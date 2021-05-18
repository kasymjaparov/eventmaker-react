import React from 'react'
import './Verification.css'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { verification } from '../../store/actions/auth.js'

export default function Verification() {
	const { token } = useParams()
	const dispatch = useDispatch()
	const response = useSelector((state) => state.auth.verification.message)
	React.useEffect(() => {
		dispatch(verification(token))
	}, [])
	return (
		<div className='verification'>
            
			<div>{response}</div>
			<br />
			<NavLink to='/auth'>Перейти в форму авторизации</NavLink>
		</div>
	)
}
