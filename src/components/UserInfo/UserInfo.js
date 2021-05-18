import React, {useEffect, useState} from 'react'
import './userinfo.css'
import {Formik} from 'formik'
import * as yup from 'yup'
import {useDispatch, useSelector} from 'react-redux'
import {updateUserInfo} from "../../store/actions/auth";

export default function UserInfo() {
    const userInfo = useSelector((state) => state.auth.userData)
    const validationSchema = yup.object().shape({
        name: yup.string().required('Обязательное поле'),
        phone: yup.number().required('Обязательное поле'),
        site: yup.string().required('Обязательное поле')
    })

    const updateLoading = useSelector(s=>s.auth.updateUserInfo.loading)
    const dispatch = useDispatch()
    const onSubmit = (data, {resetForm}) => {
        dispatch(updateUserInfo(data))
        resetForm()
    }
    return (
        <Formik
            initialValues={{
                phone: userInfo.phone,
                name: userInfo.name,
                site: userInfo.site
            }}
            enableReinitialize
            validateOnBlur
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty}) => (
                <div className='userInfo'>
                    <h1>Личные данные</h1>
                    <div className='adduserevent_form'>
                        <div className='adduserevent_form_title'>ФИО организатора</div>
                        <input
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name='name'
                            style={{marginBottom: 20}}
                            className='auth_form'
                            type='text'
                        />
                        {touched.name && errors.name && <div className='inputError'>{errors.name}</div>}
                        <div className='adduserevent_form_title'>Телефон</div>
                        <input
                            value={values.phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name='phone'
                            className='auth_form'
                            type='tel'
                        />
                        {touched.phone && errors.phone && <div className='inputError'>{errors.phone}</div>}
                        <div className='adduserevent_form_title'>Сайт организатора</div>
                        <input
                            value={values.site}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name='site'
                            className='auth_form'
                            type='text'
                        />
                        {touched.site && errors.site && <div className='inputError'>{errors.site}</div>}
                        <button
                            type='submit'
                            disabled={!isValid || !dirty }
                            onClick={handleSubmit}
                            className='auth_btn adduserevent_btn'
                        >
                            {updateLoading ? 'Обновляется...' : 'Обновить'}
                        </button>
                    </div>
                </div>
            )}
        </Formik>
    )
}
