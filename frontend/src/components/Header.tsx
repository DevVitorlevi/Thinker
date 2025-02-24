import { HeaderS } from '../styles/Header'
import Logo from '../assets/Logo.jpg'
import { Link } from 'react-router-dom'
import { Desktop, Mobile } from '../styles/Header'
const Header = () => {
    return (
        <HeaderS>
            <Link to='/'><img src={Logo} /></Link>

            <Desktop>

            </Desktop>
            <Mobile>

            </Mobile>
        </HeaderS>
    )
}

export default Header