import React from 'react'
import './Registration.css'
import { Formik } from 'formik'
import * as yup from 'yup'
import NumberFormat from 'react-number-format'
import { auth } from '../../store/actions/auth.js'
import { useDispatch, useSelector } from 'react-redux'

export default function Registration() {
	const dispatch = useDispatch()
	const validationSchema = yup.object().shape({
		username: yup.string().required('Обязательное поле').min(3, 'Минимальное количество символов 3'),
		email: yup.string().required('Обязательное поле').email('Введите верный формат email'),
		password: yup.string().required('Обязательное поле').min(9, 'Минимальное количество символов 9'),
		phone: yup.string().required('Обязательное поле').min(16, 'Введите верный формат номера')
	})
	const registrationState = useSelector((state) => state.auth.registration)
	const [isPassword, setIsPassword] = React.useState(true)
	const onSubmit = (data, { resetForm }) => {
		dispatch(auth(data))
		resetForm({})
	}
	return (
		<div className='registration'>
			<div className='auth_desc'>Регистрация и бесплатное размещение событий</div>
			<Formik
				initialValues={{
					email: '',
					password: '',
					phone: '996',
					username: ''
				}}
				validateOnBlur
				onSubmit={onSubmit}
				validationSchema={validationSchema}
			>
				{({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => (
					<form className='auth_forma'>
						<div
							className={touched.username && errors.username ? 'auth_form-error auth_form' : 'auth_form'}
						>
							<i className='fas fa-user' />
							<input
								value={values.username}
								onChange={handleChange}
								onBlur={handleBlur}
								placeholder='Имя пользователя'
								type='text'
								name='username'
								className='auth_input'
							/>
						</div>
						{touched.username && errors.username && <div className='inputError'>{errors.username}</div>}
						<div className={touched.email && errors.email ? 'auth_form-error auth_form' : 'auth_form'}>
							<i className='fas fa-envelope' />
							<input
								value={values.email}
								onChange={handleChange}
								onBlur={handleBlur}
								placeholder='Почта'
								type='email'
								name='email'
								className='auth_input'
							/>
						</div>
						{touched.email && errors.email && <div className='inputError'>{errors.email}</div>}
						<div className={touched.phone && errors.phone ? 'auth_form-error auth_form' : 'auth_form'}>
							<i className='fas fa-phone-square-alt' />
							<NumberFormat
								name='phone'
								type='tel'
								value={values.phone}
								onChange={handleChange}
								onBlur={handleBlur}
								className='auth_input'
								format='+### ### ### ###'
								placeholder='+996 ___ ___ ___'
								mask='_'
							/>
						</div>
						{touched.phone && errors.phone && <div className='inputError'>{errors.phone}</div>}
						<div
							className={touched.password && errors.password ? 'auth_form-error auth_form' : 'auth_form'}
						>
							<i
								onClick={() => setIsPassword(!isPassword)}
								className={isPassword ? 'fas fa-lock' : 'fas fa-lock-open'}
							/>
							<input
								value={values.password}
								onChange={handleChange}
								onBlur={handleBlur}
								placeholder='Пароль'
								type={isPassword ? 'password' : 'text'}
								name='password'
								className='auth_input'
								autoComplete='on'
							/>
						</div>
						{touched.password && errors.password && <div className='inputError'>{errors.password}</div>}
						<a href={'http://localhost:3001/google/auth'} className={'google_link'}>
							<i className='fab fa-google google_icon'>
								<span>Sign up with Google</span>
							</i>
						</a>
						<button type='button' disabled={!isValid || !dirty} onClick={handleSubmit} className='auth_btn'>
							{registrationState.loading ? 'Загрузка...' : 'Зарегистрироваться'}
						</button>
						{registrationState.success && (
							<div className='successMesssage'>{registrationState.message}</div>
						)}
						{registrationState.failed && <div className='failedMesssage'>Ошибка при регистрации</div>}
					</form>
				)}
			</Formik>
		</div>
	)
}
