import { Outlet, useOutletContext } from '@remix-run/react';
import styles from '~/styles/guitarras.css';
// Loader - cambia con los proyectos anteriores
// Con que lo exportemos se manda a llamar en automatico - no lo tenemos que asociar
// loader lo utilizamos cuando el componente carga y el action es cuando enviamos datos desde un formulario
// siempre lo que retorne loade, vamos a acceder a ello con el useLoaderData

// ambos archivos de guitarras utilizan los mismo archivos
export function links() {
  return [
    {
      rel: 'stylesheet',
      href: styles
    }
  ]
}


function Tienda() {

  // useContext - hace muchos re renders pero eso es parte de su desventaja

  return (
    <main className='contenedor'>
      
      {/* Al implementar el Nested route, con el outlet inyecta aumaticamente la ruta dinamica osea $guitarraUrl */}
      {/* al agregar useOutletContext , pues practicamente pasa este context hacia los hijos */}
        <Outlet context={useOutletContext()} />
    </main>
  )
}

export default Tienda
// Este file va actuar como un layout o una plantilla donde los archivos de la carpeta guitarra van a inyectar su contenido