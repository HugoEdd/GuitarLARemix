import Post from "./post"
export default function ListadoPosts({posts}) {
  return (
      <>
        <h2 className="heading">Blog</h2>
        <div className="blog">
            {posts.map(post => (
            // recuerda que el post.id siempre va, asi evitamos errores de que debe llevar un id único
            <Post
                key={post.id}
                post={post.attributes}
            />
            ))}
        </div>
      </>
  )
}
