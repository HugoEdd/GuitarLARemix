import { Link, useLocation } from '@remix-run/react';
import imagen from '../../public/img/carrito.png'
// Link es para enlace, links para la parte superior de el layer
function Navegacion() {

   const location = useLocation();

  return (
    <nav className="navegacion">
    {/* Es recomendable utilizar el componente de Link, si se cumple la condición agrega la clase active, sino no agregues nada */}
      <Link to="/" className={ location.pathname === '/' ? 'active' : ''}>Inicio</Link>
      <Link to="/nosotros" className={ location.pathname === '/nosotros' ? 'active' : ''}>Nosotros</Link>
      <Link to="/guitarras" className={ location.pathname === '/guitarras' ? 'active' : ''}>Tienda</Link>
      <Link to="/blog" className={location.pathname === '/blog' ? 'active' : ''}>Blog</Link>
      <Link to="/carrito"><img src={imagen} alt="carrito de compras"/></Link>

    </nav>
      
  )
}

export default Navegacion