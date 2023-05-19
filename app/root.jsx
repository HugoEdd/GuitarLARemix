import { useState, useEffect } from 'react';
import { Meta, Links, Outlet, Scripts, LiveReload, useRouteError, isRouteErrorResponse, Link } from '@remix-run/react'; // importaciones especiales para los componenetes, importar contenido de otras rutas aquí
import styles from '~/styles/index.css';
// puedes importar del cliente o del servidor, en este caso es del cliente - react
import Header from '~/components/header';
import Footer from '~/components/footer';
// ~ con este caracter apuntamos directamente hacia app, evitamos el ../../
export function meta() {
    // Estamos usando la version 2, por eso meta nos pide que devolvamos un array en lugar de un obj
    return [
        // Doctype. Es eso basicamente, lo encontrariamos en cualquier proyecto de HTML
        {charset: 'utf-8'}, 
        {title: 'GuitarLA - Remix'},
        {viewport: "width=device-width,initial-scale=1"},
    ];
}
// La funcion de meta solo funciona en roots, pero no funciona en componentes
// La función links solamente funciona en roots

// Agregando estilos y googleFonts
export function links() {
    // esta hoja de estilos que carguemos en roots, se va a cargar en todas las páginas y en todos los componentes
    return [
        {
            rel: 'stylesheet',
            href: 'https://necolas.github.io/normalize.css/8.0.1/normalize.css'
        },
        {
            rel: 'stylesheet',
            href: styles,
        },
        {
            rel: 'preconnect',
            href: 'https://fonts.googleapis.com'
        }, 
        {
           rel: 'preconnect',
            href: 'https://fonts.gstatic.com',
           crossOrigin : "true"
        },
        {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&family=Outfit:wght@400;700;900&display=swa'
        }
    ]
}


export default function App() {
    // fue parte del ejemplo de useOutletContext
    // function sumar() {
    //     console.log(2 + 2);
    // }
    // ! error por setear el estado de carrito de forma condicional, el cliente tiene acceso al local storage
    // solución del error de la hidratación instalar un paquete con el siguiente comando npm i remix-utils
    const carritoLS = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('carrito')) ?? [] : null;
    // si no existe nada entonces retorna el arreglo como vacío, evitar que lo retorne como nullo
    // ponemos el typeof porque nos marca un error al poner el localstorage fuere del useEffect
    // recuerda que remix se ejecuta tanto en el cliente como en el servidor
    const [carrito, setCarrito] = useState(carritoLS);
    // recomendable si vas a hacer un llamado al localStorage colocalo en un useEffect
    useEffect(() => {
        // localstorage es una api que existe solamente en el navegador
        // si lo colocamos aqui, solo se ejecuta para la parte de cliente de remix, si es por fuera se ejecuta una en el cliente y otra en el servidor
        localStorage.setItem('carrito', 'carrito');
        localStorage.setItem('carrito', JSON.stringify(carrito));
        // carrito es un arreglo de obj a string
    }, [carrito]);

    const agregarCarrito = guitarra => {
        // Evitar datos dobles cuado le cambiabos la cantidad al carrito de compras
        // guitarra viene desde guitarraUrl
        if(carrito.some(guitarraState => guitarraState.id === guitarra.id)) {
            // Nos retorna un true, si al menos un de estos cumpla alguna condicion
            // some es un método de los arrays que se utiliza para determinar si al menos un elemento del array cumple con una condición específica.
            // ? Iterar sobre el arreglo e identificar el elemento duplicado
            const carritoActualizado = carrito.map(guitarraState => {
                if (guitarraState.id === guitarra.id) {
                    // Reescribir la cantidad
                    // guitarraState.cantidad += guitarra.cantidad;    
                    guitarraState.cantidad = guitarra.cantidad;    
                    // asi solo cambia la cantidad que hay con la opcio, pero muchos lo usan asi, la cantidad que ya habia += a una cantidad nueva
                } 

                return guitarraState; // si no lo retornamos nuestro arreglo va a tener muchos hueco
            });
            // Añadir al carrito
            setCarrito(carritoActualizado); // cambiamos el estado, despues de todo el proceso de comparar y retornar arreglo nuevo con map
        } else {
            // Registro nuevo, si no existe, registro nuevo agregar
            setCarrito([...carrito, guitarra]);
        }
    }

    const actualizarCantidad = guitarra => {
        const carritoActualizado = carrito.map(guitarraState => {
            if (guitarraState.id === guitarra.id) {
                guitarraState.cantidad = guitarra.cantidad;
            }
            return guitarraState;
        })
        setCarrito(carritoActualizado);
    }

    const eliminarGuitarra = id => {
        const carritoActualizado = carrito.filter(guitarraState => guitarraState.id !== id);
        // cada guitarrastste.id que sea diferente al id que le estamos pasando
        setCarrito(carritoActualizado);
        // le podriamos pasar directo el setCarrito, pero es mejor el código separado, tenemos mayor claridad
    }

    return (
        // De esta manera ya estamos utilizando todo lo que esta dentro de ese componente
        <Document>
            {/* con context vamos a atar código al context que ya viene en remix, le podemos pasar lo queramos un string o si un usuario esta autenticado */}
            <Outlet context={{
                // fue parte del ejemplo de useOutletContext
                // guitarLa: "GuitarLA",
                // auth: true,
                // sumar
                agregarCarrito,
                carrito,
                actualizarCantidad,
                eliminarGuitarra,
            }} />
            {/* todo el contenido que vayamos creando en otros componentes se va a ir inyectando aquí */}
        </Document>
    )
}

// Nuestro archivo principal en remix es este el "root.jsx"
// Agregar hojas de estilo es más sencillo
function Document({ children }) {
    return (
        <html lang="es">
            <head>
                {/* en remix es sencillo modificar la información meta, para tener buena posición en buscadores */}
                {/* importar un componente especial de remix, y renderizarlo en el head */}
                <Meta />
                <Links />
            </head>
            <body>
                <Header />
                {children}
                <Footer />
                {/* Scripts va a tener todas la optimizaciones de remix, quitamos una flashazo que nos salia al navegar entre los enlaces */}
                <Scripts />
                <LiveReload />
                {/*livereload escucha todos los cambios, y actualiza automaticamente */}
            </body>
        </html>
    )
}

/* ERRORES */
// Para manejar los errores tenemos que manejar algunos componentes especiales
export function CatchBoundary() {
    
    const error = useRouteError(); // esto es un hook de remix

    if (isRouteErrorResponse(error)) {
        
    return (
        <Document>
            {/* de esta manera imprimimos los errores */}
            <p className="error">{error.status} {error.statusText} </p>
            <Link className="error-enlace" to="/">Tal vez quieras volver a la página principal</Link>
        </Document>
        )
    }

}

export function ErrorBoundary() {
     
    const error = useRouteError(); // esto es un hook de remix

    if (isRouteErrorResponse(error)) {
        
    return (
        <Document>
            {/* de esta manera imprimimos los errores */}
            <p className="error">{error.status} {error.statusText} </p>
            <Link className="error-enlace" to="/">Tal vez quieras volver a la página principal</Link>
        </Document>
        )
    }
}