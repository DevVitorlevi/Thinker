
import image1 from '../assets/ft1.png'
import { Container, Imagediv, Formdiv } from '../styles/Login'

const Register = () => {
    return (
        <>
            <Container>
                <Imagediv>
                    <h1 className='font'>THINKER</h1>
                    <img src={image1} alt="" />
                </Imagediv>
                <Formdiv>
                    <form>
                        <input type="text" />
                    </form>
                </Formdiv>
            </Container>
        </>
    )
}

export default Register