import React from 'react'
import Container from '../Container'
import './Footer.css'

export default function Footer() {
    const footer_links = [
        {href: '', text: 'О проекте'},
        {href: '', text: 'Контакты'},
        {href: '', text: 'Оферта'}
    ]
    return (
        <footer className='footer'>
            <div className='footer_content'>
                <Container>
                    <div className='footer_logo'>
                        <span>E</span>VENTMAKER
                    </div>
                    <div className='footer_content_links'>
                        {footer_links.map((item) => (
                            <a key={item.text} href={item.href}>{item.text}</a>
                        ))}
                    </div>
                </Container>
            </div>
            <div className='footer_content_info'>
                <Container>
                    <div className="footer_content_info_years">2019-2021, EVENTMAKER - афиша событий</div>
                    <div className="footer_content_info_social"><i
                        className="fab fa-telegram-plane"/><span>Telegram</span></div>
                </Container>
            </div>
        </footer>
    )
}
