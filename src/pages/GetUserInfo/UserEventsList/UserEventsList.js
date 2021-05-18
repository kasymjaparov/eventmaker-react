import React from 'react';
import Moment from "react-moment";
import {NavLink} from "react-router-dom";
import {getViews} from "../../../store/actions/events";
import {useDispatch} from "react-redux";

const UserEventsList = ({data}) => {
    const dispatch = useDispatch()
    return (
        <div className='main_cards_item'>
            <div className='main_cards_item_header'>
                <div className='main_cards_item_header_top'>
                    <i className='far fa-eye' /> <span>{data.views}</span>
                </div>
            </div>
            <div style={{background: '#eeeeee',padding: '0 15px'}}>
                <span className='main_cards_item_content_title'>{data.title}</span>
                <div className='main_cards_item_content_desc'>{data.description}</div>
                <div className='main_cards_item_content_place'>
                    <i className='fas fa-map-marker-alt main_cards_item_content_place_icon' />
                    <span className='main_cards_item_content_place_text'>{`${data.city} ${data.address}`}</span>
                </div>
                <div className='main_cards_item_content_time'>
                    <Moment fromNow>{new Date(data.date)}</Moment>
                </div>
                <div className='main_cards_item_content_href'>
                    <NavLink to={`/events/${data._id}`} onClick={()=>dispatch(getViews())}>Подробнее</NavLink>
                </div>
            </div>
        </div>
    );
};

export default UserEventsList;