// Recomendacion los archivos en remix, crealos en minusculas, pero el nombre del componente en mayusculas
import { useLoaderData} from '@remix-run/react';
import { getGuitarras } from '~/models/guitarras.server';
import { getPosts } from '~/models/posts.server';
import { getCurso } from '~/models/curso.server';
import ListadoGuitarras from '~/components/listado-guitarras'
import ListadoPosts from '~/components/listado-posts'
import Curso from '~/components/curso';
import stylesGuitarras from '~/styles/guitarras.css'
import stylePosts from '~/styles/blog.css'
import stylesCurso from '~/styles/curso.css'


export function meta() {
  
}

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: stylesGuitarras
    },
    {
      rel: 'stylesheet',
      href: stylePosts
    },
    {
      rel: 'stylesheet',
      href: stylesCurso
    }
  ]
}

export async function loader() {// en loader vamos a consultar las guitarras, entonces vamos a importar

  // Mejorar el performace de el código - este código practicamente hace lo mismo que lo de abajo
  const [guitarras, posts, curso] = await Promise.all([
    getGuitarras(),
    getPosts(),
    getCurso()
  ]);

  /*const guitarras = await getGuitarras();
  console.log(guitarras);

  // problema este getPosts se va a mandar a llamar hasta que se alla finalizado esta consulta
  const posts = await getPosts();
  console.log(posts);*/
  
  /* otra manera de retornar el obj
     const data = {
    guitarras,
    posts
  } */

  return {
    guitarras: guitarras.data,
    posts: posts.data,
    curso: curso.data
  }  
}

function Index() {

  const {guitarras, posts, curso} = useLoaderData();


  return (
    // Retornamos un fragment por que vamos a tener multiples contenidos
    <>
      <main className='contenedor'>
        <ListadoGuitarras 
          guitarras={guitarras}
        />       
      </main>

      <Curso curso={curso.attributes} />

      <section className='contenedor'>
        <ListadoPosts posts={posts} />
      </section>
    </>
   
  )
}

export default Index


/*
 el guion bajo indicara que esa es la pagina de inicio y tu componente
  podra renderizarse al abrir la pagina de primeras o en la ruta ' / '
*/