import React from 'react'
import './Event.css'
import { NavLink, useParams } from 'react-router-dom'
import { getEvent } from '../../store/actions/events'
import { useDispatch, useSelector } from 'react-redux'
import Container from '../../components/Container'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'

export default function Event(props) {
	const { id } = useParams()
	const dispatch = useDispatch()
	const event = useSelector((s) => s.events.event)
	React.useEffect(() => {
		dispatch(getEvent(id))
	}, [])

	return (
		<div>
			{Object.keys(event).length !== 0 && (
				<div className='event'>
					<Header />
					<Container>
						<div className={'event_block'}>
								<img src={event.photos[0]} className='event_img'/>
								<div className='event_views'>
									<i className='far fa-eye' />
									<span>{event.views}</span>
								</div>
							<div className={'event_info'}>
								<div className={'event_date'}>
									<i className='far fa-calendar-alt' />
									<span>{event.date.split('T')[0].split('-').reverse().join('.')}</span>
								</div>
								<div className={'event_date'}>
									<i className=' far fa-clock' />
									<span>{event.date.split('T')[1]}</span>
								</div>
								<i className='fas fa-map-marker-alt main_cards_item_content_place_icon' />
								<span className={'event_info_address'}>
									{event.city} {event.address}
								</span>
							</div>
						</div>
						<div className={'title'}>{event.title}</div>
						<div className={'description'}>{event.description}</div>
						<div className={'description'}>{event._message}</div>
					</Container>
					<Footer />
				</div>
			)}
		</div>
	)
}
