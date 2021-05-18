import React, {useState} from 'react'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../../store/actions/events'
import './GetUserInfo.css'
import Container from '../../components/Container'
import CardEvent from "../../components/CardEvent/CardEvent";
import GetUserInfoPagination from "./GetUserInfoPagination/GetUserInfoPagination";

export default function GetUserInfo(props) {
	const { userId } = useParams()
	const {page} = useParams()
	const showPerPage = 6
	const [pagination, setPagination] = useState({
		start: showPerPage * (+page - 1),
		end: showPerPage * +page
	})

	const onPaginationChange = (start, end) => {
		setPagination({start: start, end: end})
	}

	const dispatch = useDispatch()
	React.useEffect(() => {
		window.scrollTo(0,0)
		dispatch(getUser(userId))
	}, [])
	const user = useSelector((state) => state.events.getUser)
	return (
		<div className='getuserinfo'>
			<Header />
			<Container>
				<div className='getuserinfo_header'>
					<div className='fas fa-user-circle getuserinfo_header_ava' />
					<div className='getuserinfo_header_info'>
						<div className='getuserinfo_header_info_username'>{user.username}</div>
						<div className='getuserinfo_header_info_email'>Почта: {user.email}</div>
						<div className='getuserinfo_header_info_email'>Количество постов: {user.total}</div>
					</div>
				</div>
				{user.events && user.events.length === 0 ? (
					<div className='main_title'> У данного пользователя нет событий</div>
				) : (
					<div className='main_title'>Список событий </div>
				)}
				<div className='main_cards' style={{ marginBottom: '40px' }}>
					{user.events && user.events.slice(pagination.start, pagination.end).map((item) => <CardEvent data={item} key={item._id} />)}
				</div>
				{user.events && user.events.length !== 0 &&
				<GetUserInfoPagination
					userId={userId}
					page={page}
					showPerPage={showPerPage}
					onPaginationChange={onPaginationChange}
					total={user.events.length}
				/>}
			</Container>
			<Footer />
		</div>
	)
}
