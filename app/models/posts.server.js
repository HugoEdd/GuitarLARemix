export async function getPosts(){
     // ! Consumir la API
  // Esta es una forma de consumir la api, existe otra forma, creamos una carpeta con el nombre models, api, data, cualquiera de esos nombre
  const respuesta = await fetch(`${process.env.API_URL}/posts?populate=imagen`);
  return await respuesta.json();
}

// consumir guitarra por url
// el valor viene desde $guitarraurl
export async function getPost(url) {
  const respuesta = await fetch(`${process.env.API_URL}/posts?filters[url]=${url}&populate=imagen`);
  return await respuesta.json();
}