import React from "react"
import { NavLink } from "react-router-dom"
import Moment from "react-moment"
import "moment/locale/ru"
import { getViews } from "../../store/actions/events"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import Highlighter from "react-highlight-words"

export default function CardEvent(props) {
  const { userId } = useParams()

  function findAuthor() {
    const author = props.user.find(el => el._id === props.data.user)
    if (author) {
      return author.username
    }
    return "не указан"
  }
  const searchWord = useSelector(state => state.events.searchEvent)

  const dispatch = useDispatch()
  return (
    <div className='main_cards_item'>
      <div className='main_cards_item_relative'>
        <img src={props.data.photos[0]} className='main_cards_item_img' />
        <div className='main_cards_item_header_top'>
          <i className='far fa-eye' /> <span>{props.data.views}</span>
        </div>
      </div>
      <div
        className='main_cards_item_content'
        style={userId && { background: "rgb(238, 238, 238)" }}
      >
        <span className='main_cards_item_content_title'>
          <Highlighter
            highlightClassName='highlightText'
            searchWords={[searchWord]}
            autoEscape={true}
            textToHighlight={props.data.title}
          />
        </span>
        <div className='main_cards_item_content_desc'>
          <Highlighter
            highlightClassName='highlightText'
            searchWords={[searchWord]}
            autoEscape={true}
            textToHighlight={props.data.description}
          />
        </div>
        <div className='main_cards_item_content_place'>
          <i className='fas fa-map-marker-alt main_cards_item_content_place_icon' />
          <span className='main_cards_item_content_place_text'>
            <Highlighter
              highlightClassName='highlightText'
              searchWords={[searchWord]}
              autoEscape={true}
              textToHighlight={`${props.data.city} ${props.data.address}`}
            />
          </span>
        </div>
        <div
          className='main_cards_item_content_time'
          style={{ marginBottom: "10px" }}
        >
          <Moment fromNow>{new Date(props.data.date)}</Moment>
        </div>
        {!userId && (
          <NavLink
            to={`/events/getUserInfo/${props.data.user}`}
            className='main_cards_item_content_author'
          >
            <div className='main_cards_item_content_author_ava far fas fa-user-circle' />
            <div className='main_cards_item_content_author_name'>
              {findAuthor()}
            </div>
          </NavLink>
        )}
        <div className='main_cards_item_content_href'>
          <NavLink
            to={`/events/${props.data._id}`}
            onClick={() => dispatch(getViews())}
          >
            Подробнее
          </NavLink>
        </div>
      </div>
    </div>
  )
}
