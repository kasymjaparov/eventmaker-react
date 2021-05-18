import React from 'react';
import Moment from "react-moment";
import {NavLink} from "react-router-dom";
import {getViews, showDeleteEvent} from "../../../store/actions/events";
import {useDispatch, useSelector} from "react-redux";
import DeleteEvent from "../DeleteUserEvent/DeleteEvent";

const UserEventsList =  ({data}) => {
    const deleteEventDisplay = useSelector(s => s.events.deleteEventDisplay)
    const event = useSelector(s => s.events.deleteEvent.event)
    const deleteLoading = useSelector(s => s.events.deleteEvent.loading)
    const dispatch = useDispatch()
    return (
        <div className='main_cards_item'>
            <div className='main_cards_item_relative'>
                <img src={data.photos[0]} className='main_cards_item_img'/>
                <div className='main_cards_item_header_top'>
                    <i className='far fa-eye'/> <span>{data.views}</span>
                </div>
            </div>
            <div style={{background: '#eeeeee', padding: '0 15px'}}>
                <span className='main_cards_item_content_title'>{data.title}</span>
                <div className='main_cards_item_content_desc'>{data.description}</div>
                <div className='main_cards_item_content_place'>
                    <i className='fas fa-map-marker-alt main_cards_item_content_place_icon'/>
                    <span className='main_cards_item_content_place_text'>{`${data.city} ${data.address}`}</span>
                </div>
                <div className='main_cards_item_content_time'>
                    <Moment fromNow>{new Date(data.date)}</Moment>
                </div>
                {event?._id === data?._id && deleteLoading ?
                    <div style={{marginTop: '10px', fontStyle: 'italic', color: 'red', fontWeight: 'bold'}}>Событие
                        удаляется...</div>
                    : <div className={'main_cards_item_content_delete'} style={{marginTop: '10px', color: 'red'}}>
                        <i className="fas fa-trash" style={{cursor: 'pointer'}}
                           onClick={() => (dispatch(showDeleteEvent(data)))}>
                            <span className={'main_cards_item_content_delete_text'} style={{marginLeft: '5px'}}>Удалить событие</span>
                        </i>
                    </div>}

                <div className='main_cards_item_content_href'>
                    <NavLink to={`/events/${data._id}`} onClick={() => dispatch(getViews())}>Подробнее</NavLink>
                </div>
            </div>
            {deleteEventDisplay === 'block' && data._id === event._id && <DeleteEvent data={data}/>}
        </div>
    );
};

export default UserEventsList;