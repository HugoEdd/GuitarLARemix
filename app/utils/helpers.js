export const formatearFecha = fecha => {

    const fechaNueva = new Date(fecha);

    const opciones = {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    }
    // formateamos esta fecha para tener acceso al método
    return fechaNueva.toLocaleDateString('es-ES', opciones);
}