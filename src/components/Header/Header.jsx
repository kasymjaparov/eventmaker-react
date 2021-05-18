import React, { useState } from 'react'
import Container from '../Container.jsx'
import './Header.css'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setInputValue } from '../../store/actions/events'

export default function Header() {
	const dispatch = useDispatch()
	const allTypes = useSelector((s) => s.events.types)
	const [open, setOpen] = useState(false)
	React.useEffect(() => {
		if (open) {
			document.querySelector('body').style.overflow = 'hidden'
		} else {
			document.querySelector('body').style.overflow = 'auto'
		}
	}, [open])

	return (
		<header className='header'>
			<Container>
				<NavLink to='/' className='header_logo' onClick={() => dispatch(setInputValue(''))}>
					<span>E</span>VENTMAKER
				</NavLink>
				

				<div className={`header_nav ${open ? 'header_nav-open' : ''}`}>
					{allTypes.map((type) => (
						<NavLink
							className='header_nav_a'
							activeClassName='header_nav_a-active'
							key={type._id}
							to={`/events/type/${type.name}`}
							onClick={() => dispatch(setInputValue(''))}
						>
							{type.name}
						</NavLink>
					))}
					<NavLink to='/lk/add/' className='header_btn' onClick={() => dispatch(setInputValue(''))}>
						Разместить событие
					</NavLink>
				</div>
				<div onClick={() => setOpen(!open)} className={`burger ${open ? 'burgerOpen' : ''}`}>
					<div />
					<div />
					<div />
				</div>
			</Container>
		</header>
	)
}
