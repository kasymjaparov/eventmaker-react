import React, { useEffect, useState } from 'react'
import Container from '../../components/Container'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import CardEvent from '../../components/CardEvent/CardEvent.jsx'
import Pagination from '../../components/Pagination/Pagination.js'
import { useDispatch, useSelector } from 'react-redux'
import './Main.css'
import { useParams } from 'react-router'
import { setInputValue } from '../../store/actions/events'

export default function () {
	const { page } = useParams()
	const showPerPage = 6
	const dispatch = useDispatch()
	const cities = ['Все', 'Бишкек', 'Ош', 'Токмок']
	const [city, setCity] = useState('Все')
	const [filteredEvents, setFilteredEvents] = useState([])
	const [pagination, setPagination] = useState({
		start: page ? showPerPage * (+page - 1) : 0,
		end: page ? showPerPage * +page : showPerPage
	})
	const allEvents = useSelector((state) => state.events.allEvents)
	const allUsers = useSelector((s) => s.auth.allUsers)
	const searchValue = useSelector((s) => s.events.searchEvent)
	const inputValue = useSelector((s) => s.events.searchEvent)
	useEffect(() => {
		if (page) {
			window.scrollTo(0, 0)
		}
		if (allEvents.length !== 0) {
			setFilteredEvents(allEvents)
		}
		if (city !== 'Все') {
			setFilteredEvents([...allEvents.filter((event) => event.city === city)])
		}
		if (searchValue && city === 'Все') {
			setFilteredEvents(
				allEvents.filter((event) => event.title.toLowerCase().includes(searchValue.toLowerCase()))
			)
		}
		if (searchValue && city !== 'Все') {
			setFilteredEvents(
				allEvents
					.filter((event) => event.city === city)
					.filter((event) => event.title.toLowerCase().includes(searchValue.toLowerCase()))
			)
		}
	}, [allEvents, city, page, searchValue])

	const onPaginationChange = (start, end) => {
		setPagination({ start: start, end: end })
	}


	return (
		<div className='main'>
			<Header />
			<Container>
				<div className='main_subnav'>
					<select
						style={{ marginTop: '15px', display: page > 1 ? 'none' : 'block', width: 180 }}
						onChange={(e) => {
							setCity(e.target.value)
							dispatch(setInputValue(''))
						}}
					>
						{cities.map((el, idx) => (
							<option key={el} value={el}>
								{el}
							</option>
						))}
					</select>
					<div className={'header_search'}>
						<input
							className='header_search_input'
							type={'text'}
							value={inputValue}
							placeholder={'Поиск ивента...'}
							onChange={(e) => dispatch(setInputValue(e.target.value))}
						/>
						<i className='fas fa-search' />
					</div>
				</div>

				<div className='main_title'>
					{city === 'Все'
						? `Афиша событий на все города на ${new Date().getFullYear()} год`
						: `Афиша событий ${city}а на ${new Date().getFullYear()} год`}
				</div>
				<div className='main_cards'>
					{filteredEvents?.slice(pagination.start, pagination.end).map((item) => (
						<CardEvent data={item} key={item._id} user={allUsers} />
					))}
				</div>
				{filteredEvents.length !== 0 && (
					<Pagination
						page={page}
						showPerPage={showPerPage}
						onPaginationChange={onPaginationChange}
						total={filteredEvents?.length}
					/>
				)}
			</Container>
			<Footer />
		</div>
	)
}
