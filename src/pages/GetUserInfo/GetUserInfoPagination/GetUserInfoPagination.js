import React, {useState, useEffect} from 'react'
import {NavLink} from 'react-router-dom'

const GetUserInfoPagination = ({userId, showPerPage, onPaginationChange, total, page}) => {
    const [counter, setCounter] = useState(1)
    const numberOfButtons = Math.ceil(total / showPerPage)

    useEffect(() => {
        if (page) {
            setCounter(+page)
        }
        const value = showPerPage * counter
        onPaginationChange(value - showPerPage, value)
    }, [counter, page])

    const onButtonClick = (type) => {
        if (type === 'prev') {
            if (counter === 1) {
                setCounter(1)
            } else {
                setCounter(counter - 1)
            }
        } else if (type === 'next') {
            if (numberOfButtons === counter) {
                setCounter(counter)
            } else {
                setCounter(counter + 1)
            }
        }
    }
    return (
        <div className='d-flex justify-content-center'>
            <nav aria-label='Page navigation example'>
                <ul className='pagination'>
                    <li className='page-item'>
                        <NavLink
                            to={
                                (counter > 1 && `/events/getUserInfo/${userId}/page/${counter - 1}`) ||
                                (!page && `/events/getUserInfo/${userId}`) ||
                                (page && counter === 1 && `/events/getUserInfo/${userId}/page/${counter}`)
                            }
                            style={{cursor: 'pointer'}}
                            className='page-link'
                            onClick={() => onButtonClick('prev')}
                        >
                            <i className='fas fa-arrow-left'/>
                        </NavLink>
                    </li>

                    {new Array(numberOfButtons).fill('').map((el, index) => (
                        <li key={index} className={`page-item ${index + 1 === counter ? 'active' : null}`}>
                            <NavLink
                                to={`/events/getUserInfo/${userId}/page/${index + 1}`}
                                style={{cursor: 'pointer'}}
                                className='page-link'
                                onClick={() => setCounter(index + 1)}
                            >
                                {index + 1}
                            </NavLink>
                        </li>
                    ))}
                    <li className='page-item'>
                        <NavLink
                            to={
                                (!page && counter === numberOfButtons && `/events/getUserInfo/${userId}`) ||
                                (counter === numberOfButtons && `/events/getUserInfo/${userId}/page/${counter}`) ||
                                (counter !== numberOfButtons && `/events/getUserInfo/${userId}/page/${counter + 1}`)
                            }
                            style={{cursor: 'pointer'}}
                            className='page-link'
                            onClick={() => onButtonClick('next')}
                        >
                            <i className='fas fa-arrow-right'></i>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default GetUserInfoPagination
