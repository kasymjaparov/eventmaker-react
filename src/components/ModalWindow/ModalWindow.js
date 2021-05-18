import React from 'react'
import './ModalWindow.css'

export default function ModalWindow(props) {
	return (
		<div className='modalWindow'>
			<div className='modalWindow_block'>
				<div style={!props.success ? { background: '#ef5354' } : {}} className='modalWindow_block_header'>
					<div className={props.success ? 'far fa-check-circle' : 'far fa-times-circle'} />
				</div>
				<div className='modalWindow_block_content'>{props.text}</div>
			</div>
		</div>
	)
}
