import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './DeleteEvent.css'
import { deleteUserEvent, hideDeleteEvent } from '../../../store/actions/events'

const DeleteEvent = () => {
	const dispatch = useDispatch()
	const event = useSelector((s) => s.events.deleteEvent.event)
	const [position, setPosition] = useState({})
	useEffect(() => {
		setPosition(document.querySelector('body').getBoundingClientRect())
	}, [])

	return (
		<div
			className={'delete_event'}
			style={{
				position: 'absolute',
				top: +`${position.y - 2 * position.y}`,
				left: 0,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				width: 100 + 'vw',
				height: 100 + 'vh',
				zIndex: 999,
				backdropFilter: 'blur(5px)'
			}}
			onClick={() => dispatch(hideDeleteEvent())}
		>
			<div
				className='delete_event_block'
				onClick={(e) => {
					e.stopPropagation()
				}}
			>
				<div className={'delete_event_block_question'}>Вы уверены,что хотите удалить событие?</div>
				<div className={'delete_event_block_btns'}>
					<button className={'delete_event_block_btns_ok'} onClick={() => dispatch(deleteUserEvent(event))}>
						<i className='fas fa-check'>Да</i>
					</button>
					<button className={'delete_event_block_btns_no'} onClick={() => dispatch(hideDeleteEvent())}>
						<i className='fas fa-times-circle'>Нет</i>
					</button>
				</div>
			</div>
		</div>
	)
}

export default DeleteEvent
