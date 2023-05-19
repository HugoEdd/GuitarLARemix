import { useLoaderData } from '@remix-run/react';
import {getGuitarras} from '~/models/guitarras.server';
import ListadoGuitarras from '~/components/listado-guitarras'
// Loader - cambia con los proyectos anteriores
// Con que lo exportemos se manda a llamar en automatico - no lo tenemos que asociar
// loader lo utilizamos cuando el componente carga y el action es cuando enviamos datos desde un formulario
// siempre lo que retorne loade, vamos a acceder a ello con el useLoaderData
export function meta() {
  return [
    {title: 'GuitarLA - Tienda de Guitarras'},
    {description: 'GuitarLA - Nuestra colección de guitarras'}
  ]
}
// !Ya no necesitamos la hoja de estilos porque con nested la clase padre nos la hereda
// Lo que coloquemos dentro de ese links, aplica a todo el archivo. Osea todos lo que este abajo, incluye los componentes hijos también

export async function loader() {
  const guitarras = await getGuitarras();
  return guitarras.data;
}

function Tienda() {
  // obtener guitarras en el componente, para ello debemos usar un hook
  const guitarras = useLoaderData();

  return (
       <ListadoGuitarras 
          guitarras={guitarras}
        />
  )
}

export default Tienda