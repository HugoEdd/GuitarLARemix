import { Link } from '@remix-run/react';
// Link es para enlace, links para la parte superior de el layer
import logo from '../../public/img/logo.svg';
import Navegacion from './navegacion';

function Header(){


    return (
        <header className="header">
            <div className="contenedor barra">
                <Link to="/" className="logo">

                    {/* remix aún no tiene un componente para imagenes */}
                    <img className='logo' src={logo} alt="Imagen logo" />

                </Link>
            
            <Navegacion />
                
            </div>
        </header>
    )
}

export default Header;