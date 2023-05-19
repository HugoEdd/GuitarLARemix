import { useLoaderData } from '@remix-run/react'
import ListadoPosts from '~/components/listado-posts';
import { getPosts } from '~/models/posts.server';

export function meta() {
  return [
    {title: 'GuitarLA - Nuestro Blog'},
    {description: 'GuitarLA, Blog de música y venta de guitarras'}
  ]
}

// importamos useLoaderData - para obtener informacion de mi loader
export async function loader() {
  const posts = await getPosts();
  
  return posts.data;
}

function Blog() {

  // consumir los posts, osea la data
  const posts = useLoaderData();

  return (
      <ListadoPosts posts={posts} />
  )
}

export default Blog

// aplicando nested - ahora funciona como layput la clase padre padrino