import React, {useEffect, useState} from 'react'
import {getUserEvents} from '../../store/actions/events'
import {useDispatch, useSelector} from 'react-redux'
import './UserEvents.css'
import Container from '../Container'
import UserEventsList from './UserEventsList/UserEventsList'
import UserEventsPagination from './UserEventsPagination/UserEventsPagination'
import {useParams} from 'react-router'

export default function UserEvents() {
    const dispatch = useDispatch()
    const {page} = useParams()
    const showPerPage = 6
    const [pagination, setPagination] = useState({
        start: showPerPage * (+page - 1),
        end: showPerPage * +page
    })
    const [events, setEvents] = useState([])
    const userEvents = useSelector((state) => state.events.userEvents)
    const searchValue = useSelector((s) => s.events.searchEvent)
    const onPaginationChange = (start, end) => {
        setPagination({start: start, end: end})
    }
    React.useEffect(() => {
        dispatch(getUserEvents())
    }, [])
    const deleteEventDisplay = useSelector((s) => s.events.deleteEventDisplay)
    useEffect(() => {
        if (deleteEventDisplay === 'block') {
            document.querySelector('body').style.overflow = 'hidden'
        } else {
            document.querySelector('body').style.overflow = 'auto'
        }
    }, [deleteEventDisplay])
    useEffect(() => {
        setEvents(userEvents)
        if (searchValue) {
            setEvents(userEvents.filter((event) => event.title.toLowerCase().includes(searchValue.toLowerCase())))
        }
    }, [userEvents, searchValue])

    return (
        <div
            className={'userEvents'}
            style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '100vh'}}
        >
            <Container>
                {events.length === 0 ? (
                    <div className='main_title'>Нет событий</div>
                ) : (
                    <div className='main_title'>Список моих событий </div>
                )}
                <div className='main_cards' style={{marginBottom: '40px'}}>
                    {events.slice(pagination.start, pagination.end).map((item) => (
                        <UserEventsList data={item} key={item._id}/>
                    ))}
                </div>
                {events.length !== 0 && (
                    <UserEventsPagination
                        page={page}
                        showPerPage={showPerPage}
                        onPaginationChange={onPaginationChange}
                        total={events.length}
                    />
                )}
            </Container>
        </div>
    )
}
