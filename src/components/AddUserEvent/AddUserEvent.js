import React, { useState, useCallback, useRef, useEffect } from 'react'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import Container from '../../components/Container'
import './addUserEvent.css'
import { Formik } from 'formik'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { postEvent } from '../../store/actions/events'

export default function AddUserEvent() {
	const [photos,setPhotos] = useState([])
	const onSelectFile = (event) => {
		let images = []
		const files = event.target.files
		for (let i = 0; i < files.length; i++) {
			const reader = new FileReader()
			reader.readAsDataURL(files[i])
			reader.onload = (e) => {
				images = [...images, e.target.result]
				setPhotos(images)
			}
		}
	}
	const dispatch = useDispatch()
	const validationSchema = yup.object().shape({
		title: yup.string().required('Обязательное поле').min(5, 'Минимальное количество символов 5'),
		description: yup
			.string()
			.required('Обязательное поле')
			.min(15, 'Минимальное количество символов 15')
			.max(200, 'Максимальное количество символов 200'),
		phone: yup.string().required('Обязательное поле').min(9, 'Минимальное количество символов 9'),
		city: yup.string().required('Обязательное поле'),
		type: yup.string().required('Обязательное поле'),
		date: yup.string().required('Обязательное поле'),
		photos:yup.array().required('Обязательное поле'),
		address: yup.string().required('Обязательное поле').min(9, 'Минимальное количество символов 9'),
		_message: yup.string().required('Обязательное поле').min(100, 'Минимальное количество символов 100')
	})
	const onSubmit = (data, { resetForm }) => {
		resetForm({})
		data.photos = photos
		console.log(data)
	    dispatch(postEvent(data))
		setPhotos([])
	}
	return (
		<div className='adduserevent'>
			<Formik
				initialValues={{
					title: '',
					description: '',
					phone: '',
					city: '',
					type: '',
					date: '',
					address: '',
					_message: '',
					photos:[]
				}}
				validateOnBlur
				onSubmit={onSubmit}
				validationSchema={validationSchema}
			>
				{({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => (
					<div className='adduserevent_form'>
						<div className='adduserevent_form_title'>Напишите название</div>
						<input
							value={values.title}
							onChange={handleChange}
							onBlur={handleBlur}
							name='title'
							className='auth_form'
							type='text'
						/>
						{touched.title && errors.title && <div className='inputError'>{errors.title}</div>}
						<div className='adduserevent_form_title'>Напишите краткое описание (не более 200 символов)</div>
						<textarea
							value={values.description}
							onChange={handleChange}
							onBlur={handleBlur}
							name='description'
							maxLength={200}
							style={{ height: '140px' }}
							className='auth_form'
							type='text'
						/>
						{touched.description && errors.description && (
							<div className='inputError'>{errors.description}</div>
						)}
						<div className='adduserevent_form_title'>Напишите полное описание</div>
						<textarea
							style={{ overflowY: 'none' }}
							value={values._message}
							onChange={handleChange}
							onBlur={handleBlur}
							name='_message'
							style={{ height: '170px' }}
							className='auth_form'
							type='text'
						/>
						{touched._message && errors._message && <div className='inputError'>{errors._message}</div>}
						<div className='header_modal_block_body_form'>
								<input
									name='photos'
									className='header_modal_block_body_inputFile'
									placeholder='Upload File'
									type='file'
									onChange={onSelectFile}
								/>
								<span className='header_modal_block_body_downloadBtn'>Выбрать файл</span>
							</div>
						{photos.length !== 0 && <div style={{textAlign:'left',marginBottom:'20px',color:'red'}}>Изображение загружено</div>}
						<div className='adduserevent_form_row'>
							<div className='adduserevent_form_row_item'>
								<div className='adduserevent_form_title'>Выберите вид мероприятия</div>
								<select name='type' value={values.type} onChange={handleChange} onBlur={handleBlur}>
									<option value='' disabled selected>
										Мероприятие
									</option>
									<option value='Концерты'>Концерты</option>
									<option value='Встречи'>Встречи</option>
									<option value='Выставки'>Выставки</option>
									<option value='Экскурсии'>Экскурсии</option>
									<option value='Обучение'>Обучение</option>
								</select>
								{touched.type && errors.type && <div className='inputError'>{errors.type}</div>}
							</div>
							<div className='adduserevent_form_row_item'>
								<div className='adduserevent_form_title'>Выберите свой город</div>
								<select name='city' value={values.city} onChange={handleChange} onBlur={handleBlur}>
									<option value='' disabled selected>
										Город
									</option>
									<option value='Бишкек'>Бишкек</option>
									<option value='Ош'>Ош</option>
									<option value='Токмок'>Токмок</option>
								</select>
								{touched.city && errors.city && <div className='inputError'>{errors.city}</div>}
							</div>
						</div>

						<div className='adduserevent_form_title'>Напишите адрес</div>
						<input
							value={values.address}
							onChange={handleChange}
							onBlur={handleBlur}
							name='address'
							className='auth_form'
							type='text'
						/>
						{touched.address && errors.address && <div className='inputError'>{errors.address}</div>}
						<div className='adduserevent_form_title'>Выберите время и дату</div>
						<input
							value={values.date}
							onChange={handleChange}
							onBlur={handleBlur}
							name='date'
							min={`2021-03-04T00:00`}
							className='form-control'
							type='datetime-local'
						/>
						{touched.date && errors.date && <div className='inputError'>{errors.date}</div>}
						<div className='adduserevent_form_title'>Оставьте номер телефона или ссылку на вас</div>
						<input
							value={values.phone}
							onChange={handleChange}
							onBlur={handleBlur}
							name='phone'
							className='auth_form'
							type='text'
						/>
						{touched.phone && errors.phone && <div className='inputError'>{errors.phone}</div>}
						
						<button
							type='submit'
							disabled={!isValid || !dirty || photos.length === 0 }
							onClick={handleSubmit}
							className='auth_btn adduserevent_btn'
						>
							Создать
						</button>
					</div>
				)}
			</Formik>
		</div>
	)
}
