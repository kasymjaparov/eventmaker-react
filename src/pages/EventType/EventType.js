import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {useParams} from "react-router";
import EventTypeList from "./EventTypeList/eventTypeList";
import Header from "../../components/Header/Header";
import Container from "../../components/Container";
import Footer from "../../components/Footer/Footer";
import EventTypePagination from "./EventTypePagination/EventTypePagination";
import CardEvent from "../../components/CardEvent/CardEvent";



const EventType = () => {
    const showPerPage = 6
    const {eventType} = useParams()
    const [events, setEvents] = useState([])
    const {page} = useParams()
    const [pagination, setPagination] = useState({
        start: page ? showPerPage * (+page - 1) : 0,
        end: page ? showPerPage * (+page) : showPerPage
    })
    const allUsers = useSelector(s => s.auth.allUsers)
    const allEvents = useSelector(s => s.events.allEvents)
    const searchValue = useSelector(s => s.events.searchEvent)
    const onPaginationChange = (start, end) => {
        setPagination({start: start, end: end})
    }
    useEffect(() => {
        if(allEvents.length !== 0){
            setEvents(allEvents?.filter(event => event.type === eventType))
        }
        if(searchValue){
            setEvents(allEvents.filter(event=>event.type === eventType).filter(event=>event.title.toLowerCase().includes(searchValue.toLowerCase())))
        }
    }, [eventType,allEvents,searchValue])


    return (
        <div className='main'>
            <Header/>
            <Container>
                <div className='main_title'>{eventType}</div>
                <div className='main_cards'>
                    {events.slice(pagination.start, pagination.end).map((event) => {
                        return <EventTypeList key={event._id} event={event} users={allUsers}/>
                    })}
                </div>
                {events.length !== 0 && <EventTypePagination
                    page={page}
                    eventType={eventType}
                    showPerPage={showPerPage}
                    onPaginationChange={onPaginationChange}
                    total={events.length}
                />  }
            </Container>
            <Footer/>
        </div>
    );
};

export default EventType;