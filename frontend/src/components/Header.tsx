import { HeaderS } from '../styles/Header'
import { NavLink } from 'react-router-dom'
import Logo from '../assets/Logo.jpg'
const Header = () => {
    return (
        <HeaderS>
            <img src={Logo} alt="" />
        </HeaderS>
    )
}

export default Header