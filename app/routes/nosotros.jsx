// Esta página va a ser una página estatica
import imagen from '../../public/img/nosotros.jpg';
import styles from '~/styles/nosotros.css';
// import { useOutletContext } from '@remix-run/react'; // nos ayuda a consumir el useContext que declaramos
// al estar agregado en el document dectecta esta funcion que estamos exportando. Inyecta hojas de estilo, y las imagene que agreguemos en esa funcion

// Si declaremos meta aquí. Va a sobreescribir el global que esta en root
// description es una etiqueta muy recomenda para el SEO
export function meta(){
  return [
    { title: 'GuitarLA - Sobre Nosotros' },
    { description: 'Venta de Guitarras, blog de música' }
  ];
}

// mantiene las links anteriores que tenemos, y podemos agregar nuevas, en este caso hoja de estilo
export function links() {
  return [
    {
      rel: 'stylesheet',
      href: styles
    },
    {
      rel: 'preload',
      href: imagen,
      as: 'image'
    }
    // tan pronto como cargues la pagina carga esta imagen, video o archivo js, eso es re: 'preload'
    // Entonces le ponemos la imagen, para que se cargue junto al html, dandole prioridad
    // Se recomienda para imagenes que son muy grandes
  ]
}

function Nosotros() {


  return (
    <main className="contenedor nosotros">
      <h2 className="heading">Nosotros</h2>

      <div className="contenido">
          <img src={imagen} alt="imagen sobre nosotros" />

        <div>
          <p>
            Quisque ultrices efficitur commodo. Vivamus et justo at augue semper euismod et vitae odio. 
            Etiam varius pretium turpis, et tincidunt tortor. Fusce et venenatis quam, vitae aliquet sapien.
            Cras id sem quis ex egestas suscipit. Ut aliquam pulvinar luctus. Vestibulum ligula massa,
            porttitor et ex vel, sagittis vehicula nunc. Pellentesque ut ante mauris.
            In hendrerit nisi et nisl lacinia, vitae egestas velit tempor.
          </p>
          <p>
            Quisque ultrices efficitur commodo. Vivamus et justo at augue semper euismod et vitae odio. 
            Etiam varius pretium turpis, et tincidunt tortor. Fusce et venenatis quam, vitae aliquet sapien.
            Cras id sem quis ex egestas suscipit. Ut aliquam pulvinar luctus. Vestibulum ligula massa,
            porttitor et ex vel, sagittis vehicula nunc. Pellentesque ut ante mauris.
            In hendrerit nisi et nisl lacinia, vitae egestas velit tempor.
          </p>
        </div>
      </div>
    </main>
  )
}

export default Nosotros