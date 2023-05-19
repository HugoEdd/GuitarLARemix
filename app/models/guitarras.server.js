// Segunda forma de consumir la API
// Remix este archivo solamente debe de ejecutarse en la parte de servidor de remix
export async function getGuitarras(){
     // ! Consumir la API
  // Esta es una forma de consumir la api, existe otra forma, creamos una carpeta con el nombre models, api, data, cualquiera de esos nombre
  const respuesta = await fetch(`${process.env.API_URL}/guitarras?populate=imagen`);
  return await respuesta.json();
}

// consumir guitarra por url
// el valor viene desde $guitarraurl
export async function getGuitarra(url) {
  const respuesta = await fetch(`${process.env.API_URL}/guitarras?filters[url]=${url}&populate=imagen`);
  return await respuesta.json();
}