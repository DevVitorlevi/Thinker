import Logo from '../assets/Logo.jpg'
import { X, Menu, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { HeaderS, Desktop, Mobile } from '../styles/Header'
import { useState } from 'react'

const Header = () => {
    // Tipagem explícita de "open" como boolean
    const [open, setOpen] = useState<boolean>(false)

    // Função para alternar o estado do menu
    const toggleMenu = (): void => {
        setOpen(!open)
    }
    const SearchOpen = (): void => {
        setOpen(!open)

    }

    return (
        <HeaderS>
            <Link to='/'>
                <img src={Logo} alt="Logo" />
            </Link>

            <Desktop className='desktop'>
                {/* Pode adicionar um menu de desktop aqui, caso queira */}
            </Desktop>

            <Mobile>
                <span onClick={SearchOpen}>
                    <Search className='search' />
                    {open ? <input type='text'></input> : ''}
                </span>
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
