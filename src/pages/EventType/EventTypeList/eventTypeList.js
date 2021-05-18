import React from 'react';
import Moment from "react-moment";
import {useDispatch} from "react-redux";
import {getViews} from "../../../store/actions/events";
import {NavLink} from "react-router-dom";


const EventTypeList = ({event,users}) => {
    function findAuthor() {
        const author = users.find((el) => el._id === event.user)
        if (author) {
            return author.username
        }
        return 'не указан'
    }
    const dispatch = useDispatch()
    return (
        <div className='main_cards_item'>
            <div className='main_cards_item_relative'>
                <img src={event.photos[0]} className='main_cards_item_img'/>
                <div className='main_cards_item_header_top'>
                    <i className='far fa-eye'/> <span>{event.views}</span>
                </div>
            </div>
            <div className='main_cards_item_content'>
                <span className='main_cards_item_content_title'>{event.title}</span>
                <div className='main_cards_item_content_desc'>{event.description}</div>
                <div className='main_cards_item_content_place'>
                    <i className='fas fa-map-marker-alt main_cards_item_content_place_icon'/>
                    <span className='main_cards_item_content_place_text'>{`${event.city} ${event.address}`}</span>
                </div>
                <div className='main_cards_item_content_time'>
                    <Moment fromNow>{new Date(event.date)}</Moment>
                </div>
                <NavLink to={`/events/getUserInfo/${event.user}`} className='main_cards_item_content_author'>
                    <div className='main_cards_item_content_author_ava far fas fa-user-circle'/>
                    <div className='main_cards_item_content_author_name'>{findAuthor()}</div>
                </NavLink>
                <div className='main_cards_item_content_href'>
                    <NavLink to={`/events/type/${event.type}/${event._id}`}
                             onClick={() => dispatch(getViews())}>Подробнее</NavLink>
                </div>
            </div>
        </div>
    )
};

export default EventTypeList;