
import Logo from '../assets/Logo.jpg'
import { X, Menu } from 'lucide-react'
import { Link } from 'react-router-dom'
import { HeaderS, Desktop, Mobile } from '../styles/Header'
import { useState } from 'react'
const Header = () => {
    const [open, setopen] = useState(false)
    const toogleMenu = () => {
        setopen(!open);

    }
    return (
        <HeaderS>
            <Link to='/'><img src={Logo} /></Link>

            <Desktop className='desktop'>
            </Desktop>
            <Mobile>
                <span onClick={toogleMenu}>
                    {open ? <X /> : <Menu />}
                </span>
            </Mobile>
        </HeaderS>
    )
}

export default Header