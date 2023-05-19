import { useState } from 'react'; // no podemos utilizar states en un meta o un loader o en un action
import { useLoaderData, useOutletContext } from '@remix-run/react';
import { getGuitarra } from '~/models/guitarras.server';


export async function loader({params}) {
    // request petición que se esta realizando
    // params los params se parece al guitar rl que es el nombre del archivo
    const { guitarraUrl } = params;
    
    const guitarra = await getGuitarra(guitarraUrl);

    // Dandole solucion a la respuesta
    if (guitarra.data.length === 0) {
        // si es igual 0 no hay data, pero ahora lo vamos a interpretar con lo siguiente
        throw new Response('', {
            status: 404,
            statusText: 'Guitarra No Encontrada'
        })
    }
    return guitarra;
}


export function meta({data}) {
    if (!data) {
        return [
            {
                title: 'GuitarLA - Guitarra No encontrada',
                description: `Guitarras, venta de guitarras, guitarra no encontrada`
            }
        ]
    }
    return [
        {
            title: `GuitarLA - ${data?.data[0]?.attributes.nombre}`,
            description: `Guitarras, venta de guitarras, guitarra ${data.data[0].attributes.nombre}`
        }
    ]
}

// Eliminamos la hoja de estilos y no tenemos problema, porque la estamos cargando en el componente padre

function GuitarraUrl() {

    // const {sumar} = useOutletContext(); fue parte de useOutletContext
    const {agregarCarrito} = useOutletContext();
    const [cantidad, setCantidad] = useState(0); 
    const guitarra = useLoaderData();
    const { nombre, descripcion, imagen, precio } = guitarra.data[0].attributes;

    const handleSubmit = e => {
        e.preventDefault();

        if(cantidad < 1) {
            alert('Debes seleccionar una cantidad');
            return;
        }
        // en proyectos reales, lo mejor que podemos hacer es evitar la mayor cantidad de llamados hacia una api
        // llave y valore iguales solo puedes poner el valor como en este caso nombre
        const guitarraSeleccionada = {
          id: guitarra.data[0].id ,
          imagen: imagen.data.attributes.url,
          nombre,
          precio,
          cantidad,
        }

        agregarCarrito(guitarraSeleccionada);

        // ! TENEMOS QUE TENER UN ESTADO GLOBAL DE NUESTRA APLICACION, PARA QUE CUANDO ESTE CAMBIANDO SE SINCRONIZE CON LO APLICACION
        // context api - basicamente es mantener un estado global sin dependencias
        // Context API esta disponible desde react 16.3 puedes pasar el state o funciones desde el componente principal hasta los hijos
        // sin necesidad de pasarlo por cada componente
        // cuenta con un hook llamado useContext - tanto remix con nextjs ya tienen un context integrado
        // también se puede actualizar el state desde el hijo( o ejecutar un funcion que lo actualice)
        // basicamente context va a ser un componente
        // desventaja tiene muchos re-renders


        // console.log(guitarraSeleccionada);
    }

  return (
    <div className='guitarra'>
          <img className='imagen' src={imagen.data.attributes.url} alt={`Imagen de la guitarra ${nombre}`} />
          <div className='contenido'>
              <h3>{nombre}</h3>
              <p className='texto'>{descripcion}</p>
              <p className='precio'>${precio}</p>
              
              {/* este formulario va a manejar un estado en el cliente no en el servidor, por que esa parte la va almacenar en el localStorage */}
              <form onSubmit={handleSubmit} className='formulario'>
                  <label htmlFor='cantidad'>Cantidad</label>
                  {/* con htmlfor y el id-nos da la función de tocar cantidad y nos habilita el label de cantidad */}
                  {/* ponerle un signo de + al inicio sustituye el parseInt */}
                  <select onChange={ e => setCantidad(+e.target.value)} id="cantidad" >
                      <option value="0">-- Seleccione --</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                  </select>

                  <input type="submit" value="Agregar al carrito" />
              </form>
          </div>

    </div>
  )
}

export default GuitarraUrl