import Guitarra from "./guitarra";

// las guitarras vienen via props
export default function ListadoGuitarras({guitarras}) {
  return (
    <>
      <h2 className='heading'>Nuestra Colección</h2>

      {/* optional chaning ? para evitar posibles errores */}
      {guitarras?.length && (
        <div className="guitarras-grid">
          {guitarras.map( guitarra => (
            <Guitarra key={guitarra.id} guitarra={guitarra?.attributes}  />
          ))}
        </div>
      )}
    </>
  )
}
