import Logo from '../assets/logo.png'
import { X, Menu } from 'lucide-react'
import { Link } from 'react-router-dom'
import { HeaderS, Desktop, Mobile } from '../styles/Header'
import { useState } from 'react'

const Header = () => {
    // Tipagem explícita de "open" como boolean
    const [open, setOpen] = useState(false)

    // Função para alternar o estado do menu
    const toggleMenu = () => {
        setOpen(!open)
    }

    return (
        <HeaderS>

            <Link to='/'>
                <img src={Logo} alt="Logo" />
            </Link>
            <Desktop className='desktop'>

            </Desktop>

            <Mobile>
                <span onClick={toggleMenu}>
                    {open ? <X className='icon' /> : <Menu className='icon' />}
                </span>
                <div className={`mobile_menu ${open ? 'open' : ''}`}>
                    <ul className="menu_items">
                        <li>
                            <Link to="/" onClick={() => setOpen(false)}>Home</Link>
                        </li>
                        <li>
                            <Link to="/about" onClick={() => setOpen(false)}>About</Link>
                        </li>
                        <li>
                            <Link to="/services" onClick={() => setOpen(false)}>Services</Link>
                        </li>
                        <li>
                            <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>
                        </li>
                    </ul>
                </div>
            </Mobile>
        </HeaderS>
    )
}

export default Header