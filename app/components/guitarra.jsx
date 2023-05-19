import { Link } from '@remix-run/react';
export default function Guitarra({guitarra}){// la tomamos via props por eso hacemos la extracción aquí
    // Esto viene de las props, como ya hicimos la extración de lo que viene del consumo de la API
    const { descripcion, imagen, precio, url, nombre } = guitarra;

    return (
        <div className="guitarra">

            <img src={imagen.data.attributes.formats.medium.url} 
                 alt={`Imagen guitarra ${nombre}`} />

            <div className="contenido">
                <h3>{nombre}</h3>
                <p className="descripcion">{descripcion}</p>
                <p className="precio">${precio}</p>

                <Link className='enlace' to={`/guitarras/${url}`}>Ver Producto</Link> 
            </div>
        </div>
    )
}


