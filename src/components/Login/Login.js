import React from 'react'
import './Login.css'
import { Formik } from 'formik'
import * as yup from 'yup'
import { login } from '../../store/actions/auth.js'
import { useDispatch, useSelector } from 'react-redux'

export default function Login() {
	const validationSchema = yup.object().shape({
		email: yup.string().required('Обязательное поле').email('Введите верный формат email'),
		password: yup.string().required('Обязательное поле').min(9, 'Минимальное количество символов 9')
	})
	const loginState = useSelector((state) => state.auth.login)
	const dispatch = useDispatch()
	const [isPassword, setIsPassword] = React.useState(true)
	const loading = useSelector((state) => state.auth.login.loading)
	const onSubmit = (data, { resetForm }) => {
		dispatch(login(data))
		resetForm({})
	}
	return (
		<div className='login'>
			<div className='auth_desc'>Вход в личный кабинет</div>
			<Formik
				initialValues={{
					email: '',
					password: ''
				}}
				validateOnBlur
				onSubmit={onSubmit}
				validationSchema={validationSchema}
			>
				{({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => (
					<form className='auth_forma'>
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
								onKeyDown={(e) => {
									if (e.key === 'Enter') {
										handleSubmit()
									}
								}}
							/>
						</div>
						{touched.email && errors.email && <div className='inputError'>{errors.email}</div>}
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
								onKeyDown={(e) => {
									if (e.key === 'Enter') {
										handleSubmit()
									}
								}}
							/>
						</div>
						{touched.password && errors.password && <div className='inputError'>{errors.password}</div>}
						<a href={'https://eventmaker-api.herokuapp.com/google/auth'} className={'google_link'}>
							<i className='fab fa-google google_icon'>
								<span>Log in with Google</span>
							</i>
						</a>
						<button type='button' disabled={!isValid || !dirty} onClick={handleSubmit} className='auth_btn'>
							{loading ? 'Загрузка...' : 'Вход'}
						</button>
						{loginState.failed && <div className='failedMesssage'>Неверный логин или пароль</div>}
					</form>
				)}
			</Formik>
		</div>
	)
}
