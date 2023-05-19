import { useEffect, useState } from 'react'
import { useOutletContext } from '@remix-run/react'; // agregar la parte del carrito de compras
import { ClientOnly } from 'remix-utils'; // es un componente que le dice que ciertas partes del codigo se ejecuten solamente en el cliente
import styles from '~/styles/carrito.css';
export function links() {
    return [
        {
            rel: 'stylesheet',
            href: styles
        }
    ]
}

export function meta() {
    return [
        {title: 'GuitarLA - Carrito de compras'},
        {description: 'Venta de guitarras, música, blog, carrito de compras, tienda'}
    ]
}

function Carrito() {
    const [total, setTotal] = useState(0); // el total inicia en 0 va a ser un número
    const { carrito, actualizarCantidad, eliminarGuitarra } = useOutletContext(); // usando el context para poder usar el state que viene de root
    
    useEffect(() => {
        const calculoTotal = carrito.reduce((total, producto) => total + (producto.cantidad * producto.precio), 0);
        setTotal(calculoTotal);
    }, [carrito]);
    // total es el acumulado y el siguiente es el valor actual

    return (
        // fallback se va mostrar en lo que el state de abajo esta listo
        <ClientOnly fallback={'cargando...'}>
            {() => (
            <main className="contenedor">
                <h1 className="heading">Carrito de Compras</h1>
                
                <div className="contenido">  
                    <div className='carrito'>
                        <h2>Articulos</h2>
                        {carrito?.length === 0 ? 'Carrito Vacío' : (
                            carrito?.map(producto => (
                                <div key={producto.id} className='producto'>
                                    <div>
                                        <img src={producto.imagen} alt={`Imagen del producto ${producto.nombre}`} />
                                    </div>

                                    <div>
                                        <p className='nombre'>{producto.nombre}</p>
                                        <p>Cantidad:</p>
                                        <select value={producto.cantidad} className='select'
                                            onChange={e => actualizarCantidad({
                                            cantidad: +e.target.value,
                                            id: producto.id
                                        })}>
                                            {/* recuerda que al ponerle el + modifica el tipo de dato */}
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                        <p className='precio'>$ <span>{producto.precio}</span></p>
                                        <p className='subtotal'>Subtotal: $ <span>{producto.cantidad * producto.precio}</span></p>
                                        {/* cuantas guitarras seleccione por el precio */}
                                    </div>
                                        <button type='button' className='btn_eliminar' onClick={() => eliminarGuitarra(producto.id)}>X</button>

                                </div>
                            ))
                        )}
                    </div>          

                    <aside className="resumen">
                        <h3>Resumen del Pedido</h3>
                        <p>Total al pagar: ${total}</p>
                    </aside>
                </div>
            </main>
            )}
        </ClientOnly>
  )
}

export default Carrito