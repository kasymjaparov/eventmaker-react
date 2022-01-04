import React from 'react'
import {NavLink, Route} from 'react-router-dom'
import Container from '../../components/Container'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import AddUserInfo from '../../components/AddUserEvent/AddUserEvent'
import UserEvents from '../../components/UserEvents/UserEvents'
import UserInfo from '../../components/UserInfo/UserInfo'
import './AddEvent.css'
import {useDispatch, useSelector} from 'react-redux'
import {googleLogout, logout} from '../../store/actions/auth'
import ModalWindow from '../../components/ModalWindow/ModalWindow'
import UserEventsPagination from '../../components/UserEvents/UserEventsPagination/UserEventsPagination'
import {setInputValue} from '../../store/actions/events'

export default function AddEvent() {
    const dispatch = useDispatch()
    const postEventSuccess = useSelector((state) => state.events.postEventState.success)
    const updateUserInfoSuccess = useSelector(s => s.auth.updateUserInfo.success)
    const links = [
        {href: '/lk/add/', text: 'Создать событие', component: AddUserInfo, icon: 'fas fa-pen'},
        {href: '/lk/events/page/:page', text: 'Список событий', component: UserEvents, icon: 'far fa-calendar-alt'},
        {href: '/lk/userInfo/', text: 'Личные данные', component: UserInfo, icon: 'far fa-user'}
    ]
    React.useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    React.useEffect(() => {
        if (postEventSuccess) {
            window.scrollTo(0, 0)
            document.querySelector('body').style.overflow = 'hidden'
        } else {
            document.querySelector('body').style.overflow = 'auto'
        }
    }, [postEventSuccess])

    return (
        <div className='lk'>
            {postEventSuccess && (
                <ModalWindow
                    text={(postEventSuccess ? 'Вы успешно создали пост' : 'Ошибка')}
                    success={postEventSuccess}
                />
            )}
            {
                updateUserInfoSuccess && (
                    <ModalWindow
                        text={(updateUserInfoSuccess ? 'Информация о личных данных успешно обновлена' : 'Ошибка')}
                        success={updateUserInfoSuccess}
                    />
                )
            }
            <Header/>
            <Container>
                <div className='lk_links'>
                    {links.map((item, idx) => (
                        <NavLink
                            className='lk_links_item'
                            key={item.href}
                            onClick={() => dispatch(setInputValue(''))}
                            activeClassName='lk_links_item-active'
                            to={idx === 1 ? '/lk/events/page/1' : item.href}
                        >
                            <i className={item.icon}/>
                            <span>{item.text}</span>
                        </NavLink>
                    ))}
                    {localStorage.getItem('google') && (
                        <a
                            href={'https://eventmaker-api.herokuapp.com/google/logout'}
                            onClick={() => {
                                dispatch(googleLogout())
                                dispatch(setInputValue(''))
                            }}
                            className='lk_links_item'
                        >
                            <i className='fas fa-sign-out-alt'/>
                            <span>Выйти</span>
                        </a>
                    )}
                    {localStorage.getItem('token') && (
                        <span
                            onClick={() => {
                                dispatch(setInputValue(''))
                                dispatch(logout())
                            }}
                            className='lk_links_item'
                        >
							<i className='fas fa-sign-out-alt'/>
							<span>Выйти</span>
						</span>
                    )}
                </div>
                <div className='lk_content'>
                    {links.map((item) => (
                        <Route path={item.href} key={item.href} component={item.component}/>
                    ))}
                </div>
            </Container>
            <Footer/>
        </div>
    )
}
