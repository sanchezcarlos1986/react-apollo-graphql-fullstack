import React, { Fragment } from 'react'
import Producto from './Producto';

const Resumen = ({ productos, actualizarCantidad, eliminarProducto }) => {
  if (productos.length === 0) return null

  return (
    <Fragment>
      <h2 className="text-center mb-5">Resumen y Cantidades</h2>
      <table className="table">
        <thead className="bg-success text-light">
          <tr className="font-weight-bold">
            <th scope="col">Producto</th>
            <th scope="col">Precio</th>
            <th scope="col">Inventario</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {
            productos.map((producto, index) => (
              <Producto 
                key={producto.id} 
                producto={producto}
                index={index}
                actualizarCantidad={actualizarCantidad}
                eliminarProducto={eliminarProducto}
              />
            ))
          }          
        </tbody>
      </table>
    </Fragment>
  )
}

export default Resumen