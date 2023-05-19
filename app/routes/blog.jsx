import { Outlet } from '@remix-run/react'
import styles from '~/styles/blog.css';

// Si mantenemos los links heredan a los otros components dentro de la carpeta blog
export function links() {
   return [
    {
      rel: 'stylesheet',
      href: styles
    }
  ]
}


function Blog() {


  return (
    <main className="contenedor">
      <Outlet />
    </main>
  )
}

export default Blog

// aplicando nested - ahora funciona como layput la clase padre padrino